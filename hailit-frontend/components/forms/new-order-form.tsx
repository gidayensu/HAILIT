import { SelectDeliveryType } from "@/components/order-components/select-delivery-type";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export default function NewOrderForm () {
    return(
        <>
                  <div className="flex gap-5 w-full">
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="w-16 h-16 border rounded-lg"></div>
                <p className="text-[12px]">Fastest</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="w-16 h-16 border rounded-lg"></div>
                <p className="text-[12px]">Motorbike</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="w-16 h-16 border rounded-lg"></div>
                <p className="text-[12px]">Car</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="w-16 h-16 border rounded-lg"></div>
                <p className="text-[12px]">Intercity</p>
              </div>
            </div>
             <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className=" text-[14px] font-bold">Delivery Type</h3>
                <SelectDeliveryType
                />
            
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
              <h3 className=" text-[14px] font-bold">
                Destination / Drop off
              </h3>
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
                <h3 className=" text-[14px] font-bold">Upload Product Image (optional)</h3>
                <Input id="picture" type="file" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className=" text-[14px] font-bold">Additional Information</h3>
                <Textarea  className="h-32"/>
            </div>
            </>
    )
}