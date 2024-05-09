import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function ChangePassword() {
  const inputAndLabelDivClass = "w-full max-w-sm items-center";
  const labelClass = "text-md font-medium mb-2";
  return (
    <form className="w-full space-y-6 p-5">
      <div>
        <h3 className="font-bold text-lg mb-2">Change your Password</h3>
        <p className="text-[14px] ">
          Use a strong password with a mix of symbols, uppercase, lowercase, and
          numbers
        </p>
      </div>
      <div className={inputAndLabelDivClass}>
        <h3 className={labelClass}>Old Password</h3>
        <Input type="password" placeholder="********" className="h-14" />
      </div>
      <div className={inputAndLabelDivClass}>
        <h3 className={labelClass}>New Password</h3>
        <Input type="password" placeholder="********" className="h-14" />
      </div>
      <div className={inputAndLabelDivClass}>
        <h3 className={labelClass}>Confirm New Password</h3>
        <Input type="password" placeholder="********" className="h-14" />
      </div>

      <Button className="w-full h-12">Save</Button>
    </form>
  );
}
