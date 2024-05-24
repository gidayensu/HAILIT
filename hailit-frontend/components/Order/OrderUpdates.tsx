//ui + icons
import { Separator } from "../ui/separator";
import { FiCheck } from "react-icons/fi";
import Container from "../ui/container";

export default function OrderUpdates() {
  return (
    <Container className="w-full rounded-xl h-24 flex justify-center items-center  ">
      <div className="flex justify-center items-center ml-6">
        <OrderUpdateItem statusText="New Order"/>
        <OrderUpdateItem statusText="Picked Up"/>
        <OrderUpdateItem statusText="Delivering"/>
        <OrderUpdateItem statusText="Delivered"/>
      </div>
    </Container>
  );
}

function OrderUpdateItem ({statusText}:{statusText:string}) {
  return (
    <div className="flex flex-col gap-2 w-full items-start ">
          <div className="flex gap-2 items-center justify-start w-[82px]">
            <div className="bg-green-600 dark:bg-slate-50 h-10 w-10 rounded-full flex items-center justify-center">
              <FiCheck className="text-[20px] text-slate-50 dark:text-[#1e1e1e]" />
            </div>
            {statusText !== "Delivered" &&
            <Separator className="w-1/3 bg-slate-800 dark:bg-slate-50" />}
          </div>

          <p className="-ml-1 text-[13px]">{statusText}</p>
        </div>
  )
}