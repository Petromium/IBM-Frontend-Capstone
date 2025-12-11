import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  InputAdornment,
  IconButton,
  Alert,
  Link,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  PersonAddOutlined,
  Google,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';
import { signUpSchema } from '../utils/validation';
import type { SignUpFormData } from '../utils/validation';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: undefined,
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignUpFormData): Promise<void> => {
    try {
      setSubmitError(null);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Sign up data:', data);
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setSubmitError('Sign up failed. Please try again.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavigationBar />
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: 'primary.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <PersonAddOutlined sx={{ fontSize: 28, color: 'primary.main' }} />
            </Box>
            <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join StayHealthy to book appointments with top doctors
            </Typography>
          </Box>

          {/* Alerts */}
          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setSubmitError(null)}>
              {submitError}
            </Alert>
          )}

          {submitSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Account created successfully! Redirecting to login...
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Role Dropdown */}
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Role"
                  error={!!errors.role}
                  helperText={errors.role?.message || 'Select your role'}
                  sx={{ mb: 3 }}
                  value={field.value || ''}
                >
                  <MenuItem value="Patient">Patient</MenuItem>
                  <MenuItem value="Doctor">Doctor</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </TextField>
              )}
            />

            {/* Name Field */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Full Name"
                  placeholder="John Doe"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  autoComplete="name"
                  sx={{ mb: 3 }}
                />
              )}
            />

            {/* Email Field */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="email"
                  label="Email Address"
                  placeholder="john.doe@example.com"
                  error={!!errors.email}
                  helperText={errors.email?.message || "We'll never share your email"}
                  autoComplete="email"
                  sx={{ mb: 3 }}
                />
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Create a strong password"
                  error={!!errors.password}
                  helperText={
                    errors.password?.message ||
                    '8+ chars with uppercase, lowercase, number & special char'
                  }
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 4 }}
                />
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting || submitSuccess}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                mb: 3,
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign Up'
              )}
            </Button>

            {/* Divider */}
            <Divider sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                or
              </Typography>
            </Divider>

            {/* Google Sign Up */}
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<Google />}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                mb: 3,
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'action.hover',
                },
              }}
            >
              Continue with Google
            </Button>

            {/* Login Link */}
            <Typography variant="body2" align="center" color="text.secondary">
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;

