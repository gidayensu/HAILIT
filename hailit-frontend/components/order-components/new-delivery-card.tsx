"use client";
import Link from "next/link";
import { MdOutlineLocationOn } from "react-icons/md";

type DeliveryType = "Same Day" | "Next Day" | "Custom";
export default function NewDeliveryCard({
  deliveryType,
}: {
  deliveryType: DeliveryType;
}) {
  return (
    <Link href="/track/s" className="w-full">
      {/* <div className="flex flex-col gap-3 bg-gradient-to-tl from-[#9da9ac25] from-1% via-white via-50% to-white border border-slate-300 h-56 rounded-2xl p-4 dark:bg-transparent"> */}
      <div
        className={`flex flex-col gap-2 ${
          deliveryType === "Same Day"
            ? "bg-green-700  text-green-400"
            : deliveryType === "Next Day"
            ? "bg-sky-700  text-sky-300"
            : deliveryType === "Custom"
            ? "bg-amber-600 text-amber-200 "
            : "bg-red-600 text-red-200"
        } border border-slate-300 dark:border-opacity-20 h-12 rounded-lg p-3 `}
      >
        <div className="flex justify-between">
          <h3 className="font-bold">{deliveryType}</h3>
          <span
            className={`flex justify-center items-center text-[11px] font-bold h-6 w-20 rounded-full   `}
          ></span>
        </div>
      </div>
    </Link>
  );
}
