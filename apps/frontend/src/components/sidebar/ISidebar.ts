import { ElementType } from 'react';
import { RouteKey } from './SidebarEnum';

export type NavItem = {
  key: RouteKey;
  label: string;
  icon: ElementType;
  sublabel?: string;
  href?: string;
};

export type SidebarProps = {
  active?: RouteKey;
  onNavigate?: (key: RouteKey) => void;
  logoUrl?: string; // default: /images/logo.png
  user?: { name: string; role?: string };
};
