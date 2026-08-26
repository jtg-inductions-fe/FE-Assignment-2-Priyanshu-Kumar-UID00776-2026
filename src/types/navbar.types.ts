import type React from 'react';

import { User } from '@/types/auth.types';

export type NavbarProps = {
    user: User | null;
    isUserActive: boolean;
    userInitial: string;
    anchorEl: null | HTMLElement;
    cartCount: number;
    isMenuOpen: boolean;
    onLogoClick: () => void;
    onOrdersClick: () => void;
    onCartClick: () => void;
    onProfileClick: (event: React.MouseEvent<HTMLElement>) => void;
    onLoginClick: () => void;
    onCloseMenu: () => void;
    onLogoutClick: () => void;
};
