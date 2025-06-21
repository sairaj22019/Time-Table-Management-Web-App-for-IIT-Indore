import AppSidebar from "@/components/sidebar-professor";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({ children }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {children}
      </main>
      </div>
    </SidebarProvider>
  );
}