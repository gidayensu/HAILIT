'use client'
import DispatcherBottomNav from "@/components/Dispatcher/DispatcherBottomNav";
import { DispatcherTopNav } from "@/components/Dispatcher/DispatcherTopNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <>
    <DispatcherTopNav/>
 
    {children}
    <DispatcherBottomNav/>
    

    </>
    
    
        
  );
}
