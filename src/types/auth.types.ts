import { CartItem } from '@/types/cart.types';

/**
 * Allowed user roles
 */
export type UserRole = 'USER' | 'RESTAURANT OWNER';

/**
 * User profile details without sensitive credentials
 */
export type User = {
    fullName: string;
    email: string;
    contactNo: string;
    role: UserRole;
    cart: CartItem[];
};

/**
 * Global auth status tracking the active user and login state
 */
export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
};

/**
 * Input values captured directly from the login form fields
 */
export type LoginFormData = {
    email: string;
    password: string;
};

/**
 * Input values captured from the signup form including validation fields
 */
export type SignUpFormData = {
    fullName: string;
    email: string;
    contactNo: string;
    role: UserRole | '';
    password: string;
    confirmPassword: string;
};

/**
 * Complete user record saved in storage, containing the hashed password
 */
export type StoredUser = User & {
    password: string;
};

/**
 * Clean payload passed to the signup function to create a new account
 */
export type SignupData = {
    fullName: string;
    email: string;
    contactNo: string;
    role: UserRole;
    password: string;
};

/**
 * Credentials passed to the login function for authentication
 */
export type LoginData = {
    email: string;
    password: string;
};

/**
 * Protected routes for the role based users
 */
export type ProtectedRouteProps = {
    allowedRoles: UserRole[];
};
