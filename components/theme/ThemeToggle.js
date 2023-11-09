"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { useState, useEffect } from "react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        {theme === "light" ? (
          <Moon onClick={() => setTheme("dark")} />
        ) : (
          <Sun onClick={() => setTheme("light")} />
        )}
      </>
    )
  );
}

export default ThemeToggle;
