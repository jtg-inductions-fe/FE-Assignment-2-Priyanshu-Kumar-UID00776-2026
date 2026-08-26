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
    onEdit,
    onDelete,
}: RestaurantCardProps) => {
    // Convert diet codes into display labels for badges
    const formatDietType = (type: string) => {
        if (type === 'NON_VEG') return 'Non-Veg';
        if (type === 'VEG') return 'Pure Veg';
        return 'Veg & Non-Veg';
    };

    return (
        <StyledCard>
            <ImageWrapper>
                <CardMedia
                    component="img"
                    height="180"
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
                        <Typography variant="h3" fontWeight={700} noWrap>
                            {restaurant.name}
                        </Typography>
                        <Chip
                            label={`${formatDietType(restaurant.dietType)}`}
                            variant="filled"
                            color={
                                restaurant.dietType === 'VEG'
                                    ? 'success'
                                    : restaurant.dietType === 'NON_VEG'
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
                    </OwnerActionStack>
                )}
            </StyledCardContent>
        </StyledCard>
    );
};
