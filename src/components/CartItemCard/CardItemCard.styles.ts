import { Box, Card, Stack, styled, Typography } from '@mui/material';

export const StyledCartItemCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
}));

export const CartItemMedia = styled('img')(({ theme }) => ({
    width: 76,
    height: 76,
    borderRadius: theme.shape.borderRadius * 2,
    objectFit: 'cover',
}));

export const ItemContentWrapper = styled(Box)(() => ({
    flexGrow: 1,
}));

export const ItemDescription = styled(Typography)(() => ({
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    marginTop: '2px',
}));

export const ItemBottomRow = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(1.5),
}));

export const QuantityCounterPill = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '16px',
    padding: '2px 8px',
    gap: theme.spacing(1),
}));

export const QuantityDisplay = styled(Typography)(() => ({
    fontWeight: 600,
    minWidth: '16px',
    textAlign: 'center',
}));
