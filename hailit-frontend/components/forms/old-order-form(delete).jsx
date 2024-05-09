import { SelectDeliveryType } from "@/components/order-components/select-delivery-type";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { RiFileListFill, RiFileListLine } from "react-icons/ri";
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
    "flex flex-col items-center p-2 group  font-medium rounded-md ";
  const iconsAndTextSpanClass =
    "flex items-center justify-center relative  hover:text-black  group w-16 h-16 rounded-lg border-slate-300";
  const iconOutlineClass = "text-3xl group-hover:opacity-0";
  const iconFillClass = "text-3xl opacity-0 absolute group-hover:opacity-100 ";
  const iconTextClass = "text-[13px]";
  return (
    <>
      <div className="flex w-full">
        <div className={iconsAndTextDivClass}>
          <span
            className={`${iconsAndTextSpanClass} bg-blue-200 hover:bg-blue-400`}
          >
            <PiMonitorLight className={`${iconOutlineClass}`} />
            <PiMonitorFill className={`${iconFillClass}`} />
          </span>
          <p className={`${iconTextClass} group-hover:text-blue-400`}>
            Electronics
          </p>
        </div>

        <div className={iconsAndTextDivClass}>
          <span
            className={`${iconsAndTextSpanClass} bg-amber-100 hover:bg-amber-200 `}
          >
            <PiPackageLight className={iconOutlineClass} />
            <PiPackageFill className={iconFillClass} />
          </span>
          <p className={`${iconTextClass} group-hover:text-amber-400`}>
            Parcel
          </p>
        </div>

        <div className={iconsAndTextDivClass}>
          <span
            className={`${iconsAndTextSpanClass} bg-green-100 hover:bg-green-300 `}
          >
            <PiWineLight className={iconOutlineClass} />
            <PiWineFill className={iconFillClass} />
          </span>
          <p className={`${iconTextClass} group-hover:text-green-400`}>
            Fragile
          </p>
        </div>

        <div className={iconsAndTextDivClass}>
          <span
            className={`${iconsAndTextSpanClass} bg-red-100 hover:bg-red-300 `}
          >
            <IoArchiveOutline className={iconOutlineClass} />
            <IoArchive className={iconFillClass} />
          </span>
          <p className={`${iconTextClass} group-hover:text-red-400`}>Others</p>
        </div>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Delivery Type</h3>
        <SelectDeliveryType />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
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
        <h3 className=" text-[14px] font-bold">
          Upload Product Image (optional)
        </h3>
        <Input id="picture" type="file" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Additional Information</h3>
        <Textarea className="h-32" />
      </div>
    </>
  );
}
