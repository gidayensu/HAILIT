import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDeliveryType() {
  return (
    
    <Select>
      <SelectTrigger className="w-full h-14 border-slate-500">
        <SelectValue placeholder="Same day" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="same day">Same day</SelectItem>
          <SelectItem value="tomorrow">Next day</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
