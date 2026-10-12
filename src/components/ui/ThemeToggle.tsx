"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme-context";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "pill";
  showContrastToggle?: boolean;
}

export function ContrastToggle({ className = "", variant = "icon" }: { className?: string; variant?: "icon" | "pill" }) {
  const { contrast, toggleContrast } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isHighContrast = mounted && contrast === "high";

  return (
    <button
      type="button"
      onClick={toggleContrast}
      className={`theme-toggle-btn contrast-toggle-btn ${isHighContrast ? "is-active-contrast" : ""} ${variant === "pill" ? "theme-toggle-pill" : ""} ${className}`}
      aria-label={isHighContrast ? "Switch to standard contrast" : "Switch to ultra-high contrast (WCAG AAA)"}
      title={isHighContrast ? "Ultra-High Contrast Active (Click for Standard)" : "Enable Ultra-High Contrast Mode"}
    >
      <span className="contrast-badge-text" aria-hidden="true">
        {isHighContrast ? "AAA" : "HC"}
      </span>
      {variant === "pill" && (
        <span className="theme-toggle-label">
          {isHighContrast ? "AAA Contrast" : "Standard"}
        </span>
      )}
    </button>
  );
}

export function ThemeToggle({
  className = "",
  variant = "icon",
  showContrastToggle = true,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <div className={`theme-toggle-cluster ${className}`} role="group" aria-label="Appearance & Contrast Controls">
      <button
        type="button"
        onClick={toggleTheme}
        className={`theme-toggle-btn ${variant === "pill" ? "theme-toggle-pill" : ""}`}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        title={isDark ? "Activate Light Mode" : "Activate Dark Mode"}
      >
        {isDark ? (
          // Sun icon for switching back to light mode
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="theme-toggle-icon"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          // Moon icon for switching to dark mode
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="theme-toggle-icon"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}

        {variant === "pill" && (
          <span className="theme-toggle-label">
            {isDark ? "Light" : "Dark"}
          </span>
        )}
      </button>

      {showContrastToggle && (
        <ContrastToggle variant={variant} />
      )}
    </div>
  );
}

export default ThemeToggle;
