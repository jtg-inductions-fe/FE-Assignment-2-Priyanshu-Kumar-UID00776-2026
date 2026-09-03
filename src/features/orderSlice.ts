import { getStoredOrders } from '@/services/order.service';
import { Order, OrderState } from '@/types/order.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Initial state of the orders
 */
const initialState: OrderState = {
    orders: getStoredOrders(),
};

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        /**
         * Load or overwrite orders from redux store
         * @param {OrderState} state
         * @param {PayloadAction<Order[]>} action
         * @returns {void}
         */
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        },

        /**
         * Append new orders after a successful checkout
         * @param {OrderState} state
         * @param {PayloadAction<Order[]>} action
         * @returns {void}
         */
        addOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
            state.orders.push(...action.payload);
        },

        /**
         * Update a specific order status when the owner changes it
         * @param {OrderState} state
         * @param {PayloadAction<Order>} action
         * @returns {void}
         */
        updateOrderStatusSuccess: (state, action: PayloadAction<Order>) => {
            const index = state.orders.findIndex(
                (order) => order.id === action.payload.id,
            );
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
        },
    },
});

export const { setOrders, addOrdersSuccess, updateOrderStatusSuccess } =
    orderSlice.actions;

export default orderSlice.reducer;
