import {
    Box,
    Button,
    Card,
    CardContent,
    DialogActions,
    Stack,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const RestaurantContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
}));

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

export const ImageWrapper = styled(Box)({
    position: 'relative',
});

export const RatingBadge = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    top: theme.typography.pxToRem(12),
    right: theme.typography.pxToRem(12),
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(1, 2.4),
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.typography.pxToRem(4),
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.typography.pxToRem(20),
    flex: 1,
    display: 'flex',
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

export const OwnerActionStack = styled(Stack)(({ theme }) => ({
    marginTop: theme.typography.pxToRem(8),
}));

export const OwnerActionButton = styled(Button)({
    textTransform: 'none',
});

export const FormStack = styled('form')(({ theme }) => ({
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
