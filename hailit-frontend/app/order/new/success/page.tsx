"use client";
import Link from "next/link";
import Lottie from "lottie-react";

import deliveryAnimation from "@/public/animations/success-animation.json";
import { Button } from "@/components/ui/button";

export default function SuccessfulOrder() {
  return (
    <main className="flex min-h-screen flex-col mt-16 items-center gap-4">
      <div className="flex flex-col items-start justify-center ml-6 gap-2 w-64">
        <span className="text-4xl font-bold">Thank you!</span>
        <p className="text-sm">
          Your order for delivery has been successful. A rider will soon be
          assigned to pickup your package
        </p>
      </div>
      <div className="w-72 ">
        <Lottie animationData={deliveryAnimation} />
      </div>

      <div className="flex flex-col gap-5 justify-center items-center">
        <p className="w-64">
          Your order will be delivered at <strong> order destination </strong>
        </p>
        <Link href="/track/253">
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
