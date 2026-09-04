// Import typescript interfaces and redux toolkit utilities
import { AuthState, User } from '@/types/auth.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Retrieves and parses the persisted user from localStorage on initialization
const getStoredUser = (): User | null => {
    try {
        const stored = localStorage.getItem('currentUser');

        if (!stored) return null;

        return JSON.parse(stored) as User;
    } catch {
        return null;
    }
};

// Initialize the user from local storage
const initialUser = getStoredUser();

// Redux initial state for AuthState
const initialState: AuthState = {
    user: initialUser,
    isAuthenticated: Boolean(initialUser),
};

// Authentication slice to manage the user login state and storage persistence
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
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

        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('currentUser');
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
