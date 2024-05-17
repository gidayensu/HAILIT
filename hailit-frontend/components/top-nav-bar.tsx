"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import type { CurrentTheme } from "@/app/profile/page";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";

export function TopBar() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<CurrentTheme>("system"); // Default theme

  //setting current theme. Not using useEffect result in hydration errors
  useEffect(() => {
    const preferredTheme: CurrentTheme =
      localStorage.getItem("theme") || systemTheme || theme;
    setCurrentTheme(preferredTheme);
  }, [currentTheme]);

  const handleThemeChange = () => {
    setCurrentTheme(theme === "dark" ? "light" : "dark");
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const path = usePathname();

  const iconsAndTextDivClass =
    "flex justify-between items-center p-2 font-bold group hover:bg-blue-500 hover:text-white rounded-md";
  const iconsAndTextSpanClass =
    "flex items-center justify-center gap-2 relative";

  const iconTextClass = "text-sm cursor-pointer ";

  const divClass = "flex flex-col justify-center items-center";

  return (
    <nav className="hidden md:flex  left-0 right-0 top-auto z-50 justify-center items-center p-4 h-20 shadow-2xl gap-10 w-full bg-white dark:bg-[#121212] font-bold">
      <Link href="/">
        <div className={divClass}>
          <Button
            variant={path === "/" ? "default" : "secondary"}
            className="border-none font-bold"
          >
            Home
          </Button>
        </div>
      </Link>

      <Link href="/order/new">
        <div className={divClass}>
          <Button
            variant={path.startsWith("/order") ? "default" : "secondary"}
            className="border-none font-bold"
          >
            New Delivery
          </Button>
        </div>
      </Link>

      <Link href="/profile">
        {" "}
        <div className={divClass}>
          <Button
            variant={path.startsWith("/profile") ? "default" : "secondary"}
            className="border-none font-bold"
          >
            Profile
          </Button>
        </div>
      </Link>
      <div className={iconsAndTextDivClass} onClick={handleThemeChange}>
        <span className={iconsAndTextSpanClass}>
          <ThemeToggle />
          <p className={iconTextClass}>
            {currentTheme === "light" ? "Dark mode" : "Light mode"}
          </p>
        </span>
      </div>
    </nav>
  );
}
