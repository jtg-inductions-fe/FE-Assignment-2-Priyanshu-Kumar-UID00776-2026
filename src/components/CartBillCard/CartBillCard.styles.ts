import { Button, Card, Divider, Stack, styled } from '@mui/material';

export const SummaryCard = styled(Card)(({ theme }) => ({
    padding: theme.typography.pxToRem(12),
    borderRadius: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
}));

export const PromoInputRow = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    gap: theme.typography.pxToRem(20),
    marginBottom: theme.typography.pxToRem(12),
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

export const DiscountBillRow = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.success.main,
}));

export const TagRow = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.typography.pxToRem(10),
}));

export const SummaryDivider = styled(Divider)(({ theme }) => ({
    margin: theme.typography.pxToRem(20),
}));

export const CheckoutSubmitButton = styled(Button)(({ theme }) => ({
    width: '100%',
    marginTop: theme.typography.pxToRem(20),
    padding: theme.typography.pxToRem(10),
    borderRadius: '10px',
}));
