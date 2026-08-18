import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ErrorPageContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    overflow: 'hidden',
}));

export const NotFoundContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    padding: theme.spacing(4),
}));

export const ErrorCode = styled(Typography)(({ theme }) => ({
    fontSize: '10rem',
    fontWeight: 800,
    color: theme.palette.primary.main || '#1976d2',
    lineHeight: 1,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        fontSize: '6rem',
    },
}));

export const MessageTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary || '#333',
}));

export const MessageSub = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary || '#666',
    marginBottom: theme.spacing(4),
    maxWidth: '480px',
}));

export const AccountButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5, 4),
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius || 8,
    textTransform: 'none',
    boxShadow: theme.shadows[2],
}));
