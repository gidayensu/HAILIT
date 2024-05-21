"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import type { CurrentTheme } from "@/app/profile/page";
import { ThemeToggle } from "../Theme/ThemeToggle";
import { Button } from "@/components/ui/button";



export function DispatcherTopNav() {
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
    
    <nav className={`hidden   left-0 right-0 top-auto z-40 ${path.startsWith('/dashboard') ? 'hidden': 'md:flex justify-center'}  items-center p-4 h-20 shadow-md gap-10 w-full bg-white dark:bg-[#121212] font-bold`}>
      {path !== '/dashboard' && (
        <>
      <Link href="/dispatcher">
        <div className={divClass}>
          <Button
            variant={path === "/dispatcher" ? "default" : "secondary"}
            className="border-none font-bold"
          >
            Home
          </Button>
        </div>
      </Link>

      <Link href="/dispatcher/trips">
        <div className={divClass}>
          <Button
            variant={path.startsWith("/order") ? "default" : "secondary"}
            className="border-none font-bold"
          >
            Deliveries
          </Button>
        </div>
      </Link>

      <Link href="/dispatcher/profile">
        
        <div className={divClass}>
          <Button
            variant={path.startsWith("/dispatcher/profile") ? "default" : "secondary"}
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
      </>)
      
}  
{/* {
        path.startsWith('/dashboard') && (
    <>
    <section className="w-full text-2xl ml-10 cursor-pointer" >
        <Link href={'/dashboard'}>
          <p>Hailit</p>
        </Link>
        
      </section>
      <section className="w-full">
      <Input className="flex items-center justify-center border-2  border-black dark:border-white rounded-full  h-12 font-light "  placeholder="Enter Trip ID to search "/>
      

      </section>
      
      <section className="flex gap-2 justify-end items-center w-full ">
          <div className="flex items-center  w-full  justify-end rounded-full h-12 gap-2">
                <div className="flex items-center justify-center border-none bg-black dark:bg-white dark:text-[#1e1e1e] text-white rounded-full  md:h-12 md:w-12 sm:h-8 sm:w-8 -ml-1">
                  <p>J</p>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <p className="font-bold text-md">
                      Jeremy Dokua
                    </p>
                    <p className="font-bold text-[12px] opacity-50">
                      Administrator
                    </p>
                </div>
          </div>
          
          <div className={iconsAndTextDivClass}>
          <span className={iconsAndTextSpanClass}>
          <RiNotification3Line className="text-2xl"/>
          </span>
        </div>
        <div className={iconsAndTextDivClass} onClick={handleThemeChange}>
          <span className={iconsAndTextSpanClass}>
            <ThemeToggle />
          </span>
        </div>
      </section>
    </>              
        )
      } */}
        </nav>
  );
}
