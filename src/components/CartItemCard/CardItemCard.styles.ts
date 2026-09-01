import { Card, styled } from '@mui/material';

export const StyledCartItemCard = styled(Card)(({ theme }) => ({
    padding: theme.typography.pxToRem(10),
    display: 'flex',
    gap: theme.typography.pxToRem(10),
    alignItems: 'center',
    borderRadius: '20px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.6)',
}));

export const CartItemMedia = styled('img')(({ theme }) => ({
    width: theme.typography.pxToRem(90),
    height: theme.typography.pxToRem(120),
    borderRadius: '10px',
    objectFit: 'cover',
}));
