"use client";
import Link from "next/link";



import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { redirect } from "next/navigation";

export default function FailedOrder() {
  const {newTripSuccess} = useAppSelector(state=>state.form);
  console.log('newTripSuccess:', newTripSuccess)
  // if(newTripSuccess) {
  //   redirect('/order')
  // }

  
  return (
    <main className="flex min-h-screen flex-col mt-16 items-center gap-4">
      <div className="flex flex-col items-center justify-center ml-6 gap-2 w-64">
        <span className="text-4xl text-center font-bold text-red-500">Order Failed!</span>
        <p className="text-lg text-center">
        This occurred because of us. We are fixing this error. Kindly retry. Thank you.
        </p>
      </div>
      

      <div className="flex flex-col gap-5 justify-center items-center">
        
        <Link href="/order/new">
          <Button className="border border-slate-300 h-14 w-60 flex gap-4">
            Retry
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
