
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
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
  ChevronDown,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useRole } from '@/hooks/use-role';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const allNavGroups = [
  {
    title: 'HOME',
    roles: ['operator', 'analyst', 'admin'],
    items: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['operator', 'analyst', 'admin'] },
    ],
  },
  {
    title: 'PIPELINE',
    roles: ['analyst', 'admin'],
    items: [
      { href: '/market-mapping', icon: Network, label: 'Industry Mapper', roles: ['analyst', 'admin'] },
      { href: '/data-sources', icon: Database, label: 'Data Sources', roles: ['admin'] },
      { href: '/enrichment', icon: Sparkles, label: 'Enrichment', roles: ['analyst', 'admin'] },
      { href: '/fit-scoring', icon: Target, label: 'Fit Scoring', roles: ['analyst', 'admin'] },
    ],
  },
  {
    title: 'OUTREACH',
    roles: ['operator', 'admin'],
    items: [
      { href: '/segments', icon: Users, label: 'Segments', roles: ['operator', 'admin'] },
      { href: '/personalization-library', icon: Library, label: 'Personalization Library', roles: ['operator', 'admin'] },
      { href: '/campaign-studio', icon: PenSquare, label: 'Campaign Studio', roles: ['operator', 'admin'] },
      { href: '/sequence-editor', icon: GitBranch, label: 'Sequences', roles: ['admin'] },
      { href: '/inbox-manager', icon: Inbox, label: 'Inbox Manager', roles: ['admin'] },
      { href: '/deliverability', icon: MailCheck, label: 'Deliverability', roles: ['admin'] },
      { href: '/leads', icon: Filter, label: 'Lead Triage', roles: ['operator', 'admin'] },
      { href: '/referral-hub', icon: Share2, label: 'Referral Hub', roles: ['operator', 'admin'] },
    ],
  },
  {
    title: 'GOVERNANCE',
    roles: ['admin'],
    items: [
      { href: '/dnc-suppression', icon: Ban, label: 'DNC / Suppression', roles: ['admin'] },
      { href: '/audit-log', icon: History, label: 'Audit Log', roles: ['admin'] },
      { href: '/settings', icon: Settings, label: 'Settings', roles: ['admin'] },
    ]
  },
  {
      title: 'ANALYTICS',
      roles: ['analyst', 'admin'],
      items: [
        { href: '/reports', icon: BarChart3, label: 'Reports', roles: ['analyst', 'admin'] },
      ]
  }
];


export function SideNav() {
  const pathname = usePathname();
  const { role } = useRole();
  const { state: sidebarState, isMobile } = useSidebar();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const storedState = localStorage.getItem('sidebarSections');
      if (storedState) {
        setOpenSections(JSON.parse(storedState));
      } else {
        // Default all to open if nothing in storage
        const defaultState = allNavGroups.reduce((acc, group) => {
          acc[group.title] = true;
          return acc;
        }, {} as Record<string, boolean>);
        setOpenSections(defaultState);
      }
    } catch (error) {
        console.error("Failed to access localStorage", error);
        // Fallback to default open
        const defaultState = allNavGroups.reduce((acc, group) => {
            acc[group.title] = true;
            return acc;
          }, {} as Record<string, boolean>);
        setOpenSections(defaultState);
    }
  }, []);

  const toggleSection = (title: string) => {
    const newState = { ...openSections, [title]: !openSections[title] };
    setOpenSections(newState);
     try {
        localStorage.setItem('sidebarSections', JSON.stringify(newState));
    } catch (error) {
        console.error("Failed to write to localStorage", error);
    }
  };

  const navGroups = React.useMemo(() => {
    return allNavGroups
      .filter(group => group.roles.includes(role))
      .map(group => ({
        ...group,
        items: group.items.filter(item => item.roles.includes(role)),
      }))
      .filter(group => group.items.length > 0);
  }, [role]);

  return (
    <div className="flex h-full flex-col">
       <div className={cn("p-4 flex items-center justify-center", sidebarState === 'expanded' && 'justify-start')}>
        <Link href="/dashboard" className={cn("flex items-center gap-3", sidebarState === 'collapsed' && 'justify-center')}>
          <Tooltip>
            <TooltipTrigger asChild>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    PE
                </div>
            </TooltipTrigger>
             <TooltipContent side="right" align="center" hidden={sidebarState !== "collapsed" || isMobile}>
                Paragon Engage
            </TooltipContent>
          </Tooltip>
          {sidebarState === 'expanded' && (
            <>
                <span className="text-lg font-semibold text-sidebar-primary-foreground">
                    Paragon Engage
                </span>
                <span className="ml-auto rounded-full border border-accent px-1.5 py-0.5 text-xs text-accent">
                    Prototype
                </span>
            </>
          )}
        </Link>
      </div>
      <Separator className="bg-[#E5E7EB]" />
      <SidebarContent className="p-2">
        {navGroups.map((group, groupIndex) => (
          <Collapsible 
            key={group.title} 
            open={openSections[group.title] !== false} // Default to open if not set
            onOpenChange={() => toggleSection(group.title)}
            className={cn(groupIndex > 0 && "mt-4")}
        >
            <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-1 text-xs font-semibold uppercase text-muted-foreground hover:text-foreground">
                {group.title}
                <ChevronDown className="h-4 w-4 transition-transform [&[data-state=open]]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
                <SidebarMenu>
                {group.items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                        <SidebarMenuButton
                        className={cn(
                            "w-full justify-start gap-2 rounded-md p-3 h-auto hover:bg-[#F0FAFE]",
                             pathname === item.href && "sidebar-menu-button-active"
                        )}
                        tooltip={{ children: item.label }}
                        >
                        <item.icon className="h-[18px] w-[18px]" />
                        <span>{item.label}</span>
                        </SidebarMenuButton>
                    </Link>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarContent>
    </div>
  );
}
