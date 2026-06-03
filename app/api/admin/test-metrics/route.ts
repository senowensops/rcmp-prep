import { NextResponse } from "next/server";

type AttemptRow = {
  id: string;
  test_id: string;
  started_at: string | null;
  completed_at: string | null;
  score_percent: number | null;
  answered_questions: number | null;
  skipped_count: number | null;
  duration_seconds: number | null;
  last_section_id: string | null;
  section_times?: Record<string, number> | null;
  question_times?: Record<string, number> | null;
};

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase server configuration");
  }

  return { url, key };
}

async function fetchAttempts(limit = 1000, offset = 0): Promise<AttemptRow[]> {
  const { url, key } = getSupabaseConfig();
  const query = new URLSearchParams({
    select: [
      "id",
      "test_id",
      "started_at",
      "completed_at",
      "score_percent",
      "answered_questions",
      "skipped_count",
      "duration_seconds",
      "last_section_id",
      "section_times",
      "question_times",
    ].join(","),
    order: "started_at.desc.nullslast,created_at.desc",
      limit: String(limit),
      offset: String(offset),
  });

  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/test_attempts?${query.toString()}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Range: `${offset}-${offset + limit - 1}`,
      "Range-Unit": "items",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.status}`);
  }

  return (await response.json()) as AttemptRow[];
}

async function fetchAllAttempts(maxRows = 5000): Promise<AttemptRow[]> {
  const pageSize = 1000;
  const rows: AttemptRow[] = [];

  for (let offset = 0; offset < maxRows; offset += pageSize) {
    const batch = await fetchAttempts(pageSize, offset);
    rows.push(...batch);

    if (batch.length < pageSize) break;
  }

  return rows;
}

const MIN_VALID_COMPLETION_SECONDS = 120;

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function median(values: number[]) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function isSuspiciousCompletion(attempt: AttemptRow) {
  if (!attempt.completed_at) return false;

  const answered = attempt.answered_questions ?? 0;
  const activeSeconds = attempt.duration_seconds ?? 0;
  const skipped = attempt.skipped_count ?? 0;
  const totalObserved = answered + skipped;

  if (answered <= 0) return true;
  if (activeSeconds > 0 && activeSeconds < MIN_VALID_COMPLETION_SECONDS) return true;
  if (totalObserved > 0 && answered > totalObserved) return true;

  return false;
}

export async function GET() {
  try {
    const attempts = await fetchAllAttempts();
    const started = attempts.length;
    const completed = attempts.filter((attempt) => attempt.completed_at);
    const validCompleted = completed.filter((attempt) => !isSuspiciousCompletion(attempt));
    const suspiciousCompletions = completed.filter((attempt) => isSuspiciousCompletion(attempt));
    const completionRate = started ? (validCompleted.length / started) * 100 : 0;

    const activeTimes = validCompleted
      .map((attempt) => attempt.duration_seconds ?? 0)
      .filter((value) => value > 0);

    const funnel = {
      started,
      reachedResults: validCompleted.length,
      completed: validCompleted.length,
      suspiciousCompletions: suspiciousCompletions.length,
      supportModalShown: 0,
    };

    const dropOffBySection = new Map<string, number>();
    for (const attempt of attempts.filter((row) => !row.completed_at && row.last_section_id)) {
      const key = attempt.last_section_id ?? "unknown";
      dropOffBySection.set(key, (dropOffBySection.get(key) ?? 0) + 1);
    }

    const questionTimes = new Map<string, number[]>();
    const skipLeaders = validCompleted
      .filter((attempt) => (attempt.skipped_count ?? 0) > 0)
      .sort((a, b) => (b.skipped_count ?? 0) - (a.skipped_count ?? 0))
      .slice(0, 10)
      .map((attempt) => ({
        id: attempt.id,
        testId: attempt.test_id,
        skipped: attempt.skipped_count ?? 0,
        score: attempt.score_percent ?? 0,
      }));

    for (const attempt of validCompleted) {
      for (const [questionId, value] of Object.entries(attempt.question_times ?? {})) {
        if (!questionTimes.has(questionId)) questionTimes.set(questionId, []);
        questionTimes.get(questionId)?.push(value);
      }
    }

    const hardestQuestions = [...questionTimes.entries()]
      .map(([questionId, values]) => ({
        questionId,
        avgSeconds: average(values),
        medianSeconds: median(values),
        samples: values.length,
      }))
      .filter((item) => item.samples >= 2)
      .sort((a, b) => b.avgSeconds - a.avgSeconds)
      .slice(0, 10);

    return NextResponse.json({
      summary: {
        started,
        completed: validCompleted.length,
        suspiciousCompletions: suspiciousCompletions.length,
        completionRate: Number(completionRate.toFixed(1)),
        averageScore: Number(average(validCompleted.map((attempt) => attempt.score_percent ?? 0)).toFixed(1)),
        averageActiveMinutes: Number((average(activeTimes) / 60).toFixed(1)),
        medianActiveMinutes: Number((median(activeTimes) / 60).toFixed(1)),
      },
      funnel,
      dropOffBySection: [...dropOffBySection.entries()].map(([sectionId, count]) => ({ sectionId, count })),
      skipLeaders,
      hardestQuestions,
      recentCompletions: validCompleted.slice(0, 10).map((attempt) => ({
        id: attempt.id,
        testId: attempt.test_id,
        startedAt: attempt.started_at,
        completedAt: attempt.completed_at,
        score: attempt.score_percent,
        activeSeconds: attempt.duration_seconds,
        elapsedSeconds: attempt.duration_seconds,
        answered: attempt.answered_questions,
        skipped: attempt.skipped_count,
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
