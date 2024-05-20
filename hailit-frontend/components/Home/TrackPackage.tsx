import { Input } from "../ui/input"
import { Button } from "../ui/button"
export default function TrackPackage () {
    return(
        
        <div className=" flex flex-col items-center justify-center w-5/6 h-36 md:h-44 bg-gradient-to-r from-blue-700 to-blue-500 mt-10 rounded-lg text-white gap-1">
        <p className="text-[14px] w-44 h-7 text-center">
          Track your package
        </p>
        <div>

        <div className="w-full font-bold rounded-xl flex items-center justify-end gap-2">
            <Input className="flex gap-2 items-center relative h-9 w-60 md:w-96 md:h-12 justify-center rounded-full  text-[12px]" placeholder="Trip ID"/>
            <Button  className="absolute border-none mr-1 p-1 h-7 w-16 md:w-28 md:h-10  text-white rounded-full text-[13px]">Track</Button>                  
          
            
          
        </div>
        </div>
      </div>
    )
}