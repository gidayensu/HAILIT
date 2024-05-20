'use client'
import { useState, useRef } from "react"
import { AiFillCar } from "react-icons/ai"
import { BsFillPinMapFill } from "react-icons/bs"
import { FaMotorcycle } from "react-icons/fa"
import { RiMapPinRangeLine, RiTreasureMapFill, RiTimerFlashFill, RiTimer2Fill, RiCalendarScheduleFill, RiCaravanFill } from "react-icons/ri"
import { FiCheck } from "react-icons/fi"
import { DeliveryChoices } from "./DeliveryChoices"


export default function SendPackage () {
    const [deliveryDestination, setDeliveryDestination] = useState('');
    const [deliveryDay, setDeliveryDay] = useState('');
    const [deliveryMedium, setDeliveryMedium] = useState('');
    const deliveryDestinationRef = useRef<HTMLDivElement>(null)
    const deliveryDayRef = useRef<HTMLDivElement>(null);
    const deliveryMediumRef = useRef<HTMLDivElement>(null);

    const handleDeliveryDestination = (destination:string)=> {
        setDeliveryDestination(destination)
        if(deliveryDestinationRef.current) {
          deliveryDestinationRef.current.scrollHeight
        }
        deliveryDayRef.current?.scrollIntoView({behavior: "smooth"})
    }

    const handleDeliveryDay = (day:string)=> {
        setDeliveryDay(day)
        
    }

    const handleDeliveryMedium = (medium:string)=> {
        setDeliveryMedium(medium)
    }
    return (
      <>
        <div className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3">
          <h2 className="font-bold text-xl text-center mb-2"> SELECT PACKAGE DESTINATION </h2>
          <div className="flex flex-col md:flex-row md:w-4/6 w-full items-center justify-center gap-2 md:items-start">
{/* DELIVERY CITY */}
            <DeliveryChoices
              handleDeliveryOption={handleDeliveryDestination}
              deliveryOption={deliveryDestination}
              CheckIcon={FiCheck}
              MainIcon={BsFillPinMapFill}
              elementOption="Accra"
            >
              <p className="text-sm md:text-md relative">
                Accra or Tema suburb
              </p>
            </DeliveryChoices>
            <div className="w-full md:w-2/3 flex gap-3">
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryDestination}
                deliveryOption={deliveryDestination}
                CheckIcon={FiCheck}
                MainIcon={RiMapPinRangeLine}
                elementOption="Kumasi"
              >
                <p className="text-sm md:text-md">Abuakwa, Ejisu, etc</p>
              </DeliveryChoices>
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryDestination}
                deliveryOption={deliveryDestination}
                CheckIcon={FiCheck}
                MainIcon={RiTreasureMapFill}
                elementOption="Inter city"
              >
                <p className="text-sm md:text-md">Accra - Kumasi</p>
              </DeliveryChoices>
            </div>
          </div>
        </div>

        {/* Delivery Day */}

        { (
          <>
            <div className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3">
              <h2 className="font-bold text-xl text-center my-2">SELECT DELIVERY DAY </h2>
              <div className="flex w-full md:flex-row md:w-4/6 items-center justify-center gap-2 md:items-start">

              <DeliveryChoices
                handleDeliveryOption={handleDeliveryDay}
                deliveryOption={deliveryDay}
                CheckIcon={FiCheck}
                MainIcon={RiTimerFlashFill}
                elementOption="Today"
              >
                <p className="text-[12px] md:text-lg"> from <b>GHS 30</b></p>
              </DeliveryChoices>
                
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryDay}
                deliveryOption={deliveryDay}
                CheckIcon={FiCheck}
                MainIcon={RiTimer2Fill}
                elementOption="Tomorrow"
              >
                <p className="text-[12px] md:text-lg"> from <strong>GHS 20</strong>  </p>
              </DeliveryChoices>
                
                
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryDay}
                deliveryOption={deliveryDay}
                CheckIcon={FiCheck}
                MainIcon={RiCalendarScheduleFill}
                elementOption="Schedule"
              >
                <p className="text-[12px] md:text-lg">  from <strong>GHS 20</strong></p>
              </DeliveryChoices>
               
              </div>
            </div>
          </>
        )}

        {/* Delivery Medium */}
        { (
          <>
            <div className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3">
              <h2 className="font-bold text-xl text-center my-2">
                {" "}
                SELECT DELIVERY MODE
              </h2>
              <div className="flex w-full md:flex-row md:w-4/6 items-center justify-center gap-2 md:items-start">
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryMedium}
                deliveryOption={deliveryMedium}
                CheckIcon={FiCheck}
                MainIcon={RiCaravanFill}
                elementOption="Truck"
              >
                <p className="text-sm md:text-md text-center">Large package</p>
              </DeliveryChoices>
               
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryMedium}
                deliveryOption={deliveryMedium}
                CheckIcon={FiCheck}
                MainIcon={AiFillCar}
                elementOption="Car"
              >
                <p className="text-sm md:text-md text-center">Big package</p>
              </DeliveryChoices>
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryMedium}
                deliveryOption={deliveryMedium}
                CheckIcon={FiCheck}
                MainIcon={FaMotorcycle}
                elementOption="Motor"
              >
                <p className="text-sm md:text-md text-center">Medium package</p>
              </DeliveryChoices>
                
              </div>
            </div>
          </>
        )}
      </>
    );
}