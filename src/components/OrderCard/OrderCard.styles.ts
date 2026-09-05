import { Card, CardActionArea, styled } from '@mui/material';

export const OrderStyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '20px',
    border: `1px solid ${theme.palette.primary.main}`,
    overflow: 'hidden',
    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.4)',
}));

export const OrderActionArea = styled(CardActionArea)(({ theme }) => ({
    padding: theme.typography.pxToRem(20),
}));
