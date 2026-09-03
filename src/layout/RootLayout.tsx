import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { LoadingFallback } from '@/components/LoadingFallback/LoadingFallback';
import { BottomNavigationBarContainer } from '@/container/BottomNavigationBar/BottomNavigationBarContainer';
import { NavbarContainer } from '@/container/Navbar/NavbarContainer';

export const RootLayout = () => (
    <Box
        component="main"
        maxWidth={{ xs: '100%', xl: '1900px' }}
        sx={{ margin: '0 auto', height: '100vh', overflow: 'hidden' }}
    >
        <Suspense fallback={<LoadingFallback />}>
            <NavbarContainer />
            <Outlet />
            <BottomNavigationBarContainer />
        </Suspense>
    </Box>
);
