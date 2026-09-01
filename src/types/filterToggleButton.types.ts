// Types of the food category
export type FoodVariant = 'all' | 'veg' | 'nonVeg';

export type FoodVariantToggleProps = {
    foodVariant: FoodVariant;
    onFilterChange: (filter: FoodVariant) => void;
};
