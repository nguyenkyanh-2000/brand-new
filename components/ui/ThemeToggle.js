"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { useState, useEffect } from "react";

function ThemeToggle({ size }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        {theme === "light" ? (
          <Moon
            size={size}
            className="hover:cursor-pointer"
            onClick={() => setTheme("dark")}
          />
        ) : (
          <Sun
            size={size}
            className="hover:cursor-pointer"
            onClick={() => setTheme("light")}
          />
        )}
      </>
    )
  );
}

export default ThemeToggle;
