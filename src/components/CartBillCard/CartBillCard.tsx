import { useState } from 'react';

import {
    ArrowForward as ArrowForwardIcon,
    LocalOfferOutlined as TagIcon,
} from '@mui/icons-material';
import { Stack, TextField, Typography } from '@mui/material';

import {
    ApplyPromoButton,
    BillRow,
    CheckoutSubmitButton,
    DiscountBillRow,
    PromoInputRow,
    SummaryCard,
    SummaryDivider,
    TagRow,
} from '@/components/CartBillCard/CartBillCard.styles';
import { CartBill } from '@/types/cart.types';

export const CartBillCard = ({
    subtotal,
    bookingFee,
    taxes,
    total,
    discountAmount,
    appliedPromoCode,
    onApplyPromo,
    onCheckout,
}: CartBill) => {
    const [couponInput, setCouponInput] = useState('');

    return (
        <SummaryCard>
            <PromoInputRow>
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
            </PromoInputRow>

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
                    <DiscountBillRow>
                        <TagRow>
                            <TagIcon fontSize="small" />
                            <Typography variant="body1">
                                Coupon Applied ({appliedPromoCode})
                            </Typography>
                        </TagRow>
                        <Typography variant="body1">
                            -₹{discountAmount.toFixed(2)}
                        </Typography>
                    </DiscountBillRow>
                )}

                <SummaryDivider />

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
            >
                Go to Checkout
            </CheckoutSubmitButton>
        </SummaryCard>
    );
};
