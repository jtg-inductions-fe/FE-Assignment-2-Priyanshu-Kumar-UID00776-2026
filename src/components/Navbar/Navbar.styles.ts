import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const NavbarContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: theme.typography.pxToRem(72),
    padding: theme.spacing(0, 3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.secondary.light,
    borderBottom: `1px solid ${theme.palette.divider}`,

    [theme.breakpoints.down('sm')]: {
        height: theme.typography.pxToRem(64),
        padding: theme.spacing(0, 2),
    },
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.2),
}));

export const NavbarActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

export const ProfileInfo = styled(Box)(({ theme }) => ({
    minWidth: theme.typography.pxToRem(200),
    padding: theme.spacing(1, 2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
}));
