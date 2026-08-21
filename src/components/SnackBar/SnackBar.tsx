import React from 'react';

import { Alert, Snackbar } from '@mui/material';

import { hideNotification } from '@/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const GlobalSnackbar = () => {
    const dispatch = useAppDispatch();

    const { open, message, severity } = useAppSelector(
        (state) => state.notification,
    );

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
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
