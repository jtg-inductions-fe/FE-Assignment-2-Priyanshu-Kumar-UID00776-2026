import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/store/store';

// Custom hook to redirect users based on whether they are logged in or not
export function useActiveUserRoute() {
    const navigate = useNavigate();

    // Get the active user profile from redux state
    const user = useAppSelector((state) => state.auth.user);

    // Send the user to the target path if logged in or the fallback path if logged out
    const handleUserRoute = (targetRoute: string, fallbackRoute: string) => {
        // Check if the user is authenticated
        if (user) {
            void navigate(targetRoute);
        } else {
            void navigate(fallbackRoute);
        }
    };

    return { handleUserRoute };
}
