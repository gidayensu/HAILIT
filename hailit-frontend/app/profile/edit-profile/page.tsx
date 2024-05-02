"use client";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TopContent from "@/components/common/top-content";
import MidContent from "@/components/common/mid-content";


export default function EditProfile() {

  const inputAndLabeClass = 'w-full max-w-sm items-center';
  const labelClass = "text-md font-medium mb-2";
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopContent className="">
          <span className="text-5xl font-bold ">Edit Profile</span>
          <p className="text-lg">Edit your details and preferences</p>
        </TopContent>

        <MidContent className="flex flex-col justify-center items-center gap-6 bg-white w-full -mt-20 rounded-tr-[50px] p-10 mb-20">
          
            <form
              
              className="w-full space-y-6"
            >
                <div className="grid grid-cols-2 gap-4">
                    <div className={inputAndLabeClass}>
                        <h3 className="text-md font-medium mb-2">First Name</h3>
                        <Input  type="text" placeholder="First Name" className="h-14" />
                    </div>
                    <div className={inputAndLabeClass}>
                        <h3 className={labelClass}>Last Name</h3>
                        <Input  type="text" placeholder="Last Name" className="h-14" />
                    </div>
              </div>
                <div className={inputAndLabeClass}>
                        <h3 className={labelClass}>Email</h3>
                        <Input  type="email" placeholder="email@example.com" className="h-14" />
                </div>
                <div className={inputAndLabeClass}>
                        <h3 className={labelClass}>Phone Number</h3>
                        <Input  type="number" placeholder="024 123 4567" className="h-14" />
                    </div>
                <div>
                
              </div>

              <Button type="submit" className="w-full h-14">
                Save
              </Button>
            </form>
          
        </MidContent>
      </main>
    </>
  );
}
