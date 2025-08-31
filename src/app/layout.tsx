import type { Metadata } from "next";
import "./globals.css";
// import { Navbar, NavBody } from "@/components/ui/resizable-navbar";
// import { NavbarDemo } from "@/components/navbar-demo";
import Navbar from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "Yasin.Dev",
  description: "Yasin's Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar></Navbar>
        {/* <NavbarDemo></NavbarDemo> */}
        {children}
      </body>
    </html>
  );
}
