import { useMemo, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import {
    AccountCircle,
    AddBox,
    Assignment,
    Home,
    ShoppingCart,
} from '@mui/icons-material';

import { BottomNavigationBar } from '@/components/BottomNavigation/BottomNavigation';
import { clearUser } from '@/features/authSlice';
import { setUserCart } from '@/features/cartSlice';
import { showNotification } from '@/features/notificationSlice';
import { useActiveUserRoute } from '@/hooks/activeUserRoutes';
import { logout } from '@/services/auth.service';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { NavbarAction, NavItemConfig } from '@/types/bottomNavigation.types';

export const BottomNavigationBarContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    // Read the active user details from the redux store
    const user = useAppSelector((state) => state.auth.user);

    // Read the user cart items
    const cartItems = useAppSelector((state) => state.cart.items);

    // Convert user presence into a simple true/false login flag
    const isUserActive = Boolean(user);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Check whether the dropdown menu should be shown
    const isMenuOpen = Boolean(anchorEl);

    // Pull in our custom helper to navigate users based on auth status
    const { handleUserRoute } = useActiveUserRoute();

    // Calculate cart total count from Redux state
    const totalCartCount = useMemo(
        () =>
            user?.role === 'USER'
                ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
                : 0,
        [cartItems, user],
    );

    // Close the dropdown menu by resetting the anchor element
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // End the user session, wipe local data, show a message, and send them to login
    const handleLogout = async () => {
        handleCloseMenu();

        try {
            // Trigger the logout API call
            await logout();

            // Clears the user cart redux state
            dispatch(clearUser());
            dispatch(setUserCart([]));

            // Clear the user from global state and browser storage
            dispatch(clearUser());

            // Show a green success banner
            dispatch(
                showNotification({
                    message: 'Successfully logged out!',
                    severity: 'success',
                }),
            );

            void navigate('/login');
        } catch (error) {
            // Display an error if the logout request fails
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
            case 'cart':
                handleUserRoute('/cart', '/login');
                break;
            case 'addRestaurant':
                handleUserRoute('/add-restaurant', '/login');
                break;
            case 'order':
                handleUserRoute('/order', '/login');
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
            default:
                break;
        }
    };

    // All the Bottom navigation items
    const navItemsConfig: NavItemConfig[] = [
        {
            label: 'Home',
            icon: <Home />,
            action: 'home',
            value: '/restaurant',
            to: '/home',
            isVisible: true,
        },
        {
            label: 'Cart',
            icon: <ShoppingCart />,
            action: 'cart',
            value: '/cart',
            to: '/cart',
            badgeContent: totalCartCount,
            isVisible: user?.role === 'USER' || !isUserActive,
        },
        {
            label: 'Restaurant',
            icon: <AddBox />,
            action: 'addRestaurant',
            to: '/restaurant',
            value: '/add-restaurant',
            isVisible: user?.role === 'RESTAURANT OWNER',
        },
        {
            label: 'Orders',
            icon: <Assignment />,
            action: 'order',
            value: '/order',
            to: '/order',
            isVisible: true,
        },
        {
            label: 'Profile',
            icon: <AccountCircle />,
            action: 'profile',
            to: '#',
            value: 'profile',
            isVisible: true,
        },
    ];

    return (
        <BottomNavigationBar
            user={user}
            isUserActive={isUserActive}
            pathname={location.pathname}
            anchorEl={anchorEl}
            cartCount={totalCartCount}
            isMenuOpen={isMenuOpen}
            navItems={navItemsConfig}
            onClickAction={handleNavbarAction}
        />
    );
};
