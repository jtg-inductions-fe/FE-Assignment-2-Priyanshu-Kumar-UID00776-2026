import { Box, Card, CardActionArea, styled } from '@mui/material';

export const OrderStyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '20px',
    border: `1px solid ${theme.palette.primary.main}`,
    overflow: 'hidden',
    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.4)',
}));

export const OrderActionArea = styled(CardActionArea)(({ theme }) => ({
    padding: theme.typography.pxToRem(20),
}));

export const ExpandedDetailsBox = styled(Box)(({ theme }) => ({
    padding: theme.typography.pxToRem(20),
}));

export const CustomerContactSection = styled(Box)(({ theme }) => ({
    marginTop: theme.typography.pxToRem(20),
    paddingTop: theme.typography.pxToRem(12),
    borderTop: `1px solid ${theme.palette.divider}`,
}));

export const StatusSelectContainer = styled(Box)(({ theme }) => ({
    padding: theme.typography.pxToRem(20),
}));
