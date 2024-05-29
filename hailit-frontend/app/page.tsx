"use client";
//next + react + redux


import { useAppSelector } from "@/lib/store/hooks";
import { redirect } from "next/navigation";

//main components

import DashboardTopNav from "@/components/Dashboard/DashboardTopNav";
import TrackPackage from "@/components/Home/TrackPackage";
import SendPackage from "@/components/Home/SendPackage";
import OrderHistory from "@/components/Order/OrderHistory";



export type Deliveries = boolean;

export default function Home() {

  const {authenticationState} = useAppSelector(state=>state.auth);
  if(!authenticationState) {
    return redirect('/profile')
  }
  
  return (
    <>
    <div className="md:hidden">
      <DashboardTopNav/>
    </div>
    <main className="flex flex-col items-center gap-3 justify-center bg-slate-50 dark:bg-[#121212] relative mb-20 ">
      
      
          
          <div className="md:w-4/6 w-full flex items-center justify-center">

          <TrackPackage/>
          </div>
          
          
          <SendPackage/>
          
          
          <OrderHistory/>   
           </main>
    </>
  );
}
