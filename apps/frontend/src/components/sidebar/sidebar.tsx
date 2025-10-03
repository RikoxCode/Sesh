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

const items: NavItem[] = [
    { key: RouteKey.Dashboard, label: 'Dashboard', icon: LayoutDashboard },
    { key: RouteKey.Daily, label: 'Daily', icon: Info },
    { key: RouteKey.Users, label: 'User', icon: Users },
    { key: RouteKey.Info, label: 'Information', icon: Shield },
    { key: RouteKey.Scan, label: 'Scan', icon: ScanLine },
    { key: RouteKey.Test, label: 'Test', icon: Wrench },
    { key: RouteKey.Sections, label: 'Edit Sections', icon: SlidersHorizontal },
];

const Sidebar: FC<SidebarProps> = ({ active, onNavigate }) => {
    return (
        <aside
            className="group fixed left-0 top-0 z-50 h-screen w-16
                 bg-[var(--accent)] text-[var(--card-foreground)]
                 border-r border-[var(--border)]
                 transition-[width] duration-200 hover:w-64"
            aria-label="Sesh Sidebar"
            aria-expanded={false}
        >
            <div className="flex h-full flex-col">
                {/* Brand */}
                <div className="flex items-center gap-3 px-3 py-4">
                    <div className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--border)] bg-[var(--card)]">
                        <span className="text-lg font-bold text-[var(--primary)]">S</span>
                    </div>
                    <span
                        className="pointer-events-none origin-left scale-0 opacity-0
                       transition-all duration-200
                       group-hover:scale-100 group-hover:opacity-100
                       text-xl font-semibold"
                    >
            Sesh
          </span>
                </div>

                <div className="mx-3 mb-2 hidden h-px bg-[var(--border)] group-hover:block" />

                {/* Nav */}
                <nav className="flex-1 space-y-1 px-2">
                    {items.map(({ key, label, icon: Icon }) => {
                        const isActive = active === key;
                        return (
                            <button
                                key={key}
                                onClick={() => onNavigate?.(key)}
                                className={[
                                    'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm',
                                    'transition-[background,color] duration-150 focus:outline-none',
                                    'focus-visible:ring-2 focus-visible:ring-[var(--ring-color)]',
                                    'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]',
                                    isActive
                                        ? 'bg-[var(--primary)] text-white'
                                        : 'bg-transparent text-[var(--card-foreground)] hover:bg-[var(--primary-hover)] hover:text-white',
                                ].join(' ')}
                                aria-current={isActive ? 'page' : undefined}
                                aria-label={label}
                            >
                                <Icon className="h-5 w-5 shrink-0" />
                                <span
                                    className="pointer-events-none origin-left scale-0 opacity-0
                             transition-all duration-200
                             group-hover:scale-100 group-hover:opacity-100"
                                >
                  {label}
                </span>
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom area */}
                <div className="px-2 pb-3 pt-2 space-y-2">
                    <button
                        onClick={() => onNavigate?.(RouteKey.Settings)}
                        className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm
                       transition-[background,color] duration-150
                       hover:bg-[var(--overlay-12)]
                       focus:outline-none focus-visible:ring-2
                       focus-visible:ring-[var(--ring-color)]
                       focus-visible:ring-offset-2
                       focus-visible:ring-offset-[var(--ring-offset)]"
                        aria-label="Settings"
                    >
                        <Settings className="h-5 w-5" />
                        <span
                            className="pointer-events-none origin-left scale-0 opacity-0
                         transition-all duration-200
                         group-hover:scale-100 group-hover:opacity-100"
                        >
              Settings
            </span>
                    </button>

                    <div
                        className="flex items-center gap-3 rounded-lg border border-[var(--border)]
                       bg-[var(--card)] px-3 py-2"
                        aria-label="Profile"
                    >
                        <UserCircle2 className="h-8 w-8 text-[var(--accent)]" />
                        <div
                            className="pointer-events-none origin-left hidden flex-col text-left text-xs leading-tight
                         group-hover:flex"
                        >
                            <span className="font-medium text-[var(--card-foreground)]">Gianluca Barbieri</span>
                            <span className="text-[var(--muted-foreground)]">Lernender</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
