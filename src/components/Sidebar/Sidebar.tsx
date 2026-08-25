import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import {
    CloseDrawerIconButton,
    DrawerContentContainer,
    DrawerHeader,
    FilterItemLabel,
    MobileDragHandle,
    StyledCheckbox,
    StyledDrawer,
} from '@/components/Sidebar/Sidebar.styles';
import { RATING_OPTIONS } from '@/constant/ratingConstants';
import { RestaurantSidebarProps } from '@/types/sidebarFilter.types';

export const RestaurantSidebar = ({
    open,
    onClose,
    selectedRatings,
    onRatingToggle,
}: RestaurantSidebarProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <StyledDrawer
            variant="temporary"
            anchor={isMobile ? 'bottom' : 'left'}
            open={open}
            onClose={onClose}
        >
            <DrawerContentContainer>
                <MobileDragHandle />

                <DrawerHeader>
                    <Typography variant="h5">Filters</Typography>

                    <CloseDrawerIconButton size="small" onClick={onClose}>
                        <CloseRoundedIcon fontSize="small" />
                    </CloseDrawerIconButton>
                </DrawerHeader>

                <Stack gap="4px">
                    <Typography
                        color={theme.palette.secondary.dark}
                        variant="h6"
                    >
                        Customer Rating
                    </Typography>
                    {RATING_OPTIONS.map((rating) => {
                        const isSelected = selectedRatings.includes(rating);
                        return (
                            <FilterItemLabel
                                key={rating}
                                isSelected={isSelected}
                                control={
                                    <StyledCheckbox
                                        checked={isSelected}
                                        onChange={() => onRatingToggle(rating)}
                                    />
                                }
                                label={
                                    <Stack direction="row" gap="4px">
                                        <Typography variant="body2">
                                            {rating.toFixed(1)} & above
                                        </Typography>
                                    </Stack>
                                }
                                labelPlacement="start"
                            />
                        );
                    })}
                </Stack>
            </DrawerContentContainer>
        </StyledDrawer>
    );
};
