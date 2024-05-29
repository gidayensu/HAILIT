'use client'
//ui + icons
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import Loader from "../Shared/Loader";

//react hook form
import {useForm, SubmitHandler} from 'react-hook-form';

//main components
import DeliveryChoicesBreadcrumb from "../Order/NewDelivery/DeliveryChoicesBreadcrumb";
import PackageTypes from "../Order/NewDelivery/PackageTypes";

//redux + next + react
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { setNewOrder } from "@/lib/store/slice/newOrderSlice";
import { useLazyAddTripQuery } from "@/lib/store/apiSlice/tripApi";

export interface NewTrip {
  trip_medium: string,
    package_type: string,
    pickup_location: string,
    drop_off_location: string,
    additional_information: string,
    trip_type: string,
    package_value: string,
    sender_number: string,
    recipient_number: string,
}
interface DeliveryDetails {
  
    pickup_location: string,
    drop_off_location: string,
    sender_number: string,     
    recipient_number: string,
    package_value: number,
    additional_information: string
}

export default function NewOrderForm() {
  const [loading, setLoading] = useState<boolean>(false);
  
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {package_type, trip_type, trip_medium, scheduled } = useAppSelector(state=>state.deliveryChoices);
  

  const  [addTrip, { data, isLoading, error }] = useLazyAddTripQuery();
 

  
  const {register, handleSubmit } = useForm<DeliveryDetails>();
  
  
  const onDeliveryFormSubmit: SubmitHandler<DeliveryDetails> = async (data)=> {
    setLoading(true);
    if(!package_type) {
      return (
        setLoading(false)
      )
    }
    const formDetails = {...data, package_type, trip_type, trip_medium};
    addTrip(formDetails)
    
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

    
    
  return (
    <form className="flex flex-col gap-4 md:justify-center md:items-center" onSubmit={handleSubmit(onDeliveryFormSubmit)}>
      <div className=" grid w-full max-w-sm items-center gap-1.5 ">
        <span className="flex items-start justify-start">
          <h3 className=" text-[14px] font-bold ">Delivery Area and Medium</h3>
        </span>
        
        <DeliveryChoicesBreadcrumb/>
      </div>
      <div className=" grid w-full max-w-sm items-center gap-1.5 ">
        <span className="flex items-start justify-start">
          <h3 className=" text-[14px] font-bold ">Package Type</h3>
        </span>
        <div className=" flex gap-[8px] -mb-5 flex-wrap">
          <PackageTypes />

          
        </div>
      </div>

      <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Pickup Location</h3>
        <Input
          type="text"
          placeholder="Enter location for pickup"
          className="h-14"
          {...register("pickup_location")} required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Destination / Drop off</h3>
        <Input
          type="text"
          placeholder="Enter location for drop off"
          className="h-14"
          {...register("drop_off_location")} required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Sender Number</h3>
        <Input
          type="text"
          placeholder="Enter number of sender"
          className="h-14"
          {...register("sender_number")} required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Recipient Number</h3>
        <Input
          type="text"
          placeholder="Enter number of recipient"
          className="h-14"
          {...register("recipient_number")} required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Package value (GHS)</h3>
        <Input
          type="number"
          placeholder="Enter number of recipient"
          className="h-14"
          {...register("package_value")} required
        />
      </div>
      {/* <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">
          Upload Product Image (optional)
        </h3>
        <Input id="picture" type="file" />
      </div> */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Additional Information</h3>
        <Textarea className="h-32" {...register("additional_information")} required/>
        {
          !package_type && <span className="text-rose-500 text-center">
            <p>Package type not selected</p>
          </span>
        }
        {!loading &&
          <Button type="submit" className="w-full h-14" >
          Book
        
        </Button>
        }
        
        { loading &&
        <Button type="submit" className="w-full h-14 cursor-not-allowed" disabled>
          <Loader color="red"/>

        </Button>}
      </div>
    </form>
  );
}

