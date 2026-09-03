import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MessageSub = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginBottom: theme.typography.pxToRem(16),
    maxWidth: theme.typography.pxToRem(480),
}));

export const AccountButton = styled(Button)(({ theme }) => ({
    padding: theme.typography.pxToRem(8),
    borderRadius: '10px',
    textTransform: 'none',
    boxShadow: theme.shadows[2],
}));
