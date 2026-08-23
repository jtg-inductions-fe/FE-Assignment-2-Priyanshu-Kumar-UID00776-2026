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
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
}));

export const MessageTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
}));

export const MessageSub = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
    maxWidth: theme.typography.pxToRem(480),
}));

export const AccountButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5, 4),
    borderRadius: '10px',
    textTransform: 'none',
    boxShadow: theme.shadows[2],
}));
