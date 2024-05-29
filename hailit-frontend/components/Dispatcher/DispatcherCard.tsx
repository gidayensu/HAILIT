import Container from "../ui/container";
import { RiMessage3Line } from "react-icons/ri";
import { LuPhone } from "react-icons/lu";
import { UserAvatar } from "@/components/Shared/user-avatar";

export default function DispatcherCard({firstName, lastName, vehicleName, vehicleNumber, tripMedium}: {firstName: string, lastName: string, vehicleName: string, vehicleNumber:string, tripMedium: string}) {
  if (!vehicleNumber || !firstName) {
    return (
      <Container className="w-full rounded-xl border  h-24  p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>
          <UserAvatar />
        </span>

        <span>
          <p className="font-bold text-sm">Courier will be assigned soon</p>
          
        </span>
      </div>
      
    </Container>  
    )
  }
  return (
    <Container className="w-full rounded-xl border  h-24  p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>
          <UserAvatar />
        </span>

        <span>
          <p className="font-bold text-sm">{`${firstName} ${lastName}`}</p>
          <p className="font-bold text-[10px]">
            {vehicleName} - {vehicleNumber}</p>
        </span>
      </div>
      <div className="flex justify-center items-center gap-2">
        <span className=" bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center">
          <RiMessage3Line className="text-[20px] text-slate-50" />
        </span>
        <span className=" bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center">
          <LuPhone className="text-[20px] text-slate-50" />
        </span>
      </div>
    </Container>
  );
}
