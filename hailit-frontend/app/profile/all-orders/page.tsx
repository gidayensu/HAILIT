'use client'
import OrderSummaryLessDetail from "@/components/order-components/order-summary-less-detail";
import { useState } from "react";
import type { Deliveries } from "@/app/page";
import MidContent from "@/components/common/mid-content";
import TopContent from "@/components/common/top-content";

export default function AllOrders () {
    
  const [currentDeliveries, setCurrentDeliveries] = useState<Deliveries>(true);

  const handleSelectedDeliveries = (status: boolean) => {
    setCurrentDeliveries(status);
  };
  
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopContent className="">
          <span className="text-5xl font-bold ">Your Deliveries</span>
          <p className="text-lg">Current and Previous Deliveries</p>
        </TopContent>

        <MidContent className="flex flex-col justify-center items-center gap-6 bg-white w-full -mt-20 rounded-tr-[50px] p-10 mb-20">
      
        <div className="flex flex-col w-5/6 mt-4 rounded-2xl gap-2">
            <h2 className="font-bold text-xl"> Your Deliveries</h2>
            <div className="flex justify-between items-center w-full h-10 bg-white dark:bg-[#1e1e1e] border border-blue-500   rounded-xl p-2 gap-3 text-[13px] mb-4">
              <span
                className={`flex items-center justify-center ${
                  currentDeliveries
                    ? "bg-blue-500 text-white"
                    : " dark:bg-[#1e1e1e] dark:opacity-50"
                }  text-blue-500 dark:text-slate-100 w-1/2 h-8 -ml-1 text-center rounded-lg`}
                onClick={() => handleSelectedDeliveries(true)}
              >
                Current
              </span>
              <span
                className={`flex items-center justify-center ${
                  currentDeliveries
                    ? " dark:bg-[#1e1e1e] dark:opacity-50"
                    : "text-white bg-blue-500"
                } text-blue-500 dark:text-slate-100 w-1/2 h-8 -mr-1 text-center rounded-lg`}
                onClick={() => handleSelectedDeliveries(false)}
              >
                Previous
              </span>
            </div>

            {currentDeliveries && (
              <>
                <OrderSummaryLessDetail deliveryStatus="Booked" packageType="Gadgets"/>
                <OrderSummaryLessDetail deliveryStatus="Picked up" packageType="Parcel"/>

                <OrderSummaryLessDetail deliveryStatus="Delivering" packageType="Others"/>
              </>
            )}
            {!currentDeliveries && (
              <>
                <OrderSummaryLessDetail deliveryStatus="Delivered" packageType="Food" />
                <OrderSummaryLessDetail deliveryStatus="Cancelled" packageType="Fragile"/>
                <OrderSummaryLessDetail deliveryStatus="Delivered" packageType="Others"/>
                <OrderSummaryLessDetail deliveryStatus="Delivered" packageType="Parcel"/>
              </>
            )}
          </div>
          </MidContent>
          </main>
    )
}