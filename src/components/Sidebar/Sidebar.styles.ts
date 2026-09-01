import { Box, Checkbox, Drawer, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '100%',
        maxHeight: '80vh',
        backgroundColor: theme.palette.background.paper,
        overflowY: 'auto',
        borderTopLeftRadius: theme.typography.pxToRem(24),
        borderTopRightRadius: theme.typography.pxToRem(24),
        [theme.breakpoints.up('sm')]: {
            width: theme.typography.pxToRem(340),
            maxHeight: '100%',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        },
    },
}));

export const DrawerContentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: theme.typography.pxToRem(12),
    flexDirection: 'column',
    gap: theme.typography.pxToRem(12),
    [theme.breakpoints.up('sm')]: {
        padding: theme.typography.pxToRem(16),
    },
}));

export const DrawerHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: theme.typography.pxToRem(12),
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const MobileDragHandle = styled(Box)(({ theme }) => ({
    width: theme.typography.pxToRem(36),
    height: theme.typography.pxToRem(4),
    backgroundColor: theme.palette.divider,
    borderRadius: theme.typography.pxToRem(20),
    margin: '0 auto',
    marginBottom: theme.typography.pxToRem(4),
    display: 'block',
    [theme.breakpoints.up('sm')]: {
        display: 'none',
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
