//ui + icons
import { Separator } from "../ui/separator";
import { FiCheck } from "react-icons/fi";
import Container from "../ui/container";
import OrderStatusElement from "./TrackOrder/OrderStatusElement";
import { GoChecklist, GoX } from "react-icons/go";
import { LiaMotorcycleSolid } from "react-icons/lia";
import { PiArticle, PiCodesandboxLogo } from "react-icons/pi";
import type { OrderStatus } from "../Dashboard/TrackOrder/TrackOrderDetails";
export default function OrderUpdates({currentOrderStatus, currentOrderStage}:{currentOrderStatus: OrderStatus, currentOrderStage: number}) {


  return (
    <Container className="w-full rounded-xl h-24 flex justify-center items-center  ">
      <div className="flex justify-center items-center w-full">
      <OrderStatusElement
              orderStatus="New"
              currentOrderStage={currentOrderStage}
              orderStage={1}
            >
              <></>
            </OrderStatusElement>

            <OrderStatusElement
              orderStatus="Picked Up"
              currentOrderStage={currentOrderStage}
              orderStage={2}
            >
              <></>
            </OrderStatusElement>

            <OrderStatusElement
              orderStatus="In Transit"
              currentOrderStage={currentOrderStage}
              orderStage={3}
            >
              <></>
            </OrderStatusElement>

            {currentOrderStatus !== "Cancelled" && (
              <OrderStatusElement
                orderStatus="Delivered"
                currentOrderStage={currentOrderStage}
                orderStage={4}
              >
                <></>
              </OrderStatusElement>
            )}

            {currentOrderStatus === "Cancelled" && (
              <OrderStatusElement
                orderStatus="Cancelled"
                currentOrderStage={currentOrderStage}
                orderStage={0}
              >
                <></>
              </OrderStatusElement>
            )}
      </div>
    </Container>
  );
}

