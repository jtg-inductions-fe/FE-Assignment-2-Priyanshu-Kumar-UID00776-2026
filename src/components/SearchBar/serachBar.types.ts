/**
 * Search bar props
 */
export type RestaurantSearchProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};
