// Allowed food categories for filtering and tags
export type DietType = 'VEG' | 'NON_VEG' | 'BOTH';

// Individual dish details in a restaurant's menu
export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: number;
    dietType: 'VEG' | 'NON_VEG';
    image?: string;
};

// Complete restaurant entity stored in the database and state
export type RestaurantItemTypes = {
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
};

// Editable fields submitted in the Add/Edit restaurant form
export type RestaurantFormData = {
    name: string;
    location: string;
    dietType: DietType;
    rating: number;
    deliveryTime: string;
    openingTime: string;
};

// Redux store slice state holding the full restaurant list
export type RestaurantState = {
    restaurants: RestaurantItemTypes[];
};
