import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Login } from '@/components/Auth/Login';
import { SignUp } from '@/components/Auth/SignUp';
import { NotFoundPage } from '@/components/NotFoundPage/NotFoundPage';
import { RootLayout } from '@/layout/RootLayout';
import { CartPage } from '@/pages/Cart/Cart';
import { MenuPage } from '@/pages/Menu/Menu';
import { OrderPage } from '@/pages/Order/order';
import { RestaurantPage } from '@/pages/Restaurant/Restaurant';

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
    // Dynamic route for the menu related to particular restaurant
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: 'restaurant',
                element: <RestaurantPage />,
            },
            {
                path: 'restaurant/:restaurantId',
                element: <MenuPage />,
            },
            {
                path: '/cart',
                element: <CartPage />,
            },
            {
                path: '/order',
                element: <OrderPage />,
            },
        ],
    },
    // Catch-all route to redirect any invalid or unknown URLs back to signup
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
