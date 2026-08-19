import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Login } from '../components/Login/Login';
import { SignUp } from '../components/SignUp/SignUp';
import { Restaurant } from '../pages/Restuarant/Restaurant';

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/signup" replace />,
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
