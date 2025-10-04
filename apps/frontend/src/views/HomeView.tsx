import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { Link } from '@tanstack/react-router';

export default function HomeView() {
  const { isAuthenticated, logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-semibold">
        Willkommen bei <span className="text-[var(--primary)]">SESH</span>
      </h1>
      <p className="text-[rgb(var(--muted-foreground-rgb))]">
        {isAuthenticated
          ? 'Du bist erfolgreich eingeloggt!'
          : 'Du bist nicht eingeloggt. Bitte melde dich an.'}
      </p>
      <div className="flex gap-3">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 hover:bg-[var(--surface-2)] disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" />
            <span>{isLoggingOut ? 'Wird abgemeldet...' : 'Logout'}</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 font-medium text-white hover:bg-[var(--primary-hover)]"
          >
            Zur Anmeldung
          </Link>
        )}
      </div>
    </div>
  );
}
