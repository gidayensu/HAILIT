import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import { IoIosHelpCircle, IoIosHelpCircleOutline } from "react-icons/io";
import { IoLogOut, IoLogOutOutline, IoDocumentText, IoDocumentTextOutline, IoShareSocial, IoShareSocialOutline } from "react-icons/io5";
import { MdSportsMotorsports, MdOutlineSportsMotorsports, MdFeedback, MdOutlineFeedback } from "react-icons/md";
import { PiUserCircleFill, PiUserCircle } from "react-icons/pi";
import { RiFileListFill, RiFileListLine, RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import MiddleSectionContainer from "../Shared/MiddleSectionContainer";
import TopSectionContainer from "../Shared/TopSectionContainer";
import ChangePassword from "./ChangePassword";
import CustomerHelp from "./CustomerHelp";
import Feedback from "./Feedback";
import PrivacyPolicy from "./PrivacyPolicy";
import { ProfileDialog } from "./ProfileDialog";
import { ProfileNonDialogItem } from "./ProfileNonDialog";
import ShareHailit from "./ShareHailit";
import { setAuthState } from "@/lib/store/slice/authSlice";
import { logUserOut } from "@/lib/store/slice/userSlice";
import { supabaseSignOut } from "@/lib/supabaseAuth";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { usePathname } from "next/navigation";

export type CurrentTheme = string | undefined;

export default function ProfilePageDetails () {

    const path = usePathname();
  const dispatch = useAppDispatch();
    const {first_name, email, last_name} = useAppSelector((state)=>state.user);
    
      //signOut
  const handleSignOut = ()=> {
    dispatch(logUserOut())
    supabaseSignOut();
    dispatch(setAuthState(false));

  }  

  const iconsAndTextMainContainerClass = "flex flex-col gap-2 md:w-96 md:text-3xl";
  
    const iconTextClass = "text-sm";
    return(
        <>
          
        <TopSectionContainer className="justify-center items-center">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-center">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 w-16 h-16 rounded-full"></span>
              <p className="absolute z-10 font-bold ">{first_name[0]}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col items-center gap-1 text-white">
                <h2 className="text-2xl font-semibold">{first_name + ' ' + last_name}</h2>
                <p className={iconTextClass}>{email}</p>
                <p className={iconTextClass}>{' '}</p>
              </div>
            </div>
          </div>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col gap-3 bg-white w-full -mt-20 rounded-tr-[50px] p-5 md:items-center md:justify-center">
          {/* Account section */}
          <h2 className="font-bold text-md"> Account</h2>

          <div className={iconsAndTextMainContainerClass}>
            {
            !path.startsWith('/dispatcher') &&
            <Link href={"/profile/all-orders"}>
            <ProfileNonDialogItem
                  IconFill={RiFileListFill}
                  IconOutline={RiFileListLine}
                >
                  <p className="text-sm"> Orders </p>
                </ProfileNonDialogItem>
              
            </Link>
            }

            <Link href={"/profile/edit-profile"}>
            <ProfileNonDialogItem
                    IconFill={PiUserCircleFill}
                    IconOutline={PiUserCircle}
                  >
                    <p className="text-sm"> Edit profile </p>
                  </ProfileNonDialogItem>
            </Link>

            <ProfileDialog
                  IconFill={RiLockPasswordFill}
                  IconOutline={RiLockPasswordLine}
                  iconText="Change password"
                >
                  <ChangePassword />
                </ProfileDialog>
            {!path.startsWith('/dispatcher') &&

                <ProfileDialog
                  IconFill={MdSportsMotorsports}
                  IconOutline={MdOutlineSportsMotorsports}
                  iconText="Switch to Rider"
                >
                  <ChangePassword />
                </ProfileDialog>
            }

            

                <ProfileNonDialogItem
                  IconFill={IoLogOut}
                  IconOutline={IoLogOutOutline}
                >
                  <p onClick={handleSignOut} className="text-sm">
                    Sign out
                  </p>
                </ProfileNonDialogItem>
          </div>
          
          {/* General Section */}
          <h2 className="font-bold text-md mt-2"> General</h2>
          

          <div className={iconsAndTextMainContainerClass}>
          <ProfileDialog
                  IconFill={IoDocumentText}
                  IconOutline={IoDocumentTextOutline}
                  iconText="Privacy policy"
                >
                  <ScrollArea className="max-h-[500px] max-w-[300px]  rounded-md">
                    <PrivacyPolicy />
                  </ScrollArea>
                </ProfileDialog>

                <ProfileDialog
                  IconFill={MdFeedback}
                  IconOutline={MdOutlineFeedback}
                  iconText="Send feedback"
                >
                  <Feedback />
                </ProfileDialog>

                <ProfileDialog
                  IconFill={IoIosHelpCircle}
                  IconOutline={IoIosHelpCircleOutline}
                  iconText="Help"
                >
                  <CustomerHelp />
                </ProfileDialog>

            <ProfileDialog
                  IconFill={IoShareSocial}
                  IconOutline={IoShareSocialOutline}
                  iconText="Share Hailit"
                >
                  <ShareHailit />
                </ProfileDialog>

          </div>
        </MiddleSectionContainer>
        </>
    )
}