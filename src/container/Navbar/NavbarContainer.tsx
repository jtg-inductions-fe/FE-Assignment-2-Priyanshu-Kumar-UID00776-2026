import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Navbar } from '@/components/Navbar/Navbar';
import { logout } from '@/services/auth.service';
import { clearUser } from '@/slices/authSlice';
import { showNotification } from '@/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { NavbarAction } from '@/types/navbar.types';

export const NavbarContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Read the current logged in user details from the redux store
    const user = useAppSelector((state) => state.auth.user);

    // To check if the user has an active session or not
    const isUserActive = Boolean(user);

    // Track the HTML element that anchors the dropdown menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Check if the dropdown menu is currently visible
    const isMenuOpen = Boolean(anchorEl);

    // Close the dropdown menu by clearing the anchor element.
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // Log the user out, clear their session, display an alert, and redirect to login
    const handleLogout = async () => {
        handleCloseMenu();

        try {
            await logout();

            dispatch(clearUser());

            dispatch(
                showNotification({
                    message: 'Successfully logged out!',
                    severity: 'success',
                }),
            );

            void navigate('/login');
        } catch (error) {
            dispatch(
                showNotification({
                    message:
                        error instanceof Error
                            ? error.message
                            : 'Unable to logout.',
                    severity: 'error',
                }),
            );
        }
    };

    // The single handling for all navbar interactions
    const handleNavbarAction = (
        action: NavbarAction,
        event?: React.MouseEvent<HTMLElement>,
    ) => {
        switch (action) {
            case 'logo':
                void navigate('/');
                break;
            case 'orders':
                void navigate('/orders');
                break;
            case 'cart':
                void navigate('/cart');
                break;
            case 'profile':
                if (event) setAnchorEl(event.currentTarget);
                break;
            case 'closeMenu':
                handleCloseMenu();
                break;
            case 'logout':
                void handleLogout();
                break;
            case 'login':
                void navigate('/login');
                break;
            default:
                break;
        }
    };

    // Get the capitalized first letter of the user's name for the avatar, defaulting to 'U'
    const userInitial = user?.fullName?.charAt(0).toUpperCase() || 'U';

    return (
        <Navbar
            user={user}
            isUserActive={isUserActive}
            userInitial={userInitial}
            anchorEl={anchorEl}
            isMenuOpen={isMenuOpen}
            onClickAction={handleNavbarAction}
        />
    );
};
