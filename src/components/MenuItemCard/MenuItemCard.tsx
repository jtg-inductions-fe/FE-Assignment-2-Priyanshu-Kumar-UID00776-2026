import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Remove as RemoveIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import { Box, Chip, Stack, Typography } from '@mui/material';

import {
    AddButton,
    CounterButton,
    MenuCardBody,
    MenuImageWrapper,
    QuantityCounter,
    RatingBadge,
    StyledCardMedia,
    StyledMenuCard,
} from '@/components/MenuItemCard/MenuItemCard.styles';
import type { MenuItemCardProps } from '@/types/restaurant.types';

export const MenuItemCard = ({
    item,
    isOwner = false,
    quantity = 0,
    onAddToCart,
    onIncrement,
    onDecrement,
    onEdit,
    onDelete,
}: MenuItemCardProps) => {
    const remainingStock = Math.max(0, (item.stock || 0) - quantity);

    return (
        <StyledMenuCard>
            <MenuImageWrapper>
                <StyledCardMedia
                    src={
                        item.image ||
                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
                    }
                    alt={item.name}
                />
            </MenuImageWrapper>

            <MenuCardBody>
                <Box>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <Typography variant="h5">{item.name}</Typography>

                        <RatingBadge>
                            <StarIcon />
                            <Typography variant="caption">
                                {item.rating?.toFixed(1) ?? '0.0'}
                            </Typography>
                        </RatingBadge>
                    </Stack>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2.5 }}
                    >
                        {item.description}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={3}
                        alignItems="center"
                        sx={{ mt: 2.5 }}
                    >
                        <Chip
                            label={item.dietType === 'VEG' ? 'Veg' : 'Non-Veg'}
                            size="small"
                            color={
                                item.dietType === 'VEG' ? 'success' : 'error'
                            }
                            variant="outlined"
                        />
                        <Chip
                            label={`Stock: ${remainingStock}`}
                            size="small"
                            color={remainingStock > 0 ? 'primary' : 'default'}
                            variant="filled"
                        />
                    </Stack>
                </Box>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={3}
                >
                    <Typography variant="h6" color="primary.main">
                        ₹{item.price.toFixed(2)}
                    </Typography>

                    {isOwner ? (
                        <Stack direction="row" spacing={1}>
                            <AddButton
                                variant="outlined"
                                size="small"
                                onClick={() => onEdit?.(item)}
                            >
                                <EditIcon fontSize="small" />
                            </AddButton>
                            <AddButton
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => onDelete?.(item.id)}
                            >
                                <DeleteIcon fontSize="small" />
                            </AddButton>
                        </Stack>
                    ) : quantity > 0 ? (
                        <QuantityCounter>
                            <CounterButton
                                size="small"
                                onClick={() => onDecrement?.(item)}
                            >
                                <RemoveIcon fontSize="small" />
                            </CounterButton>
                            <Typography fontWeight={600} variant="body2">
                                {quantity}
                            </Typography>
                            <CounterButton
                                size="small"
                                disabled={remainingStock <= 0}
                                onClick={() => onIncrement?.(item)}
                            >
                                <AddIcon fontSize="small" />
                            </CounterButton>
                        </QuantityCounter>
                    ) : (
                        <AddButton
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={remainingStock <= 0}
                            onClick={() => onAddToCart?.(item)}
                        >
                            {remainingStock > 0 ? 'Add' : 'Out of Stock'}
                        </AddButton>
                    )}
                </Stack>
            </MenuCardBody>
        </StyledMenuCard>
    );
};
