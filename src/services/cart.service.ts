import { StoredUser, User } from '@/types/auth.types';
import { CartItem } from '@/types/cart.types';

export const getCurrentUserFromStorage = (): User | null => {
    try {
        const stored = localStorage.getItem('currentUser');
        if (!stored) return null;
        const user = JSON.parse(stored) as User;

        // Initialize empty cart only if the user is a regular customer
        if (user.role === 'USER') {
            user.cart = user.cart || [];
        }
        return user;
    } catch {
        return null;
    }
};

export const persistUserCartToStorage = (
    userEmail: string,
    updatedCart: CartItem[],
): void => {
    try {
        const current = getCurrentUserFromStorage();

        if (
            current &&
            current.role === 'USER' &&
            current.email.toLowerCase() === userEmail.toLowerCase()
        ) {
            current.cart = updatedCart;
            localStorage.setItem('currentUser', JSON.stringify(current));
        }

        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            const users = JSON.parse(storedUsers) as StoredUser[];
            const updatedUsers = users.map((u) => {
                if (
                    u.email.toLowerCase() === userEmail.toLowerCase() &&
                    u.role === 'USER'
                ) {
                    return { ...u, cart: updatedCart };
                }
                return u;
            });
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
    } catch {
        throw new Error(
            'Unable to save cart data. Storage may be full or disabled.',
        );
    }
};
