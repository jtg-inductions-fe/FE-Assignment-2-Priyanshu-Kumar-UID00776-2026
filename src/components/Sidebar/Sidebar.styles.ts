import {
    Box,
    Checkbox,
    Drawer,
    FormControlLabel,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: theme.typography.pxToRem(340),
        maxHeight: '100%',
        backgroundColor: theme.palette.background.paper,
        overflowY: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            maxHeight: '80vh',
            borderTopLeftRadius: theme.typography.pxToRem(24),
            borderTopRightRadius: theme.typography.pxToRem(24),
        },
    },
}));

export const DrawerContentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: theme.typography.pxToRem(16),
    flexDirection: 'column',
    gap: theme.typography.pxToRem(12),
    [theme.breakpoints.down('sm')]: {
        padding: theme.typography.pxToRem(12),
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
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block',
    },
}));

export const CloseDrawerIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.secondary,
    '&:hover': {
        backgroundColor: theme.palette.action.selected,
    },
}));

export const FilterItemLabel = styled(FormControlLabel, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.typography.pxToRem(4),
    borderRadius: theme.typography.pxToRem(12),
    backgroundColor: isSelected ? theme.palette.action.selected : 'transparent',
    border: `1px solid ${
        isSelected ? theme.palette.primary.main : 'transparent'
    }`,
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '& .MuiTypography-root': {
        color: isSelected
            ? theme.palette.primary.main
            : theme.palette.text.primary,
    },
}));

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.text.secondary,
    '&.Mui-checked': {
        color: theme.palette.primary.main,
    },
}));
