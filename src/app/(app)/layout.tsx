import { Header } from "@/components/layout/header";
import { SideNav } from "@/components/layout/sidenav";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { RoleProvider } from "@/hooks/use-role";

function Footer() {
  return (
    <footer className="p-4 text-center text-sm text-muted-foreground">
      Paragon Engage – Prototype. Sample data for demonstration only.
    </footer>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <SidebarProvider>
        <Sidebar>
          <SideNav />
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
            {children}
          </main>
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </RoleProvider>
  );
}
