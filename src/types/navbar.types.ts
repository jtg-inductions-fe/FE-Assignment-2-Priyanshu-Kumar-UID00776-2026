import type React from 'react';

import { User } from '@/types/auth.types';

// Navbar all items actions
export type NavbarAction =
    | 'logo'
    | 'orders'
    | 'cart'
    | 'profile'
    | 'login'
    | 'closeMenu'
    | 'logout';

// Navbar props passed to the component
export type NavbarProps = {
    user: User | null;
    isUserActive: boolean;
    userInitial: string;
    anchorEl: null | HTMLElement;
    cartCount: number;
    isMenuOpen: boolean;
    onClickAction: (
        action: NavbarAction,
        event?: React.MouseEvent<HTMLElement>,
    ) => void;
};
