import type React from 'react';

import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Remove as RemoveIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import { Box, CardMedia, Chip, Stack, Typography } from '@mui/material';

import {
    AddButton,
    CounterButton,
    MenuCardBody,
    MenuImageWrapper,
    QuantityCounter,
    RatingBadge,
    StyledMenuCard,
} from '@/components/MenuItemCard/MenuItemCard.styles';
import type { MenuItem } from '@/types/restaurant.types';

export interface MenuItemCardProps {
    item: MenuItem;
    isOwner?: boolean;
    quantity?: number;
    onAddToCart?: (item: MenuItem) => void;
    onIncrement?: (item: MenuItem) => void;
    onDecrement?: (item: MenuItem) => void;
    onEdit?: (item: MenuItem) => void;
    onDelete?: (id: string) => void;
}

export const MenuItemCard = ({
    item,
    isOwner = false,
    quantity = 0,
    onAddToCart,
    onIncrement,
    onDecrement,
    onEdit,
    onDelete,
}: MenuItemCardProps): React.JSX.Element => (
    <StyledMenuCard>
        <MenuImageWrapper>
            <CardMedia
                component="img"
                image={
                    item.image ||
                    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
                }
                alt={item.name}
                sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
        </MenuImageWrapper>

        <MenuCardBody>
            <Box>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    <Typography variant="h6" fontWeight={700} noWrap>
                        {item.name}
                    </Typography>
                    {item.rating && (
                        <RatingBadge>
                            <StarIcon sx={{ fontSize: 13 }} />
                            {item.rating}
                        </RatingBadge>
                    )}
                </Stack>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        my: 0.5,
                    }}
                >
                    {item.description}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ my: 0.5 }}>
                    <Chip
                        label={item.dietType === 'VEG' ? 'Veg' : 'Non-Veg'}
                        size="small"
                        color={item.dietType === 'VEG' ? 'success' : 'error'}
                        variant="outlined"
                    />
                </Stack>
            </Box>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mt={1}
            >
                <Typography variant="h6" fontWeight={700} color="primary.main">
                    ${item.price.toFixed(2)}
                </Typography>

                {isOwner ? (
                    <Stack direction="row" spacing={1}>
                        <AddButton
                            variant="outlined"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => onEdit?.(item)}
                        >
                            Edit
                        </AddButton>
                        <AddButton
                            variant="contained"
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => onDelete?.(item.id)}
                        >
                            Delete
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
                        onClick={() => onAddToCart?.(item)}
                    >
                        Add
                    </AddButton>
                )}
            </Stack>
        </MenuCardBody>
    </StyledMenuCard>
);
