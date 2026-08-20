export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    dietType: 'VEG' | 'NON_VEG';
    image?: string;
}

export type DietType = 'VEG' | 'NON_VEG' | 'BOTH';

export interface RestaurantItemTypes {
    id: string;
    name: string;
    location: string;
    dietType: DietType;
    rating: number;
    deliveryTime: string;
    openingTime: string;
    image: string;
    ownerId: string;
    menus: MenuItem[];
}

export interface RestaurantFormData {
    name: string;
    location: string;
    dietType: DietType;
    rating: number;
    deliveryTime: string;
    openingTime: string;
}
