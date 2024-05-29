//icons

import {
  PiMonitorFill,
  PiMonitorLight,
  PiPackageFill,
  PiPackageLight,
} from "react-icons/pi";
import { IoArchiveOutline, IoArchive, IoDocumentText, IoDocumentTextOutline } from "react-icons/io5";
import { PiWineLight, PiWineFill } from "react-icons/pi";
import { RiArchiveStackLine, RiArchiveStackFill } from "react-icons/ri";

//redux
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setPackageType } from "@/lib/store/slice/deliveryChoicesSlice";


export default function PackageTypes () {

  const { package_type } = useAppSelector(state=>state.deliveryChoices);

  const dispatch = useAppDispatch();

  const handlePackageType = (packageType:string)=> {
    dispatch(setPackageType(packageType))
  }
    return (
        <>
          <PackageType
            FillIcon={PiMonitorFill}
            LightIcon={PiMonitorLight}
            packageType="Electronics"
            selectedPackageType={package_type}
            onClickFunc={handlePackageType}
          />
          <PackageType
            FillIcon={IoDocumentText}
            LightIcon={IoDocumentTextOutline}
            packageType="Documents"
            selectedPackageType={package_type}
            onClickFunc={handlePackageType}
          />
          <PackageType
            FillIcon={PiPackageFill}
            LightIcon={PiPackageLight}
            packageType="Clothes"
            selectedPackageType={package_type}
            onClickFunc={handlePackageType}
          />
          <PackageType
            FillIcon={RiArchiveStackFill}
            LightIcon={RiArchiveStackLine}
            packageType="Bulky Items"
            selectedPackageType={package_type}
            onClickFunc={handlePackageType}
          />
          <PackageType
            FillIcon={PiWineFill}
            LightIcon={PiWineLight}
            packageType="Fragile"
            selectedPackageType={package_type}
            onClickFunc={handlePackageType}
          />
          <PackageType
            FillIcon={PiPackageFill}
            LightIcon={PiPackageLight}
            packageType="Others"
            selectedPackageType={package_type}
            onClickFunc={handlePackageType}
          />

        </>
    )
}

const PackageType = ({packageType, onClickFunc, LightIcon, FillIcon, selectedPackageType}: {packageType: string, onClickFunc: (packageType:string)=>void, LightIcon: any, FillIcon:any, selectedPackageType: string})=> {
    return (
      <div
        className={`flex flex-col items-center p-2 group hover:bg-blue-500 text-blue-500 hover:text-white font-bold rounded-md border border-blue-500 hover:border-none cursor-pointer ${
          packageType === selectedPackageType
            ? "bg-blue-500  text-white border-none"
            : ""
        }`}
        onClick={() => onClickFunc(packageType)}
      >
        <span className="flex items-center justify-center relative group-hover:text-white   w-14 h-12 rounded-lg border-slate-300">
          <LightIcon
            className={`text-3xl group-hover:opacity-0 ${
              packageType === selectedPackageType ? "opacity-0" : ""
            }`}
          />
          <FillIcon
            className={`text-3xl opacity-0 absolute group-hover:opacity-100 ${
              packageType === selectedPackageType ? "opacity-100" : ""
            }`}
          />
        </span>
        <p className="text-[13px] group-hover:text-white">{packageType}</p>
      </div>
    );
  }