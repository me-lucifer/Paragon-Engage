
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ShieldAlert } from 'lucide-react';
import { useRole } from '@/hooks/use-role';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export function AccessDenied() {
  const { role, setRole } = useRole();

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit">
          <ShieldAlert className="h-10 w-10 text-destructive" />
        </div>
        <CardTitle className="mt-4">Access Denied</CardTitle>
        <CardDescription>
          You do not have permission to view this page with the "{role}" role.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Please switch to a role with the required permissions or contact an administrator if you believe this is an error.
        </p>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Switch Role</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Switch to another role</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={role} onValueChange={(value) => setRole(value as 'operator' | 'analyst' | 'admin')}>
                    <DropdownMenuRadioItem value="operator">Operator</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="analyst">Analyst</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
