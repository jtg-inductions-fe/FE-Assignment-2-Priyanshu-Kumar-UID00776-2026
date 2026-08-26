import CardImage from '@/assets/images/pizza.avif';
import {
    MenuFormData,
    MenuItem,
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
        throw new Error('Owner can edit their own restuarant only');
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
        throw new Error('Owner can delete their own restuarant only');
    }

    // Filter out the restaurant with the matching ID
    const filtered = restaurants.filter((restaurant) => restaurant.id !== id);
    // Save the pruned list back to storage
    saveRestaurants(filtered);
    return id;
};

// Add a menu item directly to a restaurant's existing menus
export const addMenuItem = async (
    restaurantId: string,
    menuData: MenuFormData,
    ownerEmail: string,
): Promise<{ restaurantId: string; menuItem: MenuItem }> => {
    // Simulate network delay for the request
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Retrieve all restaurants from local storage
    const restaurants = getStoredRestaurants();
    // Locate the specific restaurant by its ID
    const target = restaurants.find(
        (restaurant) => restaurant.id === restaurantId,
    );

    // Stop execution if the restaurant does not exist
    if (!target) throw new Error('Restaurant not found');
    // Ensure only the restaurant owner can add menu items
    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Owner can add there own menu');
    }

    // Create the new menu item with a generated ID and default rating
    const newMenuItem: MenuItem = {
        ...menuData,
        id: `menu_${crypto.randomUUID()}`,
        rating: 0,
    };

    // Append to existing restaurant menu array
    target.menus = [...(target.menus || []), newMenuItem];

    // Persist the updated restaurants array to storage
    saveRestaurants(restaurants);
    // Return the restaurant ID along with the newly added item
    return { restaurantId, menuItem: newMenuItem };
};

// Edit an existing menu item inside the target restaurant
export const editMenuItem = async (
    restaurantId: string,
    menuId: string,
    menuData: MenuFormData,
    ownerEmail: string,
): Promise<{ restaurantId: string; menuItem: MenuItem }> => {
    // Simulate network latency for editing
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Retrieve all restaurants from storage
    const restaurants = getStoredRestaurants();
    // Find the target restaurant by its ID
    const target = restaurants.find(
        (restaurant) => restaurant.id === restaurantId,
    );

    // Stop execution if the restaurant does not exist
    if (!target) throw new Error('Restaurant not found');
    // Check if the current user owns this restaurant
    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Owner can edit their own menu');
    }

    // Find the index of the specific menu item to be edited
    const menuIndex = target.menus.findIndex((menu) => menu.id === menuId);
    // Throw an error if the menu item is not found
    if (menuIndex === -1) throw new Error('Menu item not found');

    // Merge previous item details with incoming changes
    const updatedMenuItem: MenuItem = {
        ...target.menus[menuIndex],
        ...menuData,
    };

    // Update the item in the restaurant's menu array
    target.menus[menuIndex] = updatedMenuItem;

    // Save changes back to storage
    saveRestaurants(restaurants);
    // Return the restaurant ID and the updated menu item
    return { restaurantId, menuItem: updatedMenuItem };
};

// Delete a menu item from the restaurant's menus array
export const deleteMenuItem = async (
    restaurantId: string,
    menuId: string,
    ownerEmail: string,
): Promise<{ restaurantId: string; menuId: string }> => {
    // Simulate network latency for deletion
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Retrieve the list of restaurants from storage
    const restaurants = getStoredRestaurants();
    // Find the matching restaurant by its ID
    const target = restaurants.find(
        (restaurant) => restaurant.id === restaurantId,
    );

    // Ensure the target restaurant exists
    if (!target) throw new Error('Restaurant not found');
    // Prevent unauthorized users from deleting items
    if (target.ownerId.toLowerCase() !== ownerEmail.toLowerCase()) {
        throw new Error('Owner can delete their own menu only');
    }

    // Filter out the menu item with the matching ID
    target.menus = target.menus.filter((menu) => menu.id !== menuId);

    // Save the data back to storage
    saveRestaurants(restaurants);
    // Return the restaurant and deleted menu ID
    return { restaurantId, menuId };
};
