import { useState } from 'react';

import {
    Box,
    Chip,
    Collapse,
    Divider,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import {
    OrderActionArea,
    OrderStyledCard,
} from '@/components/OrderCard/OrderCard.styles';
import { ORDER_STATUS_OPTIONS } from '@/constant/orderStateConstants';
import { OrderCardProps, OrderStatus } from '@/types/order.types';

export const OrderCard = ({
    order,
    isOwner = false,
    onStatusChange,
}: OrderCardProps) => {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();

    const formattedTime = new Date(order.createdAt).toLocaleTimeString();

    const handleSelectChange = (e: SelectChangeEvent) => {
        if (onStatusChange) {
            onStatusChange(order.id, e.target.value as OrderStatus);
        }
    };

    return (
        <OrderStyledCard>
            <OrderActionArea onClick={() => setExpanded((prev) => !prev)}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    {isOwner ? (
                        <Chip
                            label={`#${order.id.slice(0, 8).toUpperCase()}`}
                            size="small"
                        />
                    ) : (
                        <Typography variant="h4">
                            {order.restaurantName}
                        </Typography>
                    )}

                    <Typography variant="body1" color="primary">
                        ₹{order.totalAmount.toFixed(2)}
                    </Typography>
                </Stack>

                {isOwner && (
                    <Typography variant="h6">{order.customerName}</Typography>
                )}

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    {isOwner ? `${order.items.length} items` : ''}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {formattedTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`#${order.id}`}
                </Typography>

                {!isOwner && (
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 1.5 }}
                    >
                        <Chip
                            label={order.status}
                            size="small"
                            variant="outlined"
                        />
                    </Stack>
                )}
            </OrderActionArea>

            <Collapse in={expanded} timeout="auto">
                <Divider />
                <Box padding={theme.typography.pxToRem(20)}>
                    <Typography
                        variant="overline"
                        color="text.secondary"
                        display="block"
                    >
                        Order Summary
                    </Typography>

                    <Stack spacing={1}>
                        {order.items.map((item, idx) => (
                            <Stack
                                key={idx}
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography variant="body2">
                                    {item.quantity} x {item.menuItem.name}
                                </Typography>
                                <Typography variant="body2">
                                    ₹
                                    {(
                                        item.menuItem.price * item.quantity
                                    ).toFixed(2)}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>

                    {isOwner && (
                        <Box
                            marginTop={theme.typography.pxToRem(20)}
                            paddingTop={theme.typography.pxToRem(12)}
                            borderTop={`1px solid ${theme.palette.divider}`}
                        >
                            <Typography
                                variant="overline"
                                color="text.secondary"
                                display="block"
                            >
                                Customer Contact
                            </Typography>
                            <Typography variant="body2">
                                Phone: {order.customerContact}
                            </Typography>
                            <Typography variant="body2">
                                Email: {order.customerEmail}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Collapse>

            {isOwner && (
                <Box padding={theme.typography.pxToRem(20)}>
                    <FormControl fullWidth size="small">
                        <Select
                            value={order.status}
                            onChange={handleSelectChange}
                        >
                            {ORDER_STATUS_OPTIONS.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            )}
        </OrderStyledCard>
    );
};
