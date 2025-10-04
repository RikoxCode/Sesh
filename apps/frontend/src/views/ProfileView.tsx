import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../components/profile/ProfileForm';
import DeleteAccount from '../components/profile/DeleteAccount';

export default function ProfileView() {
  const { user, loading, fetchUser, updateUser, deleteUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading && !user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-[rgb(var(--muted-foreground-rgb))]">Lädt Profil...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-[rgb(var(--muted-foreground-rgb))]">Profil nicht gefunden</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <ProfileHeader firstName={user.first_name} lastName={user.last_name} />

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-lg font-semibold">Persönliche Informationen</h2>
        <ProfileForm
          initialData={{
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          }}
          onSubmit={updateUser}
        />
      </div>

      <DeleteAccount onDelete={deleteUser} />

      <div className="text-xs text-[rgb(var(--muted-foreground-rgb))]">
        Erstellt: {new Date(user.created_at).toLocaleDateString('de-DE')} • Aktualisiert:{' '}
        {new Date(user.updated_at).toLocaleDateString('de-DE')}
      </div>
    </div>
  );
}
