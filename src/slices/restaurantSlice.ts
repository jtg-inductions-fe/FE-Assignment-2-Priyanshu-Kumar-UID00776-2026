import {
    MenuItem,
    RestaurantItemTypes,
    RestaurantState,
} from '@/types/restaurant.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Set up the default starting state with an empty list
const initialState: RestaurantState = {
    restaurants: [],
};

// Create the redux slice to manage restaurant state and actions
export const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        // Replace the entire restaurant list with new data
        setRestaurants: (
            state,
            action: PayloadAction<RestaurantItemTypes[]>,
        ) => {
            state.restaurants = action.payload;
        },
        // Add a newly created restaurant to the end of the list
        addRestaurantSuccess: (
            state,
            action: PayloadAction<RestaurantItemTypes>,
        ) => {
            state.restaurants.push(action.payload);
        },
        // Find an existing restaurant by ID and update its details in place
        editRestaurantSuccess: (
            state,
            action: PayloadAction<RestaurantItemTypes>,
        ) => {
            // Locate the item index in our state array
            const index = state.restaurants.findIndex(
                (restaurant) => restaurant.id === action.payload.id,
            );
            // If found overwrite it with the updated restaurant object
            if (index !== -1) {
                state.restaurants[index] = action.payload;
            }
        },
        // Remove a restaurant from the list using its unique ID
        deleteRestaurantSuccess: (state, action: PayloadAction<string>) => {
            state.restaurants = state.restaurants.filter(
                (restaurant) => restaurant.id !== action.payload,
            );
        },
        addMenuItemSuccess: (
            state,
            action: PayloadAction<{ restaurantId: string; menuItem: MenuItem }>,
        ) => {
            // Find the restaurant in state that matches the payload restaurant ID
            const restaurants = state.restaurants.find(
                (restaurant) => restaurant.id === action.payload.restaurantId,
            );
            // Push the new menu item to the restaurant if found
            if (restaurants) {
                restaurants.menus.push(action.payload.menuItem);
            }
        },
        editMenuItemSuccess: (
            state,
            action: PayloadAction<{ restaurantId: string; menuItem: MenuItem }>,
        ) => {
            // Locate the target restaurant by its ID
            const restaurants = state.restaurants.find(
                (restaurant) => restaurant.id === action.payload.restaurantId,
            );
            // Proceed only if the restaurant exists in state
            if (restaurants) {
                // Find the index of the specific menu item to update
                const itemIndex = restaurants.menus.findIndex(
                    (menu) => menu.id === action.payload.menuItem.id,
                );
                // Replace the menu item if it exists in the array
                if (itemIndex !== -1) {
                    restaurants.menus[itemIndex] = action.payload.menuItem;
                }
            }
        },
        // Remove a menu item from the matching restaurant's menu list
        deleteMenuItemSuccess: (
            state,
            action: PayloadAction<{ restaurantId: string; menuId: string }>,
        ) => {
            // Locate the target restaurant by its ID
            const restaurants = state.restaurants.find(
                (restaurant) => restaurant.id === action.payload.restaurantId,
            );
            // Filter out the deleted menu item if the restaurant is found
            if (restaurants) {
                restaurants.menus = restaurants.menus.filter(
                    (menu) => menu.id !== action.payload.menuId,
                );
            }
        },
    },
});

// Export action creators for use in UI components and services
export const {
    setRestaurants,
    addRestaurantSuccess,
    editRestaurantSuccess,
    deleteRestaurantSuccess,
    addMenuItemSuccess,
    editMenuItemSuccess,
    deleteMenuItemSuccess,
} = restaurantSlice.actions;

// Export the reducer to register in the global redux store
export default restaurantSlice.reducer;
