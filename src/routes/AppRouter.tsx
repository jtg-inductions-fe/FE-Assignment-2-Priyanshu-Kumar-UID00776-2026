import { lazy } from 'react';

import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Login } from '@/components/Auth/Login';
import { SignUp } from '@/components/Auth/SignUp';
import { NotFoundPage } from '@/components/NotFoundPage/NotFoundPage';
import { RootLayout } from '@/layout/RootLayout';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

const RestaurantPage = lazy(() => import('@/pages/Restaurant/Restaurant'));
const MenuPage = lazy(() => import('@/pages/Menu/Menu'));
const CartPage = lazy(() => import('@/pages/Cart/Cart'));
const OrderPage = lazy(() => import('@/pages/Order/order'));

export const AppRouter = createBrowserRouter([
    /**
     * Redirect the root path directly to the restaurant screen
     */
    {
        path: '/',
        element: <Navigate to="/restaurant" replace />,
    },
    /**
     * Render the account registration page
     */
    {
        path: '/signup',
        element: <SignUp />,
    },
    /**
     * Render the user login page
     */
    {
        path: '/login',
        element: <Login />,
    },
    /**
     * Children routes renderes inside the outlet under the root layout
     */
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
                path: 'order',
                element: <OrderPage />,
            },
            {
                element: <ProtectedRoute allowedRoles={['USER']} />,
                children: [
                    {
                        path: 'cart',
                        element: <CartPage />,
                    },
                ],
            },
        ],
    },
    /**
     * Catch-all route to redirect any invalid or unknown URLs back to signup
     */
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
