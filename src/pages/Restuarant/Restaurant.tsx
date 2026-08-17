import { Typography } from '@mui/material';

import { RestaurantContainer, RestaurantContent } from './Restaurant.styles';
import BottomNavgation from '../../components/BottomNavigation/BottomNavigation';
import Navbar from '../../components/Navbar/Navbar';

const Restaurant = () => (
    <RestaurantContainer>
        <Navbar />

        <RestaurantContent>
            <Typography variant="h4" fontWeight={700}>
                Restaurants
            </Typography>

            <Typography variant="body1" color="text.secondary">
                Discover restaurants and explore their menus.
            </Typography>
        </RestaurantContent>

        <BottomNavgation />
    </RestaurantContainer>
);

export default Restaurant;
