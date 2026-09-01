// Allowed food categories for filtering and tags
export type DietType = 'veg' | 'nonVeg' | 'both';

// Individual dish details in a restaurant's menu
export type MenuItem = {
    id: string;
    name: string;
    description: string;
    rating: number;
    price: number;
    stock: number;
    dietType: DietType;
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

// Local slice state holding a selected restaurant's menu
export type MenuState = {
    menu: MenuItem[];
};

// Modal for the menu form
export type MenuFormData = {
    name: string;
    description: string;
    price: number;
    stock: number;
    rating: number;
    dietType: DietType;
};

// Component props passed into the MenuItemCard
export type MenuItemCardProps = {
    item: MenuItem;
    isOwner?: boolean;
    quantity?: number;
    onAction: (actionType: string, item: MenuItem) => void;
    onAddToCart?: (item: MenuItem) => void;
    onIncrement?: (item: MenuItem) => void;
    onDecrement?: (item: MenuItem) => void;
    onEdit?: (item: MenuItem) => void;
    onDelete?: (id: string) => void;
};
