import { createBrowserRouter, Navigate } from 'react-router-dom';

import Login from '../components/Login/Login';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import SignUp from '../components/SignUp/SignUp';
import Restaurant from '../pages/Restuarant/Restaurant';

export const appRouter = createBrowserRouter([
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
        element: <NotFoundPage />,
    },
]);
