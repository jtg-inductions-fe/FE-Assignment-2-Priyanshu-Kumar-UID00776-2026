import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, Link, TextField } from '@mui/material';

import {
    BrandTitle,
    FooterText,
    FormCard,
    FormSection,
    HeaderBox,
    HeroSection,
    PageContainer,
    SubmitButton,
    SubmitPaperWrapper,
    SubtitleText,
    TitleText,
} from './Login.styles';

interface LoginFormData {
    email: string;
    password: string;
}

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const {
        control,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onTouched',
    });

    return (
        <PageContainer disableGutters maxWidth={false}>
            <HeroSection />

            <FormSection>
                <FormCard elevation={0} component="form" noValidate>
                    <HeaderBox>
                        <BrandTitle>Khana Peena</BrandTitle>
                        <TitleText>Sign in to your account</TitleText>
                        <SubtitleText>
                            Enter your details to proceed
                        </SubtitleText>
                    </HeaderBox>

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
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                fullWidth
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
                            disabled={isSubmitting}
                        >
                            Login
                        </SubmitButton>
                    </SubmitPaperWrapper>

                    <FooterText>
                        Don&apos;t have an account?
                        <Link
                            component={RouterLink}
                            to="/signup"
                            underline="none"
                            sx={{ cursor: 'pointer', marginLeft: '4px' }}
                        >
                            Sign Up
                        </Link>
                    </FooterText>
                </FormCard>
            </FormSection>
        </PageContainer>
    );
};

export default Login;
