import React, { ReactNode } from 'react';

import { User } from '@/types/auth.types';

// Navbar action types for the clicks
export type NavbarAction =
    | 'home'
    | 'cart'
    | 'addRestaurant'
    | 'orders'
    | 'profile'
    | 'closeMenu'
    | 'logout'
    | 'login';

// Containes the item config for the Bottom navigation
export type NavItemConfig = {
    label: string;
    icon: ReactNode;
    action: NavbarAction;
    value: string;
    badgeContent?: number;
    isVisible: boolean;
};

// Bottom navigation props passes to the component
export type BottomNavigationBarProps = {
    user: User | null;
    isUserActive: boolean;
    pathname: string;
    cartCount?: number;
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    navItems: NavItemConfig[];
    onClickAction: (
        action: NavbarAction,
        event?: React.MouseEvent<HTMLElement>,
    ) => void;
};
