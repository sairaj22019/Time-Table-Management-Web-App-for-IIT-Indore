"use client"

import AppSidebar from "@/components/sidebar-student";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {

  return (
    <SessionProvider>
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <main className="w-full">
          <div className="block md:hidden bg-gradient-to-r from-sky-100 via-white to-sky-200 fixed z-50 w-full h-7">
            <SidebarTrigger />
          </div>
          <div className="mt-7 md:mt-0">
            {children}
          </div>
      </main>
      </div>
    </SidebarProvider>
    </SessionProvider>
  );
}
