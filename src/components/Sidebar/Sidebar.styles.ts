import { Checkbox, Drawer, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '100%',
        maxHeight: '80vh',
        backgroundColor: theme.palette.background.paper,
        overflowY: 'auto',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        [theme.breakpoints.up('sm')]: {
            width: theme.typography.pxToRem(340),
            maxHeight: '100%',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        },
    },
}));

export const FilterItemLabel = styled(FormControlLabel)(({ theme }) => ({
    marginLeft: 0,
    marginRight: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.typography.pxToRem(4),
}));

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.text.secondary,
    '&.Mui-checked': {
        color: theme.palette.primary.main,
    },
}));
