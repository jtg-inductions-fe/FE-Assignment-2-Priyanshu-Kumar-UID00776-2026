import React from 'react';

import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Link,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SignUp = () => {
    const theme = useTheme();

    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                height: '100dvh',
            }}
        >
            <Box
                sx={{
                    height: { xs: '32%', sm: '100%' },
                    width: { xs: '100%', sm: '60%' },
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(/assets/images/burger.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    padding: theme.typography.pxToRem(20),
                    alignItems: { xs: 'flex-end', sm: 'flex-end' },
                    justifyContent: { xs: 'center', sm: 'flex-end' },
                    textAlign: 'center',
                }}
            >
                <Typography
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        color: theme.palette.secondary.light,
                        paddingBottom: {
                            xs: theme.typography.pxToRem(20),
                            sm: 0,
                        },
                        fontSize: {
                            xs: theme.typography.pxToRem(30),
                            sm: theme.typography.pxToRem(50),
                        },
                        fontWeight: 700,
                    }}
                >
                    Join the Foodie Revolution
                </Typography>
            </Box>

            <Box
                sx={{
                    position: { xs: 'absolute', sm: 'relative' },
                    bottom: 0,
                    bgcolor: theme.palette.secondary.main,
                    padding: theme.typography.pxToRem(20),
                    borderTopLeftRadius: theme.typography.pxToRem(20),
                    borderTopRightRadius: theme.typography.pxToRem(20),
                    height: { xs: '71%', sm: '100%' },
                    width: { xs: '100%', sm: '60%' },
                    display: 'flex',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-evenly',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ marginBottom: theme.typography.pxToRem(10) }}>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: theme.typography.pxToRem(40),
                                sm: theme.typography.pxToRem(50),
                                fontWeight: 700,
                            },
                        }}
                    >
                        Create an Account
                    </Typography>
                    <Typography
                        sx={{
                            color: theme.palette.primary.main,
                            fontSize: {
                                xs: theme.typography.pxToRem(20),
                                sm: theme.typography.pxToRem(20),
                                fontWeight: 400,
                            },
                        }}
                    >
                        Start your journey with us today
                    </Typography>
                </Box>
                <TextField
                    id="outlined-basic"
                    label="Full Name"
                    variant="outlined"
                    sx={{
                        width: { xs: '100%', sm: 'fit-content' },
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    sx={{
                        width: { xs: '100%', sm: 'fit-content' },
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label="Contact No."
                    variant="outlined"
                    sx={{
                        width: { xs: '100%', sm: 'fit-content' },
                    }}
                />
                <Box sx={{ p: 2, borderRadius: 2, width: '100%' }}>
                    <FormControl>
                        <FormLabel id="i-am-label">I am a</FormLabel>
                        <RadioGroup
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: theme.typography.pxToRem(20),
                            }}
                            aria-labelledby="i-am-label"
                            defaultValue="User"
                        >
                            <FormControlLabel
                                value="student"
                                control={<Radio />}
                                label="USER"
                            />
                            <FormControlLabel
                                value="professional"
                                control={<Radio />}
                                label="RESTAURANT OWNER"
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    sx={{
                        width: { xs: '100%', sm: 'fit-content' },
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label="Confirm Pasword"
                    variant="outlined"
                    sx={{
                        width: { xs: '100%', sm: 'fit-content' },
                    }}
                />
                <Paper
                    sx={{
                        width: '100%',
                        borderRadius: '60px',
                        overflow: 'hidden',
                    }}
                    elevation={8}
                >
                    <Button
                        sx={{
                            width: '100%',
                            fontSize: theme.typography.pxToRem(20),
                            padding: theme.typography.pxToRem(5),
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.secondary.light,
                        }}
                        variant="solid"
                    >
                        Sign up
                    </Button>
                </Paper>
                <Typography sx={{ width: '100%', textAlign: 'center' }}>
                    Already have an account?
                    <Link sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                        {' '}
                        Login
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default SignUp;
