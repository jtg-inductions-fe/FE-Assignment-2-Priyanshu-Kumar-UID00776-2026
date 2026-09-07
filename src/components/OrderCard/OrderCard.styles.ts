import { Card, CardActionArea, styled } from '@mui/material';

export const OrderStyledCard = styled(Card)({
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.2)',
});

export const OrderActionArea = styled(CardActionArea)(({ theme }) => ({
    padding: theme.typography.pxToRem(20),
}));
