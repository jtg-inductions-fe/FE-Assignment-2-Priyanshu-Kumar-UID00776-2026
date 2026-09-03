import {
    NotificationSeverity,
    NotificationState,
} from '@/types/notification.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Initial state of the notification
 */
const initialState: NotificationState = {
    open: false,
    message: '',
    severity: 'info',
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        /**
         * Open and update notification alert
         * @param {NotificationState} state
         * @param {PayloadAction<{ message: string; severity: NotificationSeverity }>} action
         * @returns {void}
         */
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

        /**
         * Dismiss the alert from the screen
         * @param {NotificationState} state
         * @returns {void}
         */
        hideNotification: (state) => {
            state.open = false;
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
