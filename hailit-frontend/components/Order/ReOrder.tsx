'use client'
//ui + icons
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Loader from "../Shared/Loader";
//main components+helper function
import { NewTrip } from "../Form/NewOrderForm";
import OrderSummaryMin from "./OrderSummaryMin";
import { extractDateWithDayFomDate } from "@/lib/utils";

//redux+next+react
import { useState } from "react";

import { useLazyAddTripQuery } from "@/lib/store/apiSlice/tripApi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { setNewOrder } from "@/lib/store/slice/newOrderSlice";
export function ReOrder({
  tripData,
}: {
  tripData:any
}) {

  const tripDetails: NewTrip = {
    trip_medium: "Motor",
    package_type: tripData.package_type,
    pickup_location: tripData.pickup_location,
    drop_off_location: tripData.drop_off_location,
    additional_information: tripData.additional_information,
    trip_type: tripData.trip_type,
    package_value: tripData.package_value,
    sender_number: tripData.sender_number,
    recipient_number: tripData.recipient_number,
  };
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();
  const dispatch = useAppDispatch();
  const  [addTrip, { data, isLoading, error }] = useLazyAddTripQuery();
  const handleSubmit = ()=> {
    setLoading(true)
    addTrip(tripDetails)  
  }

  if(data && !isLoading && !error) {
    const {trip} = data;
    dispatch(setNewOrder({
      order_success: true,
      trip_id: trip.trip_id,
      scheduled: false
    }))
    router.push('/order/new/success')
  }

  if (error) {
    
    router.push('/order/new/failed')
  }


  const date = new Date();
  const tripRequestDate = extractDateWithDayFomDate(date);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default" className="w-full">
          Reorder
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className=" flex items-center justify-center">
        <div className="md:flex md:flex-col md:justify-center  pb-0  md:w-[400px]">
          <div className="grid grid-cols-2 justify-between px-5 mb-4 gap-7">
            <div className="flex flex-col justify-start items-start">
              <span className="flex justify-center items-center gap-1 font-bold text-lg">
                <p>Sender</p>
              </span>
              <span className="text-sm">
                <p className="line-clamp-1">
                  <b>Pickup:</b> {tripData.pickup_location}
                </p>
                <p>{tripData.sender_number}</p>
              </span>
            </div>
            <div className="flex flex-col justify-end items-start">
              <span className="flex justify-center items-center font-bold text-lg">
                <p>Recipient</p>
              </span>
              <span className="text-sm">
                <p className="line-clamp-1">
                  <b>To: </b>
                  {tripData.drop_off_location}
                </p>
                <p>{tripData.recipient_number}</p>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 px-4">
            <OrderSummaryMin
              tripId="#tripID"
              tripRequestDate={tripRequestDate}
              deliveryStatus="New"
              packageType={tripData.package_type}
              cost={tripData.trip_cost}
            />
          </div>
          <DrawerFooter>
            {!loading &&
            
              <Button onClick={handleSubmit}>Confirm</Button>
            } 

            {
              loading && <Button disabled> <Loader color="red"/></Button>
            }
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
