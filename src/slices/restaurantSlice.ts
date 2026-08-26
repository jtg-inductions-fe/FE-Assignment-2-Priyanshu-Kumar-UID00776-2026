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
    },
});

// Export action creators for use in UI components and services
export const {
    setRestaurants,
    addRestaurantSuccess,
    editRestaurantSuccess,
    deleteRestaurantSuccess,
} = restaurantSlice.actions;

// Export the reducer to register in the global redux store
export default restaurantSlice.reducer;
