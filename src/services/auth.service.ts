// Import the neccessary types
import { LoginData, SignupData, StoredUser, User } from '@/types/auth.types';

// Function to convert the plain text password into hash password using the native browser crypto.subtle
const hashPassword = async (password: string): Promise<string> => {
    // Convert the password string into raw binary bytes
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    // Hash the bytes using the standard SHA-256 algorithm
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    // Turn the raw hash buffer into an array of individual bytes
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // Convert each byte into a 2-digit hex value and combine them into a single string
    return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

// Fetch and parse the list of all registered users saved in localStorage
const getUsers = (): StoredUser[] => {
    const storedUsers = localStorage.getItem('users');

    // Return an empty list if no users exist
    if (!storedUsers) {
        return [];
    }

    // Parse the saved JSON text back into a list of user objects
    return JSON.parse(storedUsers) as StoredUser[];
};

// Register a new user, check for duplicates, hash their password, and save them
export const signup = async (data: SignupData): Promise<User> => {
    // Simulate a 2-second network delay like a real backend API
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });

    // Load the existing list of registered accounts
    const users = getUsers();

    // Check if an account is already using this email
    const existingUser = users.find(
        (user) => user.email.toLowerCase() === data.email.toLowerCase(),
    );

    // Stop signup and throw an error if the email is taken
    if (existingUser) {
        throw new Error('An account with this email already exists!');
    }

    // Encrypt the user's password before storing it
    const hashedPassword = await hashPassword(data.password);

    const newUser: StoredUser = {
        fullName: data.fullName,
        email: data.email,
        contactNo: data.contactNo,
        role: data.role,
        password: hashedPassword,
        cart: [],
    };

    // Save the updated users list back into browser storage
    localStorage.setItem('users', JSON.stringify([...users, newUser]));

    // Remove the password to pass only the necessary details of user
    const safeUser: User = {
        fullName: newUser.fullName,
        email: newUser.email,
        contactNo: newUser.contactNo,
        role: newUser.role,
        cart: newUser.cart,
    };

    return safeUser;
};

// Verify user credentials against stored accounts and return profile details on match
export const login = async (data: LoginData): Promise<User> => {
    // Simulate a 2-second network delay like a real backend API
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });

    // Load all registered users from storage
    const users = getUsers();

    // Hash the entered password to compare against the stored hash
    const inputPasswordHash = await hashPassword(data.password);

    // Look for a user matching both the email and the password hash
    const user = users.find(
        (existingUser) =>
            existingUser.email.toLowerCase() === data.email.toLowerCase() &&
            existingUser.password === inputPasswordHash,
    );

    // Reject login if no matching credentials were found
    if (!user) {
        throw new Error('Invalid email or password!');
    }

    // Filter out the password before returning user details to the application
    const safeUser: User = {
        fullName: user.fullName,
        email: user.email,
        contactNo: user.contactNo,
        role: user.role,
        cart: user.cart,
    };

    return safeUser;
};

// Simulate a network delay when ending the user's active session
export const logout = async (): Promise<void> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
};
