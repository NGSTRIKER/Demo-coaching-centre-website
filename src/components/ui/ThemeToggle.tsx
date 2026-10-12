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

export function ThemeToggle(_props: ThemeToggleProps) {
  // Dark mode has been completely removed per design requirement
  return null;
}

export default ThemeToggle;
