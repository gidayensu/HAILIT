import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Loader from "../Shared/Loader";

//redux
import { useAppDispatch } from "@/lib/store/hooks";
import { setAuthState } from "@/lib/store/slice/authSlice";
import { setUserState } from "@/lib/store/slice/userSlice";

//react
import { useState, useEffect } from "react";

//react-hook-forms
import {useForm, SubmitHandler} from 'react-hook-form';

//supabase


import {   supabaseSignUp, supabaseSignIn, googleSupabaseSignIn  } from "@/lib/supabaseAuth";
//types
import type { Inputs } from "@/lib/supabaseAuth";

export default function LoginSignUp () {
  
    const [dataFetchError, setDataFetchError] = useState<boolean>(false);
  const [formSubmissionLoading, setFormSubmissionLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDataFetchError(false);
    }, 2000);

    return () => clearTimeout(timeoutId); 
  }, [dataFetchError]);

  const router = useRouter();

  
  const {register, handleSubmit} = useForm<Inputs>();

  //sign up form submission
  const onSignUpSubmit: SubmitHandler<Inputs> = async (data)=> {
    const signUpData = await supabaseSignUp(data);
    if (signUpData.error) {
      setFormSubmissionLoading(false)
      setDataFetchError(true)
    }
    
    if (signUpData.user) {
      setFormSubmissionLoading(false)
      dispatch(setAuthState(true))
      
    
      dispatch(setUserState({
        user_id: signUpData.user.user_id,
        first_name: signUpData.user.first_name,
        last_name: signUpData.user.last_name,
          email: signUpData.user.email,
          user_role: signUpData.user_role,
          onboard: signUpData.user.onboard
      
        }))
        
      const onboard = signUpData.user.onboard;
        onboard ? router.push('/profile') : router.push('/onboarding')
    }
  }
  
  //signin form submission
  const onSignInSubmit:SubmitHandler<Inputs> = async (data)=> {
    setFormSubmissionLoading(true)
    const signInData= await supabaseSignIn(data);
    if (signInData.error) {
      setFormSubmissionLoading(false)
      setDataFetchError(true)
    }
    
    if (signInData.user) {
    
      
      setFormSubmissionLoading(false)
      dispatch(setAuthState(true))
      
      dispatch(setUserState({
        user_id: signInData.user.user_id,
        first_name: signInData.user.first_name,
        last_name: signInData.user.last_name,
          email: signInData.user.email,
          user_role: signInData.user_role,
          onboard: signInData.user.onboard
      
        }))
        

      const onboard = signInData.user.onboard;
        onboard ? router.push('/') : router.push('/onboarding')
    }
    
  }
  
  //google sign in
  const googleSignIn = async ()=> {
    setFormSubmissionLoading(true)
    const signInData = await googleSupabaseSignIn()
    if (!signInData) {
      setFormSubmissionLoading(false)
      setDataFetchError(true)
    }
    if (signInData) {

      setFormSubmissionLoading(false)
    }
  }

  
    return (
        <Tabs defaultValue="login" className="w-80 sm:w-[400px] mt-0 sm:mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          {/* SIGN UP TAB */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Create an Account to request for delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <form onSubmit={handleSubmit(onSignUpSubmit)}>
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input id="current" type="email" {...register("email")} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Password</Label>
                  <Input id="new" type="password" {...register("password")} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Confirm Password</Label>
                  <Input id="new" type="password" />
                </div>
                <Button className="w-full h-12 mt-4" type="submit">Sign Up</Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                
                <div className="flex gap-4 justify-center items-center">
                  <Separator className="w-32" />
                  <p className="text-sm">or</p>
                  <Separator className="w-32" />
                </div>
                <Button
                  variant="outline"
                  className="w-full border border-slate-300 h-12 flex gap-4"
                >
                  
                  <FcGoogle className="text-2xl" /> Continue with Google
                </Button>
                
              </CardFooter>
            </Card>
          </TabsContent>

      {/* LOGIN TAB */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Log into your account here</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <form onSubmit={handleSubmit(onSignInSubmit)}>
                  
                <div className="space-y-1">
                  <Label htmlFor="name">Email</Label>
                  <Input id="name" placeholder="example@email.com" type="email" {...register("email")}    required  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Password</Label>
                  <Input id="username" placeholder="Password" type="password" 
                  {...register("password")} required
                  />
                </div>
                <Button className="w-full h-12 mt-4" type="submit">{formSubmissionLoading ? <Loader color="#fff23"/> : 'Login'}</Button>
                {dataFetchError && (
                  <div className="flex items-center justify-center w-full  text-red-500">
                      <p>Error Occurred!</p>
                  </div>
                )}
                </form>
              </CardContent>
 
              <CardFooter className="flex flex-col gap-2">
                <div className="flex gap-4 justify-center items-center">
                  <Separator className="w-32" />
                  <p className="text-sm">or</p>
                  <Separator className="w-32" />
                </div>
                <Button
                  variant="outline"
                  className="w-full border border-slate-300 h-12 flex gap-4"
                  onClick={googleSignIn}
                >
                  {formSubmissionLoading ? <Loader color="#3b82f6"/>
   : <p className="flex items-center justify-center gap-2"><FcGoogle className="text-2xl" /> Continue with Google</p>}
                  
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

    )
}