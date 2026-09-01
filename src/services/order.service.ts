import ordersData from '@/mockData/orders.json';
import { User } from '@/types/auth.types';
import { CartItem } from '@/types/cart.types';
import { Order, OrderStatus } from '@/types/order.types';

let mockOrders: Order[] = ordersData as Order[];

export const getStoredOrders = (): Order[] => [...mockOrders];

export const fetchOrders = async (): Promise<Order[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getStoredOrders();
};

export const placeOrder = async (
    cartItems: CartItem[],
    user: User,
): Promise<Order[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!cartItems.length) {
        throw new Error('Empty cart');
    }

    const checkoutId = `chk_${crypto.randomUUID()}`;
    const createdAt = new Date().toISOString();

    const groupedCart = cartItems.reduce<Record<string, CartItem[]>>(
        (acc, item) => {
            if (!acc[item.restaurantId]) {
                acc[item.restaurantId] = [];
            }
            acc[item.restaurantId].push(item);
            return acc;
        },
        {},
    );

    const newOrders: Order[] = Object.entries(groupedCart).map(
        ([restaurantId, items]) => {
            const restaurantTotal = items.reduce(
                (sum, item) => sum + item.menuItem.price * item.quantity,
                0,
            );

            return {
                id: `ord_${crypto.randomUUID()}`,
                checkoutId,
                customerEmail: user.email.toLowerCase(),
                customerName: user.fullName,
                customerContact: user.contactNo,
                restaurantId,
                restaurantName: items[0].restaurantName,
                items,
                totalAmount: restaurantTotal,
                status: 'Pending',
                createdAt,
            };
        },
    );

    mockOrders = [...mockOrders, ...newOrders];
    return newOrders;
};

export const updateOrderStatus = async (
    orderId: string,
    nextStatus: OrderStatus,
): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const targetIndex = mockOrders.findIndex((order) => order.id === orderId);

    if (targetIndex === -1) {
        throw new Error('Order not found.');
    }

    const updatedOrder: Order = {
        ...mockOrders[targetIndex],
        status: nextStatus,
    };

    mockOrders[targetIndex] = updatedOrder;
    return updatedOrder;
};
