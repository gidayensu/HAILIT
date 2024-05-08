"use client";

//next and react
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState, useEffect } from "react";

//ui + icons

import { FiChevronRight } from "react-icons/fi";
import { AiFillSecurityScan, AiOutlineSecurityScan } from "react-icons/ai";
import {
  MdFeedback,
  MdOutlineFeedback,
  MdOutlineDarkMode,
  MdDarkMode,
  MdLightMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { IoIosHelpCircle, IoIosHelpCircleOutline } from "react-icons/io";
import {
  IoDocumentText,
  IoDocumentTextOutline,
  IoLogOut,
  IoLogOutOutline,
  IoShareSocialOutline,
  IoShareSocial,
} from "react-icons/io5";
import { PiUserCircle, PiUserCircleFill } from "react-icons/pi";

//main components
import TopContent from "@/components/common/top-content";
import MidContent from "@/components/common/mid-content";
import { ThemeToggle } from "@/components/theme-toggle";

type CurrentTheme = string | undefined
export default function Profile() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<CurrentTheme>('system'); // Default theme

  useEffect(() => {
    
    const preferredTheme:CurrentTheme = localStorage.getItem('theme') || systemTheme || theme;
    setCurrentTheme(preferredTheme);
  }, [theme]);

  const handleThemeChange = () => {
    
    setCurrentTheme(theme === 'dark' ? 'light' :  'dark');
    setTheme(theme === 'dark' ? 'light' :  'dark');
  };
  const iconsAndTextMainContainerClass = "flex flex-col gap-2"
  const iconsAndTextDivClass = "flex justify-between items-center p-2 font-bold group hover:bg-blue-500 hover:text-white rounded-md";
  const iconsAndTextSpanClass = "flex items-center justify-center gap-2 relative";
  const iconOutlineClass = "text-2xl group-hover:opacity-0";
  const iconFillClass = "text-2xl opacity-0 absolute top-0 left-0  group-hover:opacity-100";
  const iconTextClass = "text-sm";

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
        <TopContent className="justify-center items-center">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-center">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 w-16 h-16 rounded-full"></span>
              <p className="absolute z-10 font-bold ">JA</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col items-center gap-1 text-white">
                <h2 className="text-2xl font-semibold">Jamila Arthur</h2>
                <p className = {iconTextClass}>jamila@arthur@gmail.com</p>
                <p className = {iconTextClass}>0546879845</p>
              </div>
            </div>
          </div>
        </TopContent>

        <MidContent className="flex flex-col gap-3 bg-white w-full -mt-20 rounded-tr-[50px] p-5">
          <h2 className="font-bold text-md"> Account</h2>

          <div className = {iconsAndTextMainContainerClass}>
            <div className={iconsAndTextDivClass}>
              <span className={iconsAndTextSpanClass}>
                <PiUserCircle className={iconOutlineClass} />
                <PiUserCircleFill className={iconFillClass} />
                <p className = {iconTextClass}>Edit profile</p>
              </span>
              <FiChevronRight  />
            </div>

            <div className={iconsAndTextDivClass}>
              <span className={iconsAndTextSpanClass}>
                <AiOutlineSecurityScan className={iconOutlineClass} />
                <AiFillSecurityScan className={iconFillClass} />
                <p className = {iconTextClass}> Security and login </p>
              </span>
              <FiChevronRight />
            </div>
            
            
            <div className={iconsAndTextDivClass} onClick={handleThemeChange}>
              <span className={iconsAndTextSpanClass}>
                <ThemeToggle/>
                <p className = {iconTextClass}> Change theme </p>
              </span>
              <FiChevronRight />
            </div>

            

            <div className={iconsAndTextDivClass}>
              <span className={iconsAndTextSpanClass}>
                <IoLogOutOutline className={iconOutlineClass} />
                <IoLogOut className={iconFillClass} />
                <p className = {iconTextClass}> Sign out </p>
              </span>
              <FiChevronRight />
            </div>
          </div>
          <h2 className="font-bold text-md mt-2"> General</h2>
          <div className = {iconsAndTextMainContainerClass}>
          <div className={iconsAndTextDivClass}>
              <span className={iconsAndTextSpanClass}>
                <IoDocumentTextOutline className={iconOutlineClass} />
                <IoDocumentText className={iconFillClass} />
                <p className = {iconTextClass}> Privacy policy </p>
              </span>
              <FiChevronRight />
            </div>
            <div className={iconsAndTextDivClass}>
              <span className={iconsAndTextSpanClass}>
                <MdOutlineFeedback className={iconOutlineClass} />
                <MdFeedback className={iconFillClass} />
                <p className = {iconTextClass}> Send feedback </p>
              </span>
              <FiChevronRight />
            </div>
            <div className={iconsAndTextDivClass}>
              <span className={iconsAndTextSpanClass}>
                <IoIosHelpCircleOutline className={iconOutlineClass} />
                <IoIosHelpCircle className={iconFillClass} />
                <p className = {iconTextClass}> Help Center </p>
              </span>
              <FiChevronRight />
            </div>
            <div className={iconsAndTextDivClass}>
              <span className={iconsAndTextSpanClass}>
                <IoShareSocialOutline className={iconOutlineClass} />
                <IoShareSocial className={iconFillClass} />
                <p className = {iconTextClass}> Share Hailit </p>
              </span>
              <FiChevronRight />
            </div>
          </div>
        </MidContent>
      </main>
    </>
  );
}
