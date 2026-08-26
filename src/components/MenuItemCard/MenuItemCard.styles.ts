import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledMenuCard = styled(Card)(({ theme }) => ({
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    transition: 'transform 0.2s ease-in-out',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
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
    padding: theme.spacing(2),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:last-child': {
        paddingBottom: theme.spacing(2),
    },
}));

export const QuantityCounter = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.palette.action.hover,
    borderRadius: '12px',
    padding: theme.spacing(0.2, 0.8),
    gap: theme.spacing(1),
}));

export const CounterButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(0.5),
    color: theme.palette.primary.main,
}));

export const AddButton = styled(Button)(({ theme }) => ({
    borderRadius: '10px',
    padding: theme.spacing(0.5, 2.5),
    textTransform: 'none',
    fontWeight: 600,
}));

export const RatingBadge = styled(Typography)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.typography.pxToRem(3),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700,
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    padding: theme.spacing(0.2, 0.8),
    borderRadius: '6px',
}));
