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
    useTheme,
} from '@mui/material';

import {
    BrandTitle,
    FooterText,
    FormCard,
    FormSection,
    HeaderBox,
    HeroSection,
    PageContainer,
    StyledRadioBox,
    SubmitButton,
    SubmitPaperWrapper,
    SubtitleText,
    TitleText,
} from './SignUp.styles';
import { signup } from '../../services/auth.service';
import { setUser } from '../../slices/authSlice';
import { showNotification } from '../../slices/notificationSlice';
import { useAppDispatch } from '../../store/store';
import { UserRole } from '../../types/auth.types';

interface SignUpFormData {
    fullName: string;
    email: string;
    contactNo: string;
    role: UserRole | '';
    password: string;
    confirmPassword: string;
}

const SignUp = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const passwordValue = watch('password');

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const setUserData = async (data: SignUpFormData) => {
        try {
            const user = await signup({
                fullName: data.fullName,
                email: data.email,
                contactNo: data.contactNo,
                role: data.role as UserRole,
                password: data.password,
            });

            dispatch(setUser(user));

            dispatch(
                showNotification({
                    message: 'Successfully signed up!',
                    severity: 'success',
                }),
            );

            setTimeout(() => {
                void navigate('/restaurant');
            }, 1500);
        } catch (error) {
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

            <FormSection>
                <FormCard
                    noValidate
                    onSubmit={(e) => {
                        void handleSubmit(setUserData)(e);
                    }}
                >
                    <HeaderBox>
                        <BrandTitle>Khana Peena</BrandTitle>

                        <TitleText>Create an Account</TitleText>

                        <SubtitleText>
                            Start your journey with us today
                        </SubtitleText>
                    </HeaderBox>

                    <Controller
                        name="fullName"
                        control={control}
                        rules={{
                            required: 'This field is required',
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
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
                                value: /^[0-9]{10}$/,
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
                                        sx={{
                                            gap: theme.typography.pxToRem(20),
                                        }}
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
                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9_])[^_]+$/,
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

                    <FooterText>
                        Already have an account?
                        <Link
                            component={RouterLink}
                            to="/login"
                            underline="none"
                            sx={{
                                cursor: 'pointer',
                                marginLeft: '4px',
                            }}
                        >
                            Login
                        </Link>
                    </FooterText>
                </FormCard>
            </FormSection>
        </PageContainer>
    );
};

export default SignUp;
