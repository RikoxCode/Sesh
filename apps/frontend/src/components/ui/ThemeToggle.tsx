import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light',
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sesh-theme', theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem('sesh-theme') as 'light' | 'dark' | null;
    if (saved) setTheme(saved);
  }, []);

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <button
      type="button"
      onClick={toggle}
      className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm hover:bg-[var(--surface-2)]"
      aria-label="Theme umschalten"
      title="Theme umschalten"
    >
      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="hidden sm:block">{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
    </button>
  );
}
