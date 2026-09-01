import {
    AccountCircle,
    AddBox,
    Assignment,
    Home,
    ShoppingCart,
} from '@mui/icons-material';

import { User } from '@/types/auth.types';
import { NavItemConfig } from '@/types/bottomNavigation.types';

export const navItemsConfig = (
    user: User | null,
    isUserActive: boolean,
): NavItemConfig[] => [
    {
        label: 'Home',
        icon: <Home />,
        action: 'home',
        value: '/restaurant',
        isVisible: true,
    },
    {
        label: 'Cart',
        icon: <ShoppingCart />,
        action: 'cart',
        value: '/cart',
        isVisible: user?.role === 'USER' || !isUserActive,
    },
    {
        label: 'Restaurant',
        icon: <AddBox />,
        action: 'addRestaurant',
        value: '/add-restaurant',
        isVisible: user?.role === 'RESTAURANT OWNER',
    },
    {
        label: 'Orders',
        icon: <Assignment />,
        action: 'order',
        value: '/order',
        isVisible: true,
    },
    {
        label: 'Profile',
        icon: <AccountCircle />,
        action: 'profile',
        value: 'profile',
        isVisible: true,
    },
];
