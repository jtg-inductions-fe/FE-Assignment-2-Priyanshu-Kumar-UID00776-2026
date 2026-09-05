import { useState } from 'react';

import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { Divider, Stack, TextField, Typography, useTheme } from '@mui/material';

import {
    ApplyPromoButton,
    BillRow,
    CheckoutSubmitButton,
    SummaryCard,
} from '@/components/CartBillCard/CartBillCard.styles';
import { CartBill } from '@/container/Cart/cart.types';

export const CartBillCard = ({
    subtotal,
    bookingFee,
    taxes,
    total,
    discountAmount,
    appliedPromoCode,
    onApplyPromo,
    onCheckout,
    onCheckoutLoading,
}: CartBill) => {
    const [couponInput, setCouponInput] = useState('');
    const theme = useTheme();

    return (
        <SummaryCard>
            <Stack direction="row" gap={theme.typography.pxToRem(20)} py={3}>
                <TextField
                    size="small"
                    fullWidth
                    placeholder="Apply Coupon Code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                />
                <ApplyPromoButton
                    variant="contained"
                    onClick={() => onApplyPromo(couponInput)}
                >
                    Apply
                </ApplyPromoButton>
            </Stack>

            <Typography variant="h4">Bill Details</Typography>

            <Stack spacing={3}>
                <BillRow>
                    <Typography color="text.secondary">Item Total</Typography>
                    <Typography variant="body1">
                        ₹{subtotal.toFixed(2)}
                    </Typography>
                </BillRow>

                <BillRow>
                    <Typography color="text.secondary">Booking Fee</Typography>
                    <Typography variant="body1">
                        ₹{bookingFee.toFixed(2)}
                    </Typography>
                </BillRow>

                <BillRow>
                    <Typography color="text.secondary">
                        Estimated Taxes
                    </Typography>
                    <Typography variant="body1">₹{taxes.toFixed(2)}</Typography>
                </BillRow>

                {appliedPromoCode && (
                    <BillRow color={theme.palette.tertiary.light}>
                        <Typography variant="body1">
                            Coupon Applied ({appliedPromoCode})
                        </Typography>

                        <Typography variant="body1">
                            -₹{discountAmount.toFixed(2)}
                        </Typography>
                    </BillRow>
                )}

                <Divider />

                <BillRow>
                    <Typography variant="h4">Total Pay</Typography>
                    <Typography variant="h5" color="text.primary">
                        ₹{total.toFixed(2)}
                    </Typography>
                </BillRow>
            </Stack>

            <CheckoutSubmitButton
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={onCheckout}
                loading={onCheckoutLoading}
            >
                Go to Checkout
            </CheckoutSubmitButton>
        </SummaryCard>
    );
};
