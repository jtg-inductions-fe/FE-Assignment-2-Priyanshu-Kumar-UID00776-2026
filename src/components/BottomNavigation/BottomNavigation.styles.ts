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
    minWidth: '200px',
    padding: theme.spacing(1, 2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
}));
