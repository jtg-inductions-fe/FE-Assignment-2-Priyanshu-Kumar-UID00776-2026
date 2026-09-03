import restaurantData from '@/mockData/restaurant.json';
import {
    MenuItem,
    RestaurantItemTypes,
    RestaurantState,
} from '@/types/restaurant.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Set up the default starting state with an empty list
const initialState: RestaurantState = {
    restaurants: restaurantData as RestaurantItemTypes[],
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
            const index = state.restaurants.findIndex(
                (restaurant) => restaurant.id === action.payload.id,
            );

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
        // Add new menu item for the selected item
        addMenuItemSuccess: (
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
        // Edit menu item for the selected restaurant
        editMenuItemSuccess: (
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
        // Remove a menu item from the matching restaurant's menu list
        deleteMenuItemSuccess: (
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

export const {
    setRestaurants,
    addRestaurantSuccess,
    editRestaurantSuccess,
    deleteRestaurantSuccess,
    addMenuItemSuccess,
    editMenuItemSuccess,
    deleteMenuItemSuccess,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
