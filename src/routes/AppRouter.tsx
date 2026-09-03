import { lazy } from 'react';

import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Login } from '@/components/Auth/Login';
import { SignUp } from '@/components/Auth/SignUp';
import { NotFoundPage } from '@/components/NotFoundPage/NotFoundPage';
import { RootLayout } from '@/layout/RootLayout';

const RestaurantPage = lazy(() =>
    import('@/pages/Restaurant/Restaurant').then((module) => ({
        default: module.RestaurantPage,
    })),
);
const MenuPage = lazy(() =>
    import('@/pages/Menu/Menu').then((module) => ({
        default: module.MenuPage,
    })),
);
const CartPage = lazy(() =>
    import('@/pages/Cart/Cart').then((module) => ({
        default: module.CartPage,
    })),
);
const OrderPage = lazy(() =>
    import('@/pages/Order/order').then((module) => ({
        default: module.OrderPage,
    })),
);

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
