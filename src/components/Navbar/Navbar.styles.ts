import { Avatar, Box, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const NavbarContainer = styled(Box)(({ theme }) => ({
    height: theme.typography.pxToRem(71),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1.5, 4),
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
    position: 'sticky',
    top: 0,
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.typography.pxToRem(6),
    cursor: 'pointer',
}));

export const Logo = styled(Box)(({ theme }) => ({
    width: theme.typography.pxToRem(40),
    height: theme.typography.pxToRem(40),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '8px',
}));

export const NavbarActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.typography.pxToRem(8),
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

export const NavIconButton = styled(IconButton)(({ theme }) => ({
    borderRadius: '12px',
    padding: theme.spacing(1, 1.5),
    display: 'flex',
    alignItems: 'center',
    gap: theme.typography.pxToRem(4),
    color: theme.palette.text.primary,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.primary.main,
    },
}));

export const LoginButton = styled(Button)(({ theme }) => ({
    borderRadius: '10px',
    padding: theme.spacing(0.75, 2.5),
    textTransform: 'none',
}));

export const ProfileIconButton = styled(IconButton)(({ theme }) => ({
    padding: theme.typography.pxToRem(2),
    marginLeft: theme.typography.pxToRem(4),
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.typography.pxToRem(44),
    height: theme.typography.pxToRem(44),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.06)',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
    },
}));
