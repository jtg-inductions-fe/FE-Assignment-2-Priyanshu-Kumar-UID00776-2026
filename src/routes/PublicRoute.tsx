import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/store/store';

export const PublicRoute = () => {
    const user = useAppSelector((state) => state.auth.user);

    if (user) {
        return <Navigate to="/restaurant" replace />;
    }

    return <Outlet />;
};
