import React, { useState, useMemo } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Rating,
  Avatar,
  InputAdornment,
  Skeleton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Search,
  LocalHospital,
  WorkHistory,
  Star,
} from '@mui/icons-material';
import { NavigationBar } from '../components/NavigationBar';
import type { Doctor, Specialty } from '../types';

// Specialties list
const specialties: Specialty[] = [
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
  'General Medicine',
  'Dentistry',
  'Ophthalmology',
];

// Mock doctors data with professional portrait images
const mockDoctors: Doctor[] = [
  {
    id: '1',
    userId: 'u1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    yearsExperience: 15,
    rating: 4.8,
    reviewCount: 124,
    bio: 'Board-certified cardiologist specializing in preventive cardiology and heart disease management.',
    hospital: 'City Heart Center',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=faces',
  },
  {
    id: '2',
    userId: 'u2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    yearsExperience: 10,
    rating: 4.9,
    reviewCount: 98,
    bio: 'Expert in cosmetic and medical dermatology with advanced skin treatment techniques.',
    hospital: 'Skin Care Clinic',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=faces',
  },
  {
    id: '3',
    userId: 'u3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    yearsExperience: 8,
    rating: 4.7,
    reviewCount: 156,
    bio: 'Passionate about children\'s health and wellness with a caring approach to pediatric care.',
    hospital: 'Children\'s Medical Center',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=faces',
  },
  {
    id: '4',
    userId: 'u4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    yearsExperience: 20,
    rating: 4.9,
    reviewCount: 203,
    bio: 'Specializing in sports medicine and joint replacement with minimally invasive techniques.',
    hospital: 'Orthopedic Institute',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=faces',
  },
  {
    id: '5',
    userId: 'u5',
    name: 'Dr. Priya Patel',
    specialty: 'Neurology',
    yearsExperience: 12,
    rating: 4.6,
    reviewCount: 87,
    bio: 'Expert in headache disorders, epilepsy treatment, and neurological rehabilitation.',
    hospital: 'Neuro Health Center',
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=150&h=150&fit=crop&crop=faces',
  },
  {
    id: '6',
    userId: 'u6',
    name: 'Dr. Robert Kim',
    specialty: 'General Medicine',
    yearsExperience: 18,
    rating: 4.8,
    reviewCount: 312,
    bio: 'Comprehensive primary care for the whole family with focus on preventive medicine.',
    hospital: 'Family Health Clinic',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=faces',
  },
];

// Fixed card height for consistent grid
const CARD_HEIGHT = 420;

// Doctor Card Component
interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctorId: string) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBook }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <Card
      sx={{
        height: CARD_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? 6 : 2,
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
        {/* Doctor Avatar and Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={!imgError ? doctor.avatar : undefined}
            alt={doctor.name}
            onError={() => setImgError(true)}
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
              mr: 2,
              fontSize: '1.5rem',
              fontWeight: 600,
              border: '3px solid',
              borderColor: 'primary.light',
              flexShrink: 0,
            }}
          >
            {doctor.name.split(' ').map((n) => n[0]).join('')}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography 
              variant="h6" 
              fontWeight={600} 
              sx={{ 
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {doctor.name}
            </Typography>
            <Chip
              label={doctor.specialty}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />
          </Box>
        </Box>

        {/* Hospital */}
        {doctor.hospital && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocalHospital sx={{ fontSize: 18, color: 'text.secondary', mr: 1, flexShrink: 0 }} />
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {doctor.hospital}
            </Typography>
          </Box>
        )}

        {/* Experience */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <WorkHistory sx={{ fontSize: 18, color: 'text.secondary', mr: 1, flexShrink: 0 }} />
          <Typography variant="body2" color="text.secondary">
            {doctor.yearsExperience} years of experience
          </Typography>
        </Box>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating
            value={doctor.rating}
            precision={0.1}
            readOnly
            size="small"
            sx={{ mr: 1 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Star sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
            <Typography variant="body2" fontWeight={600}>
              {doctor.rating}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              ({doctor.reviewCount})
            </Typography>
          </Box>
        </Box>

        {/* Bio - Fixed height with ellipsis */}
        {doctor.bio && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              lineHeight: 1.6,
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {doctor.bio}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={() => onBook(doctor.id)}
          sx={{
            py: 1.25,
            fontWeight: 600,
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          Book Appointment
        </Button>
      </CardActions>
    </Card>
  );
};

// Loading Skeleton with consistent height
const DoctorCardSkeleton: React.FC = () => (
  <Card sx={{ height: CARD_HEIGHT }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Skeleton variant="circular" width={80} height={80} sx={{ mr: 2 }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="80%" height={28} />
          <Skeleton variant="rounded" width={100} height={24} sx={{ mt: 0.5 }} />
        </Box>
      </Box>
      <Skeleton variant="text" width="70%" height={20} />
      <Skeleton variant="text" width="60%" height={20} />
      <Skeleton variant="text" width="50%" height={20} />
      <Skeleton variant="text" width="100%" height={48} sx={{ mt: 1 }} />
    </CardContent>
    <Box sx={{ p: 3, pt: 0 }}>
      <Skeleton variant="rounded" height={44} />
    </Box>
  </Card>
);

export const AppointmentBooking: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  // Filter doctors based on search and specialty
  const filteredDoctors = useMemo(() => {
    let results = mockDoctors;

    if (selectedSpecialty) {
      results = results.filter((d) => d.specialty === selectedSpecialty);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          d.specialty.toLowerCase().includes(query) ||
          d.hospital?.toLowerCase().includes(query)
      );
    }

    return results;
  }, [searchQuery, selectedSpecialty]);

  const handleSearch = (): void => {
    setIsLoading(true);
    // Simulate search delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleBookAppointment = (doctorId: string): void => {
    const doctor = mockDoctors.find((d) => d.id === doctorId);
    if (doctor) {
      setSnackbar({
        open: true,
        message: `Appointment request sent to ${doctor.name}!`,
        severity: 'success',
      });
    }
  };

  const handleSpecialtyClick = (specialty: string): void => {
    setSelectedSpecialty(selectedSpecialty === specialty ? null : specialty);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavigationBar />
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
            Find a Doctor
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Search for specialists and book your appointment today
          </Typography>
        </Box>

        {/* Search Section */}
        <Paper
          elevation={2}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Search Doctor by Specialty
          </Typography>

          {/* Search Input */}
          <TextField
            fullWidth
            placeholder="Search by doctor name, specialty, or hospital..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Specialty Chips */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Filter by specialty:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {specialties.map((specialty) => (
                <Chip
                  key={specialty}
                  label={specialty}
                  onClick={() => handleSpecialtyClick(specialty)}
                  color={selectedSpecialty === specialty ? 'primary' : 'default'}
                  variant={selectedSpecialty === specialty ? 'filled' : 'outlined'}
                  sx={{
                    fontWeight: 500,
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Search Button */}
          <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            startIcon={<Search />}
            sx={{ px: 4 }}
          >
            Search Doctors
          </Button>
        </Paper>

        {/* Results Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight={600}>
            Available Doctors
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
          </Typography>
        </Box>

        {/* Doctor Cards Grid - Consistent 3-column layout */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <DoctorCardSkeleton key={index} />
              ))
            : filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} onBook={handleBookAppointment} />
              ))}
        </Box>

        {/* No Results */}
        {!isLoading && filteredDoctors.length === 0 && (
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 3,
            }}
          >
            <LocalHospital sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No doctors found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filter criteria
            </Typography>
          </Paper>
        )}

        {/* Success Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default AppointmentBooking;
