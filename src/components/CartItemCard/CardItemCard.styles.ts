import { Card, Stack, styled } from '@mui/material';

export const StyledCartItemCard = styled(Card)(({ theme }) => ({
    padding: theme.typography.pxToRem(10),
    display: 'flex',
    gap: theme.typography.pxToRem(10),
    alignItems: 'center',
    borderRadius: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
}));

export const CartItemMedia = styled('img')(({ theme }) => ({
    width: theme.typography.pxToRem(76),
    height: theme.typography.pxToRem(76),
    borderRadius: '10px',
    objectFit: 'cover',
}));

export const ItemBottomRow = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.typography.pxToRem(5),
}));

export const QuantityCounterPill = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '16px',
    padding: theme.typography.pxToRem(5),
    gap: theme.typography.pxToRem(5),
}));
