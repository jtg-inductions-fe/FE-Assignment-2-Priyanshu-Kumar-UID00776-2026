import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { GlobalSnackbar } from './components/SnackBar/SnackBar';
import { AppRouter } from './routes/AppRouter';
import { store } from './store/store';
import { theme } from './theme';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <CssBaseline />
                <RouterProvider router={AppRouter} />
                <GlobalSnackbar />
            </Provider>
        </ThemeProvider>
    </StrictMode>,
);
