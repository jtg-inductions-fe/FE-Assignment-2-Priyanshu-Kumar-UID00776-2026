import CardImage from '@/assets/images/pizza.avif';
import restaurantData from '@/mockData/restaurant.json';
import {
    MenuFormData,
    MenuItem,
    RestaurantFormData,
    RestaurantItemTypes,
} from '@/types/restaurant.types';

let mockRestaurants: RestaurantItemTypes[] = [
    ...(restaurantData as RestaurantItemTypes[]),
];

/**
 * Simulate fetching all restaurants with a 3-second network delay
 * @returns {Promise<RestaurantItemTypes[]>}
 */
export const fetchRestaurants = async (): Promise<RestaurantItemTypes[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [...mockRestaurants];
};

/**
 * Create a new restaurant record and append it to storage
 * @param {RestaurantFormData} data
 * @param {string} ownerEmail
 * @returns {Promise<RestaurantItemTypes>}
 */
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

/**
 * Update an existing restaurant details
 * @param {string} id
 * @param {RestaurantFormData} data
 * @param {string} ownerEmail
 * @returns {Promise<RestaurantItemTypes>}
 */
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

/**
 * Delete a restaurant record
 * @param {string} id
 * @param {string} ownerEmail
 * @returns {Promise<string>}
 */
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

/**
 * Add a menu item directly to a restaurant's existing menus
 * @param {string} restaurantId
 * @param {MenuFormData} menuData
 * @param {string} ownerEmail
 * @returns {Promise<{ restaurantId: string; menuItem: MenuItem }>}
 */
export const addMenuItem = async (
    restaurantId: string,
    menuData: MenuFormData,
    ownerEmail: string,
): Promise<{ restaurantId: string; menuItem: MenuItem }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const targetIndex = mockRestaurants.findIndex(
        (restaurant) => restaurant.id === restaurantId,
    );

    if (targetIndex === -1) throw new Error('Restaurant not found');
    const target = mockRestaurants[targetIndex];

    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Owner can add their own menu');
    }

    const newMenuItem: MenuItem = {
        ...menuData,
        image: CardImage,
        id: `menu_${crypto.randomUUID()}`,
    };

    mockRestaurants[targetIndex] = {
        ...target,
        menus: [...(target.menus || []), newMenuItem],
    };

    return { restaurantId, menuItem: newMenuItem };
};

/**
 * Edit an existing menu item inside the target restaurant
 * @param {string} restaurantId
 * @param {string} menuId
 * @param {MenuFormData} menuData
 * @param {string} ownerEmail
 * @returns {Promise<{ restaurantId: string; menuItem: MenuItem }>}
 */
export const editMenuItem = async (
    restaurantId: string,
    menuId: string,
    menuData: MenuFormData,
    ownerEmail: string,
): Promise<{ restaurantId: string; menuItem: MenuItem }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const targetIndex = mockRestaurants.findIndex(
        (restaurant) => restaurant.id === restaurantId,
    );

    if (targetIndex === -1) throw new Error('Restaurant not found');
    const target = mockRestaurants[targetIndex];

    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Owner can edit their own menu');
    }

    const menuIndex = target.menus.findIndex((menu) => menu.id === menuId);
    if (menuIndex === -1) throw new Error('Menu item not found');

    const updatedMenuItem: MenuItem = {
        ...target.menus[menuIndex],
        ...menuData,
    };

    const updatedMenus = [...target.menus];
    updatedMenus[menuIndex] = updatedMenuItem;

    mockRestaurants[targetIndex] = {
        ...target,
        menus: updatedMenus,
    };

    return { restaurantId, menuItem: updatedMenuItem };
};

/**
 * Delete a menu item from the restaurant's menus array
 * @param {string} restaurantId
 * @param {string} menuId
 * @param {string} ownerEmail
 * @returns {Promise<{ restaurantId: string; menuId: string }>}
 */
export const deleteMenuItem = async (
    restaurantId: string,
    menuId: string,
    ownerEmail: string,
): Promise<{ restaurantId: string; menuId: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const targetIndex = mockRestaurants.findIndex(
        (restaurant) => restaurant.id === restaurantId,
    );

    if (targetIndex === -1) throw new Error('Restaurant not found');
    const target = mockRestaurants[targetIndex];

    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Owner can delete their own menu only');
    }

    mockRestaurants[targetIndex] = {
        ...target,
        menus: target.menus.filter((menu) => menu.id !== menuId),
    };

    return { restaurantId, menuId };
};
