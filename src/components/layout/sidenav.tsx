
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
  BarChart3,
  Network,
  Database,
  Sparkles,
  Target,
  Library,
  PenSquare,
  Inbox,
  MailCheck,
  Filter,
  Ban,
  Share2,
  History,
  Settings,
  GitBranch,
} from 'lucide-react';
import React from 'react';
import { useRole } from '@/hooks/use-role';

const allNavItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['operator', 'analyst', 'admin'] },
  { href: '/market-mapping', icon: Network, label: 'Market Mapping', roles: ['analyst', 'admin'] },
  { href: '/data-sources', icon: Database, label: 'Data Sources', roles: ['admin'] },
  { href: '/enrichment', icon: Sparkles, label: 'Enrichment', roles: ['analyst', 'admin'] },
  { href: '/fit-scoring', icon: Target, label: 'Fit Scoring', roles: ['analyst', 'admin'] },
  { href: '/segments', icon: Users, label: 'Segments', roles: ['operator', 'admin'] },
  { href: '/personalization-library', icon: Library, label: 'Personalization Library', roles: ['admin'] },
  { href: '/campaign-studio', icon: PenSquare, label: 'Campaign Studio', roles: ['operator', 'admin'] },
  { href: '/sequence-editor', icon: GitBranch, label: 'Sequence Editor', roles: ['admin'] },
  { href: '/inbox-manager', icon: Inbox, label: 'Inbox Manager', roles: ['admin'] },
  { href: '/deliverability', icon: MailCheck, label: 'Deliverability', roles: ['admin'] },
  { href: '/leads', icon: Filter, label: 'Lead Triage', roles: ['operator', 'admin'] },
  { href: '/dnc-suppression', icon: Ban, label: 'DNC / Suppression', roles: ['admin'] },
  { href: '/referral-hub', icon: Share2, label: 'Referral Hub', roles: ['operator', 'admin'] },
  { href: '/reports', icon: BarChart3, label: 'Reports', roles: ['analyst', 'admin'] },
  { href: '/audit-log', icon: History, label: 'Audit Log', roles: ['admin'] },
  { href: '/settings', icon: Settings, label: 'Settings', roles: ['admin'] },
];

export function SideNav() {
  const pathname = usePathname();
  const { role } = useRole();

  const navItems = React.useMemo(() => {
    return allNavItems.filter(item => item.roles.includes(role));
  }, [role]);

  return (
    <div className="flex h-full flex-col">
      <SidebarHeader className="border-b md:hidden">
        <div className="flex items-center gap-2 p-2">
          <Sparkles className="h-8 w-8 text-accent" />
          <h1 className="text-xl font-semibold">Paragon Engage</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
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
