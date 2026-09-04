import {
    AccessTime as AccessTimeIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    LocationOnOutlined as LocationIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import {
    Box,
    CardMedia,
    Chip,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import {
    MetaItem,
    OwnerActionButton,
    StyledCard,
    StyledCardContent,
} from '@/components/RestaurantCard/RestaurantCard.styles';
import type { RestaurantCardProps } from '@/types/restaurantCard.types';

export const RestaurantCard = ({
    restaurant,
    isOwner = false,
    onEdit,
    onDelete,
}: RestaurantCardProps) => {
    const theme = useTheme();

    // Convert diet codes into display labels for badges
    const formatDietType = (type: string) => {
        if (type === 'nonVeg') return 'Non-Veg';
        if (type === 'veg') return 'Pure Veg';
        return 'Veg & Non-Veg';
    };

    return (
        <StyledCard>
            <Box position="relative">
                <CardMedia
                    component="img"
                    height="180"
                    image={restaurant.image}
                    alt={restaurant.name}
                />
                <Box
                    display="flex"
                    position="absolute"
                    top={theme.typography.pxToRem(12)}
                    right={theme.typography.pxToRem(12)}
                    bgcolor={theme.palette.secondary.main}
                    padding={theme.typography.pxToRem(8)}
                    borderRadius="20px"
                    alignItems="center"
                    justifyContent="center"
                    gap={theme.typography.pxToRem(4)}
                >
                    <StarIcon fontSize="inherit" color="warning" />
                    <Typography variant="body2">{restaurant.rating}</Typography>
                </Box>
            </Box>

            <StyledCardContent>
                <Box>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h3" noWrap>
                            {restaurant.name}
                        </Typography>
                        <Chip
                            label={`${formatDietType(restaurant.dietType)}`}
                            variant="filled"
                            color={
                                restaurant.dietType === 'veg'
                                    ? 'success'
                                    : restaurant.dietType === 'nonVeg'
                                      ? 'error'
                                      : 'default'
                            }
                        />
                    </Stack>

                    <MetaItem variant="body2">
                        <AccessTimeIcon fontSize="inherit" />
                        <span>
                            {restaurant.openingTime}
                            {restaurant.endTime}
                        </span>
                    </MetaItem>

                    <MetaItem variant="body2">
                        <LocationIcon fontSize="inherit" />
                        <span>{restaurant.location}</span>
                    </MetaItem>
                </Box>

                {isOwner && (
                    <Stack
                        direction="row"
                        spacing={2}
                        marginTop={theme.typography.pxToRem(8)}
                    >
                        <OwnerActionButton
                            variant="outlined"
                            fullWidth
                            startIcon={<EditIcon />}
                            size="small"
                            onClick={() => onEdit?.(restaurant)}
                        >
                            Edit
                        </OwnerActionButton>
                        <OwnerActionButton
                            variant="contained"
                            color="error"
                            fullWidth
                            startIcon={<DeleteIcon />}
                            size="small"
                            onClick={() => onDelete?.(restaurant.id)}
                        >
                            Delete
                        </OwnerActionButton>
                    </Stack>
                )}
            </StyledCardContent>
        </StyledCard>
    );
};
