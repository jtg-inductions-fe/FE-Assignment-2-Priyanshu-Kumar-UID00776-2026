import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import burgerImage from '../../assets/images/burger.avif';

export const PageContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100dvh',
    width: '100vw',
    maxWidth: '100%',
    margin: 0,
    padding: '0',
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
    padding: theme.typography.pxToRem(20),
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
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(28),
    },
}));

export const FormSection = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.typography.pxToRem(20),
    borderTopLeftRadius: theme.typography.pxToRem(20),
    borderTopRightRadius: theme.typography.pxToRem(20),
    height: '74%',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    boxSizing: 'border-box',
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
        position: 'relative',
        height: '100%',
        width: '50%',
        backgroundColor: 'transparent',
        padding: theme.spacing(4),
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
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
    boxSizing: 'border-box',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '540px',
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
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        textAlign: 'center',
        marginBottom: theme.spacing(1),
    },
}));

export const TitleText = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(33),
    fontWeight: 700,
    [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(38),
    },
}));

export const SubtitleText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 400,
    [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(18),
        marginTop: theme.spacing(0.5),
    },
}));

export const StyledRadioBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    width: '100%',
    boxSizing: 'border-box',
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0.5, 0),
    },
}));

export const SubmitPaperWrapper = styled(Paper)(({ theme }) => ({
    width: '100%',
    borderRadius: '60px',
    overflow: 'hidden',
    elevation: 8,
    [theme.breakpoints.up('sm')]: {
        borderRadius: '8px',
        elevation: 0,
        boxShadow: 'none',
    },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
    width: '100%',
    fontSize: theme.typography.pxToRem(20),
    padding: theme.typography.pxToRem(5),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    textTransform: 'none',
    [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(16),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        borderRadius: '30px',
        fontWeight: 600,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
}));

export const FooterText = styled(Typography)(({ theme }) => ({
    width: '100%',
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(16),
}));
