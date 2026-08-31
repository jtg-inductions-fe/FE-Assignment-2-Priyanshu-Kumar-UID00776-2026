import { User } from '@/types/auth.types';
import { CartItem } from '@/types/cart.types';
import { Order, OrderStatus } from '@/types/order.types';

export const getStoredOrders = (): Order[] => {
    try {
        const stored = localStorage.getItem('orders');
        return stored ? (JSON.parse(stored) as Order[]) : [];
    } catch {
        return [];
    }
};

const saveOrders = (orders: Order[]): void => {
    localStorage.setItem('orders', JSON.stringify(orders));
};

export const fetchOrders = async (): Promise<Order[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getStoredOrders();
};

export const placeOrder = async (
    cartItems: CartItem[],
    user: User,
): Promise<Order[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!cartItems.length) {
        throw new Error('Empty cart');
    }

    const existingOrders = getStoredOrders();
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

    saveOrders([...existingOrders, ...newOrders]);
    return newOrders;
};

export const updateOrderStatus = async (
    orderId: string,
    nextStatus: OrderStatus,
): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const orders = getStoredOrders();
    const targetIndex = orders.findIndex((order) => order.id === orderId);

    if (targetIndex === -1) {
        throw new Error('Order not found.');
    }

    const updatedOrder: Order = {
        ...orders[targetIndex],
        status: nextStatus,
    };

    orders[targetIndex] = updatedOrder;
    saveOrders(orders);
    return updatedOrder;
};
