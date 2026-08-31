import { CartItem } from '@/types/cart.types';

export type OrderStatus =
    | 'Pending'
    | 'Accepted'
    | 'Preparing'
    | 'Out for Delivery'
    | 'Delivered';

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

export type OrderState = {
    orders: Order[];
};

export type OrderCardProps = {
    order: Order;
    isOwner?: boolean;
    onStatusChange?: (orderId: string, status: OrderStatus) => void;
};
