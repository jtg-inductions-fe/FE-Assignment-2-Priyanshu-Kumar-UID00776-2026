import { Button, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Card)({
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.30)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.typography.pxToRem(20),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const MetaItem = styled(Typography)(({ theme }) => ({
    display: 'flex',
    color: theme.palette.secondary.dark,
    alignItems: 'center',
    gap: theme.typography.pxToRem(4),
    marginTop: theme.typography.pxToRem(5),
}));

export const OwnerActionButton = styled(Button)({
    textTransform: 'none',
});
