'use client';
import { useState } from 'react';

interface Props {
  onClose: () => void;
  onUnlock: () => void;
}

const FEATURES = [
  'All 3 practice tests',
  '6 sections per test — fully timed',
  'Detailed answer explanations',
  'Progress tracking across tests',
  'Lifetime access',
];

export function PaywallModal({ onClose, onUnlock }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Suppress unused param warning — onUnlock kept in case caller needs it
  void onUnlock;

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Fire-and-forget lead capture (don't block on it)
      if (email.trim()) {
        fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() }),
        }).catch(() => {/* silent */});
      }

      // Create Stripe checkout session
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        throw new Error('Checkout failed');
      }

      const { url } = await res.json();
      if (!url) throw new Error('No checkout URL returned');

      window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
           style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #c8102e, #d4900a)' }} />
        <div className="p-8">
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1 }}
            aria-label="Close"
          >×</button>

          <div className="text-center mb-6">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏅</div>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8102e', marginBottom: '0.5rem' }}>
              Full Access Required
            </p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', color: '#fff', marginBottom: '0.25rem' }}>
              Unlock Everything
            </h2>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '3rem', fontWeight: 800, color: '#fff', marginTop: '0.75rem', lineHeight: 1 }}>
              $29 <span style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.4)' }}>CAD</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.25rem' }}>One-time · Lifetime access</div>
          </div>

          <ul style={{ listStyle: 'none', marginBottom: '1.5rem', padding: 0 }}>
            {FEATURES.map(f => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: '#c8102e', fontWeight: 700, flexShrink: 0 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email (optional)"
              style={{
                width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => (e.target.style.borderColor = '#c8102e')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />

            {error && (
              <p style={{ color: '#f87171', fontSize: '0.82rem', margin: 0 }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '1rem', borderRadius: '0.75rem', border: 'none',
                background: '#c8102e', color: '#fff', cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
                fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.08em',
                opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    display: 'inline-block',
                    width: '1em',
                    height: '1em',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    animation: 'spin 0.7s linear infinite',
                  }} />
                  Redirecting to checkout...
                </>
              ) : (
                'Unlock Full Access — $29 CAD'
              )}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', margin: 0 }}>
              Secure payment powered by Stripe
            </p>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
