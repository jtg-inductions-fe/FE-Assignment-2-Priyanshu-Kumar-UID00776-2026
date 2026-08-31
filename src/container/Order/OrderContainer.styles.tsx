import { Box, styled } from '@mui/material';

export const OrdersPage = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    paddingBottom: theme.typography.pxToRem(80),
}));
