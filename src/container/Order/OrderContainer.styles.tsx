import { Box, styled } from '@mui/material';

export const OrdersPage = styled(Box)(({ theme }) => ({
    height: '100vh',
    maxHeight: '100vh',
    overflowY: 'auto',
    paddingBottom: theme.typography.pxToRem(150),
}));
