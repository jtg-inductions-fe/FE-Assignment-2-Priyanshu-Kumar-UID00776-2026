import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

export const LoadingFallback = () => {
    const theme = useTheme();

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
            minHeight={theme.typography.pxToRem(400)}
            width="100%"
            gap={2}
        >
            <CircularProgress size={50} thickness={5} color="primary" />
            <Typography variant="body1" color="text.secondary">
                Loading content...
            </Typography>
        </Box>
    );
};
