import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Card)({
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.30)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-4px)',
    },
});

export const ImageWrapper = styled(Box)({
    position: 'relative',
});

export const RatingBadge = styled(Typography)(({ theme }) => ({
    display: 'flex',
    position: 'absolute',
    top: theme.typography.pxToRem(12),
    right: theme.typography.pxToRem(12),
    backgroundColor: theme.palette.secondary.main,
    padding: theme.typography.pxToRem(8),
    borderRadius: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.typography.pxToRem(4),
}));

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

export const OwnerActionStack = styled(Stack)(({ theme }) => ({
    marginTop: theme.typography.pxToRem(8),
}));

export const OwnerActionButton = styled(Button)({
    textTransform: 'none',
});
