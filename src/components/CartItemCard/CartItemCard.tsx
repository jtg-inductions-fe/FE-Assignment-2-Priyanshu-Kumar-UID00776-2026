import {
    Add as AddIcon,
    Close as CloseIcon,
    Remove as RemoveIcon,
} from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';

import {
    CartItemMedia,
    ItemBottomRow,
    ItemContentWrapper,
    ItemDescription,
    QuantityCounterPill,
    QuantityDisplay,
    StyledCartItemCard,
} from '@/components/CartItemCard/CardItemCard.styles';
import { CartItem } from '@/types/cart.types';

interface CartItemCardProps {
    item: CartItem;
    onIncrement: (menuItemId: string) => void;
    onDecrement: (menuItemId: string) => void;
    onRemove: (menuItemId: string) => void;
}

export const CartItemCard = ({
    item,
    onIncrement,
    onDecrement,
    onRemove,
}: CartItemCardProps) => {
    const { menuItem, quantity } = item;
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

            <ItemContentWrapper>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    <Typography variant="subtitle1" fontWeight={700}>
                        {menuItem.name}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={() => onRemove(menuItem.id)}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Stack>

                <ItemDescription variant="body2" color="text.secondary">
                    {menuItem.description}
                </ItemDescription>

                <ItemBottomRow>
                    <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        color="primary"
                    >
                        ₹{menuItem.price.toFixed(2)}
                    </Typography>

                    <QuantityCounterPill>
                        <IconButton
                            size="small"
                            onClick={() => onDecrement(menuItem.id)}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        <QuantityDisplay variant="body2">
                            {quantity}
                        </QuantityDisplay>
                        <IconButton
                            size="small"
                            disabled={remainingStock <= 0}
                            onClick={() => onIncrement(menuItem.id)}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </QuantityCounterPill>
                </ItemBottomRow>
            </ItemContentWrapper>
        </StyledCartItemCard>
    );
};
