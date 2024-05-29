"use client";
import Link from "next/link";
import Lottie from "lottie-react";

//icons + ui
import { MdContentCopy, MdInfoOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import deliveryAnimation from "@/public/animations/success-animation.json";
import { CiCircleCheck } from "react-icons/ci";
import toast, { Toaster } from 'react-hot-toast';
//main components 
import { resetDeliveryChoices } from "@/lib/store/slice/deliveryChoicesSlice";

//next+redux+helper function
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { redirect } from "next/navigation";
import { copyToClipBoard } from "@/lib/utils";


export default function SuccessfulOrder() {
  
  const { trip_id, order_success } = useAppSelector(state=>state.newOrder)
  if(!order_success) {
    redirect('/order')
  }

  
  const dispatch = useAppDispatch();
  dispatch(
    resetDeliveryChoices({
      trip_type: "",
      trip_medium: "",
      destination_city: "",
      package_type: "",
      scheduled: false,
    }))

    const handleCopyTripId = (tripId:string)=> {
      copyToClipBoard(tripId)
      toast.success(
      
        <p className=" text-[13px]">

          Trip ID: <b>  {tripId} </b> copied 
        </p>
      
        )
    }

  return (
    <main className="flex min-h-screen flex-col mt-16 items-center gap-4">
      <div className="flex flex-col items-center justify-center ml-6 gap-2 w-64">
        <span className="text-4xl font-bold text-green-500 text-center">Order Successful!</span>
        <p className=" text-center">
          A rider will soon be
          assigned to pickup your package
        </p>
        <div className="w-full flex flex-col items-center justify-center">
          
        <p className=" text-center font-bold mb-2">
          Your Trip ID 
        </p>
        <div className="w-full flex items-center justify-center gap-4 cursor-pointer" onClick={()=>handleCopyTripId(trip_id)}>

        <p className="text-sm text-center h-10 border p-2 border-green-500 w-2/4 rounded-md cursor-pointer">
           <b>{trip_id} </b>
        </p>
        <span className="flex flex-col gap-2" >
        
        
        
        <MdContentCopy className="  text-xl hover:text-slate-600 dark:hover:text-slate-200"/>
        <Toaster/>
        </span>
        </div>
        <div className="w-full flex items-center justify-center mt-2">
          
          
        <p className=" text-center font-semibold text-[12px] w-3/4 h-5 text-white bg-green-500 ">
          Copy your Trip ID for tracking 
        </p>
        </div>
        </div>
      </div>
      <div className="w-72 ">
        <Lottie animationData={deliveryAnimation} />
      </div>

      <div className="flex flex-col gap-5 justify-center items-center">
      
        <Link href={`/track/${trip_id}`}>
          <Button className="border border-slate-300 h-14 w-60 flex gap-4">
            Track your package
          </Button>
        </Link>
        <Link href="/">
          <Button
            className="border border-slate-300 h-14 w-60 flex gap-4"
            variant="outline"
          >
            Home Page
          </Button>
        </Link>
      </div>
    </main>
  );
}
