import React from 'react';

export interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  alt?: string;
}

// Preset harmonious, premium color palette for deterministic hashing
const AVATAR_PALETTES = [
  { bg: '#1a3a5c', text: '#ffffff' }, // Deep Navy
  { bg: '#2a5a8c', text: '#ffffff' }, // Muted Blue
  { bg: '#c4532a', text: '#ffffff' }, // Terracotta
  { bg: '#1a7a4a', text: '#ffffff' }, // Forest Green
  { bg: '#6c4a8c', text: '#ffffff' }, // Regal Purple
  { bg: '#8c502a', text: '#ffffff' }, // Warm Umber
  { bg: '#246b7a', text: '#ffffff' }, // Ocean Teal
  { bg: '#5c4d3c', text: '#ffffff' }, // Slate Bronze
];

function getInitials(name: string): string {
  if (!name) return 'AI';
  // Strip common demo tags or parentheses if present
  const cleaned = name.replace(/\([^)]*\)/g, '').replace(/—.*$/, '').trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return 'AI';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function getPalette(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_PALETTES.length;
  return AVATAR_PALETTES[index];
}

const SIZE_STYLES: Record<'sm' | 'md' | 'lg' | 'xl', { size: number; fontSize: string }> = {
  sm: { size: 36, fontSize: '0.8125rem' },
  md: { size: 48, fontSize: '1rem' },
  lg: { size: 72, fontSize: '1.5rem' },
  xl: { size: 96, fontSize: '2rem' },
};

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 'md',
  className = '',
  alt,
}) => {
  const initials = getInitials(name);
  const palette = getPalette(name);
  const dimension = SIZE_STYLES[size] || SIZE_STYLES.md;

  return (
    <div
      role="img"
      aria-label={alt || name}
      className={className}
      style={{
        width: `${dimension.size}px`,
        height: `${dimension.size}px`,
        borderRadius: '9999px',
        backgroundColor: palette.bg,
        color: palette.text,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: dimension.fontSize,
        letterSpacing: '0.04em',
        userSelect: 'none',
        flexShrink: 0,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
        border: '2px solid rgba(255, 255, 255, 0.9)',
      }}
    >
      <span>{initials}</span>
    </div>
  );
};

export default Avatar;
