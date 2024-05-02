"use client";
import { SelectDeliveryType } from "@/components/order-components/select-delivery-type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import MidContent from "@/components/common/mid-content";
import TopContent from "@/components/common/top-content";

export default function NewOrder() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopContent className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-5xl font-bold ">Delivery details</span>
          <p className="text-lg">Enter details of your package</p>
        </TopContent>

        <MidContent className=" p-10 mb-20">
          <form className="w-full space-y-6">

             <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className=" text-md font-medium">Delivery Type</h3>
                <SelectDeliveryType
                />
            
            </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className=" text-md font-medium">Pickup Location</h3>
                <Input
                  type="text"
                  placeholder="Enter location for pickup"
                  className="h-14"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className=" text-md font-medium">Pickup Contact</h3>
                <Input
                  type="text"
                  placeholder="Enter number to call for pickup"
                  className="h-14"
                />
            
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className=" text-md font-medium">
                Destination / Drop off
              </h3>
              <Input
                type="text"
                placeholder="Enter location for drop off"
                className="h-14"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className=" text-md font-medium">Sender Number</h3>
              <Input
                type="number"
                placeholder="Enter number of sender"
                className="h-14"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className=" text-md font-medium">Receiver Number</h3>
              <Input
                type="number"
                placeholder="Enter number of recipient"
                className="h-14"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className=" text-md font-medium">Upload Product Image (optional)</h3>
                <Input id="picture" type="file" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className=" text-md font-medium">Additional Information</h3>
                <Textarea  className="h-32"/>
            </div>
            

            <Button type="submit" className="w-full h-14">
              Proceed
            </Button>
          </form>
        </MidContent>
      </main>
    </>
  );
}

