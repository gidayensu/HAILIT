'use client'

import { AiFillCar } from "react-icons/ai"
import { FaMotorcycle } from "react-icons/fa"
import {  RiCaravanFill } from "react-icons/ri"
import { FiCheck } from "react-icons/fi"
import { DeliveryChoices } from "./DeliveryChoice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setDeliveryMedium } from "@/lib/store/slice/deliveryChoicesSlice"

export default function DeliveryMediumChoice () {
    const {trip_medium} = useAppSelector(state=>state.deliveryChoices)
    const dispatch = useAppDispatch();
    const handleDeliveryMedium = (medium:string)=> {
        dispatch(setDeliveryMedium(medium))
    }
    return(
        <>
        <DeliveryChoices
                handleDeliveryOption={handleDeliveryMedium}
                deliveryOption={trip_medium}
                CheckIcon={FiCheck}
                MainIcon={RiCaravanFill}
                elementOption="Truck"
              >
                <p className="text-sm md:text-md text-center">Large package</p>
              </DeliveryChoices>
               
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryMedium}
                deliveryOption={trip_medium}
                CheckIcon={FiCheck}
                MainIcon={AiFillCar}
                elementOption="Car"
              >
                <p className="text-sm md:text-md text-center">Big package</p>
              </DeliveryChoices>
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryMedium}
                deliveryOption={trip_medium}
                CheckIcon={FiCheck}
                MainIcon={FaMotorcycle}
                elementOption="Motor"
              >
                <p className="text-sm md:text-md text-center">Medium package</p>
              </DeliveryChoices>
        </>
    )
}