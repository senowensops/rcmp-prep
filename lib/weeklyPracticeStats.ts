type PracticeAttemptRow = {
  id: string;
  session_id: string | null;
};

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const FALLBACK_WEEKLY_USERS = 32;

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) return null;

  return { url: url.replace(/\/$/, ""), key };
}

export async function getWeeklyPracticeUserCount() {
  const config = getSupabaseConfig();
  if (!config) return FALLBACK_WEEKLY_USERS;

  const since = new Date(Date.now() - ONE_WEEK_MS).toISOString();
  const query = new URLSearchParams({
    select: "id,session_id",
    started_at: `gte.${since}`,
    order: "started_at.desc",
    limit: "10000",
  });

  try {
    const response = await fetch(
      `${config.url}/rest/v1/test_attempts?${query.toString()}`,
      {
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) return FALLBACK_WEEKLY_USERS;

    const attempts = (await response.json()) as PracticeAttemptRow[];
    const uniqueSessions = new Set(
      attempts.map((attempt) => attempt.session_id ?? attempt.id)
    );

    return uniqueSessions.size || FALLBACK_WEEKLY_USERS;
  } catch {
    return FALLBACK_WEEKLY_USERS;
  }
}
