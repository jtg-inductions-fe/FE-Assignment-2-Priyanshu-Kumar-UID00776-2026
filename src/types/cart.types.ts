import { MenuItem } from '@/types/restaurant.types';

// Each specific cart item for the user
export type CartItem = {
    menuItem: MenuItem;
    restaurantId: string;
    restaurantName: string;
    quantity: number;
};
