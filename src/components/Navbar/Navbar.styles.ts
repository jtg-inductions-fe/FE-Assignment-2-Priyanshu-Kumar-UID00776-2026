import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const NavbarContainer = styled(Box)(({ theme }) => ({
    height: '70px',
    padding: theme.spacing(0, 3),
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.secondary.light,
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2),
    },
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.2),
}));

export const Logo = styled(Box)(({ theme }) => ({
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 700,
    objectFit: 'contain',
}));

export const NavbarActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

export const ProfileInfo = styled(Box)(({ theme }) => ({
    minWidth: '200px',
    padding: theme.spacing(1, 2),
    display: 'flex',
    flexDirection: 'column',

    gap: theme.spacing(0.5),
}));
