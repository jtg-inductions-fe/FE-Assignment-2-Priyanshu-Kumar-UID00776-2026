import { Box, Container, Stack, Typography, useTheme } from '@mui/material';

import { OrderCard } from '@/components/OrderCard/OrderCard';
import { OrderStatus } from '@/container/Order/order.types';
import { showNotification } from '@/features/notificationSlice';
import { updateOrderStatusSuccess } from '@/features/orderSlice';
import { updateOrderStatus } from '@/services/order.service';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const OrderContainer = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const currentUser = useAppSelector((state) => state.auth.user);
    const restaurants = useAppSelector((state) => state.restaurant.restaurants);
    const allOrders = useAppSelector((state) => state.order.orders);

    const isOwner = currentUser?.role === 'RESTAURANT OWNER';
    const userEmail = currentUser?.email;

    const ownedRestaurant = restaurants
        .filter((restaurant) => restaurant.ownerId === userEmail)
        .map((restaurant) => restaurant.id);

    const ownerOrders = allOrders.filter((order) =>
        ownedRestaurant.includes(order.restaurantId),
    );

    const visibleOrders = isOwner
        ? ownerOrders
        : allOrders.filter((order) => order.customerEmail === userEmail);

    const handleStatusUpdate = async (orderId: string, status: OrderStatus) => {
        try {
            const updated = await updateOrderStatus(orderId, status);
            dispatch(updateOrderStatusSuccess(updated));
            dispatch(
                showNotification({
                    message: `Status updated to ${status}`,
                    severity: 'success',
                }),
            );
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : 'Update failed';
            dispatch(
                showNotification({
                    message,
                    severity: 'error',
                }),
            );
        }
    };

    return (
        <Box
            px={{ xs: 1, sm: 10 }}
            height="100vh"
            maxHeight="100vh"
            overflow="auto"
            paddingBottom={theme.typography.pxToRem(150)}
        >
            <Container maxWidth="xl" sx={{ mt: 5 }}>
                <Typography variant="h1">
                    {isOwner ? 'Order Management' : 'Your Orders'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {isOwner
                        ? 'Manage and update incoming orders.'
                        : 'View your live and past orders.'}
                </Typography>

                <Stack spacing={2} mt={5}>
                    {visibleOrders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            isOwner={isOwner}
                            onStatusChange={(orderId, status) => {
                                void handleStatusUpdate(orderId, status);
                            }}
                        />
                    ))}
                    {visibleOrders.length === 0 && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                            py={6}
                        >
                            No orders found.
                        </Typography>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};
