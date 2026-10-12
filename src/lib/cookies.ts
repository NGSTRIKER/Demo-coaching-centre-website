/**
 * ALIVE Institute — Cookie & Client Cache Utilities
 * High-performance, zero-dependency cookie persistence for instant hydration,
 * theme retention, contrast modes, and session caching.
 */

export function setCookie(name: string, value: string, days = 365): void {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      try {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      } catch {
        return c.substring(nameEQ.length, c.length);
      }
    }
  }
  return null;
}

export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
}

export const COOKIE_KEYS = {
  THEME: 'alive_theme',
  CONTRAST: 'alive_contrast',
  SPEED_CACHE: 'alive_speed_cache',
  AUTH_USER: 'alive_user_session',
} as const;
