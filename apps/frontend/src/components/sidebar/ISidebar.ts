import { RouteKey } from './SidebarEnum';
import { ElementType } from 'react';

export type NavItem = {
    key: RouteKey;
    label: string;
    icon: ElementType;
    href?: string;
};

export type SidebarProps = {
    active?: RouteKey;
    onNavigate?: (key: RouteKey) => void;
};
