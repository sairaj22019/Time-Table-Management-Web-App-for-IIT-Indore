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
          <SidebarTrigger />
          {children}
      </main>
      </div>
    </SidebarProvider>
    </SessionProvider>
  );
}
