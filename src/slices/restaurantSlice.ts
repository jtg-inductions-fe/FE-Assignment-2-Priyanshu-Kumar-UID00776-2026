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
                (r) => r.id === action.payload.id,
            );
            // If found overwrite it with the updated restaurant object
            if (index !== -1) {
                state.restaurants[index] = action.payload;
            }
        },
        // Remove a restaurant from the list using its unique ID
        deleteRestaurantSuccess: (state, action: PayloadAction<string>) => {
            state.restaurants = state.restaurants.filter(
                (r) => r.id !== action.payload,
            );
        },
        addMenuItem: (
            state,
            action: PayloadAction<{ restaurantId: string; menuItem: MenuItem }>,
        ) => {
            const restaurants = state.restaurants.find(
                (restaurant) => restaurant.id === action.payload.restaurantId,
            );
            if (restaurants) {
                restaurants.menus.push(action.payload.menuItem);
            }
        },
        editMenuItem: (
            state,
            action: PayloadAction<{ restaurantId: string; menuItem: MenuItem }>,
        ) => {
            const restaurants = state.restaurants.find(
                (restaurant) => restaurant.id === action.payload.restaurantId,
            );
            if (restaurants) {
                const itemIndex = restaurants.menus.findIndex(
                    (menu) => menu.id === action.payload.menuItem.id,
                );
                if (itemIndex !== -1) {
                    restaurants.menus[itemIndex] = action.payload.menuItem;
                }
            }
        },
        deleteMenuItem: (
            state,
            action: PayloadAction<{ restaurantId: string; menuId: string }>,
        ) => {
            const restaurants = state.restaurants.find(
                (restaurant) => restaurant.id === action.payload.restaurantId,
            );
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
    addMenuItem,
    editMenuItem,
    deleteMenuItem,
} = restaurantSlice.actions;

// Export the reducer to register in the global redux store
export default restaurantSlice.reducer;
