
'use client';

import { Header } from "@/components/layout/header";
import { SideNav } from "@/components/layout/sidenav";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { RoleProvider, useRole } from "@/hooks/use-role";
import { allNavGroups } from "@/components/layout/sidenav";
import { defaultPermissions } from "@/components/roles-matrix";
import { usePathname } from "next/navigation";
import { AccessDenied } from "@/components/access-denied";

function Footer() {
  return (
    <footer className="p-4 text-center text-sm text-muted-foreground">
      Paragon Engage – Prototype. Sample data for demonstration only.
    </footer>
  );
}

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role } = useRole();

  const currentNavItem = allNavGroups
    .flatMap(group => group.items)
    .find(item => item.href === pathname);

  const hasPermission = currentNavItem
    ? defaultPermissions[currentNavItem.label as keyof typeof defaultPermissions]?.[role]?.includes('View')
    : true; // Allow access to non-menu pages like /dashboard

  return (
    <SidebarProvider>
      <Sidebar>
        <SideNav />
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
          <Breadcrumbs />
          <div className="mt-4">
            {hasPermission ? children : <AccessDenied />}
          </div>
        </main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </RoleProvider>
  );
}
