"use client";
//ui components + icons
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/Shared/Modal";
//main components
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import CustomerHelp from "@/components/Profile/CustomerHelp";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import OrderUpdates from "@/components/Order/OrderUpdates";
import OrderSummary from "@/components/Order/OrderSummary";
import DispatcherCard from "@/components/Dispatcher/DispatcherCard";
import { ReOrder } from "@/components/Order/ReOrder";
import TrackOrderContainer from "@/components/Order/TrackOrder/TrackOrderContainer";
import { MidSkeleton, TopSkeleton } from "@/components/Order/OrderSkeleton";
//redux + data fetch + supabaseAuth + next
import { useGetTripDetailsQuery } from "@/lib/store/apiSlice/tripApi";
import { useParams } from "next/navigation";
import TrackOrder from "@/components/Order/TrackOrder/TrackOrder";
//helper functions
import { extractTimeFromDate, extractDateWithDayFomDate } from "@/lib/utils";

export default function TrackDelivery() {
  const params = useParams();
  const { trip_id } = params;
  const { data, isLoading, error } = useGetTripDetailsQuery(`${trip_id}`);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
        <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <TopSkeleton />
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
          <MidSkeleton />
        </MiddleSectionContainer>
      </main>
    );
  }

  if (!data) {
    const text = "sere";
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
        <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-5xl font-bold ">No data found</span>
          <p className="text-lg font-bold">
            Check the trip ID and ensure that you are not missing a value and
            search again
          </p>
        </TopSectionContainer>
        <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
          <TrackOrder />
        </MiddleSectionContainer>
      </main>
    );
  }
  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
        <MiddleSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-5xl font-bold ">Error occurred</span>
          <p className="text-lg font-bold">Our fault! Please try again</p>
        </MiddleSectionContainer>
      </main>
    );
  }

  const { trip } = data;
  const { dispatcher } = trip;
  const { trip_request_date, trip_commencement_date, trip_completion_date } =
    trip;

  //trip dates

  const tripRequestDate = extractDateWithDayFomDate(trip_request_date);
  const tripCommencementDate = extractDateWithDayFomDate(
    trip_commencement_date
  );
  const tripCompletionDate = extractDateWithDayFomDate(trip_completion_date);

  //trip time
  const tripRequestTime = extractTimeFromDate(trip_request_date);
  const tripCommencementTime = extractTimeFromDate(trip_commencement_date);
  const tripCompletionTime = extractTimeFromDate(trip_completion_date);
  console.log("trip_commencement_date:", trip_commencement_date);

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
      <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
        <span className="text-5xl font-bold">#{trip_id}</span>
        <p className="text-md ">
          <b>Package Type:</b> {trip.package_type}
        </p>
        <p className="text-md ">
          <b>Request Date:</b> {tripRequestDate}
        </p>
        <p className="text-md ">
          <b>Trip Medium:</b> {trip.trip_medium}
        </p>
      </TopSectionContainer>

      <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
        <TrackOrderContainer headingText="Trip Status">
          <OrderUpdates
            currentOrderStage={trip.trip_stage}
            currentOrderStatus={trip.trip_status}
          />
        </TrackOrderContainer>

        <TrackOrderContainer headingText="Courier">
          <DispatcherCard
            firstName={dispatcher.first_name}
            lastName={dispatcher.last_name}
            tripMedium={trip.trip_medium}
            vehicleName={dispatcher.vehicle?.vehicle_name}
            vehicleNumber={dispatcher.vehicle?.plate_number}
          />
        </TrackOrderContainer>

        <TrackOrderContainer headingText="Location and Timeline">
          <OrderSummary
            deliveryStatus="DELIVERED"
            tripId={trip.trip_id}
            deliveryType={trip.trip_type.toUpperCase()}
            dropOffLocation={trip.drop_off_location}
            pickupLocation={trip.pickup_location}
            commencementDate={tripCommencementDate || "TBD"}
            commencementTime={tripCommencementTime || "TBD"}
            completionDate={tripCompletionDate || "TBD"}
            completionTime={tripCompletionTime || "TBD"}
          />
        </TrackOrderContainer>

        <TrackOrderContainer headingText="Cost and Payment">
          <Container className=" w-full h-auto rounded-xl">
            <div className="grid grid-cols-3  p-3 ">
              <span className="text-[13px]">
                <p className=" font-bold">Amount</p>
                <p> {trip.trip_cost}</p>
              </span>
              <span className="text-[13px]">
                <p className=" font-bold">Status</p>
                <p> {trip.payment_status ? "Paid" : "Not Paid"}</p>
              </span>
              <span className="text-[13px]">
                <p className=" font-bold">Method</p>
                <p> {trip.payment_method}</p>
              </span>
            </div>
          </Container>
          <div className="flex flex-col gap-2 mt-4 w-full">
            <ReOrder tripData={trip} />
            {
              trip.trip_status && (trip.trip_status !== 'Delivered' || trip.trip_status !== 'Cancelled') &&
            <Button variant={'empty'} className="border border-red-500 hover:border-red-700 hover:text-red-700 bg-transparent text-red-500 dark:bg-transparent dark:text-red-500">
                Cancel
            </Button>
            }
            <Modal
              dialogTriggerElement="Need Help?"
              className="w-full  h-10 rounded-lg font-bold"
            >
              <CustomerHelp />
            </Modal>
          </div>
        </TrackOrderContainer>
      </MiddleSectionContainer>
    </main>
  );
}
