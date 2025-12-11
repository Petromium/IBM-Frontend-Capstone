import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  CalendarMonth,
  LocalHospital,
  Star,
  TrendingUp,
  AccessTime,
  MoreVert,
  Notifications,
  CheckCircle,
  Schedule,
  Cancel,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';

// Mock user data
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Patient',
  memberSince: '2024-01-15',
};

// Mock appointments
const upcomingAppointments = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: '2024-03-15',
    time: '10:00 AM',
    status: 'confirmed',
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    date: '2024-03-18',
    time: '2:30 PM',
    status: 'pending',
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    date: '2024-03-22',
    time: '11:00 AM',
    status: 'confirmed',
  },
];

// Mock notifications
const notifications = [
  {
    id: '1',
    type: 'reminder',
    message: 'Appointment with Dr. Johnson tomorrow at 10:00 AM',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'confirmation',
    message: 'Your appointment with Dr. Chen has been confirmed',
    time: '1 day ago',
    read: true,
  },
  {
    id: '3',
    type: 'review',
    message: "Don't forget to review Dr. Wilson after your visit",
    time: '3 days ago',
    read: true,
  },
];

// Stats data
const stats = [
  {
    title: 'Total Appointments',
    value: 12,
    icon: <CalendarMonth />,
    color: '#0D6EFD',
    trend: '+3 this month',
  },
  {
    title: 'Doctors Visited',
    value: 5,
    icon: <LocalHospital />,
    color: '#198754',
    trend: '+1 this month',
  },
  {
    title: 'Reviews Given',
    value: 4,
    icon: <Star />,
    color: '#FFC107',
    trend: '80% completion',
  },
  {
    title: 'Upcoming',
    value: 3,
    icon: <AccessTime />,
    color: '#0DCAF0',
    trend: 'Next: Mar 15',
  },
];

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  trend: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h3" fontWeight={700}>
            {value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
            <Typography variant="caption" color="text.secondary">
              {trend}
            </Typography>
          </Box>
        </Box>
        <Avatar
          sx={{
            bgcolor: `${color}20`,
            color: color,
            width: 56,
            height: 56,
          }}
        >
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

// Appointment Item Component
interface AppointmentItemProps {
  appointment: (typeof upcomingAppointments)[0];
  onAction: (id: string, action: string) => void;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment, onAction }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const getStatusColor = (status: string): 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'warning';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle fontSize="small" />;
      case 'pending':
        return <Schedule fontSize="small" />;
      case 'cancelled':
        return <Cancel fontSize="small" />;
      default:
        return <Schedule fontSize="small" />;
    }
  };

  return (
    <ListItem
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        mb: 1.5,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {appointment.doctorName.split(' ').slice(1).map((n) => n[0]).join('')}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {appointment.doctorName}
            </Typography>
            <Chip
              size="small"
              label={appointment.status}
              icon={getStatusIcon(appointment.status)}
              color={getStatusColor(appointment.status)}
              variant="outlined"
            />
          </Box>
        }
        secondary={
          <Box component="span">
            <Typography variant="body2" color="text.secondary" component="span">
              {appointment.specialty}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="span" sx={{ mx: 1 }}>
              •
            </Typography>
            <Typography variant="body2" color="primary.main" component="span" fontWeight={500}>
              {new Date(appointment.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}{' '}
              at {appointment.time}
            </Typography>
          </Box>
        }
      />
      <IconButton
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ ml: 1 }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => { onAction(appointment.id, 'reschedule'); setAnchorEl(null); }}>
          Reschedule
        </MenuItem>
        <MenuItem
          onClick={() => { onAction(appointment.id, 'cancel'); setAnchorEl(null); }}
          sx={{ color: 'error.main' }}
        >
          Cancel
        </MenuItem>
      </Menu>
    </ListItem>
  );
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleAppointmentAction = (id: string, action: string): void => {
    console.log(`Action ${action} on appointment ${id}`);
    // Handle appointment actions
  };

  // Health score (mock)
  const healthScore = 85;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavigationBar />
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        {/* Welcome Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Welcome back, {userData.name}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's an overview of your health appointments and activity.
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Upcoming Appointments */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Upcoming Appointments
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate('/appointments')}
                >
                  View All
                </Button>
              </Box>

              <List disablePadding>
                {upcomingAppointments.map((appointment) => (
                  <AppointmentItem
                    key={appointment.id}
                    appointment={appointment}
                    onAction={handleAppointmentAction}
                  />
                ))}
              </List>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate('/appointments')}
              >
                Book New Appointment
              </Button>
            </Paper>
          </Grid>

          {/* Side Panel */}
          <Grid item xs={12} md={4}>
            {/* Health Score Card */}
            <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Health Score
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-flex',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      background: `conic-gradient(#198754 ${healthScore}%, #e9ecef ${healthScore}%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        bgcolor: 'background.paper',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h3" fontWeight={700} color="success.main">
                        {healthScore}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Great job! Keep up with your regular checkups.
                </Typography>
              </Box>
            </Paper>

            {/* Notifications */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Notifications sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  Notifications
                </Typography>
              </Box>
              <List disablePadding>
                {notifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <ListItem
                      sx={{
                        px: 0,
                        opacity: notification.read ? 0.7 : 1,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight={notification.read ? 400 : 600}>
                            {notification.message}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {notification.time}
                          </Typography>
                        }
                      />
                      {!notification.read && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            ml: 1,
                          }}
                        />
                      )}
                    </ListItem>
                    {index < notifications.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Paper sx={{ p: 3, borderRadius: 3, mt: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<CalendarMonth />}
                onClick={() => navigate('/appointments')}
                sx={{ py: 2 }}
              >
                Book Appointment
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Star />}
                onClick={() => navigate('/reviews')}
                sx={{ py: 2 }}
              >
                Write Review
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<LocalHospital />}
                onClick={() => navigate('/appointments')}
                sx={{ py: 2 }}
              >
                Find Doctor
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AccessTime />}
                sx={{ py: 2 }}
              >
                Medical History
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;

