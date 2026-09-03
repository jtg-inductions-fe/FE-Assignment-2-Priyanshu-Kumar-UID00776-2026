import { Box, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        marginTop: theme.typography.pxToRem(6),
        borderRadius: '12px',
        minWidth: theme.typography.pxToRem(200),
        boxShadow: '0 8px 10px rgba(0, 0, 0, 0.12)',
    },
}));

export const ProfileInfo = styled(Box)(({ theme }) => ({
    padding: theme.typography.pxToRem(8),
    minWidth: theme.typography.pxToRem(180),
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const LogoutMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.error.main,
    margin: theme.typography.pxToRem(4),
    borderRadius: '8px',
}));

export const LoginMenuItem = styled(MenuItem)(({ theme }) => ({
    margin: theme.typography.pxToRem(4),
    borderRadius: '8px',
}));
