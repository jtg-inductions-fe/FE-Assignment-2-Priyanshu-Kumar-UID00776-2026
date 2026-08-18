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
    backgroundColor: theme.palette.background.default,
}));

export const RestaurantHeaderSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3, 3, 0, 3),
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    flexShrink: 0,
}));

export const ScrollableContent = styled(Box)(({ theme }) => ({
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing(0, 3, 15, 3),
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.divider,
        borderRadius: '4px',
    },
}));

export const SubtitleTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

export const ControlsWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    margin: theme.spacing(2, 0),
    flexWrap: 'wrap',
}));

export const AddRestaurantButton = styled(Button)(({ theme }) => ({
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius * 2,
}));

export const RestaurantGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: theme.spacing(3),
    paddingBottom: theme.spacing(2),
}));

export const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 3,
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const ImageWrapper = styled(Box)({
    position: 'relative',
});

export const RatingBadge = styled(Box)({
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2.4,
    paddingBottom: 2.4,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontWeight: 700,
    fontSize: '0.85rem',
});

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(2),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const CuisineTypography = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(0.5),
}));

export const MetaInfoStack = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(1.5),
    color: theme.palette.text.secondary,
    fontSize: '0.80rem',
}));

export const MetaItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: '13px',
});

export const OwnerActionStack = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

export const OwnerActionButton = styled(Button)({
    textTransform: 'none',
});

export const FormStack = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(1),
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(2),
}));
