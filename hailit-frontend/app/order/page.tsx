"use client";
//ui + icons
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

//main components
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";

import NewOrderForm from "@/components/Form/NewOrderForm";

export default function NewOrder() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-5xl font-bold ">Package details</span>
          <p className="text-lg">Enter details of your package</p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-start items-center p-10 mb-20">
          <form className="w-full space-y-6">
            <NewOrderForm />
            
          </form>
        </MiddleSectionContainer>
      </main>
    </>
  );
}
