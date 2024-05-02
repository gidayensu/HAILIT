"use client";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import OrderSummaryCard from "@/components/order-components/order-summary-card";
import TopContent from "@/components/common/top-content";
import MidContent from "@/components/common/mid-content";


type Deliveries = boolean;

export default function Profile() {
    const [currentDeliveries, setCurrentDeliveries] = useState<Deliveries>(true);

    const handleSelectedDeliveries = (status: boolean)=> {
        setCurrentDeliveries(status)
    }

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
              <p className="text-sm">jamila@arthur@gmail.com</p>
              <p className="text-sm">0546879845</p>
            </div>
            <Link href="/profile/edit-profile">
              {" "}
              <Button variant='outline' className="text-slate-800 mt-4">
                {" "}
                Edit Profile
              </Button>
            </Link>
          </div>
          </div>
        </TopContent>

        <MidContent className="flex flex-col justify-center items-center gap-6 bg-white w-full -mt-20 rounded-tr-[50px] p-5 text-sm">
          <div className="flex justify-between items-center w-full h-16 bg-[#e6eaec] dark:bg-[#121212] rounded-2xl p-2 gap-3">
            <span className={`flex items-center justify-center ${currentDeliveries ? 'bg-white dark:bg-[#292929]' : 'bg-[#f4f7fd8a] dark:bg-[#141414] dark:opacity-50'}  text-slate-800 dark:text-slate-100 w-1/2 h-10 text-center rounded-xl`}
            onClick={()=>handleSelectedDeliveries(true)}
            >
              Current Deliveries
            </span>
            <span className={`flex items-center justify-center ${currentDeliveries ?  'bg-[#f4f7fd8a] dark:bg-[#141414] dark:opacity-50' : 'bg-white dark:bg-[#292929]'}  text-slate-800 dark:text-slate-100 w-1/2 h-10 text-center rounded-xl`}
            onClick={()=>handleSelectedDeliveries(false)}>
              Previous Deliveries
            </span>
          </div>
            {currentDeliveries && 
            <div className="flex flex-col w-full gap-4">
            <OrderSummaryCard/>       
            <OrderSummaryCard/>       
            <OrderSummaryCard/>       
            </div>}

            {!currentDeliveries && 
            <div className="flex flex-col w-full gap-4">
            <OrderSummaryCard/>       
                  
            </div>}
            
          
        
            </MidContent>
      </main>
    </>
  );
}
