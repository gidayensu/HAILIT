import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import "./globals.css";
import { BottomNavBar } from "@/components/Nav/BottomNavBar";
import { TopNavBar } from "@/components/Nav/TopNavBar";
import Providers from "@/lib/store/redux-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hail It",
  description: "Your Deliveries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
    <html lang="en">
      <body className={inter.className}>
        
        <ThemeProvider
        attribute="class"
        defaultTheme="system" >
        <TopNavBar/>
        {children}
        <BottomNavBar/>
        </ThemeProvider>
        </body>
    </html>
        </Providers>
  );
}
