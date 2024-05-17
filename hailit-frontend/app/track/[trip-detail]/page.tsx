//ui components + icons
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
//main components
import TopContent from "@/components/common/top-content";
import MidContent from "@/components/common/mid-content";
import OrderUpdates from "@/components/order-components/order-updates";
import OrderSummaryCard from "@/components/order-components/order-summary-card";
import CourierCard from "@/components/courier-components/courier-card";
import { ReOrder } from "@/components/order-components/reorder";

export default function TrackDelivery() {
  
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
      <TopContent className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
        <span className="text-5xl font-bold ">#235-ASF5</span>
        <p className="text-lg font-bold">12th May, 2024</p>
      </TopContent>

      <MidContent className="flex flex-col justify-start items-center space-y-2 p-5">
        {/* T Status */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <h3 className="font-bold text-sm">Trip Status</h3>
          <OrderUpdates />
        </div>

        {/* Courier Details */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <h3 className="font-bold text-sm">Courier</h3>
          <CourierCard />
        </div>

        {/* Trip Details */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <h3 className="font-bold text-sm">Delivery Dates</h3>
          <OrderSummaryCard deliveryStatus="INTERCITY" />
        </div>
        {/* Cost Details */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
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
          <div className="mt-4 w-full">

          <ReOrder/>
          </div>
        </div>
      </MidContent>
    </main>
  );
}
