import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";


export function Modal({dialogTriggerElement, className, children}: {dialogTriggerElement: any, className: string, children: React.ReactNode}) {
  return (
    <Dialog>
      <DialogTrigger className={`flex justify-center items-center text-sm ${className}`}>
        {dialogTriggerElement}
      </DialogTrigger>
      <DialogContent className="max-w-[350px] sm:max-w-[425px]">
        {children}
      </DialogContent>
    </Dialog>  );
}
