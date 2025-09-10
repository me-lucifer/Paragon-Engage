
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface WarningBannerProps {
  title: string;
  message: string;
  actionLink: string;
  actionText: string;
}

export function WarningBanner({ title, message, actionLink, actionText }: WarningBannerProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </div>
        <div className="mt-2 sm:mt-0 sm:ml-4 flex gap-2">
            <Link href={actionLink}>
                <Button variant="destructive" size="sm">
                    {actionText}
                </Button>
            </Link>
            <Link href="/inbox-manager">
                 <Button variant="destructive" size="sm">
                    Inbox Manager
                </Button>
            </Link>
        </div>
      </div>
    </Alert>
  );
}
