import {
    AllFilterButton,
    NonVegFilterButton,
    StyledButtonGroup,
    VegFilterButton,
} from '@/components/FilterToggleButton/FilterToggleButton.styles';
import { FoodVariantToggleProps } from '@/types/filterToggleButton.types';

export const FoodVariantToggle = ({
    foodVariant,
    onFilterChange,
}: FoodVariantToggleProps) => (
    <StyledButtonGroup
        variant="outlined"
        aria-label="FIlter restaurants by diet"
    >
        <AllFilterButton
            onClick={() => onFilterChange('all')}
            variant={foodVariant === 'all' ? 'contained' : 'outlined'}
            aria-pressed={foodVariant === 'all'}
            color="primary"
        >
            All
        </AllFilterButton>

        <VegFilterButton
            onClick={() => onFilterChange('veg')}
            variant={foodVariant === 'veg' ? 'contained' : 'outlined'}
            aria-pressed={foodVariant === 'veg'}
            isActive={foodVariant === 'veg'}
        >
            Veg
        </VegFilterButton>

        <NonVegFilterButton
            onClick={() => onFilterChange('nonVeg')}
            variant={foodVariant === 'nonVeg' ? 'contained' : 'outlined'}
            aria-pressed={foodVariant === 'nonVeg'}
            isActive={foodVariant === 'nonVeg'}
        >
            Non-Veg
        </NonVegFilterButton>
    </StyledButtonGroup>
);
