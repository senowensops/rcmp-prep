# Test Tracking Implementation

## 1. Create Supabase Table

Run this SQL in Supabase Dashboard → SQL Editor:

```sql
-- Test attempts tracking table
CREATE TABLE IF NOT EXISTS test_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  test_id TEXT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  total_questions INTEGER,
  answered_questions INTEGER,
  correct_answers INTEGER,
  score_percent NUMERIC(5,2),
  sections JSONB,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for analytics queries
CREATE INDEX idx_test_attempts_created_at ON test_attempts(created_at DESC);
CREATE INDEX idx_test_attempts_test_id ON test_attempts(test_id);

-- Enable RLS but allow inserts from anon
ALTER TABLE test_attempts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (tracking)
CREATE POLICY "Allow anonymous inserts" ON test_attempts
  FOR INSERT WITH CHECK (true);

-- Allow service role to read all
CREATE POLICY "Service role can read all" ON test_attempts
  FOR SELECT USING (auth.role() = 'service_role');
```

## 2. Add Supabase Client

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## 3. Add Tracking Helper

Create `lib/tracking.ts`:

```typescript
import { supabase } from './supabase';
import { trackEvent } from './analytics';

// Generate a session ID for this browser session
function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  let sessionId = sessionStorage.getItem('rcmp-session-id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem('rcmp-session-id', sessionId);
  }
  return sessionId;
}

export interface TestAttempt {
  testId: string;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  scorePercent: number;
  durationSeconds: number;
  sections: Array<{
    label: string;
    correct: number;
    total: number;
    pct: number;
  }>;
}

export async function trackTestStart(testId: string) {
  // GA event
  trackEvent('test_started', {
    test_id: testId,
    event_category: 'engagement',
  });

  // Supabase - create placeholder row
  const sessionId = getSessionId();
  try {
    await supabase.from('test_attempts').insert({
      session_id: sessionId,
      test_id: testId,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      referrer: typeof document !== 'undefined' ? document.referrer : null,
    });
  } catch (e) {
    console.error('Failed to track test start:', e);
  }
}

export async function trackTestComplete(attempt: TestAttempt) {
  // GA event
  trackEvent('test_completed', {
    test_id: attempt.testId,
    score: attempt.scorePercent,
    questions_answered: attempt.answeredQuestions,
    duration_seconds: attempt.durationSeconds,
    event_category: 'engagement',
  });

  // Supabase - update the row
  const sessionId = getSessionId();
  try {
    await supabase
      .from('test_attempts')
      .update({
        completed_at: new Date().toISOString(),
        duration_seconds: attempt.durationSeconds,
        total_questions: attempt.totalQuestions,
        answered_questions: attempt.answeredQuestions,
        correct_answers: attempt.correctAnswers,
        score_percent: attempt.scorePercent,
        sections: attempt.sections,
      })
      .eq('session_id', sessionId)
      .eq('test_id', attempt.testId)
      .is('completed_at', null);
  } catch (e) {
    console.error('Failed to track test completion:', e);
  }
}

export async function trackCheckoutStarted() {
  trackEvent('checkout_started', {
    event_category: 'conversion',
    value: 29,
    currency: 'CAD',
  });
}

export async function trackPurchaseComplete(sessionId: string, amount: number) {
  trackEvent('purchase_complete', {
    transaction_id: sessionId,
    value: amount,
    currency: 'CAD',
    event_category: 'conversion',
  });
}
```

## 4. Update Test Page

In `app/test/[testId]/page.tsx`, add at the top:

```typescript
import { trackTestStart } from '@/lib/tracking';
```

Add useEffect to track test start:

```typescript
// Track test start (once per session per test)
useEffect(() => {
  if (typeof window === 'undefined') return;
  const startKey = `rcmp-test-started-${testId}`;
  if (!sessionStorage.getItem(startKey)) {
    trackTestStart(testId);
    sessionStorage.setItem(startKey, '1');
  }
}, [testId]);
```

## 5. Update Results Page

In `app/results/[testId]/page.tsx`, add at the top:

```typescript
import { trackTestComplete } from '@/lib/tracking';
```

Add useEffect to track completion:

```typescript
// Track test completion (once)
useEffect(() => {
  if (typeof window === 'undefined') return;
  const completeKey = `rcmp-test-completed-${params.testId}`;
  if (sessionStorage.getItem(completeKey)) return;
  
  const startTime = sessionStorage.getItem(`rcmp-test-start-${params.testId}`);
  const durationSeconds = startTime 
    ? Math.round((Date.now() - parseInt(startTime)) / 1000)
    : 0;

  trackTestComplete({
    testId: params.testId,
    totalQuestions: results.totalScored,
    answeredQuestions: Object.keys(state.answers).length,
    correctAnswers: results.overallCorrect,
    scorePercent: results.overallPct,
    durationSeconds,
    sections: results.sections,
  });
  
  sessionStorage.setItem(completeKey, '1');
}, [params.testId, results, state.answers]);
```

Also update test page to store start time:

```typescript
// In test page useEffect for tracking
sessionStorage.setItem(`rcmp-test-start-${testId}`, Date.now().toString());
```

## 6. Environment Variables

Add to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://oganoylgybihscjfmrqt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your anon key>
```

## 7. Install Supabase Client

```bash
npm install @supabase/supabase-js
```
