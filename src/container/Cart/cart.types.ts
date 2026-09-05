import { MenuItem } from '@/types/restaurant.types';

/**
 * Each specific cart item for the user
 */
export type CartItem = {
    menuItem: MenuItem;
    restaurantId: string;
    restaurantName: string;
    quantity: number;
};

/**
 * Cart array saving items
 */
export type CartState = {
    items: CartItem[];
};

/**
 * Cart bill card summary
 */
export type CartBill = {
    subtotal: number;
    bookingFee: number;
    taxes: number;
    total: number;
    discountAmount: number;
    appliedPromoCode: string | null;
    onApplyPromo: (code: string) => void;
    onCheckout: () => void;
    onCheckoutLoading: boolean;
};
