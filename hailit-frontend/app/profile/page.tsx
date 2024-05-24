"use client";
//next, redux, react, and supabase

import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";

//main components
import Authentication from "@/components/Profile/Authentication";
import ProfilePageDetails from "@/components/Profile/ProfilePageDetail";

export type CurrentTheme = string | undefined;

export default function Profile() {
  const router = useRouter();
  //getting data from redux store
  const { authenticationState } = useAppSelector((state) => state.auth);
  const { onboard } = useAppSelector((state) => state.user);

  if (authenticationState && !onboard) {
    router.push("/onboarding");
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 mb-32">
        {!authenticationState && <Authentication />}
        {authenticationState && (
          
            <ProfilePageDetails />
          
        )}
      </main>
    </>
  );
}
