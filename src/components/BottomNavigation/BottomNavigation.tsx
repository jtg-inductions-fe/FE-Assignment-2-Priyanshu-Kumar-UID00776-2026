import { useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
    AccountCircle,
    AddBox,
    Assignment,
    Home,
    ShoppingCart,
} from '@mui/icons-material';
import {
    BottomNavigationAction,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';

import {
    BottomNavigationContainer,
    NavigationBox,
    ProfileInfo,
} from '@/components/BottomNavigation/BottomNavigation.styles';
import { useActiveUserRoute } from '@/hooks/activeUserRoutes';
import { logout } from '@/services/auth.service';
import { clearUser } from '@/slices/authSlice';
import { showNotification } from '@/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const BottomNavigationBar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    // Read the active user details from the redux store
    const user = useAppSelector((state) => state.auth.user);

    // Convert user presence into a simple true/false login flag
    const isUserActive = Boolean(user);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Check whether the dropdown menu should be shown
    const isMenuOpen = Boolean(anchorEl);

    // Pull in our custom helper to navigate users based on auth status
    const { handleUserRoute } = useActiveUserRoute();

    // Open the dropdown menu anchored to the clicked profile element
    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

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
                            : 'Unable to logout.',
                    severity: 'error',
                }),
            );
        }
    };

    return (
        <BottomNavigationContainer>
            <NavigationBox showLabels value={location.pathname}>
                <BottomNavigationAction
                    label="Home"
                    icon={<Home />}
                    component={Link}
                    to="/restaurant"
                    value="/restaurant"
                />
                {(user?.role === 'USER' || !isUserActive) && (
                    <BottomNavigationAction
                        label="Cart"
                        icon={<ShoppingCart />}
                        onClick={() => handleUserRoute('/cart', '/login')}
                        value="/cart"
                    />
                )}
                {user?.role === 'RESTAURANT OWNER' && (
                    <BottomNavigationAction
                        label="Restaurant"
                        icon={<AddBox />}
                        onClick={() =>
                            handleUserRoute('/add-restaurant', '/login')
                        }
                        value="/add-restaurant"
                    />
                )}
                <BottomNavigationAction
                    label="Orders"
                    icon={<Assignment />}
                    onClick={() => handleUserRoute('/orders', '/login')}
                    value="/orders"
                />
                <BottomNavigationAction
                    label="Profile"
                    onClick={handleProfileClick}
                    icon={<AccountCircle />}
                    value="profile"
                />
                <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {isUserActive ? (
                        <>
                            <ProfileInfo>
                                <Typography variant="body1">
                                    {user?.fullName}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {user?.email}
                                </Typography>
                            </ProfileInfo>

                            <MenuItem onClick={void handleLogout}>
                                Logout
                            </MenuItem>
                        </>
                    ) : (
                        <MenuItem onClick={void navigate('/login')}>
                            Login
                        </MenuItem>
                    )}
                </Menu>
            </NavigationBox>
        </BottomNavigationContainer>
    );
};
