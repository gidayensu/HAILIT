'use client'
import { useState, useEffect } from "react"
import { ThemeToggle } from "../Theme/ThemeToggle"
import { useTheme } from "next-themes";
import LoginSignUp from "./LoginSignUp";

export type CurrentTheme = string | undefined;
export default function Authentication () {
    
    return (
        <>

          <div className="flex flex-col items-center justify-center gap-2 mt-10">
          <div className="flex justify-between items-center p-2 font-bold group hover:bg-blue-500 hover:text-white rounded-md cursor-pointer mt-5 mb-5 md:hidden border border-black dark:border-white">
            <span className="flex items-center justify-center gap-2 relative">
              <ThemeToggle />
              
            </span>
          </div>
            <span className="text-7xl font-bold">Hello!</span>
            <p className="text-3xl">Welcome to HailIt</p>
            <p className="text-center mt-8">
              Login or Sign Up to Request for affordable <br /> and fast deliveries in Accra and Kumasi
            </p>
          </div>
          <div className="">

            <LoginSignUp />
          </div>
          
        </>
    )
}