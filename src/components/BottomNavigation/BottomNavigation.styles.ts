import { BottomNavigation, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BottomNavigationContainer = styled(Box)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        width: '100%',
        position: 'sticky',
        bottom: 0,
    },
}));

export const NavigationBox = styled(BottomNavigation)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}));
