import { Button, Card, Divider, Stack, styled } from '@mui/material';

export const SummaryCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 3,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
}));

export const PromoInputRow = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(3),
}));

export const ApplyPromoButton = styled(Button)(() => ({
    backgroundColor: '#e0e0e0',
    color: '#000',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#d5d5d5',
    },
}));

export const BillStack = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(2),
    gap: theme.spacing(1.5),
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
    gap: theme.spacing(0.5),
}));

export const SummaryDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
}));

export const CheckoutSubmitButton = styled(Button)(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius * 2,
}));
