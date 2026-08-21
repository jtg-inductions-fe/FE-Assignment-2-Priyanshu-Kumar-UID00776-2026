import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import burgerImage from '@/assets/images/burger.avif';

export const PageContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100dvh',
    maxWidth: '100%',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
}));

export const HeroSection = styled(Box)(({ theme }) => ({
    height: '32%',
    width: '100%',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${burgerImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    padding: theme.spacing(5),
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
        height: '100%',
        width: '60%',
        padding: theme.spacing(6),
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
}));

export const BrandTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {},
}));

export const FormSection = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(5),
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    height: '74%',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
        position: 'relative',
        height: '100%',
        width: '50%',
        backgroundColor: 'transparent',
        padding: theme.spacing(4),
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export const FormCard = styled('form')(({ theme }) => ({
    width: '100%',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
        maxWidth: theme.typography.pxToRem(540),
        height: 'auto',
        backgroundColor: theme.palette.secondary.light,
        padding: theme.spacing(10),
        borderRadius: '16px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.06)',
        gap: theme.spacing(5),
        justifyContent: 'flex-start',
    },
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
    marginBottom: theme.typography.pxToRem(10),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
        textAlign: 'center',
        marginBottom: theme.spacing(1),
    },
}));

export const TitleText = styled(Typography)(({ theme }) => ({
    width: '100%',
    textAlign: 'left',
    [theme.breakpoints.up('sm')]: {
        textAlign: 'center',
    },
}));

export const SubtitleText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    width: '100%',
    textAlign: 'left',
    [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(0.5),
        textAlign: 'center',
    },
}));

export const StyledRadioBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: '4px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0.5, 0),
    },
}));

export const SubmitPaperWrapper = styled(Paper)({
    width: '100%',
    borderRadius: '60px',
    overflow: 'hidden',
});

export const SubmitButton = styled(Button)(({ theme }) => ({
    width: '100%',
    fontSize: theme.typography.pxToRem(20),
    padding: theme.typography.pxToRem(5),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(16),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        borderRadius: '30px',
        fontWeight: theme.typography.fontWeightMedium,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
}));

export const FooterText = styled(Typography)({
    width: '100%',
    textAlign: 'center',
});
