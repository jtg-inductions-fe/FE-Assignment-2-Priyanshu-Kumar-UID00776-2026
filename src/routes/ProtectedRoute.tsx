import { Navigate, Outlet } from 'react-router-dom';

import { ProtectedRouteProps } from '@/components/Auth/auth.types';
import { useAppSelector } from '@/store/store';

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const user = useAppSelector((state) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const userRole = user?.role;

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/restaurant" replace />;
    }

    return <Outlet />;
};
