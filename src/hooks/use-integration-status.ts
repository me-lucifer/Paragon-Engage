

'use client';

import { useState, useCallback } from 'react';
import { useToast } from './use-toast';

type Statuses = Record<string, boolean>;
type IsTesting = Record<string, boolean>;

export function useIntegrationStatus(initialStatuses: Statuses) {
  const [statuses, setStatuses] = useState<Statuses>(initialStatuses);
  const [isTesting, setIsTesting] = useState<IsTesting>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const connect = useCallback((id: string) => {
    setStatuses(prev => ({ ...prev, [id]: true }));
  }, []);

  const disconnect = useCallback((id: string) => {
    setStatuses(prev => ({ ...prev, [id]: false }));
  }, []);

  const toggleReveal = useCallback((id: string) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const testConnection = useCallback(
    (id: string) => {
      setIsTesting(prev => ({ ...prev, [id]: true }));
      const isSuccess = Math.random() > 0.3; // 70% chance of success

      setTimeout(() => {
        setIsTesting(prev => ({ ...prev, [id]: false }));
        setStatuses(prev => ({ ...prev, [id]: isSuccess }));
        
        if (isSuccess) {
          toast({
            title: 'Connection Successful',
            description: `Successfully connected to ${id}.`,
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Connection Failed',
            description: `Could not connect to ${id}. Please check your credentials.`,
          });
        }
      }, 1500);
    },
    [toast]
  );
  
  const rotateKey = useCallback((id: string) => {
    toast({
        title: "API Key Rotated",
        description: `Successfully rotated the API key for ${id}.`,
    });
  }, [toast]);

  return { statuses, setStatuses, connect, disconnect, testConnection, isTesting, revealed, toggleReveal, rotateKey };
}
