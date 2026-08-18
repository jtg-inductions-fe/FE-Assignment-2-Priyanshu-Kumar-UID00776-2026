export default interface RestaurantItem {
    id: string;
    name: string;
    image: string;
    rating: number;
    priceRange: string;
    cuisines: string[];
    location: string;
    deliveryTime: string;
    dietType: 'VEG' | 'NON_VEG' | 'BOTH';
    ownerId: string;
}
