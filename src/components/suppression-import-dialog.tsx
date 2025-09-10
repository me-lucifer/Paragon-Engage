
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from './ui/separator';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { FileUp, Info } from 'lucide-react';

interface SuppressionImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete: (result: {
    total: number;
    added: number;
    skipped: number;
    invalid: number;
  }) => void;
}

const mockCsvHeaders = ['email_address', 'reason_for_leaving', 'source_system'];

export function SuppressionImportDialog({
  open,
  onOpenChange,
  onImportComplete,
}: SuppressionImportDialogProps) {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleNext = () => {
    if (step === 1 && fileName) {
      setStep(2);
    }
  };

  const handleConfirmImport = () => {
    // Simulate import and call parent callback
    onImportComplete({
      total: 100,
      added: 90,
      skipped: 8,
      invalid: 2,
    });
    reset();
  };

  const reset = () => {
    setStep(1);
    setFileName('');
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
        reset();
    }
    onOpenChange(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Import Suppression List</DialogTitle>
          <DialogDescription>
            {step === 1
              ? 'Upload a CSV file and map the columns.'
              : 'Review the validation summary and confirm the import.'}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="csv-file">Upload CSV</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label
                  htmlFor="csv-file"
                  className="flex-grow border rounded-md p-2 h-10 flex items-center justify-between cursor-pointer"
                >
                  <span className="text-muted-foreground">
                    {fileName || 'Select a file...'}
                  </span>
                  <FileUp className="h-4 w-4" />
                </Label>
              </div>
            </div>

            {fileName && (
              <div className="space-y-4">
                <Label>Map Columns</Label>
                <div className="grid grid-cols-2 gap-4 p-4 border rounded-md">
                  <div className="font-semibold">Your CSV Header</div>
                  <div className="font-semibold">Paragon Field</div>
                  
                  <Separator className="col-span-2" />

                  {/* Email */}
                  <div className="flex items-center">
                    <Select defaultValue={mockCsvHeaders[0]}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCsvHeaders.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center font-medium">Email Address (required)</div>
                  
                  {/* Reason */}
                  <div className="flex items-center">
                    <Select defaultValue={mockCsvHeaders[1]}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCsvHeaders.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                         <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center font-medium">Reason (optional)</div>

                  {/* Source */}
                  <div className="flex items-center">
                    <Select defaultValue={mockCsvHeaders[2]}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCsvHeaders.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                   <div className="flex items-center font-medium">Source (optional)</div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {step === 2 && (
            <div className="space-y-4 py-4">
                <Alert variant="default" className="bg-muted/50">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Validation Summary</AlertTitle>
                    <AlertDescription>
                         Please review the summary before confirming the import.
                    </AlertDescription>
                </Alert>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold">100</div>
                        <div className="text-sm text-muted-foreground">Total Records</div>
                    </div>
                     <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">90</div>
                        <div className="text-sm text-muted-foreground">New Entries</div>
                    </div>
                     <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold text-yellow-600">8</div>
                        <div className="text-sm text-muted-foreground">Duplicates Skipped</div>
                    </div>
                     <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-600">2</div>
                        <div className="text-sm text-muted-foreground">Invalid Rows</div>
                    </div>
                </div>
            </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={reset}>Cancel</Button>
          </DialogClose>
          {step === 1 && (
            <Button onClick={handleNext} disabled={!fileName}>
              Next: Validate
            </Button>
          )}
          {step === 2 && (
            <Button onClick={handleConfirmImport}>
              Confirm Import
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
