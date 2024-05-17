
//ui + icons
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

//main components
import OrderSummaryLessDetail from "./order-summary-less-detail"

export function ReOrder() {
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">Reorder</Button>
      </DrawerTrigger>
      <DrawerContent>
        
          <DrawerHeader>
            <DrawerTitle className="md:ml-96" >Reorder Trip</DrawerTitle>
          </DrawerHeader>
          <div className=" pb-0 md:px-96">
          <div className="grid grid-cols-2 justify-between px-5 mb-4 gap-7">
                <div className="flex flex-col justify-start items-start">
                    <span className="flex justify-center items-center gap-1 font-bold text-lg">
                    
                    <p>Sender</p>
                    </span>
                    <span className="text-sm">
                        <p className="line-clamp-1"><b>Pickup:</b> Accra Teimain</p>
                        <p >0586780454</p>
                    </span>
                </div>
                <div className="flex flex-col justify-end items-start">
                    <span className="flex justify-center items-center font-bold text-lg">
                    
                    <p>Recipient</p>
                    </span>
                    <span className="text-sm">
                        <p className="line-clamp-1"><b>To: </b>Kumasi Amakom</p>
                        <p >0586780454</p>
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-center space-x-2 px-4">
            
            <OrderSummaryLessDetail deliveryStatus="Yet to Book" packageType="Gadgets"/>
              
            
          </div>
          <DrawerFooter>
            <Button>Confirm</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
