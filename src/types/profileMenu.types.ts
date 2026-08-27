import { User } from '@/types/auth.types';

export type ProfileMenuProps = {
    user: User | null;
    isUserActive: boolean;
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    onCloseMenu: () => void;
    onLogoutClick: () => void;
    onLoginClick?: () => void;
};
