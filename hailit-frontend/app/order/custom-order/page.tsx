"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectDate } from "@/components/order-components/select-date";
import { SelectDeliveryType } from "@/components/order-components/select-delivery-type";
import TopContent from "@/components/common/top-content";
import MidContent from "@/components/common/mid-content";

export default function CustomOrder() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopContent className="">
          <span className="text-5xl font-bold">Custom Order</span>
          <p className="text-lg">Schedule your order</p>
        </TopContent>

        <MidContent className=" p-10 mb-20">
          <form className="w-full space-y-6">
            <div className="flex gap-5 w-full">
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="w-16 h-16 border rounded-lg"></div>
                <p className="text-[12px]">Fastest</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="w-16 h-16 border rounded-lg"></div>
                <p className="text-[12px]">Motor</p>
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
              <h3 className="text-md font-medium">Pickup Date</h3>
              <SelectDate />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className="text-md font-medium">Delivery Type</h3>
              <SelectDeliveryType />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className="text-md font-medium">Pickup Location</h3>
              <Input
                type="text"
                placeholder="Enter location for pickup"
                className="h-14"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className="text-md font-medium">Pickup Contact</h3>
              <Input
                type="text"
                placeholder="Enter number to call for pickup"
                className="h-14"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className="text-md font-medium">Destination / Drop off</h3>
              <Input
                type="text"
                placeholder="Enter location for drop off"
                className="h-14"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className="text-md font-medium">Sender Number</h3>
              <Input
                type="number"
                placeholder="Enter number of sender"
                className="h-14"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className="text-md font-medium">Receiver Number</h3>
              <Input
                type="number"
                placeholder="Enter number of recipient"
                className="h-14"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className="text-md font-medium">
                Upload Product Image (optional)
              </h3>
              <Input id="picture" type="file" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className="text-md font-medium">Additional Information</h3>
              <Textarea className="h-32" />
            </div>

            <Button variant="default" type="submit" className="w-full h-14">
              Proceed
            </Button>
          </form>
        </MidContent>
      </main>
    </>
  );
}
