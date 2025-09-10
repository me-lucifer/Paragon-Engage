
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Calendar, ShieldAlert } from 'lucide-react';
import { Badge } from './ui/badge';

const timelineSteps = [
    { label: 'Today', policy: 'p=none', color: 'bg-green-500' },
    { label: 'In 7 days', policy: 'p=quarantine; pct=25', color: 'bg-yellow-500' },
    { label: 'In 21 days', policy: 'p=quarantine; pct=100', color: 'bg-orange-500' },
    { label: 'In 35 days', policy: 'p=reject', color: 'bg-red-500' },
];

export function DmarcPolicyPlanner() {
    return (
        <Card className="sticky top-[calc(20rem+100px)]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    DMARC Policy Planner
                </CardTitle>
                 <CardDescription>
                    Schedule your DMARC policy rollout. This does not change DNS.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="relative">
                    <div className="absolute left-2.5 top-2.5 h-full w-0.5 bg-border" />
                    <div className="space-y-4">
                        {timelineSteps.map((step, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className={`h-2 w-2 rounded-full z-10 ${step.color}`} />
                                <div className="flex justify-between items-center w-full">
                                    <span className="text-sm font-medium">{step.label}</span>
                                    <Badge variant="outline" className="font-mono text-xs">{step.policy}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="reminders" />
                        <Label htmlFor="reminders" className="font-normal">Email me reminders</Label>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="owner">Owner</Label>
                        <Select defaultValue="a.bhandari">
                            <SelectTrigger id="owner">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="a.bhandari">A. Bhandari (Admin)</SelectItem>
                                <SelectItem value="j.doe">J. Doe (Operator)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

            </CardContent>
            <CardFooter>
                 <Button className="w-full" variant="accent">Save Plan</Button>
            </CardFooter>
        </Card>
    );
}
