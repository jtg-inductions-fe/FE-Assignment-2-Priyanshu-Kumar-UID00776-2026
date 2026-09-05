import { Badge, BottomNavigationAction } from '@mui/material';

import { ProfileMenu } from '@/components/ProfileMenu/ProfileMenu';
import { BottomNavigationBarProps } from '@/container/BottomNavigationBar/bottomNavigation.types';

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
    navItems,
    cartCount,
    onClickAction,
}: BottomNavigationBarProps) => (
    <BottomNavigationContainer>
        <NavigationBox showLabels value={pathname}>
            {navItems
                .filter((item) => item.isVisible)
                .map((item) => (
                    <BottomNavigationAction
                        key={item.value}
                        label={item.label}
                        icon={
                            item.label === 'Cart' ? (
                                <Badge badgeContent={cartCount} color="error">
                                    {item.icon}
                                </Badge>
                            ) : (
                                item.icon
                            )
                        }
                        onClick={(event) => onClickAction(item.action, event)}
                        value={item.value}
                    />
                ))}

            <ProfileMenu
                user={user}
                isUserActive={isUserActive}
                anchorEl={anchorEl}
                isMenuOpen={isMenuOpen}
                onCloseMenu={() => onClickAction('closeMenu')}
                onLogoutClick={() => onClickAction('logout')}
                onLoginClick={() => onClickAction('login')}
            />
        </NavigationBox>
    </BottomNavigationContainer>
);
