import { CartItem } from '@/container/Cart/cart.types';

/**
 * Lifecycle stages of an order
 */
export type OrderStatus =
    | 'Pending'
    | 'Accepted'
    | 'Preparing'
    | 'Out for Delivery'
    | 'Delivered';

/**
 * Order details and customer information
 */
export type Order = {
    id: string;
    checkoutId: string;
    customerEmail: string;
    customerName: string;
    customerContact: string;
    restaurantId: string;
    restaurantName: string;
    items: CartItem[];
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
};

/**
 * Order array saving orders state
 */
export type OrderState = {
    orders: Order[];
};

/**
 * Order card props passed values
 */
export type OrderCardProps = {
    order: Order;
    isOwner?: boolean;
    onStatusChange?: (orderId: string, status: OrderStatus) => void;
};
