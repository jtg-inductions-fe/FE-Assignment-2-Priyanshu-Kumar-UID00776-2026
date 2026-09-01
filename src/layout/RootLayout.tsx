import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { BottomNavigationBarContainer } from '@/container/BottomNavigationBar/BottomNavigationBarContainer';
import { NavbarContainer } from '@/container/Navbar/NavbarContainer';

export const RootLayout = () => (
    <Box
        maxWidth={{ xs: '100%', xl: '1900px' }}
        sx={{ margin: '0 auto', height: '100vh', overflow: 'hidden' }}
    >
        <NavbarContainer />
        <Outlet />
        <BottomNavigationBarContainer />
    </Box>
);
