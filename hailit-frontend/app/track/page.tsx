import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosInformationCircle } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import Container from "@/components/ui/container";
import TopContent from "@/components/common/top-content";
import MidContent from "@/components/common/mid-content";
import { FaWhatsapp } from "react-icons/fa";
export default function TrackDelivery() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
      <TopContent className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
        <span className="text-7xl font-bold">Track</span>
        <p className="text-3xl">Your Deliveries</p>
      </TopContent>

      <MidContent className="flex flex-col justify-start items-center  p-5">
          
      
      <div className="flex w-full max-w-xl items-center space-x-2 justify-center mt-10 ">
        <Input
          type="text"
          placeholder="Tracking Number"
          className="w-full border-2 border-slate-400"
          />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </div>
      <span className="flex items-start justify-start">

      <h3 className="font-bold  text-lg mt-4 -mb-1">Additional Tracking</h3>
      </span>
      
      <Container className="flex flex-col items-center justify-center rounded-xl h-auto p-4 gap-3 w-full">
      
          <p className="text-center"> Could not find package or cannot reach assigned courier?</p>
          <Button variant={"outline"} className="w-2/3 ">
             <FaPhone className="text-md mr-2"/> Call Management
          </Button>

          <Button className="w-2/3 bg-green-500 text-white">
             <FaWhatsapp className="text-lg mr-2"/> WhatsApp
          </Button>
        
        
      </Container>
      
          </MidContent>
    </main>
  );
}

const carryOn = (
  <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
      <TopContent className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
        <span className="text-5xl font-bold ">#235-ASF5</span>
        <p className="text-lg font-bold">12th May, 2024</p>
      </TopContent>

      <MidContent className="flex flex-col justify-start items-center space-y-2 p-5">
        {/* T Status */}
        <div className="flex flex-col gap-2 mt-5">
          <h3 className="font-bold text-sm">Trip Status</h3>
          
        </div>

        {/* Courier Details */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-sm">Courier</h3>
          
        </div>

        {/* Trip Details */}
        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-bold text-sm">Delivery Dates</h3>
          
        </div>
        {/* Cost Details */}
        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-bold text-sm">Cost and Payment</h3>
          <Container className=" w-full h-auto rounded-xl">
            <div className="grid grid-cols-3  p-3 ">
              <span className="text-[13px]">
                <p className=" font-bold">Amount</p>
                <p> GHS 50</p>
              </span>
              <span className="text-[13px]">
                <p className=" font-bold">Status</p>
                <p> Paid</p>
              </span>
              <span className="text-[13px]">
                <p className=" font-bold">Method</p>
                <p> MTN MoMo</p>
              </span>
            </div>
          </Container>

          
        </div>
      </MidContent>
    </main>

)
