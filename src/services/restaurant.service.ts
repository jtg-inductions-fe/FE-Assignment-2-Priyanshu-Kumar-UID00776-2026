import CardImage from '@/assets/images/pizza.avif';
import restaurantData from '@/mockData/restaurant.json';
import {
    RestaurantFormData,
    RestaurantItemTypes,
} from '@/types/restaurant.types';

let mockRestaurants: RestaurantItemTypes[] = [
    ...(restaurantData as RestaurantItemTypes[]),
];

// Simulate fetching all restaurants with a 3-second network delay
export const fetchRestaurants = async (): Promise<RestaurantItemTypes[]> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return [...mockRestaurants];
};

// Create a new restaurant record and append it to storage
export const addRestaurant = async (
    data: RestaurantFormData,
    ownerEmail: string,
): Promise<RestaurantItemTypes> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newRestaurant: RestaurantItemTypes = {
        ...data,
        id: `rest_${crypto.randomUUID()}`,
        ownerId: ownerEmail.toLowerCase(),
        image: CardImage,
        menus: [],
    };

    mockRestaurants.push(newRestaurant);
    return newRestaurant;
};

// Update an existing restaurant details
export const editRestaurant = async (
    id: string,
    data: RestaurantFormData,
    ownerEmail: string,
): Promise<RestaurantItemTypes> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const target = mockRestaurants.find((restaurant) => restaurant.id === id);

    if (!target) throw new Error('Restaurant not found');

    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Owner can edit their own restuarant only');
    }

    const updatedRestaurant: RestaurantItemTypes = {
        ...target,
        ...data,
    };

    mockRestaurants = mockRestaurants.map((restaurant) =>
        restaurant.id === id ? updatedRestaurant : restaurant,
    );

    return updatedRestaurant;
};

export const deleteRestaurant = async (
    id: string,
    ownerEmail: string,
): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const target = mockRestaurants.find((restaurant) => restaurant.id === id);

    if (!target) throw new Error('Restaurant not found');

    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Owner can delete their own restuarant only');
    }

    mockRestaurants = mockRestaurants.filter(
        (restaurant) => restaurant.id !== id,
    );

    return id;
};
