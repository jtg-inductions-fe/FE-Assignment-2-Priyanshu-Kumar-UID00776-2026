import { StoredUser, User } from '@/types/auth.types';
import { CartItem } from '@/types/cart.types';

// To fetch the record of the current user form the localStorage
export const getCurrentUserFromStorage = (): User | null => {
    try {
        const stored = localStorage.getItem('currentUser');
        if (!stored) return null;
        const user = JSON.parse(stored) as User;

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

            const updatedUsers = users.map((user) => {
                if (
                    user.email.toLowerCase() === userEmail.toLowerCase() &&
                    user.role === 'USER'
                ) {
                    return { ...user, cart: updatedCart };
                }
                return user;
            });

            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
    } catch {
        throw new Error('Unable to save cart data.');
    }
};
