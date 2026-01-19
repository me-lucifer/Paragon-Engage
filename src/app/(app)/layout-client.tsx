'use client';

import { Header } from "@/components/layout/header";
import { SideNav } from "@/components/layout/sidenav";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { RoleProvider, useRole } from "@/hooks/use-role";
import { allNavGroups } from "@/components/layout/sidenav";
import { defaultPermissions } from "@/components/roles-matrix";
import { usePathname, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const { role } = useRole();

  const currentPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  const navItems = allNavGroups.flatMap(group =>
    group.items.flatMap(item => (item.subItems ? item.subItems : item))
  );

  let currentNavItem = navItems.find(item => item.href === currentPath);

  if (!currentNavItem) {
      currentNavItem = navItems.find(item => item.href.split('?')[0] === pathname);
  }

  const hasPermission = currentNavItem
    ? defaultPermissions[currentNavItem.label as keyof typeof defaultPermissions]?.[role]?.includes('View')
    : true; // Allow access to non-menu pages like /dashboard or pages not in nav


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

export default function AppLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </RoleProvider>
  );
}
