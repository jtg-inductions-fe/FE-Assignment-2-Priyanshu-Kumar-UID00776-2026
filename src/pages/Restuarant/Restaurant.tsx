import { Typography } from '@mui/material';

import { BottomNavigationBarContainer } from '@/container/BottomNavigationBar/BottomNavigationBarContainer';
import { NavbarContainer } from '@/container/Navbar/NavbarContainer';
import {
    RestaurantContainer,
    RestaurantContent,
} from '@/pages/Restuarant/Restaurant.styles';

export const Restaurant = () => (
    <RestaurantContainer>
        <NavbarContainer />

        <RestaurantContent>
            <Typography variant="h1">Restaurants</Typography>

            <Typography variant="body2" color="text.secondary">
                Discover restaurants and explore their menus.
            </Typography>
        </RestaurantContent>

        <BottomNavigationBarContainer />
    </RestaurantContainer>
);
