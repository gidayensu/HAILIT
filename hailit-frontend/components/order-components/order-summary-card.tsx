"use client";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { TbCurrentLocation } from "react-icons/tb";
import { MdOutlineLocationOn } from "react-icons/md";


import { Separator } from "@/components/ui/separator";

type DeliveryStatus =  'Delivered' | 'Cancelled' | 'Picked up' | 'Delivering' | 'Booked'

export default function OrderSummaryCard ({deliveryStatus}:{deliveryStatus : DeliveryStatus}) {
  

    return(
    <Link href='/track/s' className="w-full">
        {/* <div className="flex flex-col gap-3 bg-gradient-to-tl from-[#9da9ac25] from-1% via-white via-50% to-white border border-slate-300 h-56 rounded-2xl p-4 dark:bg-transparent"> */}
        <div className="flex flex-col gap-3 bg-white border border-slate-300 dark:border-opacity-20 h-36 rounded-2xl p-6 dark:bg-[#1e1e1e]">
        <div className="flex justify-between">
          <h3 className="font-bold">#ASD-593</h3>
          <span className={`flex justify-center items-center text-[11px] font-bold  ${deliveryStatus === 'Delivered' ? 'bg-green-700  text-green-400' : deliveryStatus === 'Picked up' ? 'bg-sky-700  text-sky-300' : deliveryStatus === 'Delivering'?  'bg-amber-600 text-amber-200 ': deliveryStatus === 'Booked' ? 'bg-slate-600 text-slate-200 dark:bg-white dark:text-[#1e1e1e]': 'bg-red-600 text-red-200'}  h-6 w-20 rounded-full   `}>
            
            <p>{deliveryStatus}</p>
            
          </span>
        </div>

        <div className="flex flex-col items-start h-full gap-1">
          <span className="flex items-center  gap-2 -ml-2">
            <TbCurrentLocation className="text-lg" />
            <p className="text-sm">Adriganor High Street</p>
          </span>

          <Separator
            orientation="vertical"
            className="bg-slate-800 h-1/6 dark:bg-slate-100"
          />
          <span className="flex items-center gap-2 -ml-[9px]">
            <MdOutlineLocationOn className="text-xl" />
            <p className="font-bold text-sm">Ama Saman Station</p>
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
              <strong>Charge</strong>: GHS 50
            </p>
          </div>
        </div> */}
      </div>
      </Link>
    )
}