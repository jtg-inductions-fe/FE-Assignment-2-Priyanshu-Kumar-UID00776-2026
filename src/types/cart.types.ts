import { MenuItem } from '@/types/restaurant.types';

// Each specific cart item for the user
export type CartItem = {
    menuItem: MenuItem;
    quantity: number;
};

// Containes all the items in cart
export type Cart = {
    items: CartItem[];
};
