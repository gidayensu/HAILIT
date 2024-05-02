"use client"

import { useState } from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"


type Theme = string;

export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('system');
  const { setTheme } = useTheme();
  const theme = ()=> {
      if (currentTheme === 'system' || currentTheme === 'dark') {
        setTheme("light")
        setCurrentTheme("light")
      }

      if(currentTheme === 'light') {
        setTheme("dark")
        setCurrentTheme("dark")
      }
       
  }

  return (

       
        <Button size="icon" variant='outline' onClick={theme} className="border-none absolute bg-none">
          <SunIcon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        

  )
}
