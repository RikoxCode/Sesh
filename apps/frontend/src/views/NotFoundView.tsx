import { Link } from '@tanstack/react-router';
import NotFoundIllustration from '../components/ui/NotFoundIllustration';

export default function NotFoundView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] text-[var(--foreground)]">
      <NotFoundIllustration />

      <div className="text-center mt-6">
        <h1 className="font-semibold text-2xl">Page not found</h1>
        <p className="font-medium mt-2 text-[rgb(var(--muted-foreground-rgb))]">
          This page does not exist.{' '}
          <Link to="/" className="text-[var(--secondary)] underline hover:text-[var(--primary)]">
            Go back home
          </Link>
        </p>
      </div>
    </div>
  );
}
