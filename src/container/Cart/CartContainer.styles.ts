import { Box, Container, styled } from '@mui/material';

export const PageRoot = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.typography.pxToRem(64),
}));

export const MainCartContainer = styled(Container)(({ theme }) => ({
    padding: theme.typography.pxToRem(10),
    flexGrow: 1,
}));

export const EmptyCartContainer = styled(Container)(({ theme }) => ({
    padding: theme.typography.pxToRem(40),
    textAlign: 'center',
    flexGrow: 1,
}));
