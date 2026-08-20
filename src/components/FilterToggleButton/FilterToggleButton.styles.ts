import { Button, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButtonGroup = styled(ButtonGroup)({
    borderRadius: '10px',
    overflow: 'hidden',
});

export const AllFilterButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    padding: theme.spacing(2, 0),
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
}));

export const VegFilterButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ isActive, theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    color: isActive
        ? theme.palette.secondary.light
        : theme.palette.tertiary.main,
    backgroundColor: isActive ? theme.palette.tertiary.light : 'transparent',
    borderColor: theme.palette.tertiary.main,
    '&:hover': {
        backgroundColor: isActive
            ? theme.palette.tertiary.light
            : theme.palette.secondary.main,
        borderColor: theme.palette.tertiary.main,
    },
}));

export const NonVegFilterButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ isActive, theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    color: isActive
        ? theme.palette.secondary.light
        : theme.palette.primary.light,
    backgroundColor: isActive ? theme.palette.primary.light : 'transparent',
    borderColor: theme.palette.primary.light,
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    '&:hover': {
        backgroundColor: isActive
            ? theme.palette.primary.light
            : theme.palette.secondary.main,
        borderColor: theme.palette.primary.light,
    },
}));
