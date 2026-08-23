import {
    AllFilterButton,
    NonVegFilterButton,
    StyledButtonGroup,
    VegFilterButton,
} from '@/components/FilterToggleButton/FilterToggleButton.styles';
import { FoodVariantToggleProps } from '@/types/fIlterToggleButton.types';

export const FoodVariantToggle = ({
    foodVariant,
    onFilterChange,
}: FoodVariantToggleProps) => (
    <StyledButtonGroup variant="outlined">
        <AllFilterButton
            onClick={() => onFilterChange('ALL')}
            variant={foodVariant === 'ALL' ? 'contained' : 'outlined'}
            color="primary"
        >
            All
        </AllFilterButton>

        <VegFilterButton
            onClick={() => onFilterChange('VEG')}
            variant={foodVariant === 'VEG' ? 'contained' : 'outlined'}
            isActive={foodVariant === 'VEG'}
        >
            Veg
        </VegFilterButton>

        <NonVegFilterButton
            onClick={() => onFilterChange('NON_VEG')}
            variant={foodVariant === 'NON_VEG' ? 'contained' : 'outlined'}
            isActive={foodVariant === 'NON_VEG'}
        >
            Non-Veg
        </NonVegFilterButton>
    </StyledButtonGroup>
);
