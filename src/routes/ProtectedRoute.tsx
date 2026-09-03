import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/store/store';
import { ProtectedRouteProps, UserRole } from '@/types/auth.types';

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const user = useAppSelector((state) => state.auth.user);
    const userRole = user?.role as UserRole;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/restaurant" replace />;
    }

    return <Outlet />;
};
