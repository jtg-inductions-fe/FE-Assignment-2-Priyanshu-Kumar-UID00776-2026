import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { BottomNavigationBarContainer } from '@/container/BottomNavigationBar/BottomNavigationBarContainer';
import { NavbarContainer } from '@/container/Navbar/NavbarContainer';

export const RootLayout = () => (
    <Box maxWidth={{ xs: '100%', xl: '1900px' }}>
        <NavbarContainer />
        <Outlet />
        <BottomNavigationBarContainer />
    </Box>
);
