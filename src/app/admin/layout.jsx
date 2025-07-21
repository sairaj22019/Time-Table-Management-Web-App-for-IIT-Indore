import AppSidebar from "@/components/sidebar-admin";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({ children }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <main className="w-full">
          <div className="block md:hidden">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
