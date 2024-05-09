import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectIssue() {
  return (
    <Select>
      <SelectTrigger className="w-full h-14">
        <SelectValue placeholder="Delivery" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Delivery">Delivery</SelectItem>
          <SelectItem value="Rider">Rider</SelectItem>
          <SelectItem value="Payment">Payment</SelectItem>
          <SelectItem value="Account">Account</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
