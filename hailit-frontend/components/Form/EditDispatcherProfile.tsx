import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import {useForm, SubmitHandler} from 'react-hook-form';
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setFormSubmissionError, setFormSubmissionLoading } from "@/lib/store/formSlice";

import { updateUserDetails } from "./FormSubmission";
import { setOnboardingStages } from "@/lib/store/slice/onBoardingSlice";
import { setUserState } from "@/lib/store/slice/userSlice";
import { DispatcherDetails } from "@/lib/store/slice/onBoardingSlice";


export default function DispatcherProfile() {

  const dispatch = useAppDispatch();
  const path = usePathname();
  const {register, handleSubmit } = useForm<DispatcherDetails>();
  const inputAndLabeClass = "w-full max-w-sm items-center";
  const labelClass = "text-sm font-medium mb-1";

  const {email, user_id} = useAppSelector(state=>state.user);
  const {chosenRole} = useAppSelector(state=>state.onBoarding)
  const onCustomerFormSubmit:SubmitHandler<DispatcherDetails> = async (data)=> {
    let user_role = chosenRole;
    if (chosenRole ==='dispatcher') {
      user_role = 'rider';
    }
    const newUserData = {...data, onboard:true, user_role}
    const oldUserData = {...data, user_role}

    let submitForm = await updateUserDetails({data:oldUserData, user_id});
    if (path.startsWith('/onboarding')) {

       submitForm = await updateUserDetails({data:newUserData, user_id});
      
    }

    dispatch(setFormSubmissionLoading(true))
    console.log('submit form', submitForm)

    if (submitForm.error) {
      dispatch(setFormSubmissionLoading(false))
      dispatch(setFormSubmissionError(true))
      
    } 
    
    if (submitForm.user) {
      dispatch(setOnboardingStages({
        stageOne: true,
        stageTwo: true,
        stageThree: true
    }))

      dispatch(setUserState({
        email: submitForm.user.email,
        first_name: submitForm.user.first_name,
        last_name: submitForm.user.last_name,
        onboard: submitForm.user.onboard,
        user_id: submitForm.user.user_id,
        user_role: submitForm.user.user_role,
      }))
    
  }
}


  return (
    <form className="w-full flex flex-col items-center justify-center gap-3 " id="customerProfileUpdate" onSubmit={handleSubmit(onCustomerFormSubmit)}>
      
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
          <h3 className={labelClass}>Licence Number</h3>
          <Input type="text" placeholder="License Number" className="h-14" {...register("license_number")} required />
        </div>
      <div className={inputAndLabeClass}>
        <h3 className={labelClass}>Phone Number</h3>
        <Input type="number" placeholder="024 123 4567" className="h-14" {...register("phone_number")} required />
      </div>
      
      
                  
    </form>
  );
}
