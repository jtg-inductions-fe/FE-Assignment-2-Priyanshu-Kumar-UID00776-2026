import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, Typography } from '@mui/material';

import LogoImage from '@/assets/images/logo.avif';
import { ProfileMenu } from '@/components/ProfileMenu/ProfileMenu';
import { NavbarProps } from '@/types/navbar.types';

import {
    LoginButton,
    Logo,
    LogoContainer,
    NavbarActions,
    NavbarContainer,
    NavIconButton,
    ProfileIconButton,
    StyledAvatar,
} from './Navbar.styles';

export const Navbar = ({
    user,
    isUserActive,
    userInitial,
    anchorEl,
    isMenuOpen,
    cartCount = 0,
    onClickAction,
}: NavbarProps) => (
    <NavbarContainer>
        <LogoContainer onClick={() => onClickAction('logo')}>
            <Logo>
                <img
                    src={LogoImage}
                    height="100%"
                    width="100%"
                    alt="Khana Peena Logo"
                />
            </Logo>

            <Typography color="primary.main" variant="h5">
                Khana Peena
            </Typography>
        </LogoContainer>

        <NavbarActions>
            {isUserActive ? (
                <>
                    <NavIconButton
                        onClick={() => onClickAction('orders')}
                        aria-label="orders"
                    >
                        <ReceiptLongOutlinedIcon fontSize="small" />
                        <Typography variant="body1">Orders</Typography>
                    </NavIconButton>

                    {user?.role === 'USER' && (
                        <NavIconButton
                            onClick={() => onClickAction('cart')}
                            aria-label="cart"
                        >
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingCartOutlinedIcon fontSize="small" />
                            </Badge>
                            <Typography variant="body1">Cart</Typography>
                        </NavIconButton>
                    )}

                    <ProfileIconButton
                        onClick={(event) => onClickAction('profile', event)}
                        size="medium"
                        aria-label="account settings"
                    >
                        <StyledAvatar>{userInitial}</StyledAvatar>
                    </ProfileIconButton>
                </>
            ) : (
                <LoginButton
                    onClick={() => onClickAction('login')}
                    variant="outlined"
                >
                    Login
                </LoginButton>
            )}

            <ProfileMenu
                user={user}
                isUserActive={isUserActive}
                anchorEl={anchorEl}
                isMenuOpen={isMenuOpen}
                onCloseMenu={() => onClickAction('closeMenu')}
                onLogoutClick={() => onClickAction('logout')}
                onLoginClick={() => onClickAction('login')}
            />
        </NavbarActions>
    </NavbarContainer>
);
