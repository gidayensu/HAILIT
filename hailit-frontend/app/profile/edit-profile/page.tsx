"use client";

//main components
import TopContent from "@/components/common/top-content";
import MidContent from "@/components/common/mid-content";
import CustomerProfile from "@/components/forms/customer-profile";
//ui components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditProfile() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopContent className="">
          <span className="text-5xl font-bold ">Edit Profile</span>
          <p className="text-lg">Edit your details and preferences</p>
        </TopContent>

        <MidContent className="flex flex-col justify-center items-center gap-6 bg-white w-full -mt-20 rounded-tr-[50px] p-10 mb-20">
          <form className="w-full space-y-6">
            <CustomerProfile />

            <Button type="submit" className="w-full h-14">
              Save
            </Button>
          </form>
        </MidContent>
      </main>
    </>
  );
}
