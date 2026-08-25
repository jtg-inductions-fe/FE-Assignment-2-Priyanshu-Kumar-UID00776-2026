import type React from 'react';

export type User = {
    fullName?: string;
    email?: string;
    role?: string;
};

export type NavbarProps = {
    user: User | null;
    isUserActive: boolean;
    userInitial: string;
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    onLogoClick: () => void;
    onOrdersClick: () => void;
    onCartClick: () => void;
    onProfileClick: (event: React.MouseEvent<HTMLElement>) => void;
    onLoginClick: () => void;
    onCloseMenu: () => void;
    onLogoutClick: () => void;
};
