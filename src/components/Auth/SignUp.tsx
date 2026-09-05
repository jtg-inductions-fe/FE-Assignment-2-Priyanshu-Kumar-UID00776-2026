import React, { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    IconButton,
    InputAdornment,
    Link,
    Radio,
    RadioGroup,
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
    StyledRadioBox,
    SubmitButton,
    SubmitPaperWrapper,
} from '@/components/Auth/Auth.styles';
import { SignUpFormData } from '@/components/Auth/auth.types';
import {
    EMAIL_VALIDATION_REGEX,
    NUMBER_VALIDATION_REGEX,
    PASSWORD_VALIDATION_REGEX,
} from '@/constant';
import { setUser } from '@/features/authSlice';
import { showNotification } from '@/features/notificationSlice';
import { signup } from '@/services/auth.service';
import { useAppDispatch } from '@/store/store';

export const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Set up form state and validation triggers with empty initial fields
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            contactNo: '',
            role: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onTouched',
    });

    // Track the current password value in real time to validate password matching
    const passwordValue = watch('password');

    // Toggle password visibility on and off
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    // Toggle confirm password visibility on and off
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    // Keep focus inside the input field when clicking the eye icon
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    // Register the new user, update global state, show a success banner, and redirect
    const setUserData = async (data: SignUpFormData) => {
        // Prevent form submission if a user role hasn't been selected
        if (!data.role) {
            return;
        }
        try {
            // Create the user account with the submitted details
            const user = await signup({
                fullName: data.fullName,
                email: data.email,
                contactNo: data.contactNo,
                role: data.role,
                password: data.password,
            });

            // Store the newly created user in redux
            dispatch(setUser(user));

            // Show a success banner
            dispatch(
                showNotification({
                    message: 'Successfully signed up!',
                    severity: 'success',
                }),
            );

            // Navigate to the restaurant dashboard
            void navigate('/restaurant');
        } catch (error) {
            // Display an error alert if signup fails
            dispatch(
                showNotification({
                    message:
                        error instanceof Error
                            ? error.message
                            : 'Unable to sign up',
                    severity: 'error',
                }),
            );
        }
    };

    return (
        <PageContainer disableGutters maxWidth={false}>
            <HeroSection />

            <FormSection height={{ xs: '90%' }}>
                <FormCard
                    noValidate
                    onSubmit={(e) => {
                        void handleSubmit(setUserData)(e);
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
                            Create an Account
                        </Typography>

                        <Typography
                            variant="body1"
                            color={theme.palette.primary.main}
                            textAlign="center"
                        >
                            Start your journey with us today
                        </Typography>
                    </HeaderBox>

                    <Controller
                        name="fullName"
                        control={control}
                        rules={{
                            required: 'Full name is required',
                            minLength: {
                                value: 3,
                                message:
                                    'Full name must be at least 3 characters',
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="full-name"
                                label="Full Name"
                                variant="outlined"
                                fullWidth
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                            />
                        )}
                    />

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
                        name="contactNo"
                        control={control}
                        rules={{
                            required: 'Contact number is required',
                            pattern: {
                                value: NUMBER_VALIDATION_REGEX,
                                message:
                                    'Please enter a valid 10-digit phone number',
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="contact"
                                label="Contact No."
                                variant="outlined"
                                fullWidth
                                error={!!errors.contactNo}
                                helperText={errors.contactNo?.message}
                            />
                        )}
                    />

                    <StyledRadioBox>
                        <FormControl error={!!errors.role}>
                            <FormLabel id="i-am-label">I am a</FormLabel>

                            <Controller
                                name="role"
                                control={control}
                                rules={{
                                    required: 'Please select a role',
                                }}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        row
                                        aria-labelledby="i-am-label"
                                    >
                                        <FormControlLabel
                                            value="USER"
                                            control={<Radio />}
                                            label="USER"
                                        />

                                        <FormControlLabel
                                            value="RESTAURANT OWNER"
                                            control={<Radio />}
                                            label="RESTAURANT OWNER"
                                        />
                                    </RadioGroup>
                                )}
                            />

                            {errors.role && (
                                <FormHelperText>
                                    {errors.role.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </StyledRadioBox>

                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message:
                                    'Password must be at least 8 characters',
                            },
                            pattern: {
                                value: PASSWORD_VALIDATION_REGEX,
                                message:
                                    'Must include an uppercase letter, a digit, a special character, and no underscores',
                            },
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

                    <Controller
                        name="confirmPassword"
                        control={control}
                        rules={{
                            required: 'Please confirm your password',
                            validate: (value) =>
                                value === passwordValue ||
                                'Passwords do not match',
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="outlined-basic-confirm-password"
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                variant="outlined"
                                fullWidth
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle confirm password visibility"
                                                    onClick={
                                                        handleClickShowConfirmPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? (
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
                            Sign up
                        </SubmitButton>
                    </SubmitPaperWrapper>

                    <Typography textAlign="center" variant="body1">
                        Already have an account?&nbsp;
                        <Link
                            component={RouterLink}
                            to="/login"
                            underline="none"
                        >
                            Login
                        </Link>
                    </Typography>
                </FormCard>
            </FormSection>
        </PageContainer>
    );
};
