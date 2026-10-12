import { ImageResponse } from 'next/og';

export const alt = 'ALIVE Institute Indore — Igniting Minds, Building Futures';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(145deg, #0f2440 0%, #1a3a5c 60%, #163250 100%)',
          padding: '60px 70px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: '#ffffff',
          position: 'relative'
        }}
      >
        {/* Top Header Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                backgroundColor: '#c4532a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: '900',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(196, 83, 42, 0.4)'
              }}
            >
              A
            </div>
            <span
              style={{
                fontSize: '24px',
                fontWeight: '800',
                letterSpacing: '2px',
                color: '#ffffff'
              }}
            >
              ALIVE INSTITUTE
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '9999px',
              padding: '8px 22px',
              fontSize: '15px',
              fontWeight: '600',
              letterSpacing: '1px',
              color: '#fdf0ec'
            }}
          >
            INDORE • MP
          </div>
        </div>

        {/* Center Hero Banner */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            maxWidth: '960px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span
              style={{
                fontSize: '15px',
                fontWeight: '700',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#d4714f',
                backgroundColor: 'rgba(196, 83, 42, 0.18)',
                padding: '6px 14px',
                borderRadius: '6px'
              }}
            >
              CLASSES 6TH TO 12TH • CUET PREPARATION
            </span>
          </div>

          <h1
            style={{
              fontSize: '60px',
              fontWeight: '800',
              lineHeight: '1.15',
              letterSpacing: '-1px',
              margin: '0',
              color: '#ffffff'
            }}
          >
            Igniting Minds, Building Futures.
          </h1>

          <p
            style={{
              fontSize: '24px',
              color: '#d1dced',
              margin: '0',
              lineHeight: '1.4',
              maxWidth: '880px'
            }}
          >
            Academic excellence in Mathematics, Science &amp; Commerce with personalized mentoring and proven results.
          </p>
        </div>

        {/* Bottom Feature Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            paddingTop: '24px',
            width: '100%'
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '32px',
              fontSize: '16px',
              color: '#cbd5e1',
              fontWeight: '500'
            }}
          >
            <span>✓ Small Batch Mentorship</span>
            <span>✓ Free Study Resources</span>
            <span>✓ 14+ Years of Trust</span>
          </div>

          <div
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#d4714f'
            }}
          >
            aliveinstitute.in
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
