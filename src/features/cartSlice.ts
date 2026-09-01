import {
    getCurrentUserFromStorage,
    persistUserCartToStorage,
} from '@/services/cart.service';
import { CartItem, CartState } from '@/types/cart.types';
import { MenuItem } from '@/types/restaurant.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const currentUser = getCurrentUserFromStorage();

const initialState: CartState = {
    items:
        currentUser && currentUser.role === 'USER'
            ? currentUser.cart || []
            : [],
};

// Cart slices containing the slices
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Set the user cart to load after refresh also in redux store
        setUserCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
        // Add the cart to the redux store
        addItemToCart: (
            state,
            action: PayloadAction<{
                userEmail: string;
                restaurantId: string;
                restaurantName: string;
                menuItem: MenuItem;
            }>,
        ) => {
            const { userEmail, restaurantId, restaurantName, menuItem } =
                action.payload;

            const existingIndex = state.items.findIndex(
                (item) => item.menuItem.id === menuItem.id,
            );

            if (existingIndex > -1) {
                if (
                    state.items[existingIndex].quantity < (menuItem.stock || 0)
                ) {
                    state.items[existingIndex].quantity += 1;
                }
            } else {
                if ((menuItem.stock || 0) > 0) {
                    state.items.push({
                        menuItem,
                        restaurantId,
                        restaurantName,
                        quantity: 1,
                    });
                }
            }

            persistUserCartToStorage(userEmail, state.items);
        },

        // Increment item for the redux store
        incrementCartItem: (
            state,
            action: PayloadAction<{ userEmail: string; menuItemId: string }>,
        ) => {
            const { userEmail, menuItemId } = action.payload;

            const target = state.items.find(
                (cartItem) => cartItem.menuItem.id === menuItemId,
            );

            if (target && target.quantity < (target.menuItem.stock || 0)) {
                target.quantity += 1;
                persistUserCartToStorage(userEmail, state.items);
            }
        },

        // Decrement cart for the redux store
        decrementCartItem: (
            state,
            action: PayloadAction<{ userEmail: string; menuItemId: string }>,
        ) => {
            const { userEmail, menuItemId } = action.payload;

            const target = state.items.find(
                (cartItem) => cartItem.menuItem.id === menuItemId,
            );

            if (target) {
                if (target.quantity > 1) {
                    target.quantity -= 1;
                } else {
                    state.items = state.items.filter(
                        (cartItem) => cartItem.menuItem.id !== menuItemId,
                    );
                }
                persistUserCartToStorage(userEmail, state.items);
            }
        },

        // Remove the cart item
        removeCartItem: (
            state,
            action: PayloadAction<{ userEmail: string; menuItemId: string }>,
        ) => {
            const { userEmail, menuItemId } = action.payload;

            state.items = state.items.filter(
                (cartItem) => cartItem.menuItem.id !== menuItemId,
            );
            persistUserCartToStorage(userEmail, state.items);
        },
    },
});

export const {
    setUserCart,
    addItemToCart,
    incrementCartItem,
    decrementCartItem,
    removeCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
