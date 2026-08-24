import StarIcon from '@mui/icons-material/Star';
import { RadioGroup, Typography } from '@mui/material';

import {
    FilterItemLabel,
    FilterSection,
    FilterTitle,
    RatingLabelStack,
    SidebarContainer,
    StyledCheckbox,
    StyledRadio,
} from '@/components/Sidebar/Sidebar.styles';

export type TimeSlot = 'ALL' | 'MORNING' | 'AFTERNOON' | 'EVENING';

export type RestaurantSidebarProps = {
    selectedRatings: number[];
    onRatingToggle: (rating: number) => void;
    selectedTimeSlot: TimeSlot;
    onTimeSlotChange: (timeSlot: TimeSlot) => void;
};

const RATING_OPTIONS = [5.0, 4.0, 3.0, 2.0, 1.0];

const TIME_SLOT_OPTIONS: { label: string; value: TimeSlot }[] = [
    { label: 'All Day', value: 'ALL' },
    { label: 'Morning (Before 12 PM)', value: 'MORNING' },
    { label: 'Afternoon (12 PM - 4 PM)', value: 'AFTERNOON' },
    { label: 'Evening (After 4 PM)', value: 'EVENING' },
];

export const RestaurantSidebar = ({
    selectedRatings,
    onRatingToggle,
    selectedTimeSlot,
    onTimeSlotChange,
}: RestaurantSidebarProps) => (
    <SidebarContainer>
        <Typography variant="h6">Filters</Typography>

        <FilterSection>
            <FilterTitle variant="subtitle2">Rating</FilterTitle>
            {RATING_OPTIONS.map((rating) => (
                <FilterItemLabel
                    key={rating}
                    control={
                        <StyledCheckbox
                            checked={selectedRatings.includes(rating)}
                            onChange={() => onRatingToggle(rating)}
                        />
                    }
                    label={
                        <RatingLabelStack>
                            <Typography variant="body2">
                                {rating.toFixed(1)} & above
                            </Typography>
                            <StarIcon fontSize="small" color="warning" />
                        </RatingLabelStack>
                    }
                    labelPlacement="start"
                />
            ))}
        </FilterSection>

        <FilterSection>
            <FilterTitle variant="subtitle2">Opening Hours</FilterTitle>
            <RadioGroup
                value={selectedTimeSlot}
                onChange={(e) => onTimeSlotChange(e.target.value as TimeSlot)}
            >
                {TIME_SLOT_OPTIONS.map((slot) => (
                    <FilterItemLabel
                        key={slot.value}
                        value={slot.value}
                        control={<StyledRadio />}
                        label={
                            <Typography variant="body2">
                                {slot.label}
                            </Typography>
                        }
                        labelPlacement="start"
                    />
                ))}
            </RadioGroup>
        </FilterSection>
    </SidebarContainer>
);
