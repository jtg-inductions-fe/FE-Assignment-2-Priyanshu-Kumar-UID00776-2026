import {
    Box,
    Checkbox,
    FormControlLabel,
    Radio,
    Stack,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const SidebarContainer = styled(Box)(({ theme }) => ({
    width: theme.typography.pxToRem(280),
    flexShrink: 0,
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    height: '100%',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    overflowY: 'auto',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

export const FilterSection = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(1.5),
}));

export const FilterTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    color: theme.palette.text.primary,
}));

export const FilterItemLabel = styled(FormControlLabel)(({ theme }) => ({
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0.5, 0),
    '& .MuiTypography-root': {
        fontSize: theme.typography.pxToRem(14),
        fontWeight: 500,
    },
}));

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.text.secondary,
    padding: theme.spacing(0.5),
    '&.Mui-checked': {
        color: theme.palette.primary.main,
    },
}));

export const StyledRadio = styled(Radio)(({ theme }) => ({
    color: theme.palette.text.secondary,
    padding: theme.spacing(0.5),
    '&.Mui-checked': {
        color: theme.palette.primary.main,
    },
}));

export const RatingLabelStack = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(0.5),
}));
