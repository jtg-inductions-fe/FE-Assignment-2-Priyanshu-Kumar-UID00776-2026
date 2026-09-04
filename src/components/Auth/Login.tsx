import React, { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import {
    FormCard,
    FormSection,
    HeaderBox,
    HeroSection,
    PageContainer,
    SubmitButton,
    SubmitPaperWrapper,
} from '@/components/Auth/Auth.styles';
import { EMAIL_VALIDATION_REGEX } from '@/constant';
import { setUser } from '@/features/authSlice';
import { setUserCart } from '@/features/cartSlice';
import { showNotification } from '@/features/notificationSlice';
import { login } from '@/services/auth.service';
import { useAppDispatch } from '@/store/store';
import { LoginFormData } from '@/types/auth.types';

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const [showPassword, setShowPassword] = useState(false);

    // Toggle between showing and hiding the password text
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    // Keep focus inside the password input when clicking the eye icon
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    // Set up form handling, empty initial inputs, and validation
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onTouched',
    });

    // Authenticate the user, update app state, show an alert, and redirect to the dashboard
    const handleLogin = async (data: LoginFormData) => {
        try {
            // Attempt login with the submitted credentials
            const user = await login({
                email: data.email,
                password: data.password,
            });

            // Save the logged in user into the global Redux store
            dispatch(setUser(user));

            // Sets the cart for the user if the role is of USER
            if (user.role === 'USER') {
                dispatch(setUserCart(user.cart || []));
            }

            // Show a success banner to the user
            dispatch(
                showNotification({
                    message: 'Successfully logged in!',
                    severity: 'success',
                }),
            );

            // Redirect the user to the restaurant page
            void navigate('/restaurant');
        } catch (error) {
            // Display the error message in a red popup if login fails
            dispatch(
                showNotification({
                    message:
                        error instanceof Error
                            ? error.message
                            : 'Unable to login',
                    severity: 'error',
                }),
            );
        }
    };

    return (
        <PageContainer disableGutters maxWidth={false}>
            <HeroSection />

            <FormSection>
                <FormCard
                    noValidate
                    onSubmit={(event) => {
                        void handleSubmit(handleLogin)(event);
                    }}
                >
                    <HeaderBox>
                        <Typography
                            variant="h2"
                            color={theme.palette.primary.main}
                            textAlign="center"
                        >
                            Khana Peena
                        </Typography>

                        <Typography variant="h1" textAlign="center">
                            Sign in to your account
                        </Typography>

                        <Typography
                            variant="body1"
                            color={theme.palette.primary.main}
                            textAlign="center"
                        >
                            Enter your details to proceed
                        </Typography>
                    </HeaderBox>

                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: EMAIL_VALIDATION_REGEX,
                                message: 'Invalid email address',
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: 'Password is required',
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        )}
                    />

                    <SubmitPaperWrapper>
                        <SubmitButton
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            Login
                        </SubmitButton>
                    </SubmitPaperWrapper>

                    <Typography textAlign="center" variant="body1">
                        Don&apos;t have an account?&nbsp;
                        <Link
                            component={RouterLink}
                            to="/signup"
                            underline="none"
                        >
                            Sign Up
                        </Link>
                    </Typography>
                </FormCard>
            </FormSection>
        </PageContainer>
    );
};
