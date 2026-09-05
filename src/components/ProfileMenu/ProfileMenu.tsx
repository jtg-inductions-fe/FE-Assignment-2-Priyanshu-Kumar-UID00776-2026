import { Box, Typography } from '@mui/material';

import {
    LoginMenuItem,
    LogoutMenuItem,
    ProfileInfo,
    StyledMenu,
} from '@/components/ProfileMenu/ProfileMenu.styles';
import { ProfileMenuProps } from '@/components/ProfileMenu/profileMenu.types';

export const ProfileMenu = ({
    user,
    isUserActive,
    anchorEl,
    isMenuOpen,
    onCloseMenu,
    onLogoutClick,
    onLoginClick,
}: ProfileMenuProps) => (
    <StyledMenu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={onCloseMenu}
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
            <Box>
                <ProfileInfo>
                    <Typography variant="body1">{user?.fullName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user?.email}
                    </Typography>
                </ProfileInfo>

                <LogoutMenuItem onClick={onLogoutClick}>Logout</LogoutMenuItem>
            </Box>
        ) : (
            onLoginClick && (
                <LoginMenuItem onClick={onLoginClick}>Login</LoginMenuItem>
            )
        )}
    </StyledMenu>
);
