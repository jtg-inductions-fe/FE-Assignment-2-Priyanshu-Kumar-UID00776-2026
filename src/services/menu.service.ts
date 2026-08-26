import {
    MenuFormData,
    MenuItem,
    RestaurantItemTypes,
} from '@/types/restaurant.types';

// Helper to fetch parsed restaurants from localStorage
const getStoredRestaurants = (): RestaurantItemTypes[] => {
    try {
        const stored = localStorage.getItem('restaurants');
        return stored ? (JSON.parse(stored) as RestaurantItemTypes[]) : [];
    } catch {
        return [];
    }
};

// Helper to persist restaurants array
const saveRestaurants = (data: RestaurantItemTypes[]): void => {
    localStorage.setItem('restaurants', JSON.stringify(data));
};

// Add a menu item directly to a restaurant's existing menus
export const addMenuItem = async (
    restaurantId: string,
    menuData: MenuFormData,
    ownerEmail: string,
): Promise<{ restaurantId: string; menuItem: MenuItem }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const restaurants = getStoredRestaurants();
    const target = restaurants.find(
        (restaurant) => restaurant.id === restaurantId,
    );

    if (!target) throw new Error('Restaurant not found');
    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Owner can add there own menu');
    }

    const newMenuItem: MenuItem = {
        ...menuData,
        id: `menu_${crypto.randomUUID()}`,
        rating: 0,
    };

    // Append to existing restaurant menu array
    target.menus = [...(target.menus || []), newMenuItem];

    saveRestaurants(restaurants);
    return { restaurantId, menuItem: newMenuItem };
};

// Edit an existing menu item inside the target restaurant
export const editMenuItem = async (
    restaurantId: string,
    menuId: string,
    menuData: Partial<MenuFormData>,
    ownerEmail: string,
): Promise<{ restaurantId: string; menuItem: MenuItem }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const restaurants = getStoredRestaurants();
    const target = restaurants.find(
        (restaurant) => restaurant.id === restaurantId,
    );

    if (!target) throw new Error('Restaurant not found');
    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Owner can edit their own menu');
    }

    const menuIndex = target.menus.findIndex((menu) => menu.id === menuId);
    if (menuIndex === -1) throw new Error('Menu item not found');

    const updatedMenuItem: MenuItem = {
        ...target.menus[menuIndex],
        ...menuData,
    };

    target.menus[menuIndex] = updatedMenuItem;

    saveRestaurants(restaurants);
    return { restaurantId, menuItem: updatedMenuItem };
};

// Delete a menu item from the restaurant's menus array
export const deleteMenuItem = async (
    restaurantId: string,
    menuId: string,
    ownerEmail: string,
): Promise<{ restaurantId: string; menuId: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const restaurants = getStoredRestaurants();
    const target = restaurants.find(
        (restaurant) => restaurant.id === restaurantId,
    );

    if (!target) throw new Error('Restaurant not found');
    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Owner can delete their own menu only');
    }

    target.menus = target.menus.filter((menu) => menu.id !== menuId);

    saveRestaurants(restaurants);
    return { restaurantId, menuId };
};
