import {
    Box,
    Button,
    Card,
    CardContent,
    DialogActions,
    Stack,
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
    gap: theme.spacing(2),
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
    gap: theme.spacing(5),
    margin: theme.spacing(2, 0),
    flexWrap: 'wrap',
}));

export const AddRestaurantButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1, 2),
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '10px',
}));

export const RestaurantGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: theme.spacing(3),
    paddingBottom: theme.spacing(2),
}));

export const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 3,
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.30)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const ImageWrapper = styled(Box)({
    position: 'relative',
});

export const RatingBadge = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.typography.pxToRem(12),
    right: theme.typography.pxToRem(12),
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(1, 2.4),
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.typography.pxToRem(4),
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(12),
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(5),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const MetaItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    color: theme.palette.secondary.dark,
    alignItems: 'center',
    gap: theme.typography.pxToRem(4),
    marginTop: theme.typography.pxToRem(5),
    fontSize: theme.typography.pxToRem(13),
}));

export const OwnerActionStack = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

export const OwnerActionButton = styled(Button)({
    textTransform: 'none',
});

export const FormStack = styled('form')(({ theme }) => ({
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: theme.spacing(5),
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(2),
}));
