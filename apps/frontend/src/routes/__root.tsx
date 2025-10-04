import { createRootRoute, Outlet, Link } from '@tanstack/react-router';

function NotFound() {
  return (
    <div className="mx-auto max-w-xl p-8 text-center">
      <h1 className="text-2xl font-semibold">Seite nicht gefunden</h1>
      <p className="mt-2 text-[rgb(var(--muted-foreground-rgb))]">
        Die angeforderte Seite existiert nicht.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-xl bg-[var(--primary)] px-4 py-2 font-medium text-white hover:bg-[var(--primary-hover)]"
      >
        Zur Startseite
      </Link>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Outlet />
    </div>
  ),
  notFoundComponent: NotFound,
});
