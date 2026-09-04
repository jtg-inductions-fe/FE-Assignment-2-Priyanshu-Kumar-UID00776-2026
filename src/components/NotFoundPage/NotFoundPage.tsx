import { useNavigate } from 'react-router-dom';

import { Box, Typography, useTheme } from '@mui/material';

import {
    AccountButton,
    MessageSub,
} from '@/components/NotFoundPage/NotFoundPage.styles';
import { BottomNavigationBarContainer } from '@/container/BottomNavigationBar/BottomNavigationBarContainer';
import { NavbarContainer } from '@/container/Navbar/NavbarContainer';

export const NotFoundPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box height="100vh" overflow="hidden">
            <NavbarContainer />
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                height="100%"
                textAlign="center"
                padding={theme.typography.pxToRem(16)}
            >
                <Typography
                    color={theme.palette.primary.main}
                    marginBottom={theme.typography.pxToRem(4)}
                    variant="h1"
                >
                    404
                </Typography>
                <Typography
                    color={theme.palette.text.primary}
                    marginBottom={theme.typography.pxToRem(8)}
                    variant="h4"
                >
                    Page Not Found
                </Typography>
                <MessageSub variant="body2">
                    The page you are looking for is unavailable
                </MessageSub>
                <MessageSub variant="body2">
                    Create your account today and try out Khanna Penna
                </MessageSub>
                <AccountButton
                    variant="contained"
                    color="primary"
                    onClick={() => void navigate('/signup')}
                >
                    Create Account
                </AccountButton>
            </Box>
            <BottomNavigationBarContainer />
        </Box>
    );
};
