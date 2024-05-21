import type { OrderStatus } from "./TrackOrder";
import { GrFormCheckmark } from "react-icons/gr";
import { GoX } from "react-icons/go";

export default function OrderStatusElement ({orderStatus, orderStage, currentOrderStage, children}: {orderStatus: OrderStatus, orderStage:number, currentOrderStage:number, children:React.ReactNode}) {
    return(
        <div className="flex flex-col items-center justify-center w-1/4 gap-4 relative">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentOrderStage < orderStage ? 'bg-gray-300 dark:bg-[#4e4e4e]' : 'bg-black dark:bg-slate-50'} ${ orderStage === 0 ? 'bg-red-500' : currentOrderStage === 4 && orderStatus === 'Delivered' ? 'bg-green-500 dark:bg-green-500' : ''} `}>
                            { (orderStatus === "New Order" || orderStatus === "In Transit" || orderStatus === "Picked Up")  &&
                                
                                <div>
                                <div className={`absolute w-full h-1 ${currentOrderStage < orderStage ? 'bg-gray-300 dark:bg-[#4e4e4e]' : 'bg-black dark:bg-slate-50'}`}>
                                        <p></p>
                                </div>
                            </div>
                            }
                            {currentOrderStage < orderStage || orderStage === 0 ? <GoX className="text-white dark:text-[#1e1e1e] text-lg z-10"/> : <GrFormCheckmark className="text-white text-lg z-10 dark:text-[#1e1e1e]"/>}
                            
                        </div>

                    <div className={`flex flex-col items-center justify-center ${currentOrderStage < orderStage ? 'text-gray-300 dark:text-[#4e4e4e]' : 'text-black dark:text-slate-50'}`}>
                        {children}
                        <div className="flex flex-col items-center justify-center w-full gap-1" >
                            <p className={`text-sm font-semibold ${orderStage === 0 ? 'text-red-500': currentOrderStage === 4 && orderStatus === 'Delivered' ? 'text-green-500' : ''}`}>{orderStatus}</p>
                            
                        </div>
                    </div>
                    </div>
    )
}