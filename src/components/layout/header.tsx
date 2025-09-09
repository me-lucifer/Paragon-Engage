
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  ChevronsUpDown,
  File,
  ChevronRight,
} from 'lucide-react';
import React, { useState } from 'react';
import { useRole } from '@/hooks/use-role';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useRouter } from 'next/navigation';

const searchResults = [
  { 
    group: 'PIPELINE',
    items: [
      { name: 'Precision Accounts', route: '/market-mapping' },
      { name: 'Enrichment Profile v1', route: '/enrichment' },
    ]
  },
  {
    group: 'OUTREACH',
    items: [
      { name: 'Campaign: "HF/AM Q4 Pipeline Lift"', route: '/campaign-studio' },
      { name: 'Template: "PE Intro v1"', route: '/personalization-library' },
      { name: 'John Smith (Precision Accounts)', route: '/leads' },
    ]
  },
  {
    group: 'GOVERNANCE',
    items: [
      { name: 'DNC entry: competitor.com', route: '/dnc-suppression' },
    ]
  }
];


export function Header() {
  const { role, setRole } = useRole();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSelect = (route: string) => {
    router.push(route);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      
      <div className="flex w-full items-center gap-4 md:gap-2 lg:gap-4">
        <div className="relative flex-1">
           <Command className="overflow-visible bg-transparent">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <CommandInput
                    placeholder="Search companies, contacts, campaigns…"
                    className="pl-10 h-10"
                    onFocus={() => setOpen(true)}
                    onBlur={() => setOpen(false)}
                />
             </div>
             {open && (
             <div className="absolute top-full mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md z-50">
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {searchResults.map((group) => (
                        <CommandGroup key={group.group} heading={group.group}>
                            {group.items.map((item) => (
                                <CommandItem key={item.name} onMouseDown={() => handleSelect(item.route)} className="cursor-pointer">
                                    <File className="mr-2 h-4 w-4" />
                                    <span>{item.name}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    ))}
                </CommandList>
             </div>
            )}
           </Command>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-40 justify-between">
                <span>
                  {role.charAt(0).toUpperCase() +
                    role.slice(1).replace('-', ' ')}
                </span>
                <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuLabel>Switch role</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={role} onValueChange={(value) => setRole(value as 'operator' | 'analyst' | 'admin')}>
                <DropdownMenuRadioItem value="operator">
                  Operator
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="analyst">
                  Analyst
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline">Paragon Intel</Button>

          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://picsum.photos/100/100"
                    alt="A. Bhandari"
                    data-ai-hint="person portrait"
                  />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            New Campaign
          </Button>
        </div>
      </div>
    </header>
  );
}
