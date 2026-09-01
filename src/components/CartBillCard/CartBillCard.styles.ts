import { Button, Card, Stack, styled } from '@mui/material';

export const SummaryCard = styled(Card)(({ theme }) => ({
    padding: theme.typography.pxToRem(12),
    borderRadius: '20px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.6)',
}));

export const ApplyPromoButton = styled(Button)(({ theme }) => ({
    color: theme.palette.secondary.light,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

export const BillRow = styled(Stack)(() => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const CheckoutSubmitButton = styled(Button)(({ theme }) => ({
    width: '100%',
    marginTop: theme.typography.pxToRem(20),
    padding: theme.typography.pxToRem(10),
    borderRadius: '10px',
}));
