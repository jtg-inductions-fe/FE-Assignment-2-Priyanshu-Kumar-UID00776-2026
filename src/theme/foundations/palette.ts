import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '@/constant';

/* Custom Palette */
export const palette: PaletteOptions = {
    primary: {
        main: COLORS.PRIMARY.MAIN,
        light: COLORS.PRIMARY.LIGHT,
    },
    secondary: {
        main: COLORS.SECONDARY.MAIN,
        light: COLORS.SECONDARY.LIGHT,
        dark: COLORS.SECONDARY.DARK,
    },
};
