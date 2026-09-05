import { User } from '@/components/Auth/auth.types';
import { CartItem } from '@/container/Cart/cart.types';
import { Order, OrderStatus } from '@/container/Order/order.types';
import ordersData from '@/mockData/orders.json';

let mockOrders: Order[] = ordersData as Order[];

/**
 * Get stored orders
 * @returns {Order[]}
 */
export const getStoredOrders = (): Order[] => [...mockOrders];

/**
 * Fetch all orders
 * @returns {Promise<Order[]>}
 */
export const fetchOrders = async (): Promise<Order[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return getStoredOrders();
};

/**
 * Place a new order
 * @param {CartItem[]} cartItems
 * @param {User} user
 * @param {number} totalPay
 * @returns {Promise<Order[]>}
 */
export const placeOrder = async (
    cartItems: CartItem[],
    user: User,
    totalPay: number,
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
        ([restaurantId, items]) => ({
            id: `ord_${crypto.randomUUID()}`,
            checkoutId,
            customerEmail: user.email,
            customerName: user.fullName,
            customerContact: user.contactNo,
            restaurantId,
            restaurantName: items[0].restaurantName,
            items,
            totalAmount: totalPay,
            status: 'Pending',
            createdAt,
        }),
    );

    mockOrders = [...mockOrders, ...newOrders];
    return newOrders;
};

/**
 * Update the status of an order
 * @param {string} orderId
 * @param {OrderStatus} nextStatus
 * @returns {Promise<Order>}
 */
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
