import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosInformationCircle } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import Container from "@/components/ui/container";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import { FaWhatsapp } from "react-icons/fa";
import TrackOrder from "@/components/Order/TrackOrder/TrackOrder";
export default function TrackDelivery() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
      <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
        <span className="text-7xl font-bold">Track</span>
        <p className="text-3xl">Your Deliveries</p>
      </TopSectionContainer>

      <MiddleSectionContainer className="flex flex-col justify-start items-center  p-5">
          
      
      <TrackOrder/>    </MiddleSectionContainer>
    </main>
  );
}

const carryOn = (
  <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
      <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
        <span className="text-5xl font-bold ">#235-ASF5</span>
        <p className="text-lg font-bold">12th May, 2024</p>
      </TopSectionContainer>

      <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
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
      </MiddleSectionContainer>
    </main>

)
