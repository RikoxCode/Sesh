import { useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface DeleteAccountProps {
  onDelete: () => Promise<void>;
}

export default function DeleteAccount({ onDelete }: DeleteAccountProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const logout = useAuthStore((s) => s.logout);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
      await logout();
    } catch (error) {
      console.error('Delete failed:', error);
      setLoading(false);
    }
  };

  if (!showConfirm) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h3 className="mb-2 text-sm font-semibold text-[var(--foreground)]">Gefahrenzone</h3>
        <p className="mb-4 text-sm text-[rgb(var(--muted-foreground-rgb))]">
          Account unwiderruflich löschen. Alle Daten gehen verloren.
        </p>
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[var(--destructive)] px-3 py-1.5 text-sm text-[var(--destructive)] hover:bg-[var(--destructive)] hover:text-white transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          <span>Account löschen</span>
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--destructive)] bg-[var(--card)] p-6">
      <div className="mb-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 flex-shrink-0 text-[var(--destructive)]" />
        <div>
          <h3 className="font-semibold text-[var(--destructive)]">Bist du sicher?</h3>
          <p className="mt-1 text-sm text-[rgb(var(--muted-foreground-rgb))]">
            Diese Aktion kann nicht rückgängig gemacht werden. Alle Daten gehen unwiderruflich
            verloren.
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="focus-ring rounded-xl border border-[var(--destructive)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--destructive)] hover:bg-[var(--destructive)] hover:text-white transition-colors disabled:opacity-50"
        >
          {loading ? 'Löscht...' : 'Ja, Account löschen'}
        </button>
        <button
          type="button"
          onClick={() => setShowConfirm(false)}
          disabled={loading}
          className="focus-ring rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm hover:bg-[var(--surface-2)] disabled:opacity-50"
        >
          Abbrechen
        </button>
      </div>
    </div>
  );
}
