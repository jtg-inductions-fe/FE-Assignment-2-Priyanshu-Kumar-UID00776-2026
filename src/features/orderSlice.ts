import { getStoredOrders } from '@/services/order.service';
import { Order, OrderState } from '@/types/order.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: OrderState = {
    orders: getStoredOrders(),
};

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        // Load or overwrite orders from redux store
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        },

        // Append new orders after a successful checkout
        addOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
            state.orders.push(...action.payload);
        },

        // Update a specific order status when the owner changes it
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
