"use client";
import { useState } from "react";

//icons + ui
import { MdOutlineSportsMotorsports } from "react-icons/md";
import { RiSteering2Line } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

//main components
import DashboardSideBar from "@/components/Dashboard/DashboardSideBar";
import { RecentTripTable } from "@/components/Dashboard/RecentTripTable";
import { AllTripsTable } from "@/components/Dashboard/AllTripsTable";
import TrackOrder from "@/components/Dashboard/TrackOrder/TrackOrder";
import Overview from "@/components/Dashboard/Overview";
import CustomerProfile from "@/components/Form/CustomerProfile";
import { DashboardBottomNav } from "@/components/Dashboard/DashboardBottomNav";
import DashboardTopNav from "@/components/Dashboard/DashboardTopNav";

export default function Dashboard() {
  const [dashMin, setDashMin] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("Overview");

  const handleDashMin = () => {
    setDashMin(() => !dashMin);
  };

  const handleActiveSection = (section: string) => {
    setActiveSection(section);
  };
  return (
    <>
      <DashboardTopNav />

      <main className="flex gap-4 w-full  bg-[#f7f7f7] dark:bg-[#121212]">
        
        <DashboardSideBar
          activeSection={activeSection}
          dashMin={dashMin}
          handleActiveSection={handleActiveSection}
          handleDashMin={handleDashMin}
        />
        
        <article className={`flex flex-col gap-4 w-full ${dashMin ? "lg:ml-[70px]" : "lg:ml-[170px]"} lg:ml-[170px] px-6 py-4`}>
          <section className="space-y-4">
            <h1 className="font-bold text-3xl mt-2">{activeSection}</h1>
            <Separator className="bg-black opacity-70 dark:bg-slate-50" />
          </section>
          
          {activeSection === "Overview" && <Overview />}
         
          {activeSection === "Orders" &&  <AllTripsTable /> }

          {activeSection === "Users" && (
            <>
              <section className="flex gap-2">
                <Button
                  variant={"empty"}
                  className="space-x-1 bg-black hover:bg-[#1e1e1e] hover:dark:bg-white text-white  dark:border  dark:text-[#121212] dark:bg-slate-50"
                >
                  <MdOutlineSportsMotorsports className="text-xl -scale-x-100" />
                  <p>Riders</p>
                </Button>

                <Button
                  variant={"empty"}
                  className="space-x-1 bg-black hover:bg-[#1e1e1e] hover:dark:bg-white text-white  dark:border  dark:text-[#121212] dark:bg-slate-50"
                >
                  <RiSteering2Line className="text-xl " />
                  <p>Drivers</p>
                </Button>
              </section>
              <section>
                <RecentTripTable />
              </section>
            </>
          )}

          {activeSection === "Track Order" && <TrackOrder /> }
          
          {activeSection === "Edit Profile" &&  <CustomerProfile /> }
        </article>
      </main>
      <DashboardBottomNav activeSection={activeSection}  onClickFunc={handleActiveSection}  />
    </>
  );
}
