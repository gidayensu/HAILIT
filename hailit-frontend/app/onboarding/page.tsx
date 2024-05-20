"use client";
//packages + react + next + redux
import { useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setBoardingCompletion } from "@/lib/store/userSlice";



//main components
import CustomerProfile from "@/components/Form/CustomerProfile";

//ui related components + icons
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import customerAnimation from "@/public/animations/customer-animation.json";
import riderAnimation from "@/public/animations/rider-animation.json";
import Link from "next/link";

type Onboarding = {
  stageOne: boolean;
  stageTwo: boolean;
  stageThree: boolean;
};

type SelectedUserRole = {
  customer: boolean;
  dispatcher: boolean;
};
export default function Onboarding() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {authenticationState} = useAppSelector((state)=>state.auth);
  const {onboard} = useAppSelector((state)=>state.user)

  
  const [onBoardingStage, setOnBoardingStage] = useState<Onboarding>({
    stageOne: true,
    stageTwo: false,
    stageThree: false,
  });

  const [selectedUserRole, setSelectedUserRole] = useState<SelectedUserRole>({
    customer: false,
    dispatcher: false,
  });

  const handleOnboardingCompletion = ()=> {
    dispatch(setBoardingCompletion(true))

  }
  const onBoardingStageHandler = (
    stage: "first" | "second" | "third",
    prev: boolean
  ) => {
    switch (stage) {
      case "first":
        if (!prev) {
          setOnBoardingStage((prevState) => ({
            ...prevState,
            stageOne: true,
            stageTwo: true,
          }));
        } else {
          setOnBoardingStage((prevState) => ({
            ...prevState,
            stageOne: true,
            stageTwo: false,
          }));
        }

        break;

      case "second":
        if (!prev) {
          setOnBoardingStage((prevState) => ({
            ...prevState,
            stageOne: true,
            stageTwo: true,
            stageThree: true,
          }));
          
        } else {
          setOnBoardingStage((prevState) => ({
            ...prevState,
            stageOne: true,
            stageTwo: true,
            stageThree: false,
          }));
          
        }

        break;

      case "third":
        router.push("/");
        dispatch(setBoardingCompletion(true));

        break;
    }
  };

  const selectedUserRoleHandler = (userRole: "customer" | "dispatcher") => {
    userRole === "customer"
      ? setSelectedUserRole(() => ({
          customer: true,
          dispatcher: false,
        }))
      : setSelectedUserRole(() => ({
          customer: false,
          dispatcher: true,
        }));
  };

  const inputAndLabelDivClass = "w-full max-w-sm items-center";
  const labelClass = "text-md font-medium mb-2";

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
    { authenticationState && !onboard &&(
      <main className="flex flex-col  items-center w-full max-h-screen p-5 md:justify-center bg-slate-50 mb-20 dark:bg-[#121212]">
      {/* Onboarding stages 1 - 3 starts here */}
      <div className="flex items-center justify-center md:w-1/2">
        <div
          className={`flex items-center justify-center h-10 w-10 border-2 border-slate-800 rounded-full text-sm  ${
            onBoardingStage.stageOne
              ? "bg-blue-500 text-white border-white"
              : "border-opacity-50"
          }`}
        >
          {onBoardingStage.stageOne ? (
            <FiCheck />
          ) : (
            <p className="opacity-50 font-bold">1</p>
          )}
        </div>
        <Separator
          className={`w-16 h-1  ${
            onBoardingStage.stageOne
              ? "bg-blue-500"
              : "bg-slate-800 bg-opacity-50"
          }`}
        />
        <div
          className={`flex items-center justify-center h-10 w-10 border-2 border-slate-800 rounded-full text-sm ${
            onBoardingStage.stageTwo
              ? "bg-blue-500 text-white border-white"
              : "border-opacity-50"
          }`}
        >
          {onBoardingStage.stageTwo ? (
            <FiCheck />
          ) : (
            <p className="opacity-50 font-bold">2</p>
          )}
        </div>
        <Separator
          className={`w-16 h-1  ${
            onBoardingStage.stageTwo
              ? "bg-blue-500"
              : "bg-slate-800 bg-opacity-50"
          }`}
        />
        <div
          className={`flex items-center justify-center h-10 w-10 border-2 border-slate-800 rounded-full text-sm ${
            onBoardingStage.stageThree
              ? "bg-blue-500 text-white border-white"
              : "border-opacity-50"
          }`}
        >
          {onBoardingStage.stageThree ? (
            <FiCheck />
          ) : (
            <p className="opacity-50 font-bold">3</p>
          )}
        </div>
      </div>

      {/* Onboarding stage 1 */}
      {onBoardingStage.stageOne &&
        !onBoardingStage.stageTwo &&
        !onBoardingStage.stageThree && (
          <>
            <div className="grid  grid-cols-1 w-full min-h-[300px] p-5 gap-2 justify-between -mt-3 md:w-1/2">
              <div className="flex flex-col items-start justify-start md:items-center md:justify-center p-5 gap-2">
                <p className="font-bold text-2xl">
                  Do you want to be a customer or a dispatcher?
                </p>
                <p>Hailit gives you a wholesome delivery experience! </p>
              </div>
              <div className="flex gap-4 p-2 -mt-4 ">
                <div className="w-1/2 flex flex-col gap-2 items-center justify-center font-bold text-blue-500 cursor-pointer">
                  <p>Customer</p>
                  <div
                    onClick={() => selectedUserRoleHandler("customer")}
                    className={`flex flex-col items-center w-full h-52 rounded-xl  shadow-sm hover:bg-blue-500 ${
                      selectedUserRole.customer ? "bg-blue-500" : "bg-white"
                    }`}
                  >
                    <div className="w-full h-44 rounded-xl border border-blue-500 bg-white dark:bg-[#1e1e1e] object-contain">
                      <Lottie
                        animationData={customerAnimation}
                        className="mt-8 w-32 object-contain"
                      />
                    </div>
                    <span
                      className={`flex items-center justify-center -mt-4  border border-rose-500   h-8 w-8 rounded-full    ${
                        selectedUserRole.customer
                          ? "bg-rose-500 text-white"
                          : "text-rose-500 bg-white"
                      }`}
                    >
                      <FiCheck className={`${!selectedUserRole.customer && 'hidden'}`} />
                    </span>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col gap-2 items-center justify-center font-bold text-blue-500 ">
                  <p>Dispatcher</p>
                  <div
                    onClick={() => selectedUserRoleHandler("dispatcher")}
                    className={`flex flex-col items-center w-full h-52 rounded-xl shadow-sm  hover:bg-blue-500 cursor-pointer ${
                      selectedUserRole.dispatcher ? "bg-blue-500" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-center w-full h-44 rounded-xl border border-blue-500 bg-white dark:bg-[#1e1e1e] object-contain">
                      <Lottie
                        animationData={riderAnimation}
                        className="w-96 object-contain -ml-8"
                      />
                    </div>
                    <span
                      className={`flex items-center justify-center -mt-4  border border-rose-500 h-8 w-8 rounded-full   ${
                        selectedUserRole.dispatcher
                          ? "bg-rose-500 text-white"
                          : "text-rose-500 bg-white "
                      }`}
                    >
                      <FiCheck className={`${!selectedUserRole.dispatcher && 'hidden'}`} />
                    </span>
                  </div>
                </div>
              </div>
              <Button
                className="w-full bottom-0 row-start-6"
                onClick={() => {
                  onBoardingStageHandler("first", false);
                }}
              >
                Next
              </Button>
            </div>
          </>
        )}
      {/* Onboarding stage 2 */}
      {onBoardingStage.stageOne &&
        onBoardingStage.stageTwo &&
        !onBoardingStage.stageThree && (
          <>
          
          <div className="grid  grid-cols-1 w-full min-h-[300px]  p-4 gap-2 md:justify-center md:items-center -mt-3  md:w-1/2">
            <span className="flex flex-col items-start justify-start p-5 gap-2 md:items-center md:justify-center">
              <p className="font-bold text-2xl">Enter your details </p>
              <p>Send packages with ease using Hailit </p>
            </span>
            <form className="w-full space-y-6 p-3 md:flex md:flex-col md:items-center md:justify-center">
              <CustomerProfile />
            </form>

            
          </div>
          <div className="flex md:w-1/3 w-full gap-4 px-4 md:p-0 ">
              <Button
                variant={"outline"}
                className="w-1/3"
                onClick={() => {
                  onBoardingStageHandler("first", true);
                }}
              >
                <FiArrowLeft />
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  onBoardingStageHandler("second", false);
                }}
              >
                Next
              </Button>
            </div>
          </>
        )}
      {/* Onboarding stage 3 */}
      {onBoardingStage.stageOne &&
        onBoardingStage.stageTwo &&
        onBoardingStage.stageThree && (
          <div className="grid  grid-cols-1 w-full min-h-[300px] p-5 gap-2 justify-between -mt-3 md:w-1/2 md:justify-center md:items-center">
            <span className="flex flex-col items-start justify-start p-5 gap-2">
              <p className="font-bold text-2xl">Set your password </p>
              <p>Hailit is secure and safe! </p>
            </span>
            <form className="w-full space-y-6 p-5">
              <div className={inputAndLabelDivClass}>
                <h3 className={labelClass}>Password</h3>
                <Input
                  type="password"
                  placeholder="********"
                  className="h-14"
                />
              </div>
              <div className={inputAndLabelDivClass}>
                <h3 className={labelClass}>Confirm Password</h3>
                <Input
                  type="password"
                  placeholder="********"
                  className="h-14"
                />
              </div>
              <div></div>
            </form>
            <div className="w-full md:w-3/4 p-5 flex items-center justify-center gap-4">
              <Button
                variant={"outline"}
                className="w-1/3"
                onClick={() => {
                  onBoardingStageHandler("second", true);
                }}
              >
                <FiArrowLeft />
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  onBoardingStageHandler("third", false);
                }}
              >
                Complete
              </Button>
            </div>
          </div>
        )}
    </main>)
}    </>
  );
}
