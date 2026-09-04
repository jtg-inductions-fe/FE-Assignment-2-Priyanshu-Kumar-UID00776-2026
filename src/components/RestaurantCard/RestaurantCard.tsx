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

import { RatingBadge } from '@/components/ItemCard/ItemCard.styles';
import {
    MetaItem,
    OwnerActionButton,
    StyledCard,
    StyledCardContent,
} from '@/components/RestaurantCard/RestaurantCard.styles';
import { RestaurantCardProps } from '@/types/restaurantCard.types';

export const RestaurantCard = ({
    restaurant,
    isOwner = false,
    onCardClick,
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
        <StyledCard onClick={() => onCardClick?.(restaurant.id)}>
            <Box position="relative">
                <CardMedia
                    component="img"
                    height="180"
                    image={restaurant.image}
                    alt={restaurant.name}
                />
                <RatingBadge
                    position="absolute"
                    top={theme.typography.pxToRem(12)}
                    right={theme.typography.pxToRem(12)}
                >
                    <StarIcon fontSize="small" sx={{ mb: 0.5 }} />
                    <Typography
                        color={theme.palette.secondary.dark}
                        variant="body2"
                    >
                        {restaurant.rating}
                    </Typography>
                </RatingBadge>
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
                            {restaurant.openingTime} AM - {restaurant.endTime}{' '}
                            PM
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
                    </Stack>
                )}
            </StyledCardContent>
        </StyledCard>
    );
};
