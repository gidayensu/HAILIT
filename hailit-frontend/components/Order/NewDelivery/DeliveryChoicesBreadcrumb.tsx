import { FaAngleRight, FaMotorcycle } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai"
import {  RiCaravanFill } from "react-icons/ri"
import { BsFillPinMapFill } from "react-icons/bs"
import {  RiTimerFlashFill, RiTimer2Fill, RiCalendarScheduleFill } from "react-icons/ri"
import { RiMapPinRangeLine, RiTreasureMapFill } from "react-icons/ri"
import { useAppSelector } from "@/lib/store/hooks";

export default function DeliveryChoicesBreadcrumb () {
  const {trip_type, trip_medium, destination_city} = useAppSelector(state=>state.deliveryChoices)
    return(
        <section className="w-full flex gap-2 items-center justify-start text-rose-600">
          {
            destination_city &&
                <div className="flex items-center justify-center gap-2 w-1/3 h-8 border-2 border-rose-500 rounded-md text-[12px] font-medium  text-rose-600">
                  
                  <p>{destination_city.toUpperCase()}</p>
                  
                </div>
          }
          {
            trip_type && 
            <>
                <FaAngleRight className="text-[15px]"/>    
                <div className="flex items-center justify-center gap-2 w-1/3 h-8 border-2 border-rose-500 rounded-md text-[12px] font-medium  text-rose-600">
                  
                  <p>{trip_type.toUpperCase()}</p>
                  
                </div>
            </>
          }

          {
            trip_medium && <>
            
                <FaAngleRight className="text-[15px]"/>    
                <div className="flex items-center justify-center gap-2 w-1/3 h-8 border-2 border-rose-500 rounded-md text-[12px] font-medium  text-rose-600">
                  
                  <p>{trip_medium.toUpperCase()}</p>
                  
                </div>
            </>
          }

              </section>
              
    )
}