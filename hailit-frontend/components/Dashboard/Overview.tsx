//ui + icons
import Container from "../ui/container"
import { IoTrendingUp, IoTrendingDown } from "react-icons/io5";
//main components
import { RecentTripTable } from "./RecentTripTable"

export default function Overview () {
    return (
        
            <section className="space-y-6 w-full">
              <div className="flex flex-col md:flex-row  w-full gap-3">
                <Container className="flex flex-col gap-2 w-full md:w-1/4 h-40 rounded-xl p-4">
                <div className="flex justify-between">
              <div className="">
                <h3 className="font-bold"> DELIVERIES</h3>
                <h3 className="text-[12px] text-slate-400 -mt-1">
                    This Week`&lsquo;`s Deliveries
                </h3>
              </div>
              </div>
              <div className="flex flex-col">

              <h2 className="text-6xl font-bold">
                    56
              </h2>
              <div className={`flex gap-1 text-green-500  w-full`}>
                <IoTrendingUp className="text-lg"/>
                <p className="text-[12px] font-medium">+24.3% (last week)</p>
              </div>
              </div>
                </Container>
                <Container className="flex flex-col gap-2 w-full md:w-1/4 h-40 rounded-xl p-4">
                <div className="flex justify-between">
              <div className="">
                <h3 className="font-bold">REVENUE</h3>
                <h3 className="text-[12px] text-slate-400 -mt-1">
                    This Week`&lsquo;`s Revenue
                </h3>
              </div>
              </div>
              <div className="flex flex-col">

              <h2 className="text-6xl font-bold">
                    2k
              </h2>
              <div className={`flex gap-1 text-red-500  w-full`}>
                <IoTrendingDown className="text-lg"/>
                <p className="text-[12px] font-medium">-10.3% (last week)</p>
              </div>
              </div>
                </Container>
                <Container className="flex flex-col gap-2 w-full md:w-1/4 h-40 rounded-xl p-4">
                <div className="flex justify-between">
              <div className="">
                <h3 className="font-bold">PENDING</h3>
                <h3 className="text-[12px] text-slate-400 -mt-1">
                    Packages Not Delivered
                </h3>
              </div>
              </div>
              <div className="flex flex-col">

              <h2 className="text-6xl font-bold">
                    15
              </h2>
              <div className={`flex gap-1 text-red-500  w-full`}>
                <IoTrendingUp className="text-lg"/>
                <p className="text-[12px] font-medium">+7.1% (last week)</p>
              </div>
              </div>
                </Container>
                <Container className="flex flex-col gap-2 w-full md:w-1/4 h-40 rounded-xl p-4">
                <div className="flex justify-between">
              <div className="">
                <h3 className="font-bold">DELIVERED</h3>
                <h3 className="text-[12px] text-slate-400 -mt-1">
                    Delivered This Week
                </h3>
              </div>
              </div>
              <div className="flex flex-col">

              <h2 className="text-6xl font-bold">
                    32
              </h2>
              <div className={`flex gap-1 text-green-500  w-full`}>
                <IoTrendingUp className="text-lg"/>
                <p className="text-[12px] font-medium">+4.1% (last week)</p>
              </div>
              </div>
                </Container>
              </div>
              <div className="flex flex-col gap-4 w-full ">
                <div className="flex flex-col w-full   gap-2 p-4 h-full rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-[#1e1e1e] dark:hover:border-slate-100 dark:text-slate-100  cursor-pointer">
                  <h3 className="font-bold">Most Recent Trips</h3>
                  <RecentTripTable />
                </div>
              </div>
            </section>
          
    )
}