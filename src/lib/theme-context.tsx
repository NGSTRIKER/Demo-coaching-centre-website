"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie, COOKIE_KEYS } from "./cookies";

export type Theme = "light" | "dark";
export type Contrast = "standard" | "high";

interface ThemeContextType {
  theme: Theme;
  contrast: Contrast;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  toggleContrast: () => void;
  setContrast: (contrast: Contrast) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  contrast: "standard",
  toggleTheme: () => {},
  setTheme: () => {},
  toggleContrast: () => {},
  setContrast: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [contrast, setContrastState] = useState<Contrast>("standard");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      // 1. Resolve Theme from Cookie first, then localStorage, then system preference
      const cookieTheme = getCookie(COOKIE_KEYS.THEME) as Theme | null;
      const savedTheme = cookieTheme || (localStorage.getItem("alive_theme") as Theme | null);

      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme: Theme = prefersDark ? "dark" : "light";
        setThemeState(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
        setCookie(COOKIE_KEYS.THEME, initialTheme, 365);
      }

      // 2. Resolve Contrast from Cookie or system preference
      const cookieContrast = getCookie(COOKIE_KEYS.CONTRAST) as Contrast | null;
      const savedContrast = cookieContrast || (localStorage.getItem("alive_contrast") as Contrast | null);

      if (savedContrast === "standard" || savedContrast === "high") {
        setContrastState(savedContrast);
        document.documentElement.setAttribute("data-contrast", savedContrast);
      } else {
        const prefersHighContrast = window.matchMedia("(prefers-contrast: more)").matches;
        const initialContrast: Contrast = prefersHighContrast ? "high" : "standard";
        setContrastState(initialContrast);
        document.documentElement.setAttribute("data-contrast", initialContrast);
      }
    } catch {
      // safe fallback in case of strict privacy sandboxes
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      setCookie(COOKIE_KEYS.THEME, newTheme, 365);
      localStorage.setItem("alive_theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  const setContrast = (newContrast: Contrast) => {
    setContrastState(newContrast);
    try {
      setCookie(COOKIE_KEYS.CONTRAST, newContrast, 365);
      localStorage.setItem("alive_contrast", newContrast);
      document.documentElement.setAttribute("data-contrast", newContrast);
    } catch {
      // ignore
    }
  };

  const toggleContrast = () => {
    const nextContrast = contrast === "high" ? "standard" : "high";
    setContrast(nextContrast);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        contrast,
        toggleTheme,
        setTheme,
        toggleContrast,
        setContrast,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
