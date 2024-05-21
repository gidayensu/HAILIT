'use client'
import { useState } from "react";
import { DeliveryChoices } from "./DeliveryChoice"
import { BsFillPinMapFill } from "react-icons/bs"

import { RiMapPinRangeLine, RiTreasureMapFill } from "react-icons/ri"
import { FiCheck } from "react-icons/fi"



export default function PackageDestinationChoice () {
    const [deliveryDestination, setDeliveryDestination] = useState('');

    const handleDeliveryDestination = (destination:string)=> {
        setDeliveryDestination(destination)
        
    }

    return(
            <>
            
            <DeliveryChoices
              handleDeliveryOption={handleDeliveryDestination}
              deliveryOption={deliveryDestination}
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
                deliveryOption={deliveryDestination}
                CheckIcon={FiCheck}
                MainIcon={RiMapPinRangeLine}
                elementOption="Kumasi"
              >
                <p className="text-sm md:text-md text-center">Abuakwa, Ejisu, etc</p>
              </DeliveryChoices>
              
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryDestination}
                deliveryOption={deliveryDestination}
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