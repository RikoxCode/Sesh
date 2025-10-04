import { AlertCircle } from 'lucide-react';

export default function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2 rounded-lg bg-[rgb(var(--destructive-rgb)/0.08)] p-3 text-sm text-[var(--destructive)]">
      <AlertCircle className="mt-0.5 h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
