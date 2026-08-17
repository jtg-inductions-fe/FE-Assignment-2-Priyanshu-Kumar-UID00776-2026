import { Link, useLocation } from 'react-router-dom';

import {
    AccountCircle,
    Assignment,
    Home,
    ShoppingCart,
} from '@mui/icons-material';
import { BottomNavigationAction } from '@mui/material';

import {
    BottomNavigationContainer,
    NavigationBox,
} from './BottomNavigation.styles';

const SimpleBottomNavigation = () => {
    const location = useLocation();

    return (
        <BottomNavigationContainer sx={{ width: 500 }}>
            <NavigationBox showLabels value={location.pathname}>
                <BottomNavigationAction
                    label="Home"
                    icon={<Home />}
                    component={Link}
                    to="/restaurant"
                    value="/restaurant"
                />
                <BottomNavigationAction
                    label="Cart"
                    icon={<ShoppingCart />}
                    component={Link}
                    to="/cart"
                    value="/cart"
                />
                <BottomNavigationAction
                    label="Orders"
                    icon={<Assignment />}
                    component={Link}
                    to="/orders"
                    value="/orders"
                />
                <BottomNavigationAction
                    label="Profile"
                    icon={<AccountCircle />}
                    component={Link}
                    to="/profile"
                    value="/profile"
                />
            </NavigationBox>
        </BottomNavigationContainer>
    );
};

export default SimpleBottomNavigation;
