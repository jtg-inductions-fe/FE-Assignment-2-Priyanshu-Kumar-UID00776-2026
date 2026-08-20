import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
    Avatar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';

import {
    Logo,
    LogoContainer,
    NavbarActions,
    NavbarContainer,
    ProfileInfo,
} from './Navbar.styles';
import LogoImage from '../../assets/images/logo.avif';
import { logout } from '../../services/auth.service';
import { clearUser } from '../../slices/authSlice';
import { showNotification } from '../../slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

interface NavigationPage {
    name: string;
    path: string;
}

const pages: NavigationPage[] = [{ name: 'Orders', path: '/orders' }];

export const Navbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);

    const isUserActive = !!user;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

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

    const userInitial = user?.fullName?.charAt(0).toUpperCase() || 'U';

    return (
        <NavbarContainer>
            <LogoContainer onClick={() => void navigate('/')}>
                <Logo>
                    <img
                        src={LogoImage}
                        height="100%"
                        width="100%"
                        alt="Logo"
                    />
                </Logo>

                <Typography variant="h6" fontWeight={700} color="primary.main">
                    Khanna Peena
                </Typography>
            </LogoContainer>
            <NavbarActions>
                {isUserActive &&
                    pages.map((item) => (
                        <MenuItem
                            component={Link}
                            to={item.path}
                            key={item.name}
                        >
                            {item.name}
                        </MenuItem>
                    ))}

                {isUserActive ? (
                    <>
                        {user && user.role === 'USER' && (
                            <IconButton
                                aria-label="shopping cart"
                                size="large"
                                component={Link}
                                to="/cart"
                            >
                                <ShoppingCartOutlinedIcon />
                            </IconButton>
                        )}

                        <IconButton
                            onClick={handleProfileClick}
                            size="small"
                            aria-label="profile"
                        >
                            <Avatar>{userInitial}</Avatar>
                        </IconButton>
                    </>
                ) : (
                    <Button href="/login" variant="outlined">
                        Login
                    </Button>
                )}

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
                        <Typography variant="body1" fontWeight={600}>
                            {user?.fullName}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
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
                </Menu>
            </NavbarActions>
        </NavbarContainer>
    );
};
