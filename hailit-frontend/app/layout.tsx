import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { BottomBar } from "@/components/bottom-bar";
import { ThemeToggle } from "@/components/theme-toggle";
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
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
        attribute="class"
        defaultTheme="system" >
        <ThemeToggle/>
        {children}
        <BottomBar/>
        </ThemeProvider>
        </body>
    </html>
  );
}
