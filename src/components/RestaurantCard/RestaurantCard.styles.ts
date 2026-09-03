import { Button, CardActionArea, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(CardActionArea)({
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-4px)',
    },
});

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.typography.pxToRem(20),
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const MetaItem = styled(Typography)(({ theme }) => ({
    display: 'flex',
    color: theme.palette.secondary.dark,
    alignItems: 'center',
    gap: theme.typography.pxToRem(4),
    marginTop: theme.typography.pxToRem(5),
}));

export const OwnerActionButton = styled(Button)({
    textTransform: 'none',
});
