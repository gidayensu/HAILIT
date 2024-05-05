import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AccountAccess } from "@/components/common/account-access";
import { FcGoogle } from "react-icons/fc";
import { FaChevronDown } from "react-icons/fa6";
import OrderSummaryLessDetail from "@/components/order-components/order-summary-less-detail";
import { RiTimerFlashFill, RiTimer2Fill, RiCalendarScheduleFill } from "react-icons/ri";
import TopContent from "@/components/common/top-content";
import MidContent from "@/components/common/mid-content";

import Image from "next/image";

type UserRole = 'vendor' | 'admin' | 'client' | 'dispatcher'
export default function Home() {
  const userRole:UserRole = 'vendor';
  return (
    <main className="flex flex-col items-center gap-3 justify-center bg-slate-50 dark:bg-[#121212] relative mb-20 ">
      {
        userRole==='vendor' && 
        <>
        
        
          <div className=" flex flex-col items-center justify-center w-5/6 h-24 bg-gradient-to-r from-blue-700 to-blue-500 mt-10 rounded-lg text-white gap-1">
            <p className="flex items-center justify-center text-[14px] w-44 h-7 text-center">Pickup Location</p>
            <div className="w-full font-bold rounded-xl flex items-center justify-center gap-2">
              
                <Link href={'/map'}><div className="flex gap-2 items-center relative h-7 w-44 justify-center rounded-full border text-sm">
                <p>Kejetia Station</p>
                <FaChevronDown className="text-[12px]"/>
                </div>
                </Link>
                
            </div>
          </div>
          
          
          <div className="mt-5 flex flex-col w-full items-center justify-center  rounded-2xl gap-2">
            
  
              
            <Link href="/order/new">
            <div className="flex justify-start items-center gap-3 border border-slate-300 w-[320px] h-32  rounded-xl bg-white hover:bg-[#baffed] dark:border-slate-100 dark:border-opacity-20 dark:bg-[rgb(30,30,30)] dark:hover:border-[#baffed] dark:text-slate-100  cursor-pointer">
                    <Image
                      src='https://i.ibb.co/0rQk9tY/parcel-Image.png'
                      width={90}
                      height={90}
                      alt="parcel image"
                      />    
                    <span className="flex flex-col justify-center">
                      

                      
                        <p className="font-bold">
                            Send a Package
                        </p>
                        <p className="text-sm">
                            Secure, Fast, and Express
                        </p>
                    </span>
                    
               </div>
               </Link>
          </div>
          <div className="flex items-center justify-center gap-1 w-full">
              <div className="flex flex-col justify-center items-center gap-2 bg-white  dark:bg-[#1e1e1e]">
              <div className="flex flex-col items-center justify-center w-[102px] h-[90px] border  dark:border-slate-50 rounded-lg p-3 dark:border-opacity-20">
                <RiTimerFlashFill className="text-xl mb-2  text-blue-600"/>
                <p className="font-bold text-[9px] ">Deliver Today</p>
                <p className="text-[12px]">from <strong>GHS 30</strong></p>
                </div>
                
              </div>
              <div className="flex flex-col justify-center items-center gap-2 bg-white dark:bg-[#1e1e1e]">
              <div className="flex flex-col items-center justify-center w-[102px] h-[90px] border dark:border-slate-50 dark:border-opacity-20 rounded-lg p-3">
                <RiTimer2Fill className="text-xl mb-2 text-blue-600"/>
                <p className="font-bold text-[9px]">Deliver Morro</p>
                <p className="text-[12px]">from <strong>GHS 20</strong></p>
                </div>
                
              </div>
              <div className="flex flex-col justify-center items-center gap-2 bg-white dark:bg-[#1e1e1e]">
              <div className="flex flex-col items-center justify-center w-[102px] h-[90px] border dark:border-slate-50  dark:border-opacity-20 rounded-lg p-3">
                <RiCalendarScheduleFill className="text-xl mb-2 text-blue-600"/>
                <p className="font-bold text-[9px]">Schedule</p>
                <p className="text-[12px]">from <strong>GHS 20</strong></p>
                </div>
                
              </div>
              
            </div>
          
          <div className="flex flex-col w-full p-5 rounded-2xl gap-2">
            <p className="font-bold text-xl"> TODAY</p>
          <OrderSummaryLessDetail deliveryStatus="Booked"/>
            <OrderSummaryLessDetail deliveryStatus="Picked up"/>
            <p className="font-bold mt-4 text-xl "> THIS WEEK</p>
            <OrderSummaryLessDetail deliveryStatus="Delivering"/>
            <p className="font-bold mt-4 text-xl"> LONG TIME AGO</p>
            <OrderSummaryLessDetail deliveryStatus="Delivered"/>
            <OrderSummaryLessDetail deliveryStatus="Cancelled"/>
          </div>
          
        </>
      }

      {userRole!== 'vendor' &&
      <>
      <div className="flex flex-col items-center justify-center gap-2" >
        <span className="text-7xl font-bold">Hello!</span>
        <p className="text-3xl">Welcome to HailIt</p>
        <p className="text-center mt-8">
          Request for affordable <br/> but fast deliveries in Accra
        </p>
      </div>
      <div>
        
      </div>
      <div className="mt-16 flex flex-col gap-5">
      <Button variant='outline' className="border border-slate-300 h-14 w-60 flex gap-4"> <FcGoogle className="text-2xl"/> Continue with Google</Button>
      <Link href="/order"><Button variant='outline' className="border border-slate-300 h-14 w-60 flex gap-4">  Continue as Guest</Button></Link>
      
      

      <AccountAccess/>
      </div>
      </>}
      </main>
  );
}
