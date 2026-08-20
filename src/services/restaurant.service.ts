import {
    RestaurantFormData,
    RestaurantItemTypes,
} from '../types/restaurant.types';

const getStoredRestaurants = (): RestaurantItemTypes[] => {
    try {
        const stored = localStorage.getItem('restaurants');
        return stored ? (JSON.parse(stored) as RestaurantItemTypes[]) : [];
    } catch {
        return [];
    }
};

const saveRestaurants = (data: RestaurantItemTypes[]): void => {
    localStorage.setItem('restaurants', JSON.stringify(data));
};

export const fetchRestaurants = async (): Promise<RestaurantItemTypes[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getStoredRestaurants();
};

export const addRestaurant = async (
    data: RestaurantFormData,
    ownerEmail: string,
): Promise<RestaurantItemTypes> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const restaurants = getStoredRestaurants();
    const newRestaurant: RestaurantItemTypes = {
        ...data,
        id: `rest_${Date.now()}`,
        ownerId: ownerEmail.toLowerCase(),
        image: '../../src/assets/images/pizza.avif',
        menus: [],
    };

    saveRestaurants([...restaurants, newRestaurant]);
    return newRestaurant;
};

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
        throw new Error('Forbidden: You can only edit your own restaurants');
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
        throw new Error('Forbidden: You can only delete your own restaurants');
    }

    const filtered = restaurants.filter((restaurant) => restaurant.id !== id);
    saveRestaurants(filtered);
    return id;
};
