import {
    Add as AddIcon,
    Close as CloseIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Remove as RemoveIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import {
    Box,
    Chip,
    IconButton,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import {
    AddButton,
    CounterButton,
    MenuCardBody,
    RatingBadge,
    StyledCardMedia,
    StyledMenuCard,
} from '@/components/ItemCard/ItemCard.styles';
import { MenuItemCardProps } from '@/types/restaurant.types';

export const MenuItemCard = ({
    item,
    variant = 'menu',
    isOwner = false,
    quantity = 0,
    onAction,
}: MenuItemCardProps) => {
    const remainingStock = Math.max(0, (item.stock || 0) - quantity);
    const theme = useTheme();
    const isCart = variant === 'cart';

    return (
        <StyledMenuCard>
            <Box width={theme.typography.pxToRem(130)}>
                <StyledCardMedia
                    src={
                        item.image ||
                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80'
                    }
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
                        <Typography variant="h5">{item.name}</Typography>

                        {isCart ? (
                            <IconButton
                                size="small"
                                onClick={() => onAction('remove', item)}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        ) : (
                            item.rating !== undefined && (
                                <RatingBadge>
                                    <StarIcon />
                                    <Typography
                                        variant="body2"
                                        color={theme.palette.secondary.dark}
                                    >
                                        {item.rating}
                                    </Typography>
                                </RatingBadge>
                            )
                        )}
                    </Stack>

                    <Typography variant="body2" color="text.secondary" mt={2}>
                        {item.description}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={3}
                        alignItems="center"
                        mt={2}
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
                    <Typography variant="h6" color="primary.main">
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
