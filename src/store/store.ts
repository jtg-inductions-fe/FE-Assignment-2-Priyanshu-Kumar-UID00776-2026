import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authReducer from '@/slices/authSlice';
import notificationReducer from '@/slices/notificationSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        notification: notificationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
