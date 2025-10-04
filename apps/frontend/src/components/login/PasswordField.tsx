import { Lock, Eye, EyeOff } from 'lucide-react';
import { InputHTMLAttributes, useState } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function PasswordField({ label, error, ...rest }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-[rgb(var(--muted-foreground-rgb))]">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <Lock className="h-4 w-4 opacity-70" />
        </span>
        <input
          type={show ? 'text' : 'password'}
          {...rest}
          className="focus-ring w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-10 py-2 text-[var(--fg)] placeholder-[rgb(var(--muted-foreground-rgb))] outline-none focus:border-[var(--border-strong)]"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[rgb(var(--muted-foreground-rgb))] hover:bg-[var(--overlay-08)]"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="text-sm text-[var(--destructive)]">{error}</p>}
    </div>
  );
}
