import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Typography } from '@mui/material';

import {
    BrandName,
    LoginButton,
    Logo,
    LogoContainer,
    LogoutMenuItem,
    NavbarActions,
    NavbarContainer,
    NavIconButton,
    NavLabel,
    ProfileIconButton,
    ProfileInfo,
    ProfileName,
    StyledAvatar,
    StyledMenu,
} from './Navbar.styles';
import LogoImage from '../../assets/images/logo.avif';
import { logout } from '../../services/auth.service';
import { clearUser } from '../../slices/authSlice';
import { showNotification } from '../../slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

export const Navbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);

    const isUserActive = Boolean(user);

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

    const userInitial = user?.fullName?.charAt(0).toUpperCase() || 'U';

    return (
        <NavbarContainer>
            <LogoContainer onClick={() => void navigate('/')}>
                <Logo>
                    <img
                        src={LogoImage}
                        height="100%"
                        width="100%"
                        alt="Khana Peena Logo"
                    />
                </Logo>

                <BrandName variant="h5">Khana Peena</BrandName>
            </LogoContainer>

            <NavbarActions>
                {isUserActive ? (
                    <>
                        <NavIconButton
                            onClick={() => void navigate('/orders')}
                            aria-label="orders"
                        >
                            <ReceiptLongOutlinedIcon fontSize="small" />
                            <NavLabel>Orders</NavLabel>
                        </NavIconButton>

                        {user?.role === 'USER' && (
                            <NavIconButton
                                onClick={() => void navigate('/cart')}
                                aria-label="cart"
                            >
                                <ShoppingCartOutlinedIcon fontSize="small" />
                                <NavLabel>Cart</NavLabel>
                            </NavIconButton>
                        )}

                        <ProfileIconButton
                            onClick={handleProfileClick}
                            size="medium"
                            aria-label="account settings"
                        >
                            <StyledAvatar>{userInitial}</StyledAvatar>
                        </ProfileIconButton>
                    </>
                ) : (
                    <LoginButton
                        onClick={() => void navigate('/login')}
                        variant="outlined"
                    >
                        Login
                    </LoginButton>
                )}

                <StyledMenu
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
                        <ProfileName variant="subtitle1">
                            {user?.fullName}
                        </ProfileName>
                        <Typography variant="body2" color="text.secondary">
                            {user?.email}
                        </Typography>
                    </ProfileInfo>

                    <LogoutMenuItem
                        onClick={() => {
                            void handleLogout();
                        }}
                    >
                        Logout
                    </LogoutMenuItem>
                </StyledMenu>
            </NavbarActions>
        </NavbarContainer>
    );
};
