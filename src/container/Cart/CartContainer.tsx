import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Grid, Stack, Typography } from '@mui/material';

import { CartBillCard } from '@/components/CartBillCard/CartBillCard';
import { CartItemCard } from '@/components/CartItemCard/CartItemCard';
import {
    CartContainerArea,
    PageRoot,
} from '@/container/Cart/CartContainer.styles';
import {
    decrementCartItem,
    incrementCartItem,
    removeCartItem,
} from '@/features/cartSlice';
import { clearCart } from '@/features/cartSlice';
import { showNotification } from '@/features/notificationSlice';
import { addOrdersSuccess } from '@/features/orderSlice';
import { placeOrder } from '@/services/order.service';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const CartContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.auth.user);
    const cartItems = useAppSelector((state) => state.cart.items);
    const userEmail = user?.email || '';

    const [appliedDiscount, setAppliedDiscount] = useState<{
        code: string;
        amount: number;
    } | null>(null);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0,
    );
    const bookingFee = 20;
    const discountAmount = appliedDiscount?.amount || 0;
    const taxes = subtotal * 0.02;
    const totalPay = subtotal - discountAmount + bookingFee + taxes;

    const handleCartAction = (action: string, menuItemId: string) => {
        switch (action) {
            case 'increment':
                dispatch(incrementCartItem({ userEmail, menuItemId }));
                break;
            case 'decrement':
                dispatch(decrementCartItem({ userEmail, menuItemId }));
                break;
            case 'remove':
                dispatch(removeCartItem({ userEmail, menuItemId }));
                break;
            default:
                break;
        }
    };

    const handleApplyPromo = (code: string) => {
        if (code === 'SAVE10') {
            setAppliedDiscount({ code: 'SAVE10', amount: 10 });
            dispatch(
                showNotification({
                    message: 'Coupon SAVE10 applied 10 rupees off!',
                    severity: 'success',
                }),
            );
        } else {
            dispatch(
                showNotification({
                    message: 'Invalid coupon code. Try SAVE10',
                    severity: 'error',
                }),
            );
        }
    };

    const handleCheckout = async () => {
        if (!user) {
            dispatch(
                showNotification({
                    message: 'Please login to place an order.',
                    severity: 'error',
                }),
            );
            void navigate('/login');
            return;
        }

        try {
            const createdOrders = await placeOrder(cartItems, user);

            dispatch(addOrdersSuccess(createdOrders));
            dispatch(clearCart({ userEmail }));

            dispatch(
                showNotification({
                    message: 'Order placed successfully!',
                    severity: 'success',
                }),
            );

            void navigate('/order');
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to place order.';
            dispatch(
                showNotification({
                    message,
                    severity: 'error',
                }),
            );
        }
    };

    if (cartItems.length === 0) {
        return (
            <PageRoot>
                <CartContainerArea maxWidth="md">
                    <Typography textAlign="center" variant="h4" pb={3}>
                        Your Cart is Empty
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                        gutterBottom
                    >
                        Explore menus and add your favorite dishes.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => void navigate('/restaurant')}
                    >
                        Browse Restaurants
                    </Button>
                </CartContainerArea>
            </PageRoot>
        );
    }

    return (
        <PageRoot>
            <CartContainerArea maxWidth="lg">
                <Typography variant="h2" py={3}>
                    Your Cart
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={7}>
                        <Stack spacing={2}>
                            {cartItems.map((item) => (
                                <CartItemCard
                                    key={item.menuItem.id}
                                    item={item}
                                    onCartAction={handleCartAction}
                                />
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <CartBillCard
                            subtotal={subtotal}
                            bookingFee={bookingFee}
                            taxes={taxes}
                            total={totalPay}
                            discountAmount={discountAmount}
                            appliedPromoCode={appliedDiscount?.code || null}
                            onApplyPromo={handleApplyPromo}
                            onCheckout={() => void handleCheckout()}
                        />
                    </Grid>
                </Grid>
            </CartContainerArea>
        </PageRoot>
    );
};
