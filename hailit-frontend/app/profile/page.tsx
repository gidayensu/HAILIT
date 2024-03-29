'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

type SignUpState = {
  first_name: string,
  last_name: string, 
  email: string,
  phone_number: string,
  password: string
}

type LoginState = {
  email: string,
  password: string, 
}

type Login = boolean; 

export default function Home() {
  const router = useRouter(); 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       
       
       
          </main>
  );
}
