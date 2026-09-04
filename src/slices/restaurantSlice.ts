import { RestaurantItemTypes, RestaurantState } from '@/types/restaurant.types';
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
    },
});

export const {
    setRestaurants,
    addRestaurantSuccess,
    editRestaurantSuccess,
    deleteRestaurantSuccess,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
