import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, User } from '../types/auth.types';

const getStoredUser = (): User | null => {
    try {
        const stored = localStorage.getItem('currentUser');
        if (!stored) return null;
        return JSON.parse(stored) as User;
    } catch {
        return null;
    }
};

const initialUser = getStoredUser();

const initialState: AuthState = {
    user: initialUser,
    isAuthenticated: Boolean(initialUser),
};

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
