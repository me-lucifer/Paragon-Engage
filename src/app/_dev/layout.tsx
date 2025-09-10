
'use client';

import { RoleProvider, useRole } from "@/hooks/use-role";
import { AccessDenied } from "@/components/access-denied";
import { Header } from "@/components/layout/header";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { SideNav } from "@/components/layout/sidenav";

function DevLayoutContent({ children }: { children: React.ReactNode }) {
  const { role } = useRole();

  const hasPermission = role === 'admin';

  return (
     <SidebarProvider>
      <Sidebar>
        <SideNav />
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
          <div className="mt-4">
            {hasPermission ? children : <AccessDenied />}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
        <DevLayoutContent>{children}</DevLayoutContent>
    </RoleProvider>
  );
}
