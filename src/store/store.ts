// Import redux hooks and type definitions for state reading and action dispatching
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import slice reducers
import authReducer from '@/features/authSlice';
import cartReducer from '@/features/cartSlice';
import notificationReducer from '@/features/notificationSlice';
import orderReducer from '@/features/orderSlice';
import restaurantReducer from '@/features/restaurantSlice';
// Import Redux Toolkit store configurator.
import { configureStore } from '@reduxjs/toolkit';

// Combine all slice reducers into the centralized redux store
export const store = configureStore({
    reducer: {
        auth: authReducer,
        notification: notificationReducer,
        restaurant: restaurantReducer,
        cart: cartReducer,
        order: orderReducer,
    },
});

// Exporting dispatch and selectors to be used in other components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
