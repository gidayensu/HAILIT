"use client";
//next + react
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";

//ui components + icons
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { FcGoogle } from "react-icons/fc";
import { FaChevronDown } from "react-icons/fa6";

import {
  RiTimerFlashFill,
  RiTimer2Fill,
  RiCalendarScheduleFill,
} from "react-icons/ri";

//main components
import OrderSummaryLessDetail from "@/components/order-components/order-summary-less-detail";
import { AccountAccess } from "@/components/common/account-access";

import Image from "next/image";

type UserRole = "vendor" | "admin" | "client" | "dispatcher";
type Deliveries = boolean;

export default function Home() {
  const [currentDeliveries, setCurrentDeliveries] = useState<Deliveries>(true);

  const handleSelectedDeliveries = (status: boolean) => {
    setCurrentDeliveries(status);
  };
  const userRole: UserRole = "vendor";
  return (
    <main className="flex flex-col items-center gap-3 justify-center bg-slate-50 dark:bg-[#121212] relative mb-20 ">
      {userRole === "vendor" && (
        <>
          {/* Location */}

          <div className=" flex flex-col items-center justify-center w-5/6 h-24 bg-gradient-to-r from-blue-700 to-blue-500 mt-10 rounded-lg text-white gap-1">
            <p className="flex items-center justify-center text-[14px] w-44 h-7 text-center">
              Pickup Location
            </p>
            <div className="w-full font-bold rounded-xl flex items-center justify-center gap-2">
              <Link href={"/map"}>
                <div className="flex gap-2 items-center relative h-7 w-44 justify-center rounded-full border text-sm">
                  <p>Kejetia Station</p>
                  <FaChevronDown className="text-[12px]" />
                </div>
              </Link>
            </div>
          </div>

          {/* Send a package */}

          <div className="mt-5 flex flex-col w-full rounded-2xl gap-2">
            <h2 className="font-bold text-xl ml-8"> Send a Package</h2>
            <div className="flex flex-col w-full items-center justify-center gap-2">
              <Link href="/order/new">
                <Container className="flex justify-start items-center gap-3 w-[320px] h-32  rounded-xl  cursor-pointer">
                  <Image
                    src="https://i.ibb.co/0rQk9tY/parcel-Image.png"
                    width={90}
                    height={90}
                    alt="parcel image"
                  />
                  <span className="flex flex-col justify-center">
                    <p className="font-bold">Send a Package</p>
                    <p className="text-sm">Secure, Fast, and Express</p>
                  </span>
                </Container>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 w-full">
            <div className="flex flex-col justify-center items-center gap-2 ">
              <Container className="flex flex-col items-center justify-center w-[102px] h-[90px]  rounded-lg p-3">
                <RiTimerFlashFill className="text-xl mb-2  text-blue-600" />
                <p className="font-bold text-[9px] ">Deliver Today</p>
                <p className="text-[12px]">
                  from <strong>GHS 30</strong>
                </p>
              </Container>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 ">
              <Container className="flex flex-col items-center justify-center w-[102px] h-[90px]  rounded-lg p-3">
                <RiTimer2Fill className="text-xl mb-2 text-blue-600" />
                <p className="font-bold text-[9px]">Deliver Morro</p>
                <p className="text-[12px]">
                  from <strong>GHS 20</strong>
                </p>
              </Container>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 ">
              <Container className="flex flex-col items-center justify-center w-[102px] h-[90px]  rounded-lg p-3">
                <RiCalendarScheduleFill className="text-xl mb-2 text-blue-600" />
                <p className="font-bold text-[9px]">Schedule</p>
                <p className="text-[12px]">
                  from <strong>GHS 20</strong>
                </p>
              </Container>
            </div>
          </div>
          {/* Previous Orders  */}
          <div className="flex flex-col w-full p-7 rounded-2xl gap-2">
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
                <OrderSummaryLessDetail deliveryStatus="Booked" />
                <OrderSummaryLessDetail deliveryStatus="Picked up" />

                <OrderSummaryLessDetail deliveryStatus="Delivering" />
              </>
            )}
            {!currentDeliveries && (
              <>
                <OrderSummaryLessDetail deliveryStatus="Delivered" />
                <OrderSummaryLessDetail deliveryStatus="Cancelled" />
              </>
            )}
          </div>
        </>
      )}

      {userRole !== "vendor" && (
        <>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-7xl font-bold">Hello!</span>
            <p className="text-3xl">Welcome to HailIt</p>
            <p className="text-center mt-8">
              Request for affordable <br /> but fast deliveries in Accra
            </p>
          </div>
          <div></div>
          <div className="mt-16 flex flex-col gap-5">
            <Button
              variant="outline"
              className="border border-slate-300 h-14 w-60 flex gap-4"
            >
              {" "}
              <FcGoogle className="text-2xl" /> Continue with Google
            </Button>
            <Link href="/order">
              <Button
                variant="outline"
                className="border border-slate-300 h-14 w-60 flex gap-4"
              >
                {" "}
                Continue as Guest
              </Button>
            </Link>

            <AccountAccess />
          </div>
        </>
      )}
    </main>
  );
}
