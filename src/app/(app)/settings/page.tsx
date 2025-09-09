

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { User, Bell, Shield, CreditCard, Users, Database } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account, workspace, and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-6">
        <TabsList className="flex-col h-auto justify-start p-2 gap-1 bg-transparent border-r-0 md:border-r w-full md:w-48">
          <TabsTrigger value="profile" className="w-full justify-start gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="workspace" className="w-full justify-start gap-2">
            <Users className="h-4 w-4" /> Workspace
          </TabsTrigger>
          <TabsTrigger value="notifications" className="w-full justify-start gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
           <TabsTrigger value="billing" className="w-full justify-start gap-2">
            <CreditCard className="h-4 w-4" /> Billing
          </TabsTrigger>
          <TabsTrigger value="security" className="w-full justify-start gap-2">
            <Shield className="h-4 w-4" /> Security
          </TabsTrigger>
           <TabsTrigger value="integrations" className="w-full justify-start gap-2">
            <Database className="h-4 w-4" /> Integrations
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1">
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    Update your personal information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="A. Bhandari" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="a.bhandari@paragonintel.com" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Operator" disabled />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="workspace">
              <Card>
                <CardHeader>
                  <CardTitle>Workspace</CardTitle>
                  <CardDescription>
                    Manage your workspace settings and members.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-2">
                    <Label htmlFor="workspace-name">Workspace Name</Label>
                    <Input id="workspace-name" defaultValue="Paragon Intel" />
                  </div>
                  <Button>Invite Members</Button>
                </CardContent>
              </Card>
            </TabsContent>
        </div>

      </Tabs>
    </div>
  );
}
