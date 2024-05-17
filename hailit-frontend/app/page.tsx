"use client";
//next + react
import Link from "next/link";
import { useState } from "react";


//ui components + icons
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { FcGoogle } from "react-icons/fc";
import { FaChevronDown } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

import {
  RiTimerFlashFill,
  RiTimer2Fill,
  RiCalendarScheduleFill,
} from "react-icons/ri";

//main components
import OrderSummaryLessDetail from "@/components/order-components/order-summary-less-detail";


import Image from "next/image";

type UserRole = "vendor" | "admin" | "client" | "dispatcher";
export type Deliveries = boolean;

export default function Home() {
  const [currentDeliveries, setCurrentDeliveries] = useState<Deliveries>(true);

  const handleSelectedDeliveries = (status: boolean) => {
    setCurrentDeliveries(status);
  };
  const userRole: UserRole = "admin";
  return (
    <main className="flex flex-col items-center gap-3 justify-center bg-slate-50 dark:bg-[#121212] relative mb-20 ">
      
      
          {/* Location */}

          <div className=" flex flex-col items-center justify-center w-5/6 h-24 md:h-44 bg-gradient-to-r from-blue-700 to-blue-500 mt-10 rounded-lg text-white gap-1">
            <p className="text-[14px] w-44 h-7 text-center">
              Track your package
            </p>
            <div>

            <div className="w-full font-bold rounded-xl flex items-center justify-end gap-2">
                <Input className="flex gap-2 items-center relative h-9 w-60 md:w-96 md:h-12 justify-center rounded-full  text-[12px]" placeholder="Trip ID"/>
                <Button  className="absolute border-none mr-1 p-1 h-7 w-16 md:w-28 md:h-10  text-white rounded-full text-[13px]">Track</Button>                  
              
                
              
            </div>
            </div>
          </div>

          {/* Send a package */}

          <div className="mt-5 flex flex-col w-5/6 rounded-2xl gap-2">
            <h2 className="font-bold text-xl"> Send a Package</h2>
            <div className="flex  w-full items-center justify-center gap-2 md:items-start">
              <Link href="/order/new" className="w-full">
                <Container className="flex justify-start md:justify-center items-center gap-3  h-32  md:h-44  rounded-xl  cursor-pointer">
                  <Image
                    src="https://i.ibb.co/0rQk9tY/parcel-Image.png"
                    width={90}
                    height={90}
                    alt="parcel image"
                  />
                  <span className="flex flex-col justify-center">
                    <p className="font-bold md:text-lg">Send a Package</p>
                    <p className="text-sm md:text-md">Secure, Fast, and Express</p>
                  </span>
                </Container>
              </Link>
                <Container className="hidden md:flex justify-start md:justify-center items-center gap-3  h-32 md:w-full md:h-60  rounded-xl  cursor-pointer">
                  <Image
                    src="https://i.ibb.co/fX5THSz/pexels-kindelmedia-6994275-1.jpg"
                    
                    
                    width={100}
                    height={100}
                    objectFit='contain'
                    alt="parcel image"
                    className=""
                  />
                  
                </Container>
            </div>
          </div>
          <div className="flex items-center justify-center  w-5/6 gap-2">
            <div className="flex flex-col justify-center items-start gap-2 w-1/3 ">
              <Container className="flex flex-col items-center justify-center w-full h-[110px]  rounded-lg p-3">
                <RiTimerFlashFill className="text-3xl mb-2 text-blue-600" />
                <p className="font-bold text-[12px] md:text-sm">Today</p>
                <p className="text-[12px] md:text-lg">
                  from <b>GHS 30</b>
                </p>
              </Container>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-1/3 ">
              <Container className="flex flex-col items-center justify-center w-full h-[110px]  rounded-lg p-3">
                <RiTimer2Fill className="text-3xl mb-2 text-blue-600" />
                <p className="font-bold text-[12px] md:text-sm">Morrow</p>
                <p className="text-[12px] md:text-lg">
                  from <strong>GHS 20</strong>
                </p>
              </Container>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-1/3">
              <Container className="flex flex-col items-center justify-center w-full h-[110px]  rounded-lg p-3">
                <RiCalendarScheduleFill className="text-3xl mb-2 text-blue-600" />
                <p className="font-bold text-[12px] md:text-sm">Schedule</p>
                <p className="text-[12px] md:text-lg">
                  from <strong>GHS 20</strong>
                </p>
              </Container>
            </div>
          </div >
          {/* Our Services */}
          <div className="w-5/6">
            <div className="w-full">

            </div>
          </div>
          {/* Previous Orders  */}
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
              </>
            )}
          </div>      
    </main>
  );
}
