export type UserRole = 'USER' | 'RESTAURANT OWNER';

export interface User {
    fullName: string;
    email: string;
    contactNo: string;
    role: UserRole;
    password?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}
