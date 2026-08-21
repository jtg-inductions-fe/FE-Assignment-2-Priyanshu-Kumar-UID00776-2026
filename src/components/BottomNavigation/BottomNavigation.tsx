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
import userSessionCheck from '@/hooks/activeUserRoutes';
import { logout } from '@/services/auth.service';
import { clearUser } from '@/slices/authSlice';
import { showNotification } from '@/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const BottomNavigationBar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const user = useAppSelector((state) => state.auth.user);
    const isUserActive = !!user;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const { handleUserRoute } = userSessionCheck();

    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

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

            setTimeout(() => {
                void navigate('/login');
            }, 1000);
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
                                <Typography variant="body1" fontWeight={600}>
                                    {user?.fullName}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {user?.email}
                                </Typography>
                            </ProfileInfo>

                            <MenuItem
                                onClick={() => {
                                    void handleLogout();
                                }}
                            >
                                Logout
                            </MenuItem>
                        </>
                    ) : (
                        <MenuItem
                            onClick={() => {
                                void navigate('/login');
                            }}
                        >
                            Login
                        </MenuItem>
                    )}
                </Menu>
            </NavigationBox>
        </BottomNavigationContainer>
    );
};
