"use client";
//next + react

import { useState } from "react";



//main components
import OrderSummaryMin from "@/components/Order/OrderSummaryMin";
import DashboardTopNav from "@/components/Dashboard/DashboardTopNav";
import TrackPackage from "@/components/Home/TrackPackage";
import SendPackage from "@/components/Home/SendPackage";
import OrderHistory from "@/components/Order/OrderHistory";

type UserRole = "vendor" | "admin" | "client" | "dispatcher";

export type Deliveries = boolean;

export default function Home() {
  const [currentDeliveries, setCurrentDeliveries] = useState<Deliveries>(true);

  const handleSelectedDeliveries = (status: boolean) => {
    setCurrentDeliveries(status);
  };
  const userRole: UserRole = "admin";
  return (
    <>
    <div className="md:hidden">
      <DashboardTopNav/>
    </div>
    <main className="flex flex-col items-center gap-3 justify-center bg-slate-50 dark:bg-[#121212] relative mb-20 ">
      
      
          {/* Location */}
          <div className="md:w-4/6 w-full flex items-center justify-center">

          <TrackPackage/>
          </div>
          {/* Send a package */}
          
          <SendPackage/>
          
          {/* Previous Orders  */}
          <OrderHistory/>   
           </main>
    </>
  );
}
