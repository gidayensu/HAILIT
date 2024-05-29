"use client";
import { useState } from "react";
import Link from "next/link";
//ui + icons
import { Button } from "@/components/ui/button";
import { FiArrowLeft } from "react-icons/fi";
import Loader from "@/components/Shared/Loader";

//main components
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import PackageDestinationChoice from "@/components/Order/NewDelivery/PackageDestinationChoice";
import DeliveryDayChoice from "@/components/Order/NewDelivery/DeliveryDayChoice";
import DeliveryMediumChoice from "@/components/Order/NewDelivery/DeliveryMediumChoice";
import DeliveryChoicesBreadcrumb from "@/components/Order/NewDelivery/DeliveryChoicesBreadcrumb";


interface DeliveryChoiceStage {
  destination: boolean;
  deliveryDay: boolean;
  deliveryMedium: boolean;
}
export default function NewOrder() {
  const [deliveryChoicesStage, setDeliveryChoicesStage] =
    useState<DeliveryChoiceStage>({
      destination: true,
      deliveryDay: false,
      deliveryMedium: false,
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeliveryChoicesStage = (stage: number) => {
    stage === 2
      ? setDeliveryChoicesStage({
          destination: true,
          deliveryDay: true,
          deliveryMedium: false,
        })
      : stage === 1
      ? setDeliveryChoicesStage({
          destination: true,
          deliveryDay: false,
          deliveryMedium: false,
        })
      : setDeliveryChoicesStage({
          destination: true,
          deliveryDay: true,
          deliveryMedium: true,
        });
  };
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-5xl font-bold ">Trip Details</span>
          <p className="text-lg">Select city, day of delivery, and vehicle</p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-start items-center p-10 mb-20">
          {deliveryChoicesStage.destination &&
            !deliveryChoicesStage.deliveryDay &&
            !deliveryChoicesStage.deliveryMedium && (
              <div className="w-full flex flex-col items-center justify-center md:w-1/2 gap-4">
                <h2 className="font-bold text-lg text-center mb-2">
                  
                  SELECT PACKAGE DESTINATION
                </h2>
                <div className="flex flex-col md:flex-row  w-full items-center justify-center gap-2 md:items-start">
                  <PackageDestinationChoice />
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleDeliveryChoicesStage(2)}
                >
                  Continue
                </Button>
              </div>
            )}

          {deliveryChoicesStage.deliveryDay &&
            !deliveryChoicesStage.deliveryMedium && (
              <>
              {/* Choices of user */}
                <section className="w-full flex flex-col items-center justify-center md:w-1/2 gap-4">
              <DeliveryChoicesBreadcrumb/>
                  <h2 className="font-bold text-lg text-center mb-2"> SELECT DELIVERY DAY </h2>
                  <div className="flex w-full md:flex-row  items-center justify-center gap-2 md:items-start">
                    <DeliveryDayChoice />
                  </div>
                  <div className="w-full flex gap-4">
                    <Button
                      variant={"outline"}
                      className="w-1/4"
                      onClick={() => handleDeliveryChoicesStage(1)}
                    >
                      <FiArrowLeft />
                    </Button>
                    <Button
                      className="w-3/4"
                      onClick={() => handleDeliveryChoicesStage(3)}
                    >
                      Continue
                    </Button>
                  </div>
                </section>
              </>
            )}
            {deliveryChoicesStage.deliveryDay &&
            deliveryChoicesStage.deliveryMedium && (
              <>
                <div className="w-full flex flex-col items-center justify-center md:w-1/2 gap-4">
              <DeliveryChoicesBreadcrumb/>
                  <h2 className="font-bold text-lg text-center mb-2">
                    
                    SELECT DELIVERY DAY
                  </h2>
                  <div className="flex w-full md:flex-row  items-center justify-center gap-2 md:items-start">
                    <DeliveryMediumChoice />
                  </div>
                  <div className="w-full flex gap-4">
                    <Button
                      variant={"outline"}
                      className="w-1/4"
                      onClick={() => handleDeliveryChoicesStage(2)}
                    >
                      <FiArrowLeft />
                    </Button >
                    {!isLoading &&
                      <Link href={'/order/new'} className="w-3/4" onClick={()=>setIsLoading(true)}>
                    <Button className="w-full"> Continue </Button>
                    </Link>
                    }

                    {isLoading &&
                      <Button className="w-3/4"> <Loader color="red"/> </Button>
                    }

                  </div>
                </div>
              </>
            )}
        </MiddleSectionContainer>
      </main>
    </>
  );
}
