import { StoredUser, User } from '@/types/auth.types';
import { CartItem } from '@/types/cart.types';

// To fetch the record of the current user form the localStorage
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
        // Gets the current user from the localStorage
        const current = getCurrentUserFromStorage();

        // If the role is USER then update the cart with latest cart value and also sets to the localStorage
        if (
            current &&
            current.role === 'USER' &&
            current.email.toLowerCase() === userEmail.toLowerCase()
        ) {
            current.cart = updatedCart;
            localStorage.setItem('currentUser', JSON.stringify(current));
        }

        // Fetches the all users from the localStorage
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            // Parse the data into JSON if found
            const users = JSON.parse(storedUsers) as StoredUser[];
            // Maps through the array of the user
            const updatedUsers = users.map((user) => {
                // Finds the particular user with the given email
                if (
                    user.email.toLowerCase() === userEmail.toLowerCase() &&
                    user.role === 'USER'
                ) {
                    return { ...user, cart: updatedCart };
                }
                return user;
            });
            // Sets the data to the localStorage for all the users
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
    } catch {
        throw new Error('Unable to save cart data.');
    }
};
