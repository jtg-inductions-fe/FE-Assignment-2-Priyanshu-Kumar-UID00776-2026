import { Button, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

import { StyledFilterButtonProps } from '@/types/filterToggleButton.types';

export const StyledButtonGroup = styled(ButtonGroup)({
    borderRadius: '20px',
    overflow: 'hidden',
});

export const StyledFilterButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'variantType',
})<StyledFilterButtonProps>(({ isActive, variantType, theme }) => {
    const palette =
        variantType === 'veg' ? theme.palette.tertiary : theme.palette.primary;

    const activeBg =
        variantType === 'all' ? theme.palette.primary.main : palette.light;
    const inactiveText =
        variantType === 'all' ? theme.palette.text.primary : palette.main;

    return {
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        padding: theme.typography.pxToRem(10),
        color: isActive ? theme.palette.secondary.light : inactiveText,
        backgroundColor: isActive ? activeBg : 'transparent',
        borderColor: variantType === 'all' ? 'none' : palette.main,
        borderTopLeftRadius: variantType === 'all' ? '20px' : '0px',
        borderBottomLeftRadius: variantType === 'all' ? '20px' : '0px',
        borderTopRightRadius: variantType === 'nonVeg' ? '20px' : '0px',
        borderBottomRightRadius: variantType === 'nonVeg' ? '20px' : '0px',

        '&:hover': {
            backgroundColor: isActive ? activeBg : theme.palette.secondary.main,
            borderColor: variantType === 'all' ? undefined : palette.main,
        },
    };
});
