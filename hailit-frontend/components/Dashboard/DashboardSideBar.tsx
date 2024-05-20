import { TbLayoutDashboard, TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled, TbRoute, TbUser, TbUserEdit } from "react-icons/tb"
import DashboardSections from "./DashboardSections"
import { Separator } from "../ui/separator"
import { RiFileListLine, RiSteering2Line } from "react-icons/ri"
import { IoLogOutOutline } from "react-icons/io5"
import { MdOutlineSportsMotorsports } from "react-icons/md"

export default function DashboardSideBar ({dashMin, handleDashMin, handleActiveSection, activeSection}: {dashMin: boolean, handleDashMin: ()=>void, handleActiveSection: (section: string)=>void, activeSection:string }) {
    return (
        <article
          className={`hidden lg:flex flex-col fixed  ${
            dashMin ? "w-[60px]" : "md:w-[150px] w-[60px]"
          } py-4  px-2 bg-blue-500 h-[600px] text-white z-50  items-center justify-between rounded-xl mt-2 ml-4`}
        >
          <div className="flex flex-col gap-5">
            <div
              className="flex items-center justify-center  w-full h-8 rounded-lg  cursor-pointer "
              onClick={handleDashMin}
            >
              {dashMin && (
                <TbLayoutSidebarRightCollapseFilled className="text-2xl" />
              )}

              {!dashMin && (
                <div className="flex gap-2">
                  <p>Hailit</p>
                  <TbLayoutSidebarLeftCollapseFilled className="text-2xl" />
                </div>
              )}
            </div>
            <Separator className="bg-white dark:bg-slate-50" />
            <DashboardSections
              dashMin={dashMin}
              sectionName="Overview"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <TbLayoutDashboard className="text-2xl" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Orders"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <RiFileListLine className="text-2xl" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Track Order"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <TbRoute className="text-2xl" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Users"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <TbUser className="text-2xl" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Riders"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <MdOutlineSportsMotorsports className="text-2xl -scale-x-100" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Drivers"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <RiSteering2Line className="text-2xl -scale-x-100" />
            </DashboardSections>
          </div>

          <div className="text-center w-full ml-2">
            <DashboardSections
              dashMin={dashMin}
              sectionName="Edit Profile"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <TbUserEdit className="text-2xl " />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Logout"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <IoLogOutOutline className="text-2xl " />
            </DashboardSections>
          </div>
        </article>
    )
}