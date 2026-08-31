import { useState } from 'react';

import {
    Chip,
    Collapse,
    Divider,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material';

import {
    CustomerContactSection,
    ExpandedDetailsBox,
    OrderActionArea,
    OrderStyledCard,
    StatusSelectContainer,
} from '@/components/OrderCard/OrderCard.styles';
import { OrderCardProps, OrderStatus } from '@/types/order.types';

const ORDER_STATUS_OPTIONS: OrderStatus[] = [
    'Pending',
    'Accepted',
    'Preparing',
    'Out for Delivery',
    'Delivered',
];

export const OrderCard = ({
    order,
    isOwner = false,
    onStatusChange,
}: OrderCardProps) => {
    const [expanded, setExpanded] = useState(false);

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
                        ${order.totalAmount.toFixed(2)}
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
                <ExpandedDetailsBox>
                    <Typography
                        variant="overline"
                        color="text.secondary"
                        display="block"
                    >
                        Order Summary
                    </Typography>

                    <Stack spacing={0.75}>
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
                                    $
                                    {(
                                        item.menuItem.price * item.quantity
                                    ).toFixed(2)}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>

                    {isOwner && (
                        <CustomerContactSection>
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
                        </CustomerContactSection>
                    )}
                </ExpandedDetailsBox>
            </Collapse>

            {isOwner && (
                <StatusSelectContainer>
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
                </StatusSelectContainer>
            )}
        </OrderStyledCard>
    );
};
