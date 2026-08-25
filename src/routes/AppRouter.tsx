import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Login } from '@/components/Auth/Login';
import { SignUp } from '@/components/Auth/SignUp';
import { NotFoundPage } from '@/components/NotFoundPage/NotFoundPage';
import { RestaurantPage } from '@/pages/Restaurant/Restaurant';

// Define the core application routes and their corresponding UI components
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
    // Render the restaurant dashboard screen
    {
        path: '/restaurant',
        element: <RestaurantPage />,
    },
    // Catch-all route to redirect any invalid or unknown URLs back to signup
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
