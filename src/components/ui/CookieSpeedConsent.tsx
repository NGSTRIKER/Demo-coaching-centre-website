"use client";

import React, { useEffect, useState } from "react";
import { getCookie, setCookie, COOKIE_KEYS } from "@/lib/cookies";

export function CookieSpeedConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already enabled high-speed caching cookies
    const speedPref = getCookie(COOKIE_KEYS.SPEED_CACHE);
    if (!speedPref) {
      // Small timeout so initial page render isn't blocked
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookie(COOKIE_KEYS.SPEED_CACHE, "accelerated", 365);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setCookie(COOKIE_KEYS.SPEED_CACHE, "standard", 30);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      className="cookie-speed-banner"
      role="complementary"
      aria-label="High-Speed Cache Preferences"
    >
      <div className="cookie-speed-inner">
        <div className="cookie-speed-text">
          <div className="cookie-speed-title">
            <span className="speed-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </span>
            <span>High-Speed Cookie Caching</span>
            <span className="cookie-speed-badge">Fast Mode</span>
          </div>
          <p className="cookie-speed-desc">
            We store lightweight session cookies (<code>alive_theme</code>, <code>alive_contrast</code>, <code>alive_speed_cache</code>) directly in your browser to deliver sub-second page transitions, remember test progress, and maintain high-contrast accessibility.
          </p>
        </div>

        <div className="cookie-speed-actions">
          <button
            type="button"
            onClick={handleAccept}
            className="btn-speed-accept"
          >
            Accept Fast Caching
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="btn-speed-dismiss"
          >
            Dismiss
          </button>
        </div>
      </div>
    </aside>
  );
}

export default CookieSpeedConsent;
