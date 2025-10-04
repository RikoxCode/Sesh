import { Mail } from 'lucide-react';
import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function TextField({ label, error, ...rest }: Props) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-[rgb(var(--muted-foreground-rgb))]">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <Mail className="h-4 w-4 opacity-70" />
        </span>
        <input
          {...rest}
          className="focus-ring w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-10 py-2 text-[var(--fg)] placeholder-[rgb(var(--muted-foreground-rgb))] outline-none focus:border-[var(--border-strong)]"
        />
      </div>
      {error && <p className="text-sm text-[var(--destructive)]">{error}</p>}
    </div>
  );
}
