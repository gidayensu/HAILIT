import { MdDeliveryDining } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineSchedule } from "react-icons/ai";
import TopContent from "@/components/common/top-content";
import MidContent from "@/components/common/mid-content";
import Link from "next/link";

export default function Order() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 ">
      <TopContent className="">
        <span className="text-5xl text-white font-bold dark:text-slate-100">
          Hello!
        </span>
        <p className="text-3xl">Special Customer</p>
      </TopContent>

      <MidContent className="flex flex-col justify-start items-center min-h-screen">
        <div className="flex gap-6 mt-10">
          <Link href="/order/new">
            <div className="flex flex-col justify-center items-center border border-slate-300  w-40 h-32 mt-10 rounded-xl bg-[#f7e7a1] hover:bg-[#f7e490] dark:bg-transparent dark:border-[#f7e7a1] dark:hover:border-2 dark:hover:border-[#f7e490] dark:text-[#f7e7a1] dark:hover:text-[#f7e490] cursor-pointer">
              <span className="text-4xl">
                <MdDeliveryDining />
              </span>
              <span className="text-center">
                <p className="font-bold ">Same-day</p>
                <p>Within 24 hours</p>
              </span>
            </div>
          </Link>
          <Link href="/order/new">
            <div className="flex flex-col justify-center items-center border border-slate-300 w-40 h-32 mt-10 rounded-xl bg-blue-100 hover:bg-[#c6deff] dark:bg-transparent dark:border-blue-100 dark:hover:border-2 dark:hover:border-[#c6deff] dark:text-blue-100 dark:hover:text-[#c6deff] cursor-pointer">
              <span className="text-4xl">
                <TbTruckDelivery />
              </span>
              <span className="text-center">
                <p className="font-bold">Tomorrow</p>
                <p>Within 48 hours</p>
              </span>
            </div>
          </Link>
        </div>
        <Link href="/order/custom-order">
          <div className="flex flex-col justify-center items-center border border-slate-300 w-[340px] h-32  rounded-xl bg-teal-100 hover:bg-[#baffed] dark:bg-transparent dark:border-teal-100 dark:hover:border-2 dark:hover:border-[#baffed] dark:text-teal-100 dark:hover:text-[#baffed] cursor-pointer">
            <span className="text-4xl">
              <AiOutlineSchedule />
            </span>
            <span className="text-center">
              <p className="font-bold">Custom Order</p>
              <p>Schedule delivery for later</p>
            </span>
          </div>
        </Link>
      </MidContent>
    </main>
  );
}
