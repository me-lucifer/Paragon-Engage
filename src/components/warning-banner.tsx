
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface Action {
    href: string;
    text: string;
}

interface WarningBannerProps {
  title: string;
  message: string;
  actions?: Action[];
}

export function WarningBanner({ title, message, actions = [] }: WarningBannerProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </div>
        <div className="mt-2 sm:mt-0 sm:ml-4 flex gap-2">
            {actions.map((action, index) => (
                <Link key={index} href={action.href}>
                    <Button variant="destructive" size="sm">
                        {action.text}
                    </Button>
                </Link>
            ))}
        </div>
      </div>
    </Alert>
  );
}
