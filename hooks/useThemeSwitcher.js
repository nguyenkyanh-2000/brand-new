import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const useThemeSwitcher = () => {
  const [mode, setMode] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMode(theme);
  }, [theme]);

  return [mode, setTheme];
};
