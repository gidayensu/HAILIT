'use client'
import { useState } from "react"
import customerAnimation from "@/public/animations/customer-animation.json";
import riderAnimation from "@/public/animations/rider-animation.json";
import { useAppDispatch } from "@/lib/store/hooks";
import { setChosenRole } from "@/lib/store/onBoardingSlice";
import type { SelectedUserRole } from "./UserOption";
import UserOption from "./UserOption";
  
export default function FirstStage () {
    const dispatch = useAppDispatch();
    
    const [selectedUserRole, setSelectedUserRole] = useState<SelectedUserRole>({
        customer: false,
        dispatcher: false,
      });
    
      const selectedUserRoleHandler = (userRole: "customer" | "dispatcher") => {
        if (userRole === "customer") {
          
          setSelectedUserRole(() => ({
            customer: true,
            dispatcher: false,
          }));
          dispatch(setChosenRole("customer"))
        } else {
          
          setSelectedUserRole(() => ({
            customer: false,
            dispatcher: true,
          }));
          dispatch(setChosenRole("dispatcher"))
        }
      };
    return (
        <>
              <div className="flex flex-col items-start justify-start md:items-center md:justify-center p-5 gap-2">
                <p className="font-bold text-2xl">
                  Do you want to be a customer or a dispatcher?
                </p>
                <p>Hailit gives you a wholesome delivery experience! </p>
              </div>
              <div className="flex gap-4 p-2 -mt-4 ">
                <div className="w-1/2 flex flex-col gap-2 items-center justify-center font-bold text-blue-500 cursor-pointer">
                  <p>Customer</p>
                  <UserOption animation={customerAnimation} selectedUserRole={selectedUserRole.customer} selectedUserRoleHandler={selectedUserRoleHandler} userRole="customer"/>
                </div>
                <div className="w-1/2 flex flex-col gap-2 items-center justify-center font-bold text-blue-500 cursor-pointer">
                  <p>Dispatcher</p>
                  <UserOption animation={riderAnimation} selectedUserRole={selectedUserRole.dispatcher} selectedUserRoleHandler={selectedUserRoleHandler} userRole="dispatcher"/>
                  
                </div>
              </div>
              
</>
    )
}

  
