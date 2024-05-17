"use client";

import { TbCurrentLocation } from "react-icons/tb";
import { MdOutlineLocationOn } from "react-icons/md";
import Container from "@/components/ui/container";

import { Separator } from "@/components/ui/separator";

type DeliveryStatus =
  | "INTERCITY"
  | "SCHEDULED"
  | "NEXT DAY"
  | "SAME DAY"
  | "GHS 40";

export default function OrderSummaryCard({
  deliveryStatus,
}: {
  deliveryStatus: DeliveryStatus;
}) {
  return (
    <>
      {/* <div className="flex flex-col gap-3 bg-gradient-to-tl from-[#9da9ac25] from-1% via-white via-50% to-white border border-slate-300 h-56 rounded-2xl p-4 dark:bg-transparent"> */}
      <Container className="w-full flex flex-col gap-3 h-36 rounded-xl p-4 ">
        <div className="flex justify-between -mt-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold -ml-1">#ASD-593</h3>
            
          </div>

          <span
            className={`flex justify-center items-center text-[11px] font-bold  ${
              deliveryStatus === "INTERCITY"
                ? "  text-blue-500"
                : deliveryStatus === "NEXT DAY"
                ? "  text-sky-500"
                : deliveryStatus === "SAME DAY"
                ? " text-amber-500 "
                : deliveryStatus === "GHS 40"
                ? " text-slate-800  dark:text-slate-50"
                : " text-red-500"
            }  h-6 w-20 rounded-full   `}
          >
            <p>{deliveryStatus}</p>
          </span>
        </div>

        <div className="flex flex-col justify-center h-full">
          <span className="flex items-start  gap-2 -ml-2">
            <TbCurrentLocation className="text-lg" />
            <span className="flex gap-2">
              <span className="space-y-1">
                <p className="text-[13px]">Accra, Teiman</p>
                <p className="text-[13px] opacity-50">0587468974115</p>
              </span>
              <h3 className="opacity-50 text-[12px]">- 12/05/2024 (1:24 PM)</h3>
            </span>
          </span>

          <Separator
            orientation="vertical"
            className="bg-slate-800 h-1/3 dark:bg-slate-100 -mt-4 mb-1"
          />
          <span className="flex items-start gap-2 -ml-[9px]">
            <MdOutlineLocationOn className="text-xl" />
            <span className="flex gap-2">
              <span>
                <p className="font-bold text-[13px]">Amakom, Kumasi</p>
                <p className="text-[13px] opacity-50">024987944645</p>
              </span>
              <h3 className="opacity-50 text-[12px]">- 12/05/2024 (5:54 PM)</h3>
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
