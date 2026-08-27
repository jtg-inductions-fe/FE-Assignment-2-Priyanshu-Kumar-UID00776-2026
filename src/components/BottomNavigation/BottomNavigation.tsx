import { BottomNavigationAction } from '@mui/material';

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
    navItems,
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
                        icon={item.icon}
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
