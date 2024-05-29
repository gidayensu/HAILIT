"use client";
//packages + react + next + redux

import { useRouter } from "next/navigation";
import { updateUserDetails } from "@/components/Form/FormSubmission";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import CustomerProfile from "@/components/Form/EditCustomerProfile";
import { setBoardingCompletion, setOnboardingStages } from "@/lib/store/slice/onBoardingSlice";
import { setUserOnBoard } from "@/lib/store/slice/userSlice";
import { setAuthState } from "@/lib/store/slice/authSlice";
import { sessionAccessToken } from "@/lib/supabaseAuth";
import { setFormSubmissionLoading, setFormSubmissionError} from "@/lib/store/formSlice"

//react-hook-form
import {useForm, SubmitHandler} from 'react-hook-form';

//ui related components + icons
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LastStage from "@/components/Onboarding/LastStage";
import SecondStage from "@/components/Onboarding/SecondStage";
import FirstStage from "@/components/Onboarding/FirstStage/FirstStage";
import OnboardingStagesCheck from "@/components/Onboarding/OnboardingStagesCheck";

import { CustomerDetails } from "@/lib/store/slice/onBoardingSlice";


export default function Onboarding() {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {authenticationState} = useAppSelector((state)=>state.auth);
  const {onboard, chosenRole, stageOne, stageTwo, stageThree} = useAppSelector((state)=>state.onBoarding)
  

  const {handleSubmit} = useForm<CustomerDetails>();

  
  const handleOnboardStage = (stage: "First" | "Second" | "Third" | "Complete")=> {
    if (stage === "First") {
      dispatch(setOnboardingStages({
        stageOne: true,
        stageTwo: false,
        stageThree: false
      }))
    }

    if (stage === "Second") {
      dispatch(setOnboardingStages({
        stageOne: true,
        stageTwo: true,
        stageThree: false
      }))
    }

    if (stage === "Third") {
      dispatch(setOnboardingStages({
        stageOne: true,
        stageTwo: true,
        stageThree: true
      }))
    }
    
    if (stage === "Complete") {
      dispatch(setBoardingCompletion(true))
      dispatch(setUserOnBoard(true))
      router.push('/')
    }
  }
  
  
  return (
    <>
    {
      (!authenticationState || onboard) && 
      (
        <section className="flex flex-col items-center justify-center bg-slate-50 dark:bg-[#121212] min-h-screen gap-4">
            
              
                <h2 className="font-bold text-2xl">
                  Page Not Found
                </h2>
               <Link href={'/'}> <Button>Return Home </Button></Link>
            
              
        </section>    
      )
    }
    { 
    authenticationState && !onboard &&
    (
      <main className="flex flex-col  items-center w-full h-screen p-5 md:justify-center bg-slate-50 mb-20 dark:bg-[#121212]">
      {/* Onboarding stages 1 - 3 starts here */}
      <div className="flex items-center justify-center md:w-1/2">
        <OnboardingStagesCheck/>
      </div>

      {/* Onboarding stage 1 */}
      {stageOne &&
        !stageTwo &&
        !stageThree && (
          <>
            <div className="grid  grid-cols-1 w-full min-h-[300px] p-5 gap-2 justify-between -mt-3 md:w-1/2">
              <FirstStage/>
              {chosenRole && <Button
                className="w-full bottom-0 row-start-6 "
                onClick={() => {
                  handleOnboardStage("Second");
                }
              }
              >
                Next
              </Button>}

              {!chosenRole &&
                <Button className="w-full bottom-0 row-start-6 " disabled >
                Next
              </Button>
              }
            </div>
          </>
        )}
      {/* Onboarding stage 2 */}
      {stageOne &&
        stageTwo &&
        !stageThree && (
          <>
          
              <SecondStage />   
        
        <div className="flex md:w-1/3 w-full gap-4 px-4 md:p-0 ">
              <Button
                variant={"outline"}
                className="w-1/3"
                onClick={() => {
                  handleOnboardStage("First");
                }}
                >
                <FiArrowLeft />
              </Button>
              <Button
                className="w-full"
                form="customerProfileUpdate"
                type="submit"
                
                >
                Next
              </Button>
            </div>
                  
          </>
          
        )}
      {/* Onboarding stage 3 */}
      {stageOne &&
        stageTwo &&
        stageThree && (
          <>
          
          <LastStage/>

          <div className="w-full md:w-2/4 p-5 flex  items-center justify-center gap-4">
              
              <Button
                className="w-full"
                onClick={() => {
                  handleOnboardStage("Complete");
                }}
              >
                Send a Package
              </Button>
            </div>
          </>
        )}
    </main>)
}    </>
  );
}
