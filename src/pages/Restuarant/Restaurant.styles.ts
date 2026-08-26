import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const RestaurantContainer = styled(Box)(({ theme }) => ({
    minHeight: '100dvh',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
}));

export const RestaurantContent = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));
