import { Box, Button, Card, CardContent, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledMenuCard = styled(Card)(({ theme }) => ({
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    display: 'flex',
    width: '100%',
    minWidth: theme.typography.pxToRem(350),
    backgroundColor: theme.palette.background.paper,
}));

export const MenuCardBody = styled(CardContent)(({ theme }) => ({
    padding: theme.typography.pxToRem(8),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const StyledCardMedia = styled('img')(() => ({
    height: '100%',
    width: '100%',
    objectFit: 'cover',
}));

export const CounterButton = styled(IconButton)(({ theme }) => ({
    padding: theme.typography.pxToRem(4),
    color: theme.palette.primary.main,
}));

export const AddButton = styled(Button)(({ theme }) => ({
    borderRadius: '10px',
    textTransform: 'none',
    padding: theme.typography.pxToRem(4),
}));

export const RatingBadge = styled(Box)(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.secondary.main,
    padding: theme.typography.pxToRem(4),
    borderRadius: '15px',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.light,
    gap: theme.typography.pxToRem(5),
}));
