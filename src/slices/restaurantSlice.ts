import { RestaurantItemTypes } from '@/types/restaurant.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantState {
    restaurants: RestaurantItemTypes[];
}

const initialState: RestaurantState = {
    restaurants: [],
};

export const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        setRestaurants: (
            state,
            action: PayloadAction<RestaurantItemTypes[]>,
        ) => {
            state.restaurants = action.payload;
        },
        addRestaurantSuccess: (
            state,
            action: PayloadAction<RestaurantItemTypes>,
        ) => {
            state.restaurants.push(action.payload);
        },
        editRestaurantSuccess: (
            state,
            action: PayloadAction<RestaurantItemTypes>,
        ) => {
            const index = state.restaurants.findIndex(
                (r) => r.id === action.payload.id,
            );
            if (index !== -1) {
                state.restaurants[index] = action.payload;
            }
        },
        deleteRestaurantSuccess: (state, action: PayloadAction<string>) => {
            state.restaurants = state.restaurants.filter(
                (r) => r.id !== action.payload,
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
