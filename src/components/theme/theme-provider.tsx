
"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark" | "system";
const DEFAULT_FONT_SIZE = 16; // Corresponds to Tailwind's `text-base` typically

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  appliedTheme: "light" | "dark"; // The actual theme being applied (resolves 'system')
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  fontSize: DEFAULT_FONT_SIZE,
  setFontSize: () => null,
  appliedTheme: "light", // Default to light before hydration
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultFontSize = DEFAULT_FONT_SIZE,
  storageKeyTheme = "retaliate-crm-theme",
  storageKeyFontSize = "retaliate-crm-font-size",
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultFontSize?: number;
  storageKeyTheme?: string;
  storageKeyFontSize?: string;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return defaultTheme;
    }
    return (localStorage.getItem(storageKeyTheme) as Theme) || defaultTheme;
  });

  const [fontSize, setFontSizeState] = useState<number>(() => {
    if (typeof window === "undefined") {
      return defaultFontSize;
    }
    const storedSize = localStorage.getItem(storageKeyFontSize);
    return storedSize ? parseInt(storedSize, 10) : defaultFontSize;
  });

  const [appliedTheme, setAppliedTheme] = useState<"light" | "dark">("light");

  const applyTheme = useCallback((currentTheme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let newAppliedTheme: "light" | "dark";

    if (currentTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      newAppliedTheme = systemTheme;
    } else {
      root.classList.add(currentTheme);
      newAppliedTheme = currentTheme;
    }
    setAppliedTheme(newAppliedTheme);
  }, []);


  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    // Setting font size on <html> makes 'rem' units scale accordingly
    root.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const setTheme = (newTheme: Theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKeyTheme, newTheme);
    }
    setThemeState(newTheme);
  };

  const setFontSize = (newSize: number) => {
    const clampedSize = Math.max(10, Math.min(24, newSize)); // Clamp between 10px and 24px
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKeyFontSize, clampedSize.toString());
    }
    setFontSizeState(clampedSize);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, applyTheme]);
  
  // Effect to set initial applied theme correctly after hydration
  useEffect(() => {
    if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        setAppliedTheme(systemTheme);
    } else {
        setAppliedTheme(theme);
    }
  }, [theme]);


  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, fontSize, setFontSize, appliedTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

