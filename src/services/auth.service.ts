import { User, UserRole } from '../types/auth.types';

interface StoredUser extends User {
    password: string;
}

export interface SignupData {
    fullName: string;
    email: string;
    contactNo: string;
    role: UserRole;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

const getUsers = (): StoredUser[] => {
    const storedUsers = localStorage.getItem('users');

    if (!storedUsers) {
        return [];
    }

    return JSON.parse(storedUsers) as StoredUser[];
};

export const signup = async (data: SignupData): Promise<User> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });

    const users = getUsers();

    const existingUser = users.find(
        (user) => user.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (existingUser) {
        throw new Error('An account with this email already exists!');
    }

    const newUser: StoredUser = {
        fullName: data.fullName,
        email: data.email,
        contactNo: data.contactNo,
        role: data.role,
        password: data.password,
    };

    localStorage.setItem('users', JSON.stringify([...users, newUser]));

    const safeUser: User = {
        fullName: newUser.fullName,
        email: newUser.email,
        contactNo: newUser.contactNo,
        role: newUser.role,
    };

    return safeUser;
};

export const login = async (data: LoginData): Promise<User> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });

    const users = getUsers();

    const user = users.find(
        (existingUser) =>
            existingUser.email.toLowerCase() === data.email.toLowerCase() &&
            existingUser.password === data.password,
    );

    if (!user) {
        throw new Error('Invalid email or password!');
    }

    const safeUser: User = {
        fullName: user.fullName,
        email: user.email,
        contactNo: user.contactNo,
        role: user.role,
    };

    return safeUser;
};

export const logout = async (): Promise<void> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
};
