import React from 'react';

import { Alert, Snackbar } from '@mui/material';

import { hideNotification } from '@/features/notificationSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const GlobalSnackbar = () => {
    const dispatch = useAppDispatch();

    // Grab the current notification visibility, text, and alert type from the redux store
    const { open, message, severity } = useAppSelector(
        (state) => state.notification,
    );

    // Dismiss the notification unless the user just clicked outside of it
    const handleClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(hideNotification());
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={1500}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Alert onClose={handleClose} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};
