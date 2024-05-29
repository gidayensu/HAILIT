'use client'

import { DeliveryChoices } from "./DeliveryChoice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setDestinationCity } from "@/lib/store/slice/deliveryChoicesSlice"
import { BsFillPinMapFill } from "react-icons/bs"

import { RiMapPinRangeLine, RiTreasureMapFill } from "react-icons/ri"
import { FiCheck } from "react-icons/fi"



export default function PackageDestinationChoice () {
    const {destination_city} = useAppSelector(state=>state.deliveryChoices)
    const dispatch = useAppDispatch();
    const handleDeliveryDestination = (destination_city:string)=> {
      dispatch(setDestinationCity(destination_city))
        
    }

    return(
            <>
            
            <DeliveryChoices
              handleDeliveryOption={handleDeliveryDestination}
              deliveryOption={destination_city}
              CheckIcon={FiCheck}
              MainIcon={BsFillPinMapFill}
              elementOption="Accra"
            >
              <p className="text-sm md:text-md text-center">
                Accra or Tema suburb
              </p>
            </DeliveryChoices>

            <div className="w-full md:w-2/3 flex gap-3">
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryDestination}
                deliveryOption={destination_city}
                CheckIcon={FiCheck}
                MainIcon={RiMapPinRangeLine}
                elementOption="Kumasi"
              >
                <p className="text-sm md:text-md text-center">Abuakwa, Ejisu, etc</p>
              </DeliveryChoices>
              
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryDestination}
                deliveryOption={destination_city}
                CheckIcon={FiCheck}
                MainIcon={RiTreasureMapFill}
                elementOption="Inter city"
              >
                <p className="text-sm md:text-md text-center">Accra - Kumasi</p>
              </DeliveryChoices>
              </div>
              </>
              )
        
    
}