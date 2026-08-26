import type React from 'react';

import { User } from '@/types/auth.types';

export type BottomNavigationBarProps = {
    user: User | null;
    isUserActive: boolean;
    pathname: string;
    cartCount?: number;
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    onHomeClick: () => void;
    onCartClick: () => void;
    onAddRestaurantClick: () => void;
    onOrdersClick: () => void;
    onProfileClick: (event: React.MouseEvent<HTMLElement>) => void;
    onCloseMenu: () => void;
    onLogoutClick: () => void;
    onLoginClick: () => void;
};
