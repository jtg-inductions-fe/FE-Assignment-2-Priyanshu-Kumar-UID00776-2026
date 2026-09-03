import { Box, Container, styled } from '@mui/material';

export const PageRoot = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.typography.pxToRem(64),
}));

export const CartContainerArea = styled(Container)(({ theme }) => ({
    padding: theme.typography.pxToRem(10),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
}));
