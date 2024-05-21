import Container from "../ui/container";
import { RiMessage3Line } from "react-icons/ri";
import { LuPhone } from "react-icons/lu";
import { Button } from "../ui/button";
import { FaWhatsapp } from "react-icons/fa";


export default function RecipientSenderCard({name, location, identity}: {name:string, location:string, identity:"Sender" | "Recipient"}) {
  return (
    <Container className="w-full rounded-xl border  h-24  p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">

        <span>
          <p className="font-semibold text-sm">{name}</p>
          <p className="font-medium text-[12px]">{location}</p>
        </span>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Button className=" bg-blue-600 h-8 w-32 rounded-md flex items-center justify-center text-slate-50 dark:text-[#1e1e1e] text-[12px]">
          <p className=" "> Call {identity} </p>
        </Button>
        <div className=" bg-blue-600 dark:bg-slate-50 h-8 w-8 rounded-md flex items-center justify-center text-[16px] text-slate-50 dark:text-[#1e1e1e]">
          <FaWhatsapp />
        </div>
      </div>
    </Container>
  );
}
