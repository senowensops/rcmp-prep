import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'RCMP Prep — Practice for the RCMP Online Assessment';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f0f0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{
          display: 'flex',
          background: 'rgba(200,16,46,0.15)',
          border: '1px solid rgba(200,16,46,0.4)',
          borderRadius: '100px',
          padding: '8px 20px',
          marginBottom: '32px',
        }}>
          <span style={{ color: '#c8102e', fontSize: '16px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Unofficial Practice Resource
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#ffffff', fontSize: '96px', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>RCMP</span>
          <span style={{ color: '#ffffff', fontSize: '96px', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>ONLINE</span>
          <span style={{ color: '#c8102e', fontSize: '96px', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>ASSESSMENT</span>
          <span style={{ color: '#ffffff', fontSize: '96px', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>PREP</span>
        </div>
        <div style={{ marginTop: '40px', color: 'rgba(255,255,255,0.65)', fontSize: '28px', lineHeight: 1.5, maxWidth: '700px' }}>
          3 practice tests · 6 sections · Timed · Answer explanations
        </div>
        <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '100%', background: '#c8102e' }} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '22px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>rcmpprep.ca</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
