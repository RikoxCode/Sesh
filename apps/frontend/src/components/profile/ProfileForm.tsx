import { useState } from 'react';
import { Save, X } from 'lucide-react';
import TextField from '../ui/TextField';
import FormError from '../ui/FormError';
import FormSuccess from '../ui/FormSuccess';
import { UpdateUserData } from '../../services/user';

interface ProfileFormProps {
  initialData: UpdateUserData;
  onSubmit: (data: UpdateUserData) => Promise<void>;
  onCancel?: () => void;
}

export default function ProfileForm({ initialData, onSubmit, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const hasChanges =
    formData.first_name !== initialData.first_name ||
    formData.last_name !== initialData.last_name ||
    formData.email !== initialData.email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await onSubmit(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Speichern');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setError('');
    setSuccess(false);
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Vorname"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          required
          placeholder="Max"
          autoComplete="given-name"
        />
        <TextField
          label="Nachname"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          required
          placeholder="Mustermann"
          autoComplete="family-name"
        />
      </div>

      <TextField
        label="E-Mail"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        placeholder="max@example.com"
        autoComplete="email"
      />

      <FormSuccess message={success ? 'Profil erfolgreich aktualisiert!' : ''} />
      <FormError message={error} />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || !hasChanges}
          className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 font-medium text-white hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4" />
          <span>{loading ? 'Speichert...' : 'Speichern'}</span>
        </button>

        {hasChanges && (
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 hover:bg-[var(--surface-2)] disabled:opacity-50"
          >
            <X className="h-4 w-4" />
            <span>Abbrechen</span>
          </button>
        )}
      </div>
    </form>
  );
}
