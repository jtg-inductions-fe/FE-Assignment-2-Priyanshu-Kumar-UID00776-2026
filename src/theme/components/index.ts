import type { Components } from '@mui/material/styles';

// Local Font files
import InterRegularTTF from '@assets/fonts/inter/inter-regular.ttf';
import InterRegularWOFF2 from '@assets/fonts/inter/inter-regular.woff2';

export const components: Components = {
    MuiCssBaseline: {
        styleOverrides: `
            @font-face {
                font-display: swap; 
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                src: url(${InterRegularWOFF2}) format('woff2'), 
                     url(${InterRegularTTF}) format('truetype');
            }

            html {
                font-size: 62.5%;
                font-family: 'Inter', sans-serif;
            }
        `,
    },
    MuiInputLabel: {
        styleOverrides: {
            root: {
                '&.MuiInputLabel-root': {
                    fontSize: '1.4rem !important',
                },
                '&.MuiInputLabel-shrink': {
                    fontSize: '1.2rem !important',
                },
            },
        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                fontSize: '1.4rem !important',
            },
            input: {
                fontSize: '1.4rem !important',
            },
        },
    },
    MuiFormHelperText: {
        styleOverrides: {
            root: {
                '&.MuiFormHelperText-root': {
                    fontSize: '1.2rem !important',
                },
            },
        },
    },
};
