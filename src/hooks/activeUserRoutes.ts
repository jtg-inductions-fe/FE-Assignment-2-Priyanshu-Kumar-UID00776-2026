import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/store/store';

// Custom hook to redirect users based on whether they are logged in or not
export function useActiveUserRoute() {
    const navigate = useNavigate();

    const user = useAppSelector((state) => state.auth.user);

    const handleUserRoute = (targetRoute: string, fallbackRoute: string) => {
        if (user) {
            void navigate(targetRoute);
        } else {
            void navigate(fallbackRoute);
        }
    };

    return { handleUserRoute };
}
