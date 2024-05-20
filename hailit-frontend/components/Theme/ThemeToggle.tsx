"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import {
  MdDarkMode,
  MdOutlineDarkMode,
  MdLightMode,
  MdOutlineLightMode,
} from "react-icons/md";

export function ThemeToggle() {
  const { setTheme, systemTheme, theme: mainTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<any>(null);
  useEffect(() => {
    const preferredTheme = localStorage.getItem("theme") || systemTheme;
    setCurrentTheme(preferredTheme);
  }, [mainTheme]);
  const iconOutlineClass = "text-2xl group-hover:opacity-0";
  const iconFillClass =
    "text-2xl opacity-0 absolute top-0 left-0  group-hover:opacity-100";

  const userTheme = () => {
    if (currentTheme === "dark") {
      setTheme("light");
    }

    if (currentTheme === "light") {
      setTheme("dark");
    }
  };

  return (
    <span onClick={userTheme}>
      {currentTheme !== "dark" && (
        <>
          <MdOutlineDarkMode className={iconOutlineClass} />
          <MdDarkMode className={iconFillClass} />
        </>
      )}

      {currentTheme === "dark" && (
        <>
          <MdOutlineLightMode className={iconOutlineClass} />
          <MdLightMode className={iconFillClass} />
        </>
      )}
    </span>
  );
}
