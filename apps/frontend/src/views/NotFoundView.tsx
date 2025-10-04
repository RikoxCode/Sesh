import { useNavigate } from '@tanstack/react-router';

export default function NotFoundView() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-[var(--foreground)]">
      {/* Illustration */}
      <div>
        <img
          src="illustrations/file_search.svg"
          alt="Site not found illustration where files are searched but not found"
          className="h-64 w-64 object-contain"
        />
      </div>

      {/* Text */}
      <div className="text-center mt-6">
        <h1 className="font-semibold text-2xl">Page not Found...</h1>
        <p className="font-medium mt-2">
          Please consider heading back{' '}
          <span
            className="text-[var(--secondary)] underline cursor-pointer"
            onClick={() => navigate({ to: '/' })}
          >
            home
          </span>
        </p>
      </div>
    </div>
  );
}
