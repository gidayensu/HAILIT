//ui + icons
'use client'
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

//redux
import { useAppDispatch } from "@/lib/store/hooks";
import { setAuthState } from "@/lib/store/slice/authSlice";
import { setUserState } from "@/lib/store/slice/userSlice";

//react
import { useState, useEffect } from "react";

//react-hook-forms
import {useForm, SubmitHandler} from 'react-hook-form';

//supabase

import {  supabaseSession, supabaseSignUp, supabaseSignIn, supabaseSignOut } from "@/lib/supabaseAuth";

import type { Inputs } from "@/lib/supabaseAuth";


export default function AccountAccess() {
  //set data fetch error to display error message
  const [dataFetchError, setDataFetchError] = useState<boolean>(false);
  const [formSubmissionLoading, setFormSubmissionLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDataFetchError(false);
    }, 2000);

    return () => clearTimeout(timeoutId); // Cleanup function
  }, [dataFetchError]);

  const router = useRouter();

  
  const {register, handleSubmit} = useForm<Inputs>();
  const onSignUpSubmit: SubmitHandler<Inputs> = (data)=> {
    supabaseSignUp(data)
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
        user_id: signInData.user[0].user_id,
        first_name: signInData.user[0].first_name,
        last_name: signInData.user[0].last_name,
          email: signInData.user[0].email,
          onboard: signInData.user[0].onboard
      
        }))
        
      const onboard = signInData.user[0].onboard;
        onboard ? router.push('/profile') : router.push('/onboarding')
    }
    
  }
  

  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-14 w-60">Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex justify-center items-center">
        <Tabs defaultValue="account" className="w-80 sm:w-[400px] mt-0 sm:mt-4">
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
                  <Input id="current" type="email" {...register("email")}/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Password</Label>
                  <Input id="new" type="password" {...register("password")}/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Confirm Password</Label>
                  <Input id="new" type="password" />
                </div>
                <Button className="w-full h-12" type="submit">Sign Up</Button>
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
                  <Input
                    id="name"
                    placeholder="example@email.com"
                    type="text"
                    {...register("email")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Password</Label>
                  <Input id="username" placeholder="Password" type="password" 
                  {...register("password")}
                  />
                </div>
                <Button className="w-full h-12" type="submit">{formSubmissionLoading ? 'Loading...' : 'Login'}</Button>
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
                >
                  
                  <FcGoogle className="text-2xl" /> Continue with Google
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

