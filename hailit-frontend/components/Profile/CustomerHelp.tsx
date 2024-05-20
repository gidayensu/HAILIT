import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { SelectHelpIssue } from "./SelectHelpIssue";
import { RiMessage3Line } from "react-icons/ri";
import { LuPhone } from "react-icons/lu";

export default function CustomerHelp() {
  const inputAndLabelDivClass = "w-full  items-center";
  const labelClass = "text-md font-medium mb-2";
  return (
    <>
      <form className="flex flex-col items-center justify-center w-full space-y-6 p-5 ">
        <div>
          <h3 className="font-bold text-lg mb-2">Help Center</h3>
          <p className="text-[14px] ">
            Let us know what you need help with and your issue will be quickly
            resolved. You can also reach us via WhatsApp, SMS, or Phone
          </p>
        </div>
        <div className={inputAndLabelDivClass}>
          <h3 className={labelClass}>Select Issue</h3>
          <SelectHelpIssue />
        </div>
        <div className={inputAndLabelDivClass}>
          <h3 className={labelClass}>Subject</h3>
          <Textarea
            placeholder="Enter the subject you want to provide feedback"
            className="h-32"
          />
        </div>

        <Button className="w-full h-12">Send</Button>
      </form>
      <div className="w-full space-y-3 p-5 -mt-10">
        <span className="flex justify-center items-center gap-3 opacity-80">
          <Separator className="w-24 bg-slate-500 dark:bg-slate-100" />
          <p>OR</p>
          <Separator className="w-24 bg-slate-500 dark:bg-slate-100" />
        </span>
        <div className="flex gap-3">
          <span className="space-y-2 w-1/3 text-center">
            <Button
              variant="outline"
              className="  bg-green-500 border-none h-12 w-full text-white dark:bg-white dark:text-slate-800 dark:border-none"
            >
              <FaWhatsapp className="text-2xl" />
            </Button>
            <p className="text-sm">WhatsApp</p>
          </span>
          <span className="space-y-2 w-1/3 text-center">
            <Button
              variant="outline"
              className="  bg-blue-500 border-none h-12 w-full text-white dark:bg-white dark:text-slate-800 dark:border-none"
            >
              <RiMessage3Line className="text-2xl" />
            </Button>
            <p className="text-sm">Send SMS</p>
          </span>
          <span className="space-y-2 w-1/3 text-center">
            <Button
              variant="outline"
              className="  bg-blue-500 border-none  h-12 w-full text-white dark:bg-white dark:text-slate-800 dark:border-none"
            >
              <LuPhone className="text-2xl" />
            </Button>
            <p className="text-sm">Call</p>
          </span>
        </div>
      </div>
    </>
  );
}
