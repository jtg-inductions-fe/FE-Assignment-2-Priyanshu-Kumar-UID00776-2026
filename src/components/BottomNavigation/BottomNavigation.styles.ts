import { BottomNavigation, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BottomNavigationContainer = styled(Box)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'red',
        bottom: 0,
    },
}));

export const NavigationBox = styled(BottomNavigation)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}));

export const ProfileInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minWidth: theme.typography.pxToRem(200),
    padding: theme.spacing(1, 2),
    gap: theme.typography.pxToRem(2),
}));
