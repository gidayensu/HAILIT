import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import {Separator} from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


export function AccountAccess() {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button  className="h-14 w-60">Sign Up</Button>
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
          
          <div className="space-y-1">
            <Label >Email</Label>
            <Input id="current" type="email" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">Password</Label>
            <Input id="new" type="password" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">Confirm Password</Label>
            <Input id="new" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <Button className="w-full h-12">Sign Up</Button>
            <div className="flex gap-4 justify-center items-center">
                <Separator className="w-32"/>
                <p className="text-sm">or</p>
                <Separator className="w-32"/>
            </div>
            <Button variant='outline' className="w-full border border-slate-300 h-12 flex gap-4"> <FcGoogle className="text-2xl"/> Continue with Google</Button>
        </CardFooter>
      </Card>
    </TabsContent>
 
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Log into your account here
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Email</Label>
            <Input id="name" placeholder="example@email.com" type="text" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full h-12">Login</Button>
          <div className="flex gap-4 justify-center items-center">
                <Separator className="w-32"/>
                <p className="text-sm">or</p>
                <Separator className="w-32"/>
            </div>
            <Button variant='outline' className="w-full border border-slate-300 h-12 flex gap-4"> <FcGoogle className="text-2xl"/> Continue with Google</Button>
        </CardFooter>
      </Card>
    </TabsContent>
     </Tabs>
    </DialogContent>
  </Dialog>
  )
}

 