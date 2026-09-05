import {
    LoginData,
    SignupData,
    StoredUser,
    User,
} from '@/components/Auth/auth.types';

/**
 * Function to convert the plain text password into hash password using the native browser crypto.subtle
 * @param {string} password
 * @returns {Promise<string>}
 */
const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Fetch and parse the list of all registered users saved in localStorage
 * @returns {StoredUser[]}
 */
const getUsers = (): StoredUser[] => {
    const storedUsers = localStorage.getItem('users');

    if (!storedUsers) {
        return [];
    }

    return JSON.parse(storedUsers) as StoredUser[];
};

/**
 * Register a new user, check for duplicates, hash their password, and save them
 * @param {SignupData} data
 * @returns {Promise<User>}
 */
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

    const hashedPassword = await hashPassword(data.password);

    const newUser: StoredUser = {
        fullName: data.fullName,
        email: data.email,
        contactNo: data.contactNo,
        role: data.role,
        password: hashedPassword,
        cart: [],
    };

    localStorage.setItem('users', JSON.stringify([...users, newUser]));

    const safeUser: User = {
        fullName: newUser.fullName,
        email: newUser.email,
        contactNo: newUser.contactNo,
        role: newUser.role,
        cart: newUser.cart,
    };

    return safeUser;
};

/**
 * Verify user credentials against stored accounts and return profile details on match
 * @param {LoginData} data
 * @returns {Promise<User>}
 */
export const login = async (data: LoginData): Promise<User> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });

    const users = getUsers();

    const inputPasswordHash = await hashPassword(data.password);

    const user = users.find(
        (existingUser) =>
            existingUser.email.toLowerCase() === data.email.toLowerCase() &&
            existingUser.password === inputPasswordHash,
    );

    if (!user) {
        throw new Error('Invalid email or password!');
    }

    const safeUser: User = {
        fullName: user.fullName,
        email: user.email,
        contactNo: user.contactNo,
        role: user.role,
        cart: user.cart,
    };

    return safeUser;
};

/**
 * Logout the current user
 * @returns {Promise<void>}
 */
export const logout = async (): Promise<void> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
};
