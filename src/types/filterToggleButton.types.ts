// Types of the food category
export type FoodVariant = 'ALL' | 'VEG' | 'NON_VEG';

export type FoodVariantToggleProps = {
    foodVariant: FoodVariant;
    onFilterChange: (filter: FoodVariant) => void;
};
