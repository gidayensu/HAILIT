import { FiChevronRight } from "react-icons/fi";
interface ProDialog {
  IconOutline: any,
  IconFill: any,
  children: React.ReactNode
}
export function  ProfileNonDialogItem ({IconOutline, IconFill, children}: ProDialog) {
    return (
      <div className="flex justify-between items-center p-2 font-bold group hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">
        <span className="flex items-center justify-center gap-2 relative">
          <IconOutline className="text-2xl group-hover:opacity-0" />
          <IconFill className="text-2xl opacity-0 absolute top-0 left-0  group-hover:opacity-100" />
          {children}
        </span>
        <FiChevronRight className="md:hidden"/>
    </div>
    )
}