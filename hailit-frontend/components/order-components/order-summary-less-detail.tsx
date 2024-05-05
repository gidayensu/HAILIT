"use client";
import Link from "next/link";
import { MdOutlineLocationOn } from "react-icons/md";

type DeliveryStatus =
  | "Delivered"
  | "Cancelled"
  | "Picked up"
  | "Delivering"
  | "Booked";

export default function OrderSummaryLessDetail({
  deliveryStatus,
}: {
  deliveryStatus: DeliveryStatus;
}) {
  return (
    <Link href="/track/s" className="w-full">
      {/* <div className="flex flex-col gap-3 bg-gradient-to-tl from-[#9da9ac25] from-1% via-white via-50% to-white border border-slate-300 h-56 rounded-2xl p-4 dark:bg-transparent"> */}
      <div className="flex flex-col gap-1 bg-white border border-slate-300 dark:border-opacity-20 h-16 rounded-xl p-2 dark:bg-[#1e1e1e]">
        <div className="flex justify-between items-center">
          <span>
          <h3 className="ml-2 font-bold text-s">Bag of rice</h3>
          <p className="ml-2 text-[12px]">Ama Saman Station</p>
          </span>
          <span
            className={`mr-2 flex justify-center items-center text-[12px] font-bold text-left  ${
              deliveryStatus === "Delivered"
                ? "  text-green-500"
                : deliveryStatus === "Picked up"
                ? "  text-sky-600"
                : deliveryStatus === "Delivering"
                ? " text-amber-500 "
                : deliveryStatus === "Booked"
                ? " text-slate-600 dark:text-slate-50"
                : " text-red-500"
            }  h-5 w-20 rounded-md    `}
          >
            <p>{deliveryStatus}</p>
          </span>
        </div>

        
      </div>
    </Link>
  );
}
