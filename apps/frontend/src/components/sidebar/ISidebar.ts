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
  logoUrl?: string;
};
