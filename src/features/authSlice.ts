import { AuthState, User } from '@/types/auth.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Retrieves and parses the persisted user from localStorage on initialization
 * @returns {User | null}
 */
const getStoredUser = (): User | null => {
    try {
        const stored = localStorage.getItem('currentUser');

        if (!stored) return null;

        return JSON.parse(stored) as User;
    } catch {
        return null;
    }
};

/**
 * Initialize the user from local storage
 */
const initialUser = getStoredUser();

/**
 * Redux initial state for AuthState
 */
const initialState: AuthState = {
    user: initialUser,
    isAuthenticated: Boolean(initialUser),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * Set current authenticated user and persist to storage
         * @param {AuthState} state
         * @param {PayloadAction<User>} action
         * @returns {void}
         */
        setUser: (state, action: PayloadAction<User>) => {
            const safeUser: User = {
                fullName: action.payload.fullName,
                email: action.payload.email,
                contactNo: action.payload.contactNo,
                role: action.payload.role,
                cart: action.payload.cart,
            };

            state.user = safeUser;
            state.isAuthenticated = true;
            localStorage.setItem('currentUser', JSON.stringify(safeUser));
        },

        /**
         * Clear current authenticated user and remove from storage
         * @param {AuthState} state
         * @returns {void}
         */
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('currentUser');
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
