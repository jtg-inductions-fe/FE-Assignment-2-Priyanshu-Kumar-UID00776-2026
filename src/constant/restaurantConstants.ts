import { DietType } from '@/types/restaurant.types';

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
