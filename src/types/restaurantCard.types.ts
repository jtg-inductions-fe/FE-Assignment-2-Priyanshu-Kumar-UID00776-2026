import type { RestaurantItemTypes } from '@/types/restaurant.types';

export type RestaurantCardProps = {
    restaurant: RestaurantItemTypes;
    isOwner?: boolean;
    onEdit?: (restaurant: RestaurantItemTypes) => void;
    onDelete?: (id: string) => void;
};
