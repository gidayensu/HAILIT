import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosInformationCircle } from "react-icons/io";
export default function TrackDelivery() {
  return (
    <main className="flex min-h-screen flex-col items-center mt-16 gap-10 mb-20">
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-7xl font-bold">Track</span>
        <p className="text-3xl">Your Deliveries</p>
        <div className="flex justify-center items-start mt-8 gap-2">
          <IoIosInformationCircle className="text-2xl" />
          <p>
            Note that the type of delivery you <br /> you requested determines
            when <br /> package is delivered
          </p>
        </div>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2 justify-center ">
        <Input
          type="text"
          placeholder="Tracking Number"
          className="w-48 border-2 border-slate-400"
        />
        <Button type="submit" className="w-32">
          Submit
        </Button>
      </div>
    </main>
  );
}
