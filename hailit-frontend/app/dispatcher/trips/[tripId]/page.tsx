
import { Button } from "@/components/ui/button";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import OrderUpdates from "@/components/Order/OrderUpdates";
import OrderSummary from "@/components/Order/OrderSummary";
import TrackOrderContainer from "@/components/Order/TrackOrder/TrackOrderContainer";
import Container from "@/components/ui/container";
import RecipientSenderCard from "@/components/Order/RecipientSenderCard";

export default function DispatcherTrip () {
    let updateStatus = "Picked Up";

    return (
        
        
        <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
      <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
        <span className="text-4xl font-bold ">Trip #235-ASF5</span>
        <p className="text-lg font-bold">12th May, 2024</p>
      </TopSectionContainer>

      <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
        
      <TrackOrderContainer headingText="Update Trip" >
          <Button variant={'outline'}> Mark as {updateStatus}</Button>
          
        </TrackOrderContainer>

        <TrackOrderContainer headingText="Trip Status" >
          
          <OrderUpdates />
        </TrackOrderContainer>
        
        <TrackOrderContainer headingText="Location and Timeline">
          <OrderSummary deliveryStatus="SCHEDULED" />
        </TrackOrderContainer>

        <TrackOrderContainer headingText="Sender">
            <RecipientSenderCard name="Yaw Manu" location="Abuakwa Adumanu" identity="Sender"/>
        </TrackOrderContainer>

        <TrackOrderContainer headingText="Recipient">
            <RecipientSenderCard name="Dankwa Asare" location="Bantama High Street" identity="Recipient"/>
        </TrackOrderContainer>

        
        <TrackOrderContainer headingText="Cost and Payment">
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
          
        </TrackOrderContainer>
      </MiddleSectionContainer>
    </main>
    
    )
}