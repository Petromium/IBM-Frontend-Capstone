import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Rating,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Divider,
  IconButton,
  Alert,
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUnchecked,
  RateReview,
  Close,
  Star,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationBar } from '../components/NavigationBar';
import { reviewSchema } from '../utils/validation';
import type { ReviewFormData } from '../utils/validation';
import type { Review, Specialty } from '../types';

// Doctor avatar mapping for reviews
const doctorAvatars: Record<string, string> = {
  'd1': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=faces',
  'd2': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=faces',
  'd3': 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=faces',
  'd4': 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=faces',
};

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    patientId: 'p1',
    patientName: 'John Doe',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiology' as Specialty,
    rating: 5,
    feedback: 'Dr. Johnson was incredibly thorough and took the time to explain everything. Highly recommend!',
    submitted: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    patientId: 'p1',
    patientName: 'John Doe',
    doctorId: 'd2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialty: 'Dermatology' as Specialty,
    rating: 0,
    feedback: '',
    submitted: false,
  },
  {
    id: '3',
    patientId: 'p1',
    patientName: 'John Doe',
    doctorId: 'd3',
    doctorName: 'Dr. Emily Rodriguez',
    doctorSpecialty: 'Pediatrics' as Specialty,
    rating: 4,
    feedback: 'Great with children, very patient and kind. The wait time was a bit long though.',
    submitted: true,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    patientId: 'p1',
    patientName: 'John Doe',
    doctorId: 'd4',
    doctorName: 'Dr. James Wilson',
    doctorSpecialty: 'Orthopedics' as Specialty,
    rating: 0,
    feedback: '',
    submitted: false,
  },
];

// Fixed card height for consistent grid
const CARD_HEIGHT = 320;

