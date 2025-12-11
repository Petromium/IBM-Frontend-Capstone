import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Rating,
  Paper,
  Stack,
} from '@mui/material';
import {
  LocalHospital,
  CalendarMonth,
  Star,
  Security,
  Speed,
  Support,
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';

// Card heights for consistency
const FEATURE_CARD_HEIGHT = 280;
const SPECIALTY_CARD_HEIGHT = 140;
const TESTIMONIAL_CARD_HEIGHT = 220;

// Features data
const features = [
  {
    icon: <CalendarMonth sx={{ fontSize: 40 }} />,
    title: 'Easy Booking',
    description: 'Book appointments with top doctors in just a few clicks. No phone calls needed.',
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'Secure & Private',
    description: 'Your health data is protected with enterprise-grade security and encryption.',
  },
  {
    icon: <Speed sx={{ fontSize: 40 }} />,
    title: 'Fast & Reliable',
    description: 'Get instant confirmations and reminders for all your appointments.',
  },
  {
    icon: <Support sx={{ fontSize: 40 }} />,
    title: '24/7 Support',
    description: 'Our support team is always available to help you with any questions.',
  },
];

// Specialties
const specialties = [
  { name: 'Cardiology', icon: '❤️', doctors: 45 },
  { name: 'Dermatology', icon: '🩺', doctors: 32 },
  { name: 'Pediatrics', icon: '👶', doctors: 28 },
  { name: 'Orthopedics', icon: '🦴', doctors: 24 },
  { name: 'Neurology', icon: '🧠', doctors: 18 },
  { name: 'Dentistry', icon: '🦷', doctors: 56 },
];

// Testimonials
const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Patient',
    avatar: 'S',
    rating: 5,
    text: 'StayHealthy made finding a specialist so easy. I booked my appointment in minutes!',
  },
  {
    name: 'Dr. James W.',
    role: 'Cardiologist',
    avatar: 'J',
    rating: 5,
    text: 'As a doctor, this platform helps me manage my schedule efficiently and reach more patients.',
  },
  {
    name: 'Michael R.',
    role: 'Patient',
    avatar: 'M',
    rating: 5,
    text: 'The review system helped me find the best doctor for my needs. Highly recommended!',
  },
];

// Stats
const stats = [
  { value: '500+', label: 'Expert Doctors' },
  { value: '50k+', label: 'Happy Patients' },
  { value: '100+', label: 'Specialties' },
  { value: '4.9', label: 'Average Rating' },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavigationBar />

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0D6EFD 0%, #0A58CA 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.1)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.05)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                variant="h2"
                component="h1"
                fontWeight={700}
                sx={{ mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}
              >
                Your Health,{' '}
                <Box component="span" sx={{ color: '#90CAF9' }}>
                  Our Priority
                </Box>
              </Typography>
              <Typography
                variant="h6"
                sx={{ mb: 4, opacity: 0.9, fontWeight: 400, lineHeight: 1.6 }}
              >
                Book appointments with top-rated doctors in your area. 
                Get quality healthcare with just a few clicks.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/appointments')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                    },
                  }}
                >
                  Book Appointment
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Get Started
                </Button>
              </Stack>

              {/* Trust indicators */}
              <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ mr: 0.5, fontSize: 18 }} />
                  <Typography variant="body2">Verified Doctors</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ mr: 0.5, fontSize: 18 }} />
                  <Typography variant="body2">Secure Booking</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ mr: 0.5, fontSize: 18 }} />
                  <Typography variant="body2">24/7 Support</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: { xs: 280, md: 400 },
                  height: { xs: 280, md: 400 },
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LocalHospital sx={{ fontSize: { xs: 120, md: 180 }, opacity: 0.9 }} />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 2 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 3,
            }}
          >
            {stats.map((stat, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  fontWeight={700}
                  color="primary.main"
                  sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Why Choose StayHealthy?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            We make healthcare accessible, convenient, and reliable for everyone.
          </Typography>
        </Box>

        {/* Features Grid - CSS Grid for consistent sizing */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 3,
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: FEATURE_CARD_HEIGHT,
                textAlign: 'center',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: 'primary.main',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Specialties Section */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Browse by Specialty
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Find the right specialist for your healthcare needs
            </Typography>
          </Box>

          {/* Specialties Grid - CSS Grid for consistent sizing */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(6, 1fr)',
              },
              gap: 3,
            }}
          >
            {specialties.map((specialty, index) => (
              <Paper
                key={index}
                sx={{
                  height: SPECIALTY_CARD_HEIGHT,
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => navigate('/appointments')}
              >
                <Typography variant="h3" sx={{ mb: 1 }}>
                  {specialty.icon}
                </Typography>
                <Typography variant="subtitle2" fontWeight={600}>
                  {specialty.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {specialty.doctors} Doctors
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            What Our Users Say
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Trusted by thousands of patients and doctors
          </Typography>
        </Box>

        {/* Testimonials Grid - CSS Grid for consistent sizing */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              sx={{
                height: TESTIMONIAL_CARD_HEIGHT,
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    {testimonial.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
                <Rating value={testimonial.rating} readOnly size="small" sx={{ mb: 2 }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.7,
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  "{testimonial.text}"
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #198754 0%, #146C43 100%)',
          color: 'white',
          py: { xs: 8, md: 10 },
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}>
            Join thousands of patients who trust StayHealthy for their healthcare needs.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate('/signup')}
            sx={{
              bgcolor: 'white',
              color: 'success.dark',
              px: 5,
              py: 1.5,
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            Create Free Account
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#212529', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LocalHospital sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              StayHealthy
            </Typography>
          </Box>
          <Typography variant="body2" align="center" sx={{ mt: 2, opacity: 0.7 }}>
            © {new Date().getFullYear()} StayHealthy. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
