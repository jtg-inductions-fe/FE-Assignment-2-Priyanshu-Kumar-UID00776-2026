import type { RestaurantItemTypes } from '@/types/restaurant.types';

export type RestaurantCardProps = {
    restaurant: RestaurantItemTypes;
    isOwner?: boolean;
    onCardClick?: (id: string) => void;
    onEdit?: (restaurant: RestaurantItemTypes) => void;
    onDelete?: (id: string) => void;
};
