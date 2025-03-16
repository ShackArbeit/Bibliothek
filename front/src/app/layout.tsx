import type { Metadata } from "next";

import Navbar from "@/Components/Navbar";
import ThemeProvider from "@/Theme/ThemerProvider";
import "./globals.css";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf]"
      > 
       <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
       >
        <Navbar/>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
