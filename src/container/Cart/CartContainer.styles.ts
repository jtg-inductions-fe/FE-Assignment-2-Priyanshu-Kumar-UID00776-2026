import { Box, Container, styled, Typography } from '@mui/material';

export const PageRoot = styled(Box)(() => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '64px',
}));

export const MainCartContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    flexGrow: 1,
}));

export const EmptyCartContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    textAlign: 'center',
    flexGrow: 1,
}));

export const EmptyCartSubtitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));
