import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { BottomNavigationBar } from '@/components/BottomNavigation/BottomNavigation';
import { navItemsConfig } from '@/configs/BottomNavigationConfigs';
import { useActiveUserRoute } from '@/hooks/activeUserRoutes';
import { logout } from '@/services/auth.service';
import { clearUser } from '@/slices/authSlice';
import { showNotification } from '@/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { NavbarAction } from '@/types/bottomNavigation.types';

export const BottomNavigationBarContainer = ({
    cartCount = 0,
}: {
    cartCount?: number;
}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    // Read the active user details from the redux store
    const user = useAppSelector((state) => state.auth.user);

    // Convert user presence into a simple true/false login flag
    const isUserActive = Boolean(user);

    const navItems = navItemsConfig(user, isUserActive);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Check whether the dropdown menu should be shown
    const isMenuOpen = Boolean(anchorEl);

    // Pull in our custom helper to navigate users based on auth status
    const { handleUserRoute } = useActiveUserRoute();

    // Close the dropdown menu by resetting the anchor element
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // End the user session, wipe local data, show a message, and send them to login
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
                            : 'Please try again.',
                    severity: 'error',
                }),
            );
        }
    };

    // The single function handling all click events
    const handleNavbarAction = (
        action: NavbarAction,
        event?: React.MouseEvent<HTMLElement>,
    ) => {
        switch (action) {
            case 'home':
                void navigate('/restaurant');
                break;
            case 'cart':
                handleUserRoute('/cart', '/login');
                break;
            case 'addRestaurant':
                handleUserRoute('/add-restaurant', '/login');
                break;
            case 'orders':
                handleUserRoute('/orders', '/login');
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

    return (
        <BottomNavigationBar
            user={user}
            isUserActive={isUserActive}
            pathname={location.pathname}
            anchorEl={anchorEl}
            cartCount={cartCount}
            isMenuOpen={isMenuOpen}
            navItems={navItems}
            onClickAction={handleNavbarAction}
        />
    );
};
