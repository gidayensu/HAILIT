
//ui
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
//icons
import {
  PiMonitorFill,
  PiMonitorLight,
  PiPackageFill,
  PiPackageLight,
} from "react-icons/pi";
import { IoArchiveOutline, IoArchive } from "react-icons/io5";
import { PiWineLight, PiWineFill } from "react-icons/pi";

export default function NewOrderForm() {
  const iconsAndTextDivClass =
    " flex flex-col items-center p-2 group hover:bg-blue-500 text-blue-500 hover:text-white font-bold rounded-md border border-blue-500 hover:border-none ";
  const iconsAndTextSpanClass =
    "flex items-center justify-center relative group-hover:text-white   w-14 h-12 rounded-lg border-slate-300";
  const iconOutlineClass = "text-3xl group-hover:opacity-0";
  const iconFillClass = "text-3xl opacity-0 absolute group-hover:opacity-100 ";
  const iconTextClass = "text-[13px] group-hover:text-white";

  return (
    <div className="flex flex-col gap-4 md:justify-center =-pmd:items-center">
      <div className=" grid w-full max-w-sm items-center gap-1.5 md:justify-center md:items-center">
        <span className="flex items-start justify-start">

        <h3 className=" text-[14px] font-bold ">Package Type</h3>
        </span>
        <div className=" flex gap-[8px] -mb-5 flex-wrap">

          <div className={iconsAndTextDivClass}>
            <span className={iconsAndTextSpanClass}>
              <PiMonitorLight className={iconOutlineClass} />
              <PiMonitorFill className={iconFillClass} />
            </span>
            <p className={iconTextClass}>Gadgets</p>
          </div>

          <div className={iconsAndTextDivClass}>
            <span className={iconsAndTextSpanClass}>
              <PiPackageLight className={iconOutlineClass} />
              <PiPackageFill className={iconFillClass} />
            </span>
            <p className={iconTextClass}>Parcel</p>
          </div>
          
          <div className={iconsAndTextDivClass}>
            <span className={iconsAndTextSpanClass}>
              <PiPackageLight className={iconOutlineClass} />
              <PiPackageFill className={iconFillClass} />
            </span>
            <p className={iconTextClass}>Parcel</p>
          </div>

          <div className={iconsAndTextDivClass}>
            <span className={iconsAndTextSpanClass}>
              <PiPackageLight className={iconOutlineClass} />
              <PiPackageFill className={iconFillClass} />
            </span>
            <p className={iconTextClass}>Parcel</p>
          </div>

          <div className={iconsAndTextDivClass}>
            <span className={iconsAndTextSpanClass}>
              <PiWineLight className={iconOutlineClass} />
              <PiWineFill className={iconFillClass} />
            </span>
            <p className={iconTextClass}>Fragile</p>
          </div>

          <div className={iconsAndTextDivClass}>
            <span className={iconsAndTextSpanClass}>
              <IoArchiveOutline className={iconOutlineClass} />
              <IoArchive className={iconFillClass} />
            </span>
            <p className={iconTextClass}>Others</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Pickup Location</h3>
        <Input
          type="text"
          placeholder="Enter location for pickup"
          className="h-14"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Pickup Contact</h3>
        <Input
          type="text"
          placeholder="Enter number to call for pickup"
          className="h-14"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Destination / Drop off</h3>
        <Input
          type="text"
          placeholder="Enter location for drop off"
          className="h-14"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Sender Number</h3>
        <Input
          type="number"
          placeholder="Enter number of sender"
          className="h-14"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Receiver Number</h3>
        <Input
          type="number"
          placeholder="Enter number of recipient"
          className="h-14"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Package value (GHS)</h3>
        <Input
          type="number"
          placeholder="Enter number of recipient"
          className="h-14"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">
          Upload Product Image (optional)
        </h3>
        <Input id="picture" type="file" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Additional Information</h3>
        <Textarea className="h-32" />
        <Button type="submit" className="w-full h-14">
              Book
            </Button>
      </div>
      
    </div>
  );
}
