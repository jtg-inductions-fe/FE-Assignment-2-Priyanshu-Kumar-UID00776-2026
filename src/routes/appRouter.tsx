import { createBrowserRouter, Navigate } from 'react-router-dom';

import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';

export const appRouter = createBrowserRouter([
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
        path: '*',
        element: <Navigate to="/signup" replace />,
    },
]);
