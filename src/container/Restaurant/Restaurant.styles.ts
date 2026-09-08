import {
    Box,
    Button,
    Card,
    CardContent,
    DialogActions,
    ToggleButtonGroup,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const RestaurantContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    height: '100dvh',
    maxHeight: '100dvh',
    backgroundColor: theme.palette.secondary.light,
}));

export const MainContentLayout = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    width: '100%',
});

export const RestaurantHeaderSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: theme.typography.pxToRem(4),
    paddingLeft: theme.typography.pxToRem(15),
    paddingRight: theme.typography.pxToRem(15),
    paddingTop: theme.typography.pxToRem(10),
    paddingBottom: theme.typography.pxToRem(10),
    margin: '0 auto',
    width: '100%',
}));

export const ScrollableContent = styled(Box)(({ theme }) => ({
    flex: 1,
    overflowY: 'auto',
    paddingTop: theme.typography.pxToRem(10),
    paddingRight: theme.typography.pxToRem(10),
    paddingLeft: theme.typography.pxToRem(10),
    paddingBottom: theme.typography.pxToRem(35),
    width: '100%',
    margin: '0 auto',
}));

export const ControlsWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.typography.pxToRem(20),
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: theme.palette.secondary.light,
}));

export const AddRestaurantButton = styled(Button)(({ theme }) => ({
    borderRadius: '10px',
    textTransform: 'none',
    paddingLeft: theme.typography.pxToRem(15),
    paddingRight: theme.typography.pxToRem(15),
    width: '100%',
    marginRight: 0,
    float: 'none',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
        float: 'right',
        marginRight: theme.typography.pxToRem(10),
    },
}));

export const FilterSlideModal = styled(Button)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    textTransform: 'none',
    borderRadius: '20px',
}));

export const RestaurantGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: theme.typography.pxToRem(12),
    paddingBottom: theme.typography.pxToRem(40),
}));

export const StyledCard = styled(Card)({
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.30)',
    display: 'flex',
    flexDirection: 'column',
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

export const SelectedToggleButton = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButton-root.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.light,
    },
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.typography.pxToRem(8),
}));
