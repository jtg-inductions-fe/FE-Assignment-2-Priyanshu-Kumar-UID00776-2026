import { Box, Container, styled } from '@mui/material';

export const PageRoot = styled(Box)({
    height: '100%',
    display: 'flex',
    overflow: 'scroll',
    flexDirection: 'column',
    width: '100%',
});

export const CartContainerArea = styled(Container)({
    flexGrow: 1,
});
