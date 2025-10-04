import { FC } from 'react';
import { RouteKey } from './SidebarEnum';
import type { NavItem, SidebarProps } from './ISidebar';

import {
  LayoutDashboard,
  Info,
  Users,
  Shield,
  ScanLine,
  Wrench,
  SlidersHorizontal,
  Settings,
  UserCircle2,
} from 'lucide-react';

const navItems: NavItem[] = [
  { key: RouteKey.Dashboard, label: 'Dashboard', icon: LayoutDashboard },
  { key: RouteKey.Daily, label: 'Daily', icon: Info },
  { key: RouteKey.Users, label: 'User', icon: Users },
  { key: RouteKey.Info, label: 'Information', icon: Shield },
  { key: RouteKey.Scan, label: 'Scan', icon: ScanLine },
  { key: RouteKey.Test, label: 'Test', icon: Wrench },
  { key: RouteKey.Sections, label: 'Edit Sections', icon: SlidersHorizontal },
];

const baseItem =
  'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-[background,color] duration-150 focus:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]';

const labelShow =
  'pointer-events-none origin-left scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100';

const Sidebar: FC<SidebarProps> = ({ active, onNavigate, logoUrl = '/images/logo.png', user }) => {
  const userName = user?.name ?? 'Gianluca Barbieri';
  const userRole = user?.role ?? 'Lernender';

  const renderItem = ({ key, label, icon: Icon, sublabel }: NavItem) => {
    const isActive = active === key;
    return (
      <button
        key={key}
        onClick={() => onNavigate?.(key)}
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
      </button>
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
        <button className={baseItem + ' px-3 py-4'}>
          <div className="grid h-10 w-10 place-items-center rounded-lg overflow-hidden shrink-0">
            <img
              src={logoUrl} // /images/logo.png aus /public
              alt="Sesh Logo"
              className="block h-10 w-10 object-contain select-none pointer-events-none"
            />
          </div>
          <div className={`${labelShow} text-left text-xl font-bold`}>
            <div>Sesh</div>
          </div>
        </button>

        {/* Main nav */}
        <nav className="flex-1 space-y-1 px-2">{navItems.map((it) => renderItem(it))}</nav>

        {/* Bottom actions */}
        <div className="px-2 pb-3 pt-2 space-y-1">
          {/* Settings as selectable item */}
          {renderItem({ key: RouteKey.Settings, label: 'Settings', icon: Settings })}

          {/* Profile as normal item (kein Card) */}
          {renderItem({
            key: RouteKey.Profile,
            label: userName,
            sublabel: userRole,
            icon: UserCircle2,
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
