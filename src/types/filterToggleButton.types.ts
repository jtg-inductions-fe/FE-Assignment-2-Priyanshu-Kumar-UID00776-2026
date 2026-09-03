// Types of the food category
export type FoodVariant = 'all' | 'veg' | 'nonVeg';

export type FoodVariantToggleProps = {
    foodVariant: FoodVariant;
    onFilterChange: (filter: FoodVariant) => void;
};

export type StyledFilterButtonProps = {
    isActive?: boolean;
    variantType: FoodVariant;
};
