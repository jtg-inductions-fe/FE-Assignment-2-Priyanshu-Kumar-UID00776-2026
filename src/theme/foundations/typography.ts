import type { Theme } from '@mui/material/styles';
import type {
    TypographyOptions,
    TypographyUtils,
} from '@mui/material/styles/createTypography';

import { HTML_FONT_SIZE } from '@/constant';

/* Custom px to rem function */
const typographyUtil: TypographyUtils = {
    /**
     * Converts a pixel value to rem units.
     * @param px - The pixel value to convert.
     * @returns The equivalent value in rem units as a string.
     */
    pxToRem: (px: number) => `${px / HTML_FONT_SIZE}` + 'rem',
};

// TODO: Add the necessary typographies here.
/**
 * Creates a typography block with various styles
 * @param theme - Theme object to access the breakpoints.
 * @returns The function returns a TypographyOptions object, which includes various typography settings,
 */
const typographyStyle = (theme: Theme): TypographyOptions => ({
    fontFamily: 'Inter',
    htmlFontSize: HTML_FONT_SIZE,

    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,

    h1: {
        fontSize: typographyUtil.pxToRem(30),
        fontWeight: 700,
        lineHeight: typographyUtil.pxToRem(45),
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(40),
            lineHeight: typographyUtil.pxToRem(62.5),
        },
    },
    h2: {
        fontSize: typographyUtil.pxToRem(24),
        fontWeight: 700,
        lineHeight: typographyUtil.pxToRem(20),
        [theme.breakpoints.up('md')]: {
            lineHeight: typographyUtil.pxToRem(28),
        },
    },
    h3: {
        fontSize: typographyUtil.pxToRem(20),
        fontWeight: 600,
        lineHeight: typographyUtil.pxToRem(30),
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(30),
            lineHeight: typographyUtil.pxToRem(40),
        },
    },
    h4: {
        fontSize: typographyUtil.pxToRem(18),
        fontWeight: 600,
        lineHeight: typographyUtil.pxToRem(28),
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(24),
            lineHeight: typographyUtil.pxToRem(32),
        },
    },
    h5: {
        fontSize: typographyUtil.pxToRem(16),
        fontWeight: 600,
        lineHeight: typographyUtil.pxToRem(24),
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(20),
            lineHeight: typographyUtil.pxToRem(28),
        },
    },
    h6: {
        fontSize: typographyUtil.pxToRem(14),
        fontWeight: 600,
        lineHeight: typographyUtil.pxToRem(20),
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(16),
            lineHeight: typographyUtil.pxToRem(24),
        },
    },
    body1: {
        fontSize: typographyUtil.pxToRem(18),
        fontWeight: 400,
        lineHeight: typographyUtil.pxToRem(24),
    },
    body2: {
        fontSize: typographyUtil.pxToRem(14),
        fontWeight: 400,
        lineHeight: typographyUtil.pxToRem(20),
    },
});

export const typography = { typographyStyle, typographyUtil };
