import {
    getCurrentUserFromStorage,
    persistUserCartToStorage,
} from '@/services/cart.service';
import { CartItem, CartState } from '@/types/cart.types';
import { MenuItem } from '@/types/restaurant.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Fetches the current user from the localStorage
const currentUser = getCurrentUserFromStorage();

const initialState: CartState = {
    // Only regular users have a cart owners default to an empty list
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
            // Parses the specific details for adding the item to cart
            const { userEmail, restaurantId, restaurantName, menuItem } =
                action.payload;

            // Finds the menu item in the menu array using the menuItem ID
            const existingIndex = state.items.findIndex(
                (item) => item.menuItem.id === menuItem.id,
            );
            // Updates the items if found in the menu
            if (existingIndex > -1) {
                if (
                    state.items[existingIndex].quantity < (menuItem.stock || 0)
                ) {
                    state.items[existingIndex].quantity += 1;
                }
            }
            // If not found any items adds a new one
            else {
                if ((menuItem.stock || 0) > 0) {
                    state.items.push({
                        menuItem,
                        restaurantId,
                        restaurantName,
                        quantity: 1,
                    });
                }
            }

            // Stores the data in the user
            persistUserCartToStorage(userEmail, state.items);
        },

        // Increment item for the redux store
        incrementCartItem: (
            state,
            action: PayloadAction<{ userEmail: string; menuItemId: string }>,
        ) => {
            // Fetches the specific details for the increment cart process
            const { userEmail, menuItemId } = action.payload;
            // Finds the particular item in the cart
            const target = state.items.find(
                (cartItem) => cartItem.menuItem.id === menuItemId,
            );

            // Increases the quantity for the item in cart if available in stock
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
            // Fetches the specific details for the decrement cart process
            const { userEmail, menuItemId } = action.payload;
            // Finds the particular item in the cart
            const target = state.items.find(
                (cartItem) => cartItem.menuItem.id === menuItemId,
            );

            // Decrements the item in the cart
            if (target) {
                // Removes one value of item if there are more than one items in cart
                if (target.quantity > 1) {
                    target.quantity -= 1;
                }
                // Removes the item form the cart if there is only one item in the cart
                else {
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
            // Fetches the specific details for the removing item from cart
            const { userEmail, menuItemId } = action.payload;
            // Removes the item from cart if id matches
            state.items = state.items.filter(
                (cartItem) => cartItem.menuItem.id !== menuItemId,
            );
            persistUserCartToStorage(userEmail, state.items);
        },
    },
});

// Export the cart slices
export const {
    setUserCart,
    addItemToCart,
    incrementCartItem,
    decrementCartItem,
    removeCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
