import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledMenuCard = styled(Card)(({ theme }) => ({
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    display: 'flex',
    width: '100%',
    minWidth: theme.typography.pxToRem(450),
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
        minWidth: '100%',
        minHeight: theme.typography.pxToRem(120),
    },
}));

export const MenuImageWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: theme.typography.pxToRem(160),
    minWidth: theme.typography.pxToRem(160),
    [theme.breakpoints.down('sm')]: {
        width: theme.typography.pxToRem(110),
        minWidth: theme.typography.pxToRem(110),
    },
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

export const QuantityCounter = styled(Stack)(({ theme }) => ({
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: '12px',
    gap: theme.typography.pxToRem(4),
}));

export const CounterButton = styled(IconButton)(({ theme }) => ({
    padding: theme.typography.pxToRem(4),
    color: theme.palette.primary.main,
}));

export const AddButton = styled(Button)(({ theme }) => ({
    borderRadius: '10px',
    textTransform: 'none',
    padding: theme.typography.pxToRem(2),
}));

export const RatingBadge = styled(Box)(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.secondary.main,
    padding: theme.typography.pxToRem(2),
    borderRadius: '15px',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.typography.pxToRem(3),
    '& .MuiSvgIcon-root': {
        color: '#FFD700',
        fontSize: theme.typography.pxToRem(16),
    },
}));
