"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";

import { LuHome, LuUser, LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/button"



export function BottomBar() {
  const path = usePathname();
  console.log('path:', path)
  console.log('path order', path==='/order')
  
  return (
    <div className="fixed bottom-0 left-0 right-0 top-auto z-50 flex justify-center items-center p-4 h-20 border-t-2 border-t-slate-500 dark:border-t-2 dark:border-t-slate-400 gap-10 w-full bg-white dark:bg-[#121212] ">
    
        <Link href='/'>
        <div className="flex flex-col justify-center items-center">
        <Button variant={path === '/' ? 'default' : 'secondary'}  className="border-none">
          <LuHome className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
          <LuHome className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />
        </Button>
        <p className="text-sm font-bold">
          Home
        </p>
        </div>
        </Link>

        <Link href='/order'>
        <div className="flex flex-col justify-center items-center">
        <Button variant={path.startsWith('/order') ? 'default' : 'secondary'}   className= "border-none">
          <LuPlus className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LuPlus className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <p className="text-sm font-bold">
          New Delivery
        </p>
        </div>
        </Link>

       <Link href='/profile'> <div className="flex flex-col justify-center items-center">
        <Button variant={path.startsWith('/profile') ? 'default' : 'secondary'}   className="border-none">
          <LuUser className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LuUser className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <p className="text-sm font-bold">
          Profile
        </p>
        </div>
        </Link>
        
    </div>
  )
}
