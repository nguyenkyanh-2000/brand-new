"use client";

import { useThemeSwitcher } from "@/hooks/useThemeSwitcher";

function Page() {
  const [theme, setTheme] = useThemeSwitcher();

  return (
    <div className="h-96 bg-white dark:bg-black">
      <div>Current theme: {theme}</div>
      <button className="text-red-600" onClick={() => setTheme("light")}>
        Light theme
      </button>
      <button onClick={() => setTheme("dark")}>Dark theme</button>
    </div>
  );
}

export default Page;
