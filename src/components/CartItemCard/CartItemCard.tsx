import {
    Add as AddIcon,
    Close as CloseIcon,
    Remove as RemoveIcon,
} from '@mui/icons-material';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';

import {
    CartItemMedia,
    StyledCartItemCard,
} from '@/components/CartItemCard/CardItemCard.styles';
import { CounterButton } from '@/components/MenuItemCard/MenuItemCard.styles';
import { CartItemCardProps } from '@/types/cart.types';

export const CartItemCard = ({ item, onCartAction }: CartItemCardProps) => {
    const { menuItem, quantity } = item;
    const theme = useTheme();
    const remainingStock = (menuItem.stock ?? 0) - quantity;

    return (
        <StyledCartItemCard>
            <CartItemMedia
                src={
                    menuItem.image ||
                    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80'
                }
                alt={menuItem.name}
            />

            <Box width="100%">
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    <Typography variant="h5">{menuItem.name}</Typography>
                    <IconButton
                        size="small"
                        onClick={() => onCartAction('remove', menuItem.id)}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Stack>

                <Typography variant="body2" color="text.secondary">
                    {menuItem.description}
                </Typography>

                <Stack
                    justifyContent="space-between"
                    alignContent="center"
                    direction="row"
                    marginTop={theme.typography.pxToRem(10)}
                >
                    <Typography variant="body1" color="primary">
                        ₹{menuItem.price.toFixed(2)}
                    </Typography>
                    <Stack
                        alignItems="center"
                        direction="row"
                        gap={theme.typography.pxToRem(4)}
                    >
                        <CounterButton
                            size="small"
                            onClick={() =>
                                onCartAction('decrement', menuItem.id)
                            }
                        >
                            <RemoveIcon fontSize="small" />
                        </CounterButton>
                        <Typography variant="body2">{quantity}</Typography>
                        <CounterButton
                            size="small"
                            disabled={remainingStock <= 0}
                            onClick={() =>
                                onCartAction('increment', menuItem.id)
                            }
                        >
                            <AddIcon fontSize="small" />
                        </CounterButton>
                    </Stack>
                </Stack>
            </Box>
        </StyledCartItemCard>
    );
};
