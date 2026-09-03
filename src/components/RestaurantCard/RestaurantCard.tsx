import {
    AccessTime as AccessTimeIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    LocationOnOutlined as LocationIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import { Box, CardMedia, Chip, Stack, Typography } from '@mui/material';

import {
    ImageWrapper,
    MetaItem,
    OwnerActionButton,
    OwnerActionStack,
    RatingBadge,
    StyledCard,
    StyledCardContent,
} from '@/components/RestaurantCard/RestaurantCard.styles';
import type { RestaurantCardProps } from '@/types/restaurantCard.types';

export const RestaurantCard = ({
    restaurant,
    isOwner = false,
    onCardClick,
    onEdit,
    onDelete,
}: RestaurantCardProps) => {
    // Convert diet codes into display labels for badges
    const formatDietType = (type: string) => {
        if (type === 'nonVeg') return 'Non-Veg';
        if (type === 'veg') return 'Pure Veg';
        return 'Veg & Non-Veg';
    };

    return (
        <StyledCard onClick={() => onCardClick?.(restaurant.id)}>
            <ImageWrapper>
                <CardMedia
                    component="img"
                    height="180"
                    fetchPriority="high"
                    image={restaurant.image}
                    alt={restaurant.name}
                />
                <RatingBadge variant="body2">
                    <StarIcon fontSize="inherit" color="warning" />
                    {restaurant.rating}
                </RatingBadge>
            </ImageWrapper>

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
                        <span>{restaurant.openingTime}</span>
                    </MetaItem>

                    <MetaItem variant="body2">
                        <LocationIcon fontSize="inherit" />
                        <span>{restaurant.location}</span>
                    </MetaItem>
                </Box>

                {isOwner && (
                    <OwnerActionStack direction="row" spacing={1.5}>
                        <OwnerActionButton
                            variant="outlined"
                            fullWidth
                            startIcon={<EditIcon />}
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit?.(restaurant);
                            }}
                        >
                            Edit
                        </OwnerActionButton>
                        <OwnerActionButton
                            variant="contained"
                            color="error"
                            fullWidth
                            startIcon={<DeleteIcon />}
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete?.(restaurant.id);
                            }}
                        >
                            Delete
                        </OwnerActionButton>
                    </OwnerActionStack>
                )}
            </StyledCardContent>
        </StyledCard>
    );
};
