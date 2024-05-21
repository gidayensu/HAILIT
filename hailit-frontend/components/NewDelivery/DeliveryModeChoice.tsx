'use client'
import { useState, useRef } from "react"
import { AiFillCar } from "react-icons/ai"
import { FaMotorcycle } from "react-icons/fa"
import {  RiCaravanFill } from "react-icons/ri"
import { FiCheck } from "react-icons/fi"
import { DeliveryChoices } from "./DeliveryChoice"

export default function DeliveryModeChoice () {
    const [deliveryMedium, setDeliveryMedium] = useState('');
    const handleDeliveryMedium = (medium:string)=> {
        setDeliveryMedium(medium)
    }
    return(
        <>
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
        </>
    )
}