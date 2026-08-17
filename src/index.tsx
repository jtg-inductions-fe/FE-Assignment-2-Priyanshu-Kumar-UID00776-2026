import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '@theme';

import SnackBar from './components/SnackBar/SnackBar';
import { appRouter } from './routes/appRouter';
import { store } from './store/store';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <CssBaseline />
                <RouterProvider router={appRouter} />
                <SnackBar />
            </Provider>
        </ThemeProvider>
    </StrictMode>,
);
