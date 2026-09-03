import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Remove as RemoveIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';

import {
    AddButton,
    CounterButton,
    MenuCardBody,
    RatingBadge,
    StyledCardMedia,
    StyledMenuCard,
} from '@/components/MenuItemCard/MenuItemCard.styles';
import type { MenuItemCardProps } from '@/types/restaurant.types';

export const MenuItemCard = ({
    item,
    isOwner = false,
    quantity = 0,
    onAction,
}: MenuItemCardProps) => {
    const remainingStock = Math.max(0, (item.stock || 0) - quantity);
    const theme = useTheme();

    return (
        <StyledMenuCard>
            <Box width={theme.typography.pxToRem(130)}>
                <StyledCardMedia
                    fetchPriority="high"
                    src={item.image}
                    alt={item.name}
                />
            </Box>

            <MenuCardBody>
                <Box>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <Typography variant="h4" component="h3">
                            {item.name}
                        </Typography>

                        <RatingBadge>
                            <StarIcon />
                            <Typography
                                variant="body2"
                                color={theme.palette.secondary.dark}
                            >
                                {item.rating}
                            </Typography>
                        </RatingBadge>
                    </Stack>

                    <Typography variant="body2" color="text.secondary" mt={3}>
                        {item.description}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={3}
                        alignItems="center"
                        mt={3}
                    >
                        <Chip
                            label={item.dietType === 'veg' ? 'Veg' : 'Non-Veg'}
                            size="small"
                            color={
                                item.dietType === 'veg' ? 'success' : 'error'
                            }
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
                    <Typography variant="body1" color="primary.main">
                        ₹{item.price.toFixed(2)}
                    </Typography>

                    {isOwner ? (
                        <Stack direction="row" spacing={1}>
                            <AddButton
                                variant="outlined"
                                size="small"
                                onClick={() => onAction('edit', item)}
                            >
                                <EditIcon fontSize="small" />
                            </AddButton>
                            <AddButton
                                variant="outlined"
                                color="error"
                                onClick={() => onAction('delete', item)}
                            >
                                <DeleteIcon fontSize="small" />
                            </AddButton>
                        </Stack>
                    ) : quantity > 0 ? (
                        <Stack
                            alignItems="center"
                            direction="row"
                            gap={theme.typography.pxToRem(4)}
                        >
                            <CounterButton
                                size="small"
                                onClick={() => onAction('decrement', item)}
                            >
                                <RemoveIcon fontSize="small" />
                            </CounterButton>
                            <Typography variant="body2">{quantity}</Typography>
                            <CounterButton
                                size="small"
                                disabled={remainingStock <= 0}
                                onClick={() => onAction('increment', item)}
                            >
                                <AddIcon fontSize="small" />
                            </CounterButton>
                        </Stack>
                    ) : (
                        <AddButton
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={remainingStock <= 0}
                            onClick={() => onAction('addToCart', item)}
                        >
                            {item.stock === 0 ? 'Out of stock' : 'Add'}
                        </AddButton>
                    )}
                </Stack>
            </MenuCardBody>
        </StyledMenuCard>
    );
};