// Review Card Component
interface ReviewCardProps {
  review: Review;
  onWriteReview: (reviewId: string) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onWriteReview }) => {
  const [imgError, setImgError] = useState(false);
  const avatarUrl = doctorAvatars[review.doctorId];

  return (
    <Card
      sx={{
        height: CARD_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: 1 }}>
            <Avatar
              src={!imgError && avatarUrl ? avatarUrl : undefined}
              alt={review.doctorName}
              onError={() => setImgError(true)}
              sx={{
                width: 56,
                height: 56,
                bgcolor: 'primary.main',
                mr: 2,
                fontSize: '1rem',
                border: '2px solid',
                borderColor: 'primary.light',
                flexShrink: 0,
              }}
            >
              {review.doctorName.split(' ').slice(1).map((n) => n[0]).join('')}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography 
                variant="subtitle1" 
                fontWeight={600} 
                sx={{ 
                  mb: 0.25,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {review.doctorName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {review.doctorSpecialty}
              </Typography>
            </Box>
          </Box>
          <Chip
            icon={review.submitted ? <CheckCircle fontSize="small" /> : <RadioButtonUnchecked fontSize="small" />}
            label={review.submitted ? 'Submitted' : 'Pending'}
            color={review.submitted ? 'success' : 'default'}
            variant="outlined"
            size="small"
            sx={{ fontWeight: 500, flexShrink: 0, ml: 1 }}
          />
        </Box>

        {/* Review Content */}
        {review.submitted ? (
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rating value={review.rating} readOnly size="small" />
              <Typography variant="body2" fontWeight={600} sx={{ ml: 1 }}>
                {review.rating}/5
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.6,
                flexGrow: 1,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              "{review.feedback}"
            </Typography>
            {review.createdAt && (
              <Typography variant="caption" color="text.disabled" sx={{ mt: 1 }}>
                Reviewed on {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              bgcolor: 'action.hover',
              borderRadius: 2,
              p: 2,
            }}
          >
            <RateReview sx={{ fontSize: 36, color: 'text.disabled', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Share your experience with {review.doctorName.split(' ')[1]}
            </Typography>
          </Box>
        )}

        {/* Action Button */}
        <Button
          fullWidth
          variant={review.submitted ? 'outlined' : 'contained'}
          startIcon={<RateReview />}
          onClick={() => onWriteReview(review.id)}
          sx={{ mt: 2 }}
        >
          {review.submitted ? 'Edit Review' : 'Write Review'}
        </Button>
      </CardContent>
    </Card>
  );
};

export const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      patientName: '',
      rating: 0,
      feedback: '',
    },
  });

  const handleWriteReview = (reviewId: string): void => {
    const review = reviews.find((r) => r.id === reviewId);
    if (review) {
      setSelectedReview(review);
      setValue('patientName', review.patientName);
      setValue('rating', review.rating);
      setValue('feedback', review.feedback);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
    setSelectedReview(null);
    reset();
  };

  const onSubmit = async (data: ReviewFormData): Promise<void> => {
    if (!selectedReview) return;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setReviews((prev) =>
      prev.map((r) =>
        r.id === selectedReview.id
          ? {
              ...r,
              patientName: data.patientName,
              rating: data.rating,
              feedback: data.feedback,
              submitted: true,
              updatedAt: new Date(),
            }
          : r
      )
    );

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      handleCloseDialog();
    }, 1500);
  };

  // Stats
  const submittedCount = reviews.filter((r) => r.submitted).length;
  const pendingCount = reviews.filter((r) => !r.submitted).length;
  const averageRating =
    submittedCount > 0
      ? reviews.filter((r) => r.submitted).reduce((acc, r) => acc + r.rating, 0) / submittedCount
      : 0;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavigationBar />
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
            Doctor Reviews
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Share your experience and help others find great healthcare
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, height: 120 }}>
              <Typography variant="h3" fontWeight={700} color="primary.main">
                {submittedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reviews Submitted
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, height: 120 }}>
              <Typography variant="h3" fontWeight={700} color="warning.main">
                {pendingCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reviews Pending
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, height: 120 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star sx={{ fontSize: 32, color: 'warning.main', mr: 0.5 }} />
                <Typography variant="h3" fontWeight={700}>
                  {averageRating.toFixed(1)}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Average Rating Given
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Reviews Grid */}
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          Your Appointments
        </Typography>
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
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} onWriteReview={handleWriteReview} />
          ))}
        </Box>

        {/* Review Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" fontWeight={600}>
                Write Review
              </Typography>
              <IconButton onClick={handleCloseDialog} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>

          <Divider />

          <DialogContent sx={{ pt: 3 }}>
            {selectedReview && (
              <Box sx={{ mb: 3, p: 2, bgcolor: 'action.hover', borderRadius: 2, display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={doctorAvatars[selectedReview.doctorId]}
                  sx={{
                    width: 48,
                    height: 48,
                    mr: 2,
                    border: '2px solid',
                    borderColor: 'primary.light',
                  }}
                >
                  {selectedReview.doctorName.split(' ').slice(1).map((n) => n[0]).join('')}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Reviewing
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {selectedReview.doctorName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedReview.doctorSpecialty}
                  </Typography>
                </Box>
              </Box>
            )}

            {submitSuccess && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Review submitted successfully!
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              {/* Patient Name */}
              <Controller
                name="patientName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Your Name"
                    placeholder="Enter your name"
                    error={!!errors.patientName}
                    helperText={errors.patientName?.message}
                    sx={{ mb: 3 }}
                  />
                )}
              />

              {/* Rating */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Rating *
                </Typography>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <Box>
                      <Rating
                        {...field}
                        value={field.value}
                        onChange={(_, newValue) => field.onChange(newValue || 0)}
                        size="large"
                        sx={{ fontSize: '2.5rem' }}
                      />
                      {errors.rating && (
                        <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>
                          {errors.rating.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
              </Box>

              {/* Feedback */}
              <Controller
                name="feedback"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Your Feedback"
                    placeholder="Share your experience with this doctor..."
                    multiline
                    rows={4}
                    error={!!errors.feedback}
                    helperText={errors.feedback?.message || 'Minimum 10 characters'}
                  />
                )}
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button onClick={handleCloseDialog} variant="outlined" sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || submitSuccess}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Reviews;
