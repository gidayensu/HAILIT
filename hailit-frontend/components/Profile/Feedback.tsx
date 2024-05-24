import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
export default function Feedback() {
  const inputAndLabelDivClass = "w-full max-w-sm items-center";
  const labelClass = "text-md font-medium mb-2";
  return (
    <form className="w-full space-y-6 p-5">
      <div>
        <h3 className="font-bold text-lg mb-2">Send Feedback</h3>
        <p className="text-[14px] ">
          Have something to share to help us improve, complete the form below or
          contact us via WhatsApp
        </p>
      </div>
      <div className={inputAndLabelDivClass}>
        <h3 className={labelClass}>Subject</h3>
        <Input
          type="text"
          placeholder="Enter the subject you want to provide feedback"
          className="h-14"
        />
      </div>
      <div className={inputAndLabelDivClass}>
        <h3 className={labelClass}>Feedback</h3>
        <Textarea
          placeholder="Enter your feedback here. Please describe in detail"
          className="h-32"
        />
      </div>
      <div className="flex gap-3 max-w-sm">
        <Button className="w-4/5  h-12">Send</Button>
        <Button
          variant="outline"
          className="  bg-green-500  h-12 w-1/5 flex gap-4 text-white dark:bg-white dark:text-green-500 dark:border-none"
        >
          
          <FaWhatsapp className="text-2xl" />
        </Button>
      </div>
    </form>
  );
}
