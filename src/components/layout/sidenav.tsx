'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  Activity,
  Lightbulb,
  BarChart3,
  Flame,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/leads', icon: Users, label: 'Lead Management' },
  { href: '/engagement', icon: Activity, label: 'Engagement' },
  { href: '/recommendations', icon: Lightbulb, label: 'Recommendations' },
  { href: '/reports', icon: BarChart3, label: 'Reporting' },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 p-2">
          <Flame className="h-8 w-8 text-accent" />
          <h1 className="text-xl font-semibold">Paragon Engage</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </div>
  );
}
