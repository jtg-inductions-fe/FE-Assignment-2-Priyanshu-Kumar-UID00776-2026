import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import LogoImage from '@/assets/images/logo.avif';
import { ProfileMenu } from '@/components/ProfileMenu/ProfileMenu';
import type { NavbarProps } from '@/types/navbar.types';

import {
    BrandName,
    LoginButton,
    Logo,
    LogoContainer,
    NavbarActions,
    NavbarContainer,
    NavIconButton,
    NavLabel,
    ProfileIconButton,
    StyledAvatar,
} from './Navbar.styles';

export const Navbar = ({
    user,
    isUserActive,
    userInitial,
    anchorEl,
    isMenuOpen,
    onLogoClick,
    onOrdersClick,
    onCartClick,
    onProfileClick,
    onLoginClick,
    onCloseMenu,
    onLogoutClick,
}: NavbarProps) => (
    <NavbarContainer>
        <LogoContainer onClick={onLogoClick}>
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
                    <NavIconButton onClick={onOrdersClick} aria-label="orders">
                        <ReceiptLongOutlinedIcon fontSize="small" />
                        <NavLabel>Orders</NavLabel>
                    </NavIconButton>

                    {user?.role === 'USER' && (
                        <NavIconButton onClick={onCartClick} aria-label="cart">
                            <ShoppingCartOutlinedIcon fontSize="small" />
                            <NavLabel variant="body1">Cart</NavLabel>
                        </NavIconButton>
                    )}

                    <ProfileIconButton
                        onClick={onProfileClick}
                        size="medium"
                        aria-label="account settings"
                    >
                        <StyledAvatar>{userInitial}</StyledAvatar>
                    </ProfileIconButton>
                </>
            ) : (
                <LoginButton onClick={onLoginClick} variant="outlined">
                    Login
                </LoginButton>
            )}

            <ProfileMenu
                user={user}
                isUserActive={isUserActive}
                anchorEl={anchorEl}
                isMenuOpen={isMenuOpen}
                onCloseMenu={onCloseMenu}
                onLogoutClick={onLogoutClick}
                onLoginClick={onLoginClick}
            />
        </NavbarActions>
    </NavbarContainer>
);
