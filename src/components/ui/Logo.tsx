import React from 'react';

export interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTagline?: boolean;
}

const sizeConfig = {
  sm: {
    width: 130,
    height: 38,
    mainFont: '22px',
    subFont: '7.5px',
    letterSpacing: '5px',
    iconSize: 22,
    gap: 8,
  },
  md: {
    width: 175,
    height: 48,
    mainFont: '28px',
    subFont: '9.5px',
    letterSpacing: '6.5px',
    iconSize: 28,
    gap: 10,
  },
  lg: {
    width: 220,
    height: 60,
    mainFont: '36px',
    subFont: '12px',
    letterSpacing: '8.5px',
    iconSize: 36,
    gap: 12,
  },
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
  showTagline = false,
}) => {
  const isLight = variant === 'light';
  const primaryColor = isLight ? '#ffffff' : 'var(--text-primary)';
  const accentColor = '#c4532a';
  const subtextColor = isLight ? 'rgba(255, 255, 255, 0.75)' : 'var(--text-muted)';
  const flameGradientId = `alive-flame-${variant}-${size}`;

  const cfg = sizeConfig[size];

  return (
    <svg
      viewBox="0 0 240 64"
      width={cfg.width}
      height={cfg.height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="ALIVE Institute Logo"
    >
      <defs>
        <linearGradient id={flameGradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c4532a" />
          <stop offset="60%" stopColor="#d4714f" />
          <stop offset="100%" stopColor="#f39c12" />
        </linearGradient>
      </defs>

      {/* Stylized geometric ignition flame / spark symbol */}
      <g transform="translate(4, 6)">
        {/* Core spark diamond / polygon */}
        <path
          d="M 18 4 L 30 24 L 18 44 L 6 24 Z"
          fill={accentColor}
          opacity={0.15}
        />
        {/* Dynamic flame ascending curve */}
        <path
          d="M 18 8 C 18 8 26 18 26 27 C 26 34 21 39 16 39 C 11.5 39 8.5 35 8.5 31 C 8.5 25 14 20 15 16 C 15 16 11 19 11 23 C 11 20 13 14 18 8 Z"
          fill={`url(#${flameGradientId})`}
        />
        {/* Spark dot */}
        <circle cx="25" cy="12" r="2.5" fill={accentColor} />
      </g>

      {/* Brand Typography */}
      {/* 'ALIVE' Main Text */}
      <text
        x="48"
        y="35"
        fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="800"
        fontSize="34"
        letterSpacing="2.5"
        fill={primaryColor}
      >
        ALIVE
      </text>

      {/* Accent dot on the 'E' */}
      <circle cx="166" cy="18" r="3" fill={accentColor} />

      {/* 'INSTITUTE' Subtitle */}
      <text
        x="50"
        y="50"
        fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="600"
        fontSize="9.5"
        letterSpacing="5.8"
        fill={subtextColor}
      >
        INSTITUTE
      </text>

      {showTagline && (
        <text
          x="50"
          y="61"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="400"
          fontSize="6.5"
          letterSpacing="1"
          fill={subtextColor}
        >
          INDORE • EST. 2012
        </text>
      )}
    </svg>
  );
};

export default Logo;
