'use client'
import { useRouter } from "next/router";

import { useAppDispatch } from "@/lib/store/hooks"
import { setUserState } from "@/lib/store/slice/userSlice";
import { setAuthState } from "@/lib/store/slice/authSlice";
import { supabaseSignIn } from "@/lib/supabaseAuth";

export const signIn = async ({data}:{data:any}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();    
        const signInData= await supabaseSignIn(data);
        if (signInData.error) {
            return {error: "Error occurred signing in"}
        }
        
        if (signInData.user) {
            
          dispatch(setAuthState(true))
          dispatch(setUserState({
            user_id: signInData.user.user_id,
            first_name: signInData.user.first_name,
            last_name: signInData.user.last_name,
              email: signInData.user.email,
              user_role: signInData.user.user_role,
              onboard: signInData.user.onboard
          
            }))
            
          const onboard = signInData.user.onboard;
            onboard ? router.push('/profile') : router.push('/onboarding')
        }
}

