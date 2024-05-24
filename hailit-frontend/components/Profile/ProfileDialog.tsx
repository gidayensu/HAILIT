import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FiChevronRight } from "react-icons/fi";
interface ProDialog {
  iconText:string,
  IconOutline: any,
  IconFill: any,
  children: React.ReactNode
}
export function  ProfileDialog ({iconText, IconOutline, IconFill, children}: ProDialog) {
    return (
      <Dialog>
      <DialogTrigger className="flex justify-between items-center p-2 font-bold group hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">
        <span className="flex items-center justify-center gap-2 relative">
          <IconOutline className="text-2xl group-hover:opacity-0" />
          <IconFill className="text-2xl opacity-0 absolute top-0 left-0  group-hover:opacity-100" />
          <p className="text-sm"> {iconText} </p>
        </span>
        <FiChevronRight className="md:hidden"/>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] sm:max-w-[425px]">
        {children}
      </DialogContent>
    </Dialog>
    )
}