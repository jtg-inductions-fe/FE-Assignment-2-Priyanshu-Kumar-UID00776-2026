// Import typescript interfaces and redux toolkit utilities
import { AuthState, User } from '@/types/auth.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Retrieves and parses the persisted user from localStorage on initialization
const getStoredUser = (): User | null => {
    try {
        // Fetch the serialized user string from browser storage
        const stored = localStorage.getItem('currentUser');
        // Return null if no stored user is found.
        if (!stored) return null;
        // Parse the JSON string back into a typed User object
        return JSON.parse(stored) as User;
    } catch {
        // Fall back to null if JSON parsing fails or localStorage is unavailable
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
            // Permitted data to keep for the user
            const safeUser: User = {
                fullName: action.payload.fullName,
                email: action.payload.email,
                contactNo: action.payload.contactNo,
                role: action.payload.role,
                cart: action.payload.cart,
            };

            // Update redux state with user data, make the session as authenticated and persist the user data in the localStorage
            state.user = safeUser;
            state.isAuthenticated = true;
            localStorage.setItem('currentUser', JSON.stringify(safeUser));
        },
        // Clears user state and wipes the session from storage on logout
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('currentUser');
        },
    },
});

// Export the actions to be used with the dispatch and reducer to be registered in the store
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
