"use client";

import { HiLocationMarker } from "react-icons/hi";
import Container from "@/components/ui/container";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

type DeliveryStatus =
  
  | "DELIVERED"
  | "NEW"
  | "PICKED UP"
  | "DELIVERING"
  | "DELIVERED"
  
type DeliveryType = 
  | "TODAY"
  | "TOMORROW" 
  | "SCHEDULED"

export default function OrderSummary({tripId,
  deliveryStatus, deliveryType, pickupLocation, dropOffLocation, commencementDate, commencementTime, completionDate, completionTime 
}: {
  tripId: string,
  deliveryStatus: DeliveryStatus, 
  deliveryType : DeliveryType,
  pickupLocation: string,
  dropOffLocation: string,
  commencementDate: string,
  commencementTime: string,
  completionDate: string,
  completionTime: string,
}) {

  const path = usePathname();
  return (
    <>
      {/* <div className="flex flex-col gap-3 bg-gradient-to-tl from-[#9da9ac25] from-1% via-white via-50% to-white border border-slate-300 h-56 rounded-2xl p-4 dark:bg-transparent"> */}
      <Container className="w-full flex flex-col gap-2 h-52 rounded-xl p-4 ">
        <div className="flex justify-between items-center -mt-1">
          
          <div className="flex flex-col items-start ">
            {!path.startsWith('/track') &&
            <>
            <p className="text-[12px] text-slate-500">Order ID</p>
            <h3 className="font-bold text-[14px] ">{tripId}</h3>
            </>
            }

          {path.startsWith('/track') &&
            <>
            <p className="text-[12px] text-slate-500">ACCRA</p>
            
            </>
            }

          </div>
        {!path.startsWith('/track') &&
          <div
            className={`flex justify-center items-center text-[12px] font-medium w-20  ${
              deliveryStatus === "NEW"
                ? "  bg-blue-500 text-white"
                : deliveryStatus === "PICKED UP"
                ? "  bg-teal-500 text-white"
                : deliveryStatus === "DELIVERING"
                ? " bg-amber-500 dark:text-[#1e1e1e]"
                : deliveryStatus === "DELIVERED"
                ? " bg-green-500 dark:text-[#1e1e1e]"
                : " bg-red-500 text-white"
            }  h-6 w-24 rounded-md`}
          >
            <p>{deliveryStatus}</p>
          </div>
          
          }
          <div
            className={`flex justify-center items-center text-[12px] font-medium w-20 -ml-12   ${
              deliveryType === "TODAY"
                ? "  text-blue-500"
                : deliveryType === "TOMORROW"
                ? "  text-teal-500 "
                : deliveryType === "SCHEDULED"
                ? "text-amber-600 dark:text-amber-500 "
                : " text-green-500"
            }  h-6 w-24 rounded-md`}
          >
            <p>{deliveryType}</p>
          </div>
          
        </div>
          <Separator className="mb-2 dark:bg-slate-100 dark:opacity-10"/>

        <div className="flex flex-col justify-center h-full">
          <span className="flex items-start  gap-2 -ml-2">
            <HiLocationMarker className="text-lg" />
            <span className="flex gap-2">
              <span className="space-y-1">
                <p className="text-[13px] font-medium">{pickupLocation}</p>
                <p className="text-[13px] opacity-70">{commencementDate} ({commencementTime})</p>
              </span>
              
            </span>
          </span>

          <Separator
            orientation="vertical"
            className="bg-slate-800 h-1/3 dark:bg-slate-100 -mt-4 mb-1"
          />
          <span className="flex items-start gap-2 -ml-[9px]">
            <HiLocationMarker className="text-xl text-green-500" />
            <span className="flex gap-2">
              <span>
                <p className="font-bold text-[13px]">{dropOffLocation}</p>
                <p className="text-[13px] opacity-70">{completionDate} ({completionTime})</p>
              </span>
              
            </span>
          </span>
        </div>
        {/* <Separator  className="bg-slate-800 w-full opacity-65"/> */}

        {/* <div className="flex flex-col w-full  border-2 border-slate-300 text-slate-800 rounded-2xl dark:text-slate-100">
          <div className="flex justify-between items-center gap-1 p-2 h-12">
            <p className="ml-3">
              <strong>Type</strong>: Same day
            </p>

            <Separator orientation="vertical" className="bg-slate-800 h-full" />
            <p className="mr-3">
              <strong>Charge</strong>: INTERCITY
            </p>
          </div>
        </div> */}
      </Container>
    </>
  );
}
