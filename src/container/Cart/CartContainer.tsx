import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Grid, Stack, Typography } from '@mui/material';

import { CartBillCard } from '@/components/CartBillCard/CartBillCard';
import { CartItemCard } from '@/components/CartItemCard/CartItemCard';
import { BottomNavigationBarContainer } from '@/container/BottomNavigationBar/BottomNavigationBarContainer';
import {
    EmptyCartContainer,
    MainCartContainer,
    PageRoot,
} from '@/container/Cart/CartContainer.styles';
import { NavbarContainer } from '@/container/Navbar/NavbarContainer';
import {
    decrementCartItem,
    incrementCartItem,
    removeCartItem,
} from '@/features/cartSlice';
import { showNotification } from '@/features/notificationSlice';
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

    const handleIncrement = (menuItemId: string) => {
        dispatch(incrementCartItem({ userEmail, menuItemId }));
    };

    const handleDecrement = (menuItemId: string) => {
        dispatch(decrementCartItem({ userEmail, menuItemId }));
    };

    const handleRemove = (menuItemId: string) => {
        dispatch(removeCartItem({ userEmail, menuItemId }));
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
            <PageRoot>
                <NavbarContainer />
                <EmptyCartContainer maxWidth="md">
                    <Typography variant="h4" gutterBottom>
                        Your Cart is Empty
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
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
                </EmptyCartContainer>
                <BottomNavigationBarContainer />
            </PageRoot>
        );
    }

    return (
        <PageRoot>
            <NavbarContainer />
            <MainCartContainer maxWidth="lg">
                <Typography variant="h4" gutterBottom>
                    Your Cart
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={7}>
                        <Stack spacing={2}>
                            {cartItems.map((item) => (
                                <CartItemCard
                                    key={item.menuItem.id}
                                    item={item}
                                    onIncrement={handleIncrement}
                                    onDecrement={handleDecrement}
                                    onRemove={handleRemove}
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
            </MainCartContainer>
            <BottomNavigationBarContainer />
        </PageRoot>
    );
};
