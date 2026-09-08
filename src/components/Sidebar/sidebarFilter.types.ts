/**
 * Sidebar filter for containing the rating
 */
export type RestaurantSidebarProps = {
    open: boolean;
    onClose: () => void;
    selectedRatings: number[];
    selectedPrices?: number[];
    onRatingToggle: (rating: number) => void;
    onPriceToggle?: (price: number) => void;
    isPriceFilterVisible?: boolean;
};
