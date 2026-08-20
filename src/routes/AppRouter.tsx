import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Login } from '../components/Auth/Login';
import { SignUp } from '../components/Auth/SignUp';
import { Restaurant } from '../pages/Restuarant/Restaurant';

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/restaurant" replace />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/restaurant',
        element: <Restaurant />,
    },
    {
        path: '*',
        element: <Navigate to="/signup" replace />,
    },
]);
