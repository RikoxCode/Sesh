import { FC, useEffect } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { RouteKey } from './SidebarEnum';
import type { NavItem, SidebarProps } from './ISidebar';
import { useUserStore } from '../../stores/userStore';
import {
  LayoutDashboard,
  Info,
  ScanLine,
  Wrench,
  SlidersHorizontal,
  Settings,
  UserCircle2,
} from 'lucide-react';

const navItems: NavItem[] = [
  { key: RouteKey.Dashboard, label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { key: RouteKey.Daily, label: 'Daily', icon: Info, href: '/daily' },
  { key: RouteKey.Scan, label: 'Scan', icon: ScanLine, href: '/scan' },
  { key: RouteKey.Test, label: 'Test', icon: Wrench, href: '/test' },
  { key: RouteKey.Sections, label: 'Edit Sections', icon: SlidersHorizontal, href: '/sections' },
];

const baseItem =
  'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-[background,color] duration-150 focus:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]';

const labelShow =
  'pointer-events-none origin-left scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100';

const Sidebar: FC<SidebarProps> = ({ logoUrl = '/images/logo.png' }) => {
  const { user, fetchUser } = useUserStore();
  const router = useRouterState();
  const currentPath = router.location.pathname;

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  const getActiveKey = (): RouteKey | null => {
    if (currentPath === '/') return RouteKey.Dashboard;
    if (currentPath === '/profile') return RouteKey.Profile;
    if (currentPath === '/settings') return RouteKey.Settings;
    if (currentPath.startsWith('/daily')) return RouteKey.Daily;
    if (currentPath.startsWith('/scan')) return RouteKey.Scan;
    if (currentPath.startsWith('/test')) return RouteKey.Test;
    if (currentPath.startsWith('/sections')) return RouteKey.Sections;
    return null;
  };

  const active = getActiveKey();

  const renderItem = ({ key, label, icon: Icon, sublabel, href }: NavItem & { href: string }) => {
    const isActive = active === key;
    return (
      <Link
        key={key}
        to={href}
        title={label}
        aria-current={isActive ? 'page' : undefined}
        className={
          baseItem +
          ' ' +
          (isActive
            ? 'bg-[var(--primary)] text-white'
            : 'bg-transparent text-white/90 hover:bg-[var(--primary-hover)] hover:text-white')
        }
      >
        <Icon className="h-5 w-5 shrink-0" />
        <div className={`${labelShow} text-left`}>
          <div>{label}</div>
          {sublabel && <div className="text-xs text-white/80">{sublabel}</div>}
        </div>
      </Link>
    );
  };

  return (
    <aside
      className="group fixed left-0 top-0 z-50 h-screen w-16
             bg-[var(--primary-background)]
             text-[rgb(var(--card-foreground-rgb))]
             border-r border-[rgb(var(--border-rgb))]
             transition-[width] duration-200 hover:w-64"
    >
      <div className="flex h-full flex-col text-white">
        {/* Brand */}
        <Link to="/" className={baseItem + ' px-3 py-4'}>
          <div className="grid h-10 w-10 place-items-center rounded-lg overflow-hidden shrink-0">
            <img
              src={logoUrl}
              alt="Sesh Logo"
              className="block h-10 w-10 object-contain select-none pointer-events-none"
            />
          </div>
          <div className={`${labelShow} text-left text-xl font-bold`}>
            <div>Sesh</div>
          </div>
        </Link>

        {/* Main nav */}
        <nav className="flex-1 space-y-1 px-2">
          {navItems.map((it) => renderItem({ ...it, href: it.href! }))}
        </nav>

        {/* Bottom actions */}
        <div className="px-2 pb-3 pt-2 space-y-1">
          {/* Settings */}
          {renderItem({
            key: RouteKey.Settings,
            label: 'Einstellungen',
            icon: Settings,
            href: '/settings',
          })}

          {/* Profile */}
          {renderItem({
            key: RouteKey.Profile,
            label: user ? `${user.first_name} ${user.last_name}` : 'Profil',
            sublabel: user?.email,
            icon: UserCircle2,
            href: '/profile',
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
