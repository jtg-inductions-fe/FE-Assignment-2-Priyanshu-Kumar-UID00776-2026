import { User } from '@/components/Auth/auth.types';

/**
 * Profile menu component props
 */
export type ProfileMenuProps = {
    user: User | null;
    isUserActive: boolean;
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    onCloseMenu: () => void;
    onLogoutClick: () => void;
    onLoginClick?: () => void;
};
