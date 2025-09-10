
import { ClassifierTestTool } from '@/components/classifier-test-tool';

export default function IntentTestPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Classifier Test Tool
        </h1>
        <p className="text-muted-foreground">
          Enter text to see how the intent classifier would categorize it. This is a demo-only tool.
        </p>
      </div>

      <ClassifierTestTool />
    </div>
  );
}
