
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
      'Segments', 'Personalization Library', 'Campaign Studio', 'Inbox Manager',
      'Deliverability', 'Lead Triage', 'Referral Hub',
    ],
  },
  {
    category: 'GOVERNANCE',
    modules: ['DNC / Suppression', 'Audit Log', 'Settings'],
  },
  {
    category: 'ANALYTICS',
    modules: ['Reports'],
  },
];

type PermissionsState = Record<string, Record<Role, Permission[]>>;

const defaultPermissions: PermissionsState = {
  // Operator: View all, Execute some
  Dashboard: { operator: ['View'], analyst: ['View'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  'Industry Mapper': { operator: ['View'], analyst: ['View', 'Configure'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  'Data Sources': { operator: ['View'], analyst: ['View', 'Configure'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  Enrichment: { operator: ['View'], analyst: ['View', 'Configure'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  'Fit Scoring': { operator: ['View'], analyst: ['View', 'Configure'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  Segments: { operator: ['View', 'Execute'], analyst: ['View', 'Configure'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  'Personalization Library': { operator: ['View'], analyst: ['View', 'Configure'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  'Campaign Studio': { operator: ['View', 'Execute'], analyst: ['View'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  'Inbox Manager': { operator: ['View'], analyst: ['View'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  Deliverability: { operator: ['View'], analyst: ['View'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  'Lead Triage': { operator: ['View', 'Execute'], analyst: ['View'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  'Referral Hub': { operator: ['View', 'Execute'], analyst: ['View'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  'DNC / Suppression': { operator: ['View'], analyst: ['View'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  'Audit Log': { operator: ['View'], analyst: ['View'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  Settings: { operator: ['View'], analyst: ['View'], admin: ['View', 'Configure', 'Execute', 'Export'] },
  Reports: { operator: ['View'], analyst: ['View', 'Export'], admin: ['View', 'Configure', 'Execute', 'Export'] },
};


// Admin: all permissions for all modules
Object.keys(defaultPermissions).forEach(module => {
    defaultPermissions[module].admin = ['View', 'Configure', 'Execute', 'Export'];
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
        <Button variant="accent" onClick={handleSaveChanges}>
          Save
        </Button>
      </div>
    </div>
  );
}
