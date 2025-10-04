import { LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function HomeView() {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-semibold">
        Willkommen bei <span className="text-[var(--primary)]">SESH</span>
      </h1>
      <p className="text-[rgb(var(--muted-foreground-rgb))]">
        {isAuthenticated
          ? 'Du bist (fake) eingeloggt. Backend folgt später.'
          : 'Du bist nicht eingeloggt. Bitte melde dich an.'}
      </p>
      <div className="flex gap-3">
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 hover:bg-[var(--surface-2)]"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        ) : (
          <a
            href="/login"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 font-medium text-white hover:bg-[var(--primary-hover)]"
          >
            Zur Anmeldung
          </a>
        )}
      </div>
    </div>
  );
}
