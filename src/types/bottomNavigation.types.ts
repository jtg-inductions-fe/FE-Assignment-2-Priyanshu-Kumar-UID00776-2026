import type React from 'react';

export type User = {
    fullName?: string;
    email?: string;
    role?: string;
};

export type BottomNavigationBarProps = {
    user: User | null;
    isUserActive: boolean;
    pathname: string;
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
