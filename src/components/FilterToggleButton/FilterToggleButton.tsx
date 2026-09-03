import {
    StyledButtonGroup,
    StyledFilterButton,
} from '@/components/FilterToggleButton/FilterToggleButton.styles';
import { FILTER_OPTIONS } from '@/constant/restaurantConstants';
import { FoodVariantToggleProps } from '@/types/filterToggleButton.types';

export const FoodVariantToggle = ({
    foodVariant,
    onFilterChange,
}: FoodVariantToggleProps) => (
    <StyledButtonGroup
        variant="outlined"
        aria-label="Filter restaurants by diet"
    >
        {FILTER_OPTIONS.map(({ id, label }) => {
            const isActive = foodVariant === id;

            return (
                <StyledFilterButton
                    key={id}
                    onClick={() => onFilterChange(id)}
                    variant={isActive ? 'contained' : 'outlined'}
                    aria-pressed={isActive}
                    variantType={id}
                    isActive={isActive}
                >
                    {label}
                </StyledFilterButton>
            );
        })}
    </StyledButtonGroup>
);
