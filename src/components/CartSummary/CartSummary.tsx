import { useState } from 'react';

import {
    ArrowForward as ArrowForwardIcon,
    LocalOfferOutlined as TagIcon,
} from '@mui/icons-material';
import { TextField, Typography } from '@mui/material';

import {
    ApplyPromoButton,
    BillRow,
    BillStack,
    CheckoutSubmitButton,
    DiscountBillRow,
    PromoInputRow,
    SummaryCard,
    SummaryDivider,
    TagRow,
} from '@/components/CartSummary/CartSummary.styles';

interface CartSummaryProps {
    subtotal: number;
    bookingFee: number;
    taxes: number;
    total: number;
    discountAmount: number;
    appliedPromoCode: string | null;
    onApplyPromo: (code: string) => void;
    onCheckout: () => void;
}

export const CartSummary = ({
    subtotal,
    bookingFee,
    taxes,
    total,
    discountAmount,
    appliedPromoCode,
    onApplyPromo,
    onCheckout,
}: CartSummaryProps) => {
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

            <Typography variant="h6" fontWeight={700} gutterBottom>
                Bill Details
            </Typography>

            <BillStack>
                <BillRow>
                    <Typography color="text.secondary">Item Total</Typography>
                    <Typography fontWeight={600}>
                        ₹{subtotal.toFixed(2)}
                    </Typography>
                </BillRow>

                <BillRow>
                    <Typography color="text.secondary">Booking Fee</Typography>
                    <Typography fontWeight={600}>
                        ₹{bookingFee.toFixed(2)}
                    </Typography>
                </BillRow>

                <BillRow>
                    <Typography color="text.secondary">
                        Estimated Taxes (5%)
                    </Typography>
                    <Typography fontWeight={600}>
                        ₹{taxes.toFixed(2)}
                    </Typography>
                </BillRow>

                {appliedPromoCode && (
                    <DiscountBillRow>
                        <TagRow>
                            <TagIcon fontSize="small" />
                            <Typography variant="body2">
                                Coupon Applied ({appliedPromoCode})
                            </Typography>
                        </TagRow>
                        <Typography fontWeight={600}>
                            -₹{discountAmount.toFixed(2)}
                        </Typography>
                    </DiscountBillRow>
                )}

                <SummaryDivider />

                <BillRow>
                    <Typography variant="h6" fontWeight={700}>
                        Total Pay
                    </Typography>
                    <Typography
                        variant="h5"
                        fontWeight={800}
                        color="text.primary"
                    >
                        ₹{total.toFixed(2)}
                    </Typography>
                </BillRow>
            </BillStack>

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
