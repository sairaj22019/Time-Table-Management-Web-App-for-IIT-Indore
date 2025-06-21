// import AppSidebar from "@/components/sidebar-student";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

// export default function RootLayout({ children }) {
//   return (
//     <SidebarProvider defaultOpen={false}>
//       <AppSidebar />
//       <main>
//         <SidebarTrigger />
//         {children}
//       </main>
//     </SidebarProvider>
//   );
// }
import AppSidebar from "@/components/sidebar-student";
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