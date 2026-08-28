// Sidebar filter for containing the rating
export type RestaurantSidebarProps = {
    open: boolean;
    onClose: () => void;
    selectedRatings: number[];
    onRatingToggle: (rating: number) => void;
};
