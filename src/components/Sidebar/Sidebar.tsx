import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
    Box,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import {
    FilterItemLabel,
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
            <Box
                display="flex"
                padding={{
                    xs: theme.typography.pxToRem(12),
                    sm: theme.typography.pxToRem(16),
                }}
                flexDirection="column"
                gap={theme.typography.pxToRem(12)}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    pt={3}
                    pb={theme.typography.pxToRem(12)}
                    borderBottom={`1px solid ${theme.palette.divider}`}
                >
                    <Typography variant="h5">Filters</Typography>

                    <IconButton
                        aria-label="Close filters"
                        size="small"
                        onClick={onClose}
                    >
                        <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Stack gap={theme.typography.pxToRem(4)}>
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
                                control={
                                    <StyledCheckbox
                                        checked={isSelected}
                                        onChange={() => onRatingToggle(rating)}
                                    />
                                }
                                label={
                                    <Stack direction="row" gap="4px">
                                        <Typography variant="body2">
                                            {rating === 5
                                                ? '5.0'
                                                : `${rating.toFixed(1)} & above`}
                                        </Typography>
                                    </Stack>
                                }
                                labelPlacement="start"
                            />
                        );
                    })}
                </Stack>
            </Box>
        </StyledDrawer>
    );
};
