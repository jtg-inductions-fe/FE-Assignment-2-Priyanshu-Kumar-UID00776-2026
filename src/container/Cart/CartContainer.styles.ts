import { Box, Container, styled } from '@mui/material';

export const PageRoot = styled(Box)({
    maxHeight: '100vh',
    display: 'flex',
    overflow: 'scroll',
    flexDirection: 'column',
});

export const CartContainerArea = styled(Container)({
    flexGrow: 1,
});
