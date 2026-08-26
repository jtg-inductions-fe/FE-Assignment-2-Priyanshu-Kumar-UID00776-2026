import CardImage from '@/assets/images/pizza.avif';
import {
    RestaurantFormData,
    RestaurantItemTypes,
} from '@/types/restaurant.types';

// Safely load and parse the saved restaurants list from browser storage
const getStoredRestaurants = (): RestaurantItemTypes[] => {
    try {
        // Read the stored string from localStorage
        const stored = localStorage.getItem('restaurants');
        // Convert JSON to an array or return empty if nothing is found
        return stored ? (JSON.parse(stored) as RestaurantItemTypes[]) : [];
    } catch {
        // Fall back to an empty list if JSON parsing fails
        return [];
    }
};

// Write the updated restaurants array back to browser storage
const saveRestaurants = (data: RestaurantItemTypes[]): void => {
    localStorage.setItem('restaurants', JSON.stringify(data));
};

// Simulate fetching all restaurants with a 3-second network delay
export const fetchRestaurants = async (): Promise<RestaurantItemTypes[]> => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return getStoredRestaurants();
};

// Create a new restaurant record and append it to storage
export const addRestaurant = async (
    data: RestaurantFormData,
    ownerEmail: string,
): Promise<RestaurantItemTypes> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Get current restaurants list
    const restaurants = getStoredRestaurants();
    // Build the new restaurant object with unique ID, image, and owner email
    const newRestaurant: RestaurantItemTypes = {
        ...data,
        id: `rest_${crypto.randomUUID()}`,
        ownerId: ownerEmail.toLowerCase(),
        image: CardImage,
        menus: [],
    };

    // Save the extended list to storage
    saveRestaurants([...restaurants, newRestaurant]);
    return newRestaurant;
};

// Update an existing restaurant details
export const editRestaurant = async (
    id: string,
    data: RestaurantFormData,
    ownerEmail: string,
): Promise<RestaurantItemTypes> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const restaurants = getStoredRestaurants();
    // Find the matching restaurant by ID
    const target = restaurants.find((restaurant) => restaurant.id === id);

    // Fail if the restaurant doesn't exist
    if (!target) throw new Error('Restaurant not found');
    // Reject edit if the current user is not the owner
    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Forbidden: You can only edit your own restaurants');
    }

    // Merge old restaurant data with the updated fields
    const updatedRestaurant: RestaurantItemTypes = {
        ...target,
        ...data,
    };

    // Replace the old record in the list with the updated one
    const updatedList = restaurants.map((restaurant) =>
        restaurant.id === id ? updatedRestaurant : restaurant,
    );
    // Persist the updated array to storage
    saveRestaurants(updatedList);
    return updatedRestaurant;
};

// Remove a restaurant from storage after verifying ownership
export const deleteRestaurant = async (
    id: string,
    ownerEmail: string,
): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const restaurants = getStoredRestaurants();
    // Find the target restaurant by ID
    const target = restaurants.find((restaurant) => restaurant.id === id);

    // Stop if the restaurant is missing
    if (!target) throw new Error('Restaurant not found');
    // Block the action if the user does not own this restaurant
    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Forbidden: You can only delete your own restaurants');
    }

    // Filter out the restaurant with the matching ID
    const filtered = restaurants.filter((restaurant) => restaurant.id !== id);
    // Save the pruned list back to storage
    saveRestaurants(filtered);
    return id;
};
