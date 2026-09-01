import {
    NotificationSeverity,
    NotificationState,
} from '@/types/notification.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state of the notification
const initialState: NotificationState = {
    open: false,
    message: '',
    severity: 'info',
};

// Notification slice that handles opening, closing and updating notification
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (
            state,
            action: PayloadAction<{
                message: string;
                severity: NotificationSeverity;
            }>,
        ) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },

        // Dismiss the alert from the screen
        hideNotification: (state) => {
            state.open = false;
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
