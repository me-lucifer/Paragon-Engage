'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { allNavGroups } from '@/components/layout/sidenav';
import { useRole } from '@/hooks/use-role';

export function Breadcrumbs() {
  const pathname = usePathname();
  const { role } = useRole();
  let currentGroup: string | null = null;
  let currentItem: { href: string; label: string } | null = null;

  for (const group of allNavGroups) {
    if (group.roles.includes(role)) {
      for (const item of group.items) {
        if (pathname === item.href && item.roles.includes(role)) {
          currentGroup = group.title;
          currentItem = item;
          break;
        }
      }
    }
    if (currentItem) break;
  }

  if (!currentItem || pathname === '/dashboard') {
    return null;
  }

  return (
    <nav className="flex items-center text-sm font-medium">
      <span className="text-gray-600 dark:text-gray-400">{currentGroup}</span>
      <ChevronRight className="h-4 w-4 mx-1 text-gray-400 dark:text-gray-500" />
      <span className="text-gray-800 dark:text-gray-200">{currentItem.label}</span>
    </nav>
  );
}
