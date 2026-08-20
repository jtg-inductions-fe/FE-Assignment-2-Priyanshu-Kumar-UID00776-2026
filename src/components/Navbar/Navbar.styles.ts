import {
    Avatar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const NavbarContainer = styled(Box)(({ theme }) => ({
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1.5, 4),
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1100,
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    cursor: 'pointer',
    userSelect: 'none',
}));

export const Logo = styled(Box)(() => ({
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '8px',
}));

export const BrandName = styled(Typography)(({ theme }) => ({
    fontWeight: 800,
    color: theme.palette.primary.main,
}));

export const NavbarActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

export const NavIconButton = styled(IconButton)(({ theme }) => ({
    borderRadius: '12px',
    padding: theme.spacing(1, 1.5),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 600,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.primary.main,
    },
}));

export const NavLabel = styled(Typography)(() => ({
    fontSize: 'inherit',
    fontWeight: 'inherit',
    color: 'inherit',
}));

export const LoginButton = styled(Button)(({ theme }) => ({
    borderRadius: '10px',
    fontWeight: 600,
    padding: theme.spacing(0.75, 2.5),
    textTransform: 'none',
}));

export const ProfileIconButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 44,
    height: 44,
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 700,
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

export const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        marginTop: theme.spacing(1.5),
        borderRadius: '12px',
        minWidth: '200px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
}));

export const ProfileInfo = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1.5, 2),
    minWidth: '180px',
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const ProfileName = styled(Typography)(() => ({
    fontWeight: 700,
}));

export const LogoutMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.error.main,
    fontWeight: 600,
    margin: theme.spacing(0.5, 1),
    borderRadius: '8px',
}));
