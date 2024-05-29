//ui + icons
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "../../ui/button";
import Container from "../../ui/container";
import { GoChecklist, GoX } from "react-icons/go";
import { TbArrowsExchange } from "react-icons/tb";
import { PiArticle, PiCodesandboxLogo } from "react-icons/pi";
import { PiReceipt } from "react-icons/pi";
import { LiaMotorcycleSolid } from "react-icons/lia";
import { Separator } from "../../ui/separator";
import { LuUser } from "react-icons/lu";
import OrderSummary from "../../Order/OrderSummary";
import OrderStatusElement from "../../Order/TrackOrder/OrderStatusElement";

// type OrderStatus = "New Order" | "Picked Up" | "In Transit" | "Delivered" | "Cancelled";
export type OrderStatus = "New" |  "Picked Up" | "In Transit" | "Delivered" | "Cancelled";

export default function TrackOrder() {

  const currentOrderStatus: OrderStatus = "Cancelled";
  
  const paymentStatus = 'Paid'

  let currentOrderStage = 4;

  
  return (
    <main className="flex flex-col gap-5">
      {/* HEADER */}
      <article className="flex flex-col gap-2">
        <section className="flex gap-2 text-2xl mb-2">
          <h2> Order:</h2>
          <h1 className="font-bold">#92GHS-345</h1>
        </section>
        <section className="flex gap-3">
          <Button
            className="flex items-center justify-center gap-2"
            variant={"outline"}
          >
            <AiOutlineEdit className="text-xl" />
            <p>Edit Order</p>
          </Button>
          <Button
            className="flex items-center justify-center gap-2"
            variant={"destructive"}
          >
            <MdDeleteOutline className="text-xl" />
            <p>Deleted Order</p>
          </Button>
        </section>
      </article>

      {/* DELIVERY STATUS */}
      <article className="flex flex-col lg:flex-row w-full gap-4">
        <Container className="flex flex-col  w-full lg:w-3/6 h-52 rounded-lg p-3 gap-2">
          {/* order status */}
          <h3 className="font-bold">ORDER STATUS</h3>
          <h3 className="text-[12px] text-slate-400 -mt-3">
            Current Order Status
          </h3>
          

          <div className="flex">
            <OrderStatusElement
              orderStatus="New"
              currentOrderStage={currentOrderStage}
              orderStage={1}
            >
              <PiArticle className="text-3xl" />
            </OrderStatusElement>

            <OrderStatusElement
              orderStatus="Picked Up"
              currentOrderStage={currentOrderStage}
              orderStage={2}
            >
              <PiCodesandboxLogo className="text-3xl" />
            </OrderStatusElement>

            <OrderStatusElement
              orderStatus="In Transit"
              currentOrderStage={currentOrderStage}
              orderStage={3}
            >
              <LiaMotorcycleSolid className="text-3xl" />
            </OrderStatusElement>

            {currentOrderStatus !== "Cancelled" && (
              <OrderStatusElement
                orderStatus="Delivered"
                currentOrderStage={currentOrderStage}
                orderStage={4}
              >
                <GoChecklist
                  className={`text-3xl ${
                    currentOrderStage === 4 ? "text-green-500" : ""
                  } `}
                />
              </OrderStatusElement>
            )}

            {currentOrderStatus === "Cancelled" && (
              <OrderStatusElement
                orderStatus="Cancelled"
                currentOrderStage={currentOrderStage}
                orderStage={0}
              >
                <GoX className="text-3xl text-red-500" />
              </OrderStatusElement>
            )}
          </div>
        </Container>

        {/* Payment */}
        <Container className="flex flex-col  w-full lg:w-2/6  h-52 rounded-lg p-3 gap-2">
          <div className="flex justify-between">
            <div className="">
              <h3 className="font-bold">PAYMENT</h3>
              <h3 className="text-[12px] text-slate-400 -mt-1">
                Payment Details
              </h3>
            </div>
            <Button
              variant={"empty"}
              className="space-x-1 bg-blue-500 hover:bg-blue-600 text-white  hover:dark:bg-slate-100 dark:text-[#1e1e1e] dark:bg-white"
            >
              <PiReceipt className="text-xl " />
              <p>Invoice</p>
            </Button>
          </div>
          <div className="w-full flex flex-col items-start justify-between h-3/5 rounded-md bg-[#f7f7f7] dark:bg-[#1e1e1e] p-3">
            <div className="flex w-full items-start justify-between text-sm">
              <div className="spacey-y-2">
                <ul>Bill amount</ul>
                <ul>Discount(0%)</ul>
                <ul>Service Fee</ul>
                
              </div>
              <div className="spacey-y-2 text-right font-semibold">
                <ul>34.2</ul>
                <ul>0</ul>
                <ul>10</ul>
                
              </div>
            </div>

            <Separator className="dark:bg-slate-50" />
            <div className="flex w-full items-start justify-between text-sm font-bold mt-1">
              <p>Total</p>
              <p>44.2</p>
            </div>
          </div>
          <div className=" flex justify-between text-sm px-1 font-semibold">
            <p>Payment status</p>
            <p className={`${paymentStatus === "Paid" ? 'text-green-500': 'text-red-500'}`}>{paymentStatus}</p>
          </div>
        </Container>
        {/* RIDER */}
        <Container className="flex flex-col  w-full lg:w-2/6  h-52 rounded-lg p-3 gap-2">
          <div className="flex justify-between">
            <div className="">
              <h3 className="font-bold">RIDER</h3>
              <h3 className="text-[12px] text-slate-400 -mt-1">
                Rider Details
              </h3>
            </div>
            <Button
              variant={"empty"}
              className="space-x-1 bg-blue-500 hover:bg-blue-600 text-white  hover:dark:bg-slate-100 dark:text-[#1e1e1e] dark:bg-white"
            >
              <TbArrowsExchange className="text-xl " />
              <p>Assign</p>
            </Button>
          </div>
        </Container>
      </article>

      <article className="flex flex-col lg:flex-row w-full gap-4">
        {/* PACKAGE DETAILS */}
        <Container className="flex flex-col  w-full lg:w-2/6  h-52 rounded-lg p-3 gap-2">
          <h3 className="font-bold">Map</h3>
          <h3 className="text-[12px] text-slate-400 -mt-3">Package Details</h3>
        </Container>
        <div className="flex flex-col  w-full lg:w-2/6  h-52 rounded-lg p-3 gap-2">
          <h3 className="font-bold">Package</h3>
          <h3 className="text-[12px] text-slate-400 -mt-3">Package Details</h3>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <OrderSummary deliveryStatus="DELIVERED" deliveryType="SCHEDULED" />
          </div>
        </div>
        <Container className="flex flex-col  w-full lg:w-2/6 h-52 rounded-lg p-3 gap-2">
          <div className="flex justify-between">
            <div className="">
              <h3 className="font-bold">CLIENT</h3>
              <h3 className="text-[12px] text-slate-400 -mt-1">
                Client Details
              </h3>
            </div>
            <Button
              variant={"empty"}
              className="space-x-1 bg-blue-500 hover:bg-blue-600 text-white  hover:dark:bg-slate-100 dark:text-[#1e1e1e] dark:bg-white"
            >
              <LuUser className="text-xl " />
              <p>View</p>
            </Button>
          </div>
          <div className="w-full flex flex-col items-start justify-between h-screen rounded-md bg-[#f7f7f7] dark:bg-[#1e1e1e] p-3">
            <div className="flex w-full items-start justify-between text-sm">
              <div className="space-y-1">
                <ul>Name</ul>
                <ul>Email</ul>
                <ul>Phone</ul>
                <ul>Address</ul>
                <ul>Delivery Count</ul>
              </div>
              <div className="space-y-1 text-right font-semibold">
                <ul>Johnson Asomani</ul>
                <ul>salu@gmail.salu</ul>
                <ul>000000000</ul>
                <ul>BA Block 2 House 9</ul>
                <ul>17</ul>
              </div>
            </div>
          </div>
        </Container>
      </article>
    </main>
  );
}
