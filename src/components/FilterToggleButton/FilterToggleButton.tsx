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
            onClick={() => onFilterChange('ALL')}
            variant={foodVariant === 'ALL' ? 'contained' : 'outlined'}
            aria-pressed={foodVariant === 'ALL'}
            color="primary"
        >
            All
        </AllFilterButton>

        <VegFilterButton
            onClick={() => onFilterChange('VEG')}
            variant={foodVariant === 'VEG' ? 'contained' : 'outlined'}
            aria-pressed={foodVariant === 'VEG'}
            isActive={foodVariant === 'VEG'}
        >
            Veg
        </VegFilterButton>

        <NonVegFilterButton
            onClick={() => onFilterChange('NON_VEG')}
            variant={foodVariant === 'NON_VEG' ? 'contained' : 'outlined'}
            aria-pressed={foodVariant === 'NON_VEG'}
            isActive={foodVariant === 'NON_VEG'}
        >
            Non-Veg
        </NonVegFilterButton>
    </StyledButtonGroup>
);
