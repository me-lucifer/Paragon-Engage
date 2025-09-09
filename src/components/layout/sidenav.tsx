
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

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/market-mapping', icon: Network, label: 'Market Mapping' },
  { href: '/data-sources', icon: Database, label: 'Data Sources' },
  { href: '/enrichment', icon: Sparkles, label: 'Enrichment' },
  { href: '/fit-scoring', icon: Target, label: 'Fit Scoring' },
  { href: '/segments', icon: Users, label: 'Segments' },
  { href: '/personalization-library', icon: Library, label: 'Personalization Library' },
  { href: '/campaign-studio', icon: PenSquare, label: 'Campaign Studio' },
  { href: '/sequence-editor', icon: GitBranch, label: 'Sequence Editor' },
  { href: '/inbox-manager', icon: Inbox, label: 'Inbox Manager' },
  { href: '/deliverability', icon: MailCheck, label: 'Deliverability' },
  { href: '/leads', icon: Filter, label: 'Lead Triage' },
  { href: '/dnc-suppression', icon: Ban, label: 'DNC / Suppression' },
  { href: '/referral-hub', icon: Share2, label: 'Referral Hub' },
  { href: '/reports', icon: BarChart3, label: 'Reports' },
  { href: '/audit-log', icon: History, label: 'Audit Log' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <SidebarHeader className="border-b md:hidden">
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
