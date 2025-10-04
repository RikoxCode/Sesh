import { Loader2, LogIn } from 'lucide-react';

type Props = {
  loading?: boolean;
  children: React.ReactNode;
};

export default function SubmitButton({ loading, children }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 font-medium text-white transition-colors hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] disabled:opacity-60"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
      <span>{children}</span>
    </button>
  );
}
