import {
    AccountCircle,
    AddBox,
    Assignment,
    Home,
    ShoppingCart,
} from '@mui/icons-material';
import { Badge, BottomNavigationAction } from '@mui/material';

import { ProfileMenu } from '@/components/ProfileMenu/ProfileMenu';
import type { BottomNavigationBarProps } from '@/types/bottomNavigation.types';

import {
    BottomNavigationContainer,
    NavigationBox,
} from './BottomNavigation.styles';

export const BottomNavigationBar = ({
    user,
    isUserActive,
    pathname,
    anchorEl,
    isMenuOpen,
    cartCount = 0,
    onHomeClick,
    onCartClick,
    onAddRestaurantClick,
    onOrdersClick,
    onProfileClick,
    onCloseMenu,
    onLogoutClick,
    onLoginClick,
}: BottomNavigationBarProps) => {
    const navItemsConfig = [
        {
            label: 'Home',
            icon: <Home />,
            onClick: onHomeClick,
            value: '/restaurant',
            isVisible: true,
        },
        {
            label: 'Cart',
            icon: (
                <Badge badgeContent={cartCount} color="error">
                    <ShoppingCart />
                </Badge>
            ),
            onClick: onCartClick,
            value: '/cart',
            isVisible: user?.role === 'USER' || !isUserActive,
        },
        {
            label: 'Restaurant',
            icon: <AddBox />,
            onClick: onAddRestaurantClick,
            value: '/add-restaurant',
            isVisible: user?.role === 'RESTAURANT OWNER',
        },
        {
            label: 'Orders',
            icon: <Assignment />,
            onClick: onOrdersClick,
            value: '/orders',
            isVisible: true,
        },
        {
            label: 'Profile',
            icon: <AccountCircle />,
            onClick: onProfileClick,
            value: 'profile',
            isVisible: true,
        },
    ];

    return (
        <BottomNavigationContainer>
            <NavigationBox showLabels value={pathname}>
                {navItemsConfig
                    .filter((item) => item.isVisible)
                    .map((item) => (
                        <BottomNavigationAction
                            key={item.value}
                            label={item.label}
                            icon={item.icon}
                            onClick={item.onClick}
                            value={item.value}
                        />
                    ))}

                <ProfileMenu
                    user={user}
                    isUserActive={isUserActive}
                    anchorEl={anchorEl}
                    isMenuOpen={isMenuOpen}
                    onCloseMenu={onCloseMenu}
                    onLogoutClick={onLogoutClick}
                    onLoginClick={onLoginClick}
                />
            </NavigationBox>
        </BottomNavigationContainer>
    );
};
