import { Box, Button, Card, CardContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';

export const RestaurantContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
}));

export const MainContentLayout = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
    width: '100%',
});

export const RestaurantHeaderSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: theme.typography.pxToRem(8),
    padding: theme.spacing(3, 3, 0, 3),
    maxWidth: theme.typography.pxToRem(1200),
    margin: '0 auto',
    width: '100%',
    flexShrink: 0,
    marginBottom: theme.typography.pxToRem(20),
}));

export const ScrollableContent = styled(Box)(({ theme }) => ({
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing(0, 3, 15, 3),
    maxWidth: theme.typography.pxToRem(1200),
    width: '100%',
    margin: '0 auto',
}));

export const ControlsWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.typography.pxToRem(20),
    margin: theme.spacing(2, 0),
    flexWrap: 'wrap',
    width: '100%',
}));

export const AddRestaurantButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1, 2),
    textTransform: 'none',
    borderRadius: '10px',
}));

export const FilterButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    textTransform: 'none',
    borderRadius: '20px',
}));

export const RestaurantGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: theme.typography.pxToRem(12),
    paddingBottom: theme.typography.pxToRem(8),
}));

export const StyledCard = styled(Card)({
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.30)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

export const HeaderButtonWrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.typography.pxToRem(20),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const FormStack = styled(Box)(({ theme }) => ({
    marginTop: theme.typography.pxToRem(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: theme.typography.pxToRem(20),
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.typography.pxToRem(8),
}));
