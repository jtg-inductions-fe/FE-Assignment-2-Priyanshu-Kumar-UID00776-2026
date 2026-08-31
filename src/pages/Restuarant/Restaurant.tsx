import { Typography } from '@mui/material';

import {
    RestaurantContainer,
    RestaurantContent,
} from '@/pages/Restuarant/Restaurant.styles';

export const Restaurant = () => (
    <RestaurantContainer>
        <RestaurantContent>
            <Typography variant="h1">Restaurants</Typography>

            <Typography variant="body2" color="text.secondary">
                Discover restaurants and explore their menus.
            </Typography>
        </RestaurantContent>
    </RestaurantContainer>
);
