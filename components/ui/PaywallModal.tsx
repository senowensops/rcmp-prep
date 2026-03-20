'use client';
import { useState } from 'react';

interface Props {
  onClose: () => void;
  onUnlock: () => void;
  currentSectionId?: string;
}

const SECTIONS = [
  { value: 'spatial', label: 'Spatial Reasoning' },
  { value: 'numerical', label: 'Numerical' },
  { value: 'language', label: 'Language' },
  { value: 'workstyle', label: 'Workstyle' },
  { value: 'business', label: 'Verbal Reasoning' },
  { value: 'memory', label: 'Memory' },
];

const FULL_FEATURES = [
  'All 3 practice tests',
  '6 sections per test — fully timed',
  'Detailed answer explanations',
  'Progress tracking across tests',
  'Lifetime access',
];

const DISCOUNT_CODE = 'DEPOT2026';

export function PaywallModal({ onClose, onUnlock, currentSectionId }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);
  const [error, setError] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState('');
  const [selectedSection, setSelectedSection] = useState(currentSectionId ?? 'spatial');
  const [tab, setTab] = useState<'full' | 'section'>('full');

  const handleApplyDiscount = () => {
    setDiscountError('');
    if (discountCode.trim().toUpperCase() === DISCOUNT_CODE) {
      setDiscountApplied(true);
      localStorage.setItem('rcmp-access-unlocked', '1');
      setTimeout(() => {
        onUnlock();
      }, 800);
    } else {
      setDiscountError('Invalid code');
    }
  };

  const handleCheckout = async (plan: 'full' | 'section') => {
    setError('');
    const setLoadingFn = plan === 'full' ? setLoading : setSectionLoading;
    setLoadingFn(true);

    try {
      if (email.trim()) {
        fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() }),
        }).catch(() => {/* silent */});
      }

      const body: Record<string, string> = { email: email.trim(), plan };
      if (plan === 'section') body.section = selectedSection;

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Checkout failed');
      const { url } = await res.json();
      if (!url) throw new Error('No checkout URL returned');
      window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Something went wrong. Please try again.');
      setLoadingFn(false);
    }
  };

  const sectionLabel = SECTIONS.find(s => s.value === selectedSection)?.label ?? selectedSection;

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

          <div className="text-center mb-5">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏅</div>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8102e', marginBottom: '0.5rem' }}>
              Access Required
            </p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#fff' }}>
              Unlock to Continue
            </h2>
          </div>

          {/* Tab switcher */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.25rem', marginBottom: '1.25rem' }}>
            <button
              type="button"
              onClick={() => setTab('full')}
              style={{
                flex: 1, padding: '0.6rem', borderRadius: '0.5rem', border: 'none',
                background: tab === 'full' ? '#c8102e' : 'transparent',
                color: tab === 'full' ? '#fff' : 'rgba(255,255,255,0.5)',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              Full Access — $29
            </button>
            <button
              type="button"
              onClick={() => setTab('section')}
              style={{
                flex: 1, padding: '0.6rem', borderRadius: '0.5rem', border: 'none',
                background: tab === 'section' ? '#c8102e' : 'transparent',
                color: tab === 'section' ? '#fff' : 'rgba(255,255,255,0.5)',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              One Section — $9
            </button>
          </div>

          {tab === 'full' ? (
            <>
              <div className="text-center mb-4">
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '3rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                  $29 <span style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.4)' }}>CAD</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.25rem' }}>One-time · Lifetime access · All sections</div>
              </div>

              <ul style={{ listStyle: 'none', marginBottom: '1.25rem', padding: 0 }}>
                {FULL_FEATURES.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#c8102e', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="text-center mb-4">
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '3rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                  $9 <span style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.4)' }}>CAD</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.25rem' }}>One-time · Lifetime access · 1 section across all tests</div>
              </div>

              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                style={{
                  width: '100%', padding: '0.75rem 1rem', borderRadius: '0.75rem',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
                  marginBottom: '1rem',
                }}
              >
                {SECTIONS.map(s => (
                  <option key={s.value} value={s.value} style={{ background: '#111' }}>{s.label}</option>
                ))}
              </select>
            </>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleCheckout(tab); }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              style={{
                width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => (e.target.style.borderColor = '#c8102e')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />

            {/* Discount code row */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={discountCode}
                onChange={e => { setDiscountCode(e.target.value); setDiscountError(''); }}
                placeholder="Discount code"
                disabled={discountApplied}
                style={{
                  flex: 1, padding: '0.75rem 1rem', borderRadius: '0.75rem',
                  background: 'rgba(255,255,255,0.05)', border: `1px solid ${discountApplied ? '#22c55e' : 'rgba(255,255,255,0.1)'}`,
                  color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
                  opacity: discountApplied ? 0.7 : 1,
                }}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleApplyDiscount(); } }}
              />
              <button
                type="button"
                onClick={handleApplyDiscount}
                disabled={discountApplied || !discountCode.trim()}
                style={{
                  padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.8)',
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.85rem',
                  textTransform: 'uppercase', letterSpacing: '0.06em', cursor: discountApplied ? 'default' : 'pointer',
                  whiteSpace: 'nowrap', opacity: discountApplied ? 0.5 : 1,
                }}
              >
                {discountApplied ? '✓ Applied' : 'Apply'}
              </button>
            </div>

            {discountApplied && (
              <p style={{ color: '#22c55e', fontSize: '0.85rem', margin: 0, textAlign: 'center', fontWeight: 600 }}>
                ✓ Code accepted! Unlocking access…
              </p>
            )}
            {discountError && (
              <p style={{ color: '#f87171', fontSize: '0.82rem', margin: 0 }}>{discountError}</p>
            )}
            {error && (
              <p style={{ color: '#f87171', fontSize: '0.82rem', margin: 0 }}>{error}</p>
            )}

            {!discountApplied && (
              <button
                type="submit"
                disabled={loading || sectionLoading}
                style={{
                  width: '100%', padding: '1rem', borderRadius: '0.75rem', border: 'none',
                  background: '#c8102e', color: '#fff', cursor: (loading || sectionLoading) ? 'not-allowed' : 'pointer',
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
                  fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.08em',
                  opacity: (loading || sectionLoading) ? 0.6 : 1, transition: 'opacity 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                }}
              >
                {(loading || sectionLoading) ? (
                  <>
                    <span style={{
                      display: 'inline-block', width: '1em', height: '1em',
                      borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff', animation: 'spin 0.7s linear infinite',
                    }} />
                    Redirecting to checkout...
                  </>
                ) : tab === 'full' ? (
                  'Unlock Full Access — $29 CAD'
                ) : (
                  `Get ${sectionLabel} — $9 CAD`
                )}
              </button>
            )}

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
