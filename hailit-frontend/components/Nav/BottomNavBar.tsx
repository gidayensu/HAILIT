"use client";
// next
import { usePathname } from "next/navigation";
import Link from "next/link";


//ui + icons
import { LuHome, LuUser, LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/button";

export const lightThemeClass =
  "h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0";
export const darkThemeClass =
  "absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100";
export const textClass = "text-[12px] ";
export const divClass = "flex flex-col justify-center items-center ";

export function BottomNavBar() {
  const path = usePathname();

  

  return (!path.startsWith('/dashboard') && !path.startsWith('/dispatcher') && (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 top-auto z-50 flex justify-center items-center p-4 h-20 shadow-2xl gap-10 w-full bg-white dark:bg-[#1e1e1e] font-medium">
      <Link href="/">
        <div className={divClass}>
          <Button
            variant={path === "/" ? "default" : "secondary"}
            className="border-none "
          >
            <LuHome className={lightThemeClass} />
            <LuHome className={darkThemeClass} />
          </Button>
          <p
            className={`${textClass} ${
              path === "/" ? "text-blue-700 dark:text-white" : ""
            }`}
          >
            Home
          </p>
        </div>
      </Link>

      <Link href="/order/">
        <div className={divClass}>
          <Button
            variant={path.startsWith("/order") ? "default" : "secondary"}
            className="border-none"
          >
            <LuPlus className={lightThemeClass} />
            <LuPlus className={darkThemeClass} />
          </Button>
          <p
            className={`${textClass} ${
              path.startsWith("/order") ? "text-blue-700 dark:text-white" : ""
            }`}
          >
            New Delivery
          </p>
        </div>
      </Link>

      <Link href="/profile">
        {" "}
        <div className={divClass}>
          <Button
            variant={path.startsWith("/profile") ? "default" : "secondary"}
            className="border-none"
          >
            <LuUser className={lightThemeClass} />
            <LuUser className={darkThemeClass} />
          </Button>
          <p
            className={`${textClass} ${
              path.startsWith("/profile") ? "text-blue-700 dark:text-white" : ""
            }`}
          >
            Profile
          </p>
        </div>
      </Link>
    </nav>
)  );
}
