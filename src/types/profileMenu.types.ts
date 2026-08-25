type User = {
    fullName?: string;
    email?: string;
    role?: string;
};

export type ProfileMenuProps = {
    user: User | null;
    isUserActive: boolean;
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    onCloseMenu: () => void;
    onLogoutClick: () => void;
    onLoginClick?: () => void;
};
