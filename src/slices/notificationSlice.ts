import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationSeverity = 'success' | 'error' | 'warning' | 'info';

interface NotificationState {
    open: boolean;
    message: string;
    severity: NotificationSeverity;
}

const initialState: NotificationState = {
    open: false,
    message: '',
    severity: 'info',
};

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

        hideNotification: (state) => {
            state.open = false;
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
