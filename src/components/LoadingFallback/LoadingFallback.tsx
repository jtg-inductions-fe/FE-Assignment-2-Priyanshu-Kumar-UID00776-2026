import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingFallback = () => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            minHeight: '400px',
            width: '100%',
            gap: 2,
        }}
    >
        <CircularProgress size={50} thickness={4.5} color="primary" />
        <Typography variant="body1" color="text.secondary" fontWeight={500}>
            Loading content...
        </Typography>
    </Box>
);
