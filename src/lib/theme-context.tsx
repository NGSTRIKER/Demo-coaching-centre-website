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
      // 1. Theme is permanently light
      setThemeState("light");
      document.documentElement.setAttribute("data-theme", "light");

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

  const setTheme = (_newTheme: Theme) => {
    setThemeState("light");
    try {
      document.documentElement.setAttribute("data-theme", "light");
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => {
    setTheme("light");
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
