import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import {useForm, SubmitHandler} from 'react-hook-form';
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { CustomerDetails } from "@/lib/store/slice/onBoardingSlice";
import { updateUserDetails } from "./FormSubmission";
import { setOnboardingStages } from "@/lib/store/slice/onBoardingSlice";
import { setUserState } from "@/lib/store/slice/userSlice";



export default function CustomerProfile() {

  const dispatch = useAppDispatch();
  const path = usePathname();
  const {register, handleSubmit } = useForm<CustomerDetails>();
  const inputAndLabeClass = "w-full max-w-sm items-center";
  const labelClass = "text-sm font-medium mb-1";

  const {email, user_id, user_role} = useAppSelector(state=>state.user);
  const {chosenRole} = useAppSelector(state=>state.onBoarding);
  const onCustomerFormSubmit:SubmitHandler<CustomerDetails> = async (data)=> {
    let userRole = user_role;
    if (chosenRole && chosenRole ==='dispatcher') {
      userRole = 'rider';
    }
    const newUserData = {...data, onboard:true, user_role: userRole}
    const oldUserData = {...data, user_role}
    

    let updateUser = await updateUserDetails({data:oldUserData, user_id});
    if (path.startsWith('/onboarding')) {
       updateUser = await updateUserDetails({data:newUserData, user_id});
    }

    

    if (updateUser.error) {
      return {error: "error occurred"}
    } 
    
    dispatch(setUserState({
      user_id: updateUser.user.user_id,
      first_name: updateUser.user.first_name,
      last_name: updateUser.user.last_name,
        email: updateUser.user.email,
        user_role: updateUser.user_role,
        onboard: updateUser.user.onboard
    
      }))

      dispatch(setOnboardingStages({
        stageOne: true,
        stageTwo: true,
        stageThree: true
    }))
    
  
}


  return (
    <form className="w-full flex flex-col items-center justify-center " id="customerProfileUpdate" onSubmit={handleSubmit(onCustomerFormSubmit)}>
      
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>First Name</h3>
          <Input type="text" placeholder="First Name" className="h-14 " {...register("first_name")} required />
        </div>
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>Last Name</h3>
          <Input type="text" placeholder="Last Name" className="h-14" {...register("last_name")} required />
        </div>
      
      <div className={inputAndLabeClass}>
        <h3 className={labelClass}>Email</h3>
        <Input type="email" placeholder="email@example.com" className="h-14" defaultValue={email} required/>
      </div>
      <div className={inputAndLabeClass}>
        <h3 className={labelClass}>Phone Number</h3>
        <Input type="number" placeholder="024 123 4567" className="h-14" {...register("phone_number")} required />
      </div>
      
      
                  
    </form>
  );
}
