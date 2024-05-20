"use client";

//main components
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import CustomerProfile from "@/components/Form/CustomerProfile";
//ui components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditProfile() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopSectionContainer className="">
          <span className="text-5xl font-bold ">Edit Profile</span>
          <p className="text-lg">Edit your details and preferences</p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-center items-center gap-6 bg-white w-full -mt-20 rounded-tr-[50px] p-10 mb-20">
          <form className="w-full space-y-6">
            <CustomerProfile />

            <Button type="submit" className="w-full h-14">
              Save
            </Button>
          </form>
        </MiddleSectionContainer>
      </main>
    </>
  );
}
