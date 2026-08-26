import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import { logout } from '@/services/auth.service';
import { clearUser } from '@/slices/authSlice';
import { showNotification } from '@/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

import {
    LogoContainer,
    NavbarActions,
    NavbarContainer,
    ProfileInfo,
} from './Navbar.styles';

export const Navbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Read the current logged in user details from the redux store
    const user = useAppSelector((state) => state.auth.user);

    // Track the HTML element that anchors the dropdown menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Check if the dropdown menu is currently visible
    const isMenuOpen = Boolean(anchorEl);

    // Open the dropdown menu anchored to the clicked profile element
    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Close the dropdown menu by clearing the anchor element.
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // Log the user out, clear their session, display an alert, and redirect to login
    const handleLogout = async () => {
        // Dismiss the dropdown menu
        handleCloseMenu();

        try {
            // Call the logout function to end the active session
            await logout();

            // Clear the user from the global redux store and localStorage
            dispatch(clearUser());

            // Show a green logout success banner
            dispatch(
                showNotification({
                    message: 'Successfully logged out!',
                    severity: 'success',
                }),
            );

            // Redirecting the user to login screen after logout
            void navigate('/login');
        } catch (error) {
            // Display an error banner if logging out fails
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

    // Get the capitalized first letter of the user's name for the avatar, defaulting to 'U'
    const userInitial = user?.fullName?.charAt(0).toUpperCase() ?? 'U';

    return (
        <NavbarContainer>
            <LogoContainer>
                <Typography variant="h2">Khana Peena</Typography>
            </LogoContainer>

            <NavbarActions>
                <IconButton aria-label="shopping cart" size="large">
                    <ShoppingCartOutlinedIcon />
                </IconButton>

                <IconButton
                    onClick={handleProfileClick}
                    size="small"
                    aria-label="profile"
                >
                    <Avatar>{userInitial}</Avatar>
                </IconButton>

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
                    <ProfileInfo>
                        <Typography variant="body1">
                            {user?.fullName}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {user?.email}
                        </Typography>
                    </ProfileInfo>

                    <MenuItem onClick={void handleLogout}>Logout</MenuItem>
                </Menu>
            </NavbarActions>
        </NavbarContainer>
    );
};
