//redux
import { useAppSelector } from "@/lib/store/hooks";

//ui related components + icons
import { Separator } from "@/components/ui/separator";
import { FiCheck } from "react-icons/fi";

type Stage = "One" | "Two" | "Three"
  
export default function OnboardingStagesCheck () {
    
    const { stageOne, stageTwo, stageThree} = useAppSelector(state=>state.onBoarding)
    return(
        <>
        <OnboardingStageLayout  onBoardingStage={stageOne} stage="One"/>
        <OnboardingStageLayout  onBoardingStage={stageTwo} stage="Two"/>
        <OnboardingStageLayout  onBoardingStage={stageThree} stage="Three"/>
        </>
        
    )
}

function OnboardingStageLayout ({onBoardingStage, stage}:{onBoardingStage:boolean, stage:Stage}) {
    return (
        <>
        
        <div
          className={`flex items-center justify-center h-10 w-10 border-2 border-slate-800 rounded-full text-sm  ${
            onBoardingStage
              ? "bg-blue-500 text-white border-white"
              : "border-opacity-50"
          }`}
        >
          {onBoardingStage ? (
            <FiCheck />
          ) : (
            <p className="opacity-50 font-bold">{stage === "One" ? "'1'" : stage === "Two" ? "2" : "3" }</p>
          )}
        </div>
        {
            stage!=="Three" &&
        <Separator
          className={`w-16 h-1  ${
            onBoardingStage
              ? "bg-blue-500"
              : "bg-slate-800 bg-opacity-50"
          }`}
        />
        }
      
        </>
    )
}