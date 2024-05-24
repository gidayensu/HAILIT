import Lottie from "lottie-react";
import { Button } from "../ui/button";
import { FiArrowLeft } from "react-icons/fi";
import successAnimation from "@/public/animations/success-animation.json";

export default function LastStage () {
    return (
        <div className="flex flex-col w-full min-h-[300px] p-5 gap-2 justify-between -mt-3 md:w-1/2 md:justify-center md:items-center">
            <span className="flex flex-col items-center justify-center p-5 gap-2">
              <p className="font-bold text-2xl">You are All Set</p>
              <p>Hailit is fast and affordable! </p>
            </span>
            <div>
            <Lottie
                        animationData={successAnimation}
                        className="w-96 object-contain -ml-8 md:w-52"
                      />
            </div>
            
          </div>
    )
}