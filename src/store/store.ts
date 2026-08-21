import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authReducer from '@/slices/authSlice';
import notificationReducer from '@/slices/notificationSlice';
import restaurantReducer from '@/slices/restaurantSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        notification: notificationReducer,
        restaurant: restaurantReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
