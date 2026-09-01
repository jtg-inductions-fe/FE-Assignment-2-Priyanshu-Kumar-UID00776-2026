import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Login } from '@/components/Auth/Login';
import { SignUp } from '@/components/Auth/SignUp';
import { RootLayout } from '@/layout/RootLayout';
import { Restaurant } from '@/pages/Restuarant/Restaurant';

export const AppRouter = createBrowserRouter([
    // Redirect the root path directly to the restaurant screen
    {
        path: '/',
        element: <Navigate to="/restaurant" replace />,
    },
    // Render the account registration page
    {
        path: '/signup',
        element: <SignUp />,
    },
    // Render the user login page
    {
        path: '/login',
        element: <Login />,
    },
    // Children for the pages
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: 'restaurant',
                element: <Restaurant />,
            },
        ],
    },
    // Catch-all route to redirect any invalid or unknown URLs back to signup
    {
        path: '*',
        element: <Navigate to="/signup" replace />,
    },
]);
