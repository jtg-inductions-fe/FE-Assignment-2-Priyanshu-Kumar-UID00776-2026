import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Grid, Stack, Typography } from '@mui/material';

import { CartBillCard } from '@/components/CartBillCard/CartBillCard';
// import { CartItemCard } from '@/components/CartItemCard/CartItemCard';
import { MenuItemCard } from '@/components/ItemCard/ItemCard';
import {
    CartContainerArea,
    PageRoot,
} from '@/container/Cart/CartContainer.styles';
import {
    decrementCartItem,
    incrementCartItem,
    removeCartItem,
} from '@/features/cartSlice';
import { showNotification } from '@/features/notificationSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { MenuItem } from '@/types/restaurant.types';

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

    const handleCartAction = (action: string, item: MenuItem) => {
        switch (action) {
            case 'increment':
                dispatch(incrementCartItem({ userEmail, menuItemId: item.id }));
                break;
            case 'decrement':
                dispatch(decrementCartItem({ userEmail, menuItemId: item.id }));
                break;
            case 'remove':
                dispatch(removeCartItem({ userEmail, menuItemId: item.id }));
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

    if (cartItems.length === 0) {
        return (
            <PageRoot alignItems="center" justifyContent="center">
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
            </PageRoot>
        );
    }

    return (
        <PageRoot overflow={{ xs: 'auto' }} pb={{ xs: 35, sm: 20 }}>
            <CartContainerArea maxWidth="lg">
                <Typography variant="h2" py={4}>
                    Your Cart
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={7}>
                        <Stack spacing={2}>
                            {cartItems.map((item) => (
                                <MenuItemCard
                                    key={item.menuItem.id}
                                    item={item.menuItem}
                                    variant="cart"
                                    quantity={item.quantity}
                                    onAction={handleCartAction}
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
                            onCheckout={() => void navigate('/checkout')}
                        />
                    </Grid>
                </Grid>
            </CartContainerArea>
        </PageRoot>
    );
};
