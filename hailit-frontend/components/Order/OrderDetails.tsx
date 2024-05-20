import { Separator } from "@/components/ui/separator";

export default function OrderDetails() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold">Trip Details</h3>
      <div className=" flex flex-col items-center justify-center w-[330px] rounded-xl border-2 border-slate-300 h-auto dark:border-none dark:bg-[#2c2c29] p-4 gap-2">
        <div
          className={`grid grid-cols-10 w-[300px] text-sm items-center justify-center ${
            status === "delivered"
              ? "bg-green-800"
              : status === "failed"
              ? "bg-red-800"
              : "bg-slate-800"
          } h-12 text-slate-50 rounded-xl`}
        >
          <p className="ml-2 font-bold col-span-3 ">Status </p>
          <span className="flex justify-center items-center col-span-4 ">
            <Separator className="bg-slate-50 w-16 col-span-4 " />
          </span>
          <p className="col-span-3">{status}</p>
        </div>
        <div className="grid grid-cols-10 w-[300px] text-sm items-center justify-center">
          <p className="ml-2 font-bold col-span-3">Type </p>
          <span className="flex justify-center items-center col-span-4 ">
            <Separator className="bg-slate-800 w-16 col-span-4 " />
          </span>
          <p className="col-span-3">Same day</p>
        </div>
        <div className="grid grid-cols-10 w-[300px] text-sm">
          <p className="ml-2 font-bold col-span-3 ">Start Date </p>
          <span className="flex justify-center items-center col-span-4 ">
            <Separator className="bg-slate-800 w-16 col-span-4 " />
          </span>
          <p className="col-span-3 ">04/04/2024</p>
        </div>
        <div className="grid grid-cols-10 w-[300px] text-sm">
          <p className="ml-2 font-bold col-span-3 ">End Date </p>
          <span className="flex justify-center items-center col-span-4 ">
            <Separator className="bg-slate-800 w-16 col-span-4 " />
          </span>
          <p className="col-span-3 ">04/04/2024</p>
        </div>

        <div className="grid grid-cols-10 w-[300px] text-sm items-center justify-center">
          <p className="ml-2 font-bold col-span-3 ">Pickup </p>
          <span className="flex justify-center items-center col-span-4 ">
            <Separator className="bg-slate-800 w-16 col-span-4 " />
          </span>
          <p className="col-span-3">Manso Atwr3de</p>
        </div>
        <div className="grid grid-cols-10 w-[300px] text-sm items-center justify-center">
          <p className="ml-2 font-bold col-span-3 ">Type </p>
          <span className="flex justify-center items-center col-span-4 ">
            <Separator className="bg-slate-800 w-16 col-span-4 " />
          </span>
          <p className="col-span-3">Same day</p>
        </div>
        <div className="grid grid-cols-10 w-[300px] text-sm items-center justify-center">
          <p className="ml-2 font-bold col-span-3 ">Destination </p>
          <span className="flex justify-center items-center col-span-4 ">
            <Separator className="bg-slate-800 w-16 col-span-4 " />
          </span>
          <p className="col-span-3">Ajriganor </p>
        </div>
      </div>
    </div>
  );
}
