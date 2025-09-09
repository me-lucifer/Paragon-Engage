

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
import { User, Bell, Shield, CreditCard, Users, Database, Globe } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

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
                    <Input id="role" defaultValue="Admin" disabled />
                  </div>
                   <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select>
                            <SelectTrigger id="timezone">
                                <SelectValue placeholder="Select a timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="est">EST (UTC-5)</SelectItem>
                                <SelectItem value="pst">PST (UTC-8)</SelectItem>
                                <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
                            </SelectContent>
                        </Select>
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
                  <div className="space-y-2">
                    <Label htmlFor="footer-text">Compliance Footer Text</Label>
                    <Textarea id="footer-text" placeholder="e.g., Paragon Intel, 123 Main St, Anytown USA" rows={3}/>
                  </div>
                  <Button>Invite Members</Button>
                </CardContent>
              </Card>
            </TabsContent>

             <TabsContent value="integrations">
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>
                    Connect your tools and manage API keys.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Globe className="h-6 w-6 text-primary" />
                            <Label htmlFor="apollo-key" className="flex-1 font-medium">Apollo.io</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input id="apollo-key" type="password" defaultValue="fadshgkuuasdhfgaskdfj" />
                            <Button variant="outline">Test</Button>
                        </div>
                    </div>
                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Globe className="h-6 w-6 text-primary" />
                            <Label htmlFor="clearbit-key" className="flex-1 font-medium">Clearbit</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input id="clearbit-key" type="password" defaultValue="qweriuopqweurioasdfh" />
                            <Button variant="outline">Test</Button>
                        </div>
                    </div>
                </CardContent>
              </Card>
            </TabsContent>
        </div>

      </Tabs>
    </div>
  );
}
