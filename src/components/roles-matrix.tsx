
'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';
import React from 'react';

const permissions = ['View', 'Configure', 'Execute', 'Export'] as const;
type Permission = typeof permissions[number];
type Role = 'operator' | 'analyst' | 'admin';

const modulesConfig = [
  {
    category: 'HOME',
    modules: ['Dashboard'],
  },
  {
    category: 'PIPELINE',
    modules: ['Industry Mapper', 'Data Sources', 'Enrichment', 'Fit Scoring'],
  },
  {
    category: 'OUTREACH',
    modules: [
      'Segments', 'Personalization Library', 'Campaign Studio', 'Sequences', 'Inbox Manager',
      'Deliverability', 'Lead Triage', 'Referral Hub',
    ],
  },
  {
    category: 'GOVERNANCE',
    modules: ['DNC / Suppression', 'Audit Log', 'Settings', 'Organization', 'Roles & Permissions', 'Compliance', 'Integrations'],
  },
  {
    category: 'ANALYTICS',
    modules: ['Reports'],
  },
];

type PermissionsState = Record<string, Record<Role, Permission[]>>;

export const defaultPermissions: PermissionsState = {
  Dashboard: { operator: ['View'], analyst: ['View'], admin: [] },
  'Industry Mapper': { operator: [], analyst: ['View', 'Configure'], admin: [] },
  'Data Sources': { operator: [], analyst: ['View', 'Configure'], admin: [] },
  Enrichment: { operator: [], analyst: ['View', 'Configure'], admin: [] },
  'Fit Scoring': { operator: [], analyst: ['View', 'Configure'], admin: [] },
  Segments: { operator: ['View', 'Execute'], analyst: ['View', 'Configure'], admin: [] },
  'Personalization Library': { operator: ['View'], analyst: ['View', 'Configure'], admin: [] },
  'Campaign Studio': { operator: ['View', 'Execute'], analyst: ['View'], admin: [] },
  'Sequences': { operator: [], analyst: [], admin: [] },
  'Inbox Manager': { operator: ['View'], analyst: ['View'], admin: [] },
  Deliverability: { operator: ['View'], analyst: ['View'], admin: [] },
  'Lead Triage': { operator: ['View', 'Execute'], analyst: ['View'], admin: [] },
  'Referral Hub': { operator: ['View', 'Execute'], analyst: [], admin: [] },
  'DNC / Suppression': { operator: [], analyst: [], admin: [] },
  'Audit Log': { operator: [], analyst: [], admin: [] },
  Settings: { operator: ['View'], analyst: ['View'], admin: [] },
  Organization: { operator: [], analyst: [], admin: [] },
  'Roles & Permissions': { operator: [], analyst: [], admin: [] },
  Compliance: { operator: [], analyst: [], admin: [] },
  Integrations: { operator: [], analyst: [], admin: [] },
  Reports: { operator: [], analyst: ['View', 'Export'], admin: [] },
};


// Admin: all permissions for all modules
Object.keys(defaultPermissions).forEach(module => {
    defaultPermissions[module].admin = ['View', 'Configure', 'Execute', 'Export'];
});

// Operator: view all
Object.keys(defaultPermissions).forEach(module => {
    if (!defaultPermissions[module].operator.includes('View')) {
        defaultPermissions[module].operator.push('View');
    }
});

// Analyst: view all
Object.keys(defaultPermissions).forEach(module => {
    if (!defaultPermissions[module].analyst.includes('View')) {
        defaultPermissions[module].analyst.push('View');
    }
});


export function RolesMatrix() {
  const [currentPermissions, setCurrentPermissions] = useState<PermissionsState>(JSON.parse(JSON.stringify(defaultPermissions)));
  const { toast } = useToast();

  const handlePermissionChange = (module: string, role: Role, permission: Permission, checked: boolean) => {
    setCurrentPermissions(prev => {
      const newPermissions = { ...prev };
      const rolePermissions = newPermissions[module][role] ? [...newPermissions[module][role]] : [];
      if (checked) {
        if (!rolePermissions.includes(permission)) {
          rolePermissions.push(permission);
        }
      } else {
        const index = rolePermissions.indexOf(permission);
        if (index > -1) {
          rolePermissions.splice(index, 1);
        }
      }
      newPermissions[module] = { ...newPermissions[module], [role]: rolePermissions };
      return newPermissions;
    });
  };

  const handleSaveChanges = () => {
    // Here you would typically send the currentPermissions state to your backend
    console.log('Saving permissions:', currentPermissions);
    toast({
      title: 'Success',
      description: 'Permissions updated.',
    });
  };

  const handleReset = () => {
    setCurrentPermissions(JSON.parse(JSON.stringify(defaultPermissions)));
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Module</TableHead>
              {permissions.map(p => (
                <TableHead key={`op-${p}`} className="text-center">Operator</TableHead>
              ))}
              {permissions.map(p => (
                <TableHead key={`an-${p}`} className="text-center">Analyst</TableHead>
              ))}
              {permissions.map(p => (
                <TableHead key={`ad-${p}`} className="text-center">Admin</TableHead>
              ))}
            </TableRow>
             <TableRow>
                <TableHead></TableHead>
                {['operator', 'analyst', 'admin'].map(role => (
                    permissions.map(p => (
                        <TableHead key={`${role}-${p}`} className="text-center text-xs text-muted-foreground font-light w-[60px]">{p}</TableHead>
                    ))
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {modulesConfig.map(group => (
              <React.Fragment key={group.category}>
                <TableRow>
                  <TableCell colSpan={13} className="font-semibold bg-muted/50 text-primary py-2">
                    {group.category}
                  </TableCell>
                </TableRow>
                {group.modules.map(module => (
                  <TableRow key={module}>
                    <TableCell className="font-medium">{module}</TableCell>
                    {['operator', 'analyst', 'admin'].map(role => (
                      permissions.map(p => (
                        <TableCell key={`${module}-${role}-${p}`} className="text-center">
                          <Checkbox
                            checked={currentPermissions[module]?.[role as Role]?.includes(p)}
                            onCheckedChange={(checked) => handlePermissionChange(module, role as Role, p, !!checked)}
                            disabled={role === 'admin'}
                          />
                        </TableCell>
                      ))
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      <Separator />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleReset}>
          Reset to Defaults
        </Button>
        <Button variant="outline">
          Preview as Role
        </Button>
        <Button variant="default" onClick={handleSaveChanges}>
          Save
        </Button>
      </div>
    </div>
  );
}
