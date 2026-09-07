import { FoodVariant } from '@/components/FilterToggleButton/filterToggleButton.types';
import { DietType, RestaurantFormData } from '@/types/restaurant.types';

export const DIET_TYPE_LABELS: Record<DietType, string> = {
    veg: 'VEG',
    nonVeg: 'NON VEG',
    both: 'BOTH',
};

export const DELIVERY_TIME_SLOTS: string[] = [
    '15-20 min',
    '20-30 min',
    '30-45 min',
    '45-60 min',
    '60+ min',
];

export const FILTER_OPTIONS: { id: FoodVariant; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'veg', label: 'Veg' },
    { id: 'nonVeg', label: 'Non-Veg' },
];

export const EMPTY_RESTAURANT_FORM: RestaurantFormData = {
    name: '',
    location: '',
    locationLink: '',
    image: '',
    dietType: 'both',
    rating: 4.5,
    deliveryTime: '',
    openingTime: '',
    endTime: '',
};
