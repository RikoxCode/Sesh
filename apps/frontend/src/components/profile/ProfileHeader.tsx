import { User } from 'lucide-react';

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
}

export default function ProfileHeader({ firstName, lastName }: ProfileHeaderProps) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary)] text-2xl font-semibold text-white">
        {initials || <User className="h-10 w-10" />}
      </div>
      <div>
        <h1 className="text-2xl font-semibold">
          {firstName} {lastName}
        </h1>
        <p className="text-sm text-[rgb(var(--muted-foreground-rgb))]">Profil bearbeiten</p>
      </div>
    </div>
  );
}
