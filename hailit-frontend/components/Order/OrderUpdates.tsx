//ui + icons
import { Separator } from "../ui/separator";
import { FiCheck } from "react-icons/fi";
import Container from "../ui/container";

export default function OrderUpdates() {
  return (
    <Container className="w-full rounded-xl h-24 flex justify-center items-center  ">
      <div className="flex justify-center items-center ml-6">

      <div className="flex flex-col gap-2 w-full items-start ">
        <div className="flex gap-2 items-center justify-start w-[82px]   ">
          <div className="bg-green-600 dark:bg-slate-50 h-10 w-10 rounded-full flex items-center justify-center">
            <FiCheck className="text-[20px] text-slate-50 dark:text-[#1e1e1e]" />
          </div>
          <Separator className="w-1/3 bg-slate-800 dark:bg-slate-50" />
        </div>

        <p className="-ml-1 text-[13px]">New Order</p>
      </div>
      <div className="flex flex-col gap-2 w-full items-start ">
        <div className="flex gap-2 items-center justify-start w-[82px] ">
          <div className="bg-green-600 dark:bg-slate-50 h-10 w-10 rounded-full flex items-center justify-center">
            <FiCheck className="text-[20px] text-slate-50 dark:text-[#1e1e1e]" />
          </div>
          <Separator className="w-1/3 bg-slate-800 dark:bg-slate-50" />
        </div>

        <p className="-ml-2 text-[13px]">Picked Up</p>
      </div>
      <div className="flex flex-col gap-2 w-full items-start ">
        <div className="flex gap-2 items-center justify-start w-[82px] ">
          <div className="bg-green-600 dark:bg-slate-50 h-10 w-10 rounded-full flex items-center justify-center">
            <FiCheck className="text-[20px] text-slate-50 dark:text-[#1e1e1e]" />
          </div>
          <Separator className="w-1/3 bg-slate-800 dark:bg-slate-50" />
        </div>

        <p className="-ml-2 text-[13px]">Delivering</p>
      </div>

      <div className="flex flex-col gap-2 w-full items-start ">
        <div className="flex gap-2 items-center justify-start w-[82px] ">
          <div className="bg-green-600 dark:bg-slate-50 h-10 w-10 rounded-full flex items-center justify-center">
            <FiCheck className="text-[20px] text-slate-50 dark:text-[#1e1e1e]" />
          </div>
        </div>

        <p className="-ml-1 text-[13px]">Delivered</p>
      </div>
      </div>
    </Container>
  );
}
