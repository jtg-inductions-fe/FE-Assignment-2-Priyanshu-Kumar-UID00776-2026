import CardImage from '@/assets/images/pizza.avif';
import {
    RestaurantFormData,
    RestaurantItemTypes,
} from '@/types/restaurant.types';

// Safely load and parse the saved restaurants list from browser storage
const getStoredRestaurants = (): RestaurantItemTypes[] => {
    try {
        const stored = localStorage.getItem('restaurants');

        return stored ? (JSON.parse(stored) as RestaurantItemTypes[]) : [];
    } catch {
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

    const restaurants = getStoredRestaurants();

    const newRestaurant: RestaurantItemTypes = {
        ...data,
        id: `rest_${crypto.randomUUID()}`,
        ownerId: ownerEmail.toLowerCase(),
        image: CardImage,
        menus: [],
    };

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

    const target = restaurants.find((restaurant) => restaurant.id === id);

    if (!target) throw new Error('Restaurant not found');

    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Owner can edit their own restuarant only');
    }

    const updatedRestaurant: RestaurantItemTypes = {
        ...target,
        ...data,
    };

    const updatedList = restaurants.map((restaurant) =>
        restaurant.id === id ? updatedRestaurant : restaurant,
    );

    saveRestaurants(updatedList);
    return updatedRestaurant;
};

export const deleteRestaurant = async (
    id: string,
    ownerEmail: string,
): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const restaurants = getStoredRestaurants();

    const target = restaurants.find((restaurant) => restaurant.id === id);

    if (!target) throw new Error('Restaurant not found');

    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Owner can delete their own restuarant only');
    }

    const filtered = restaurants.filter((restaurant) => restaurant.id !== id);

    saveRestaurants(filtered);
    return id;
};
