import { Button, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 2,
    overflow: 'hidden',
}));

export const AllFilterButton = styled(Button)({
    textTransform: 'none',
    fontWeight: 600,
    paddingLeft: '20px',
    paddingRight: '20px',
});

export const VegFilterButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ isActive }) => ({
    textTransform: 'none',
    fontWeight: 600,
    color: isActive ? '#fff' : 'green',
    backgroundColor: isActive ? 'green' : 'transparent',
    borderColor: 'green',
    '&:hover': {
        backgroundColor: isActive ? 'darkgreen' : '#e8f5e9',
        borderColor: 'green',
    },
}));

export const NonVegFilterButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ isActive }) => ({
    textTransform: 'none',
    fontWeight: 600,
    color: isActive ? '#fff' : 'red',
    backgroundColor: isActive ? 'red' : 'transparent',
    borderColor: 'red',
    '&:hover': {
        backgroundColor: isActive ? 'darkred' : '#ffebee',
        borderColor: 'red',
    },
}));
