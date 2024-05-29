'use client'
import { useState } from "react"
import { DeliveryChoices } from "./DeliveryChoice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setDeliveryDay } from "@/lib/store/slice/deliveryChoicesSlice"
import {  RiTimerFlashFill, RiTimer2Fill, RiCalendarScheduleFill } from "react-icons/ri"
import { FiCheck } from "react-icons/fi"

export default function   DeliveryDayChoice () {
    const {trip_type} = useAppSelector(state=>state.deliveryChoices)
    const dispatch = useAppDispatch();
    const handleDeliveryDay = (day:string)=> {
      dispatch(setDeliveryDay(day))
        
    }
    return(
        <>
        <DeliveryChoices
                handleDeliveryOption={handleDeliveryDay}
                deliveryOption={trip_type}
                CheckIcon={FiCheck}
                MainIcon={RiTimerFlashFill}
                elementOption="Today"
              >
                <p className="text-[12px] md:text-lg text-center"> from <b>GHS 30</b></p>
              </DeliveryChoices>
                
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryDay}
                deliveryOption={trip_type}
                CheckIcon={FiCheck}
                MainIcon={RiTimer2Fill}
                elementOption="Tomorrow"
              >
                <p className="text-[12px] md:text-lg text-center"> from <strong>GHS 20</strong>  </p>
              </DeliveryChoices>
                
                
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryDay}
                deliveryOption={trip_type}
                CheckIcon={FiCheck}
                MainIcon={RiCalendarScheduleFill}
                elementOption="Schedule"
              >
                <p className="text-[12px] md:text-lg text-center">  from <strong>GHS 20</strong></p>
              </DeliveryChoices>
        </>
    )
}