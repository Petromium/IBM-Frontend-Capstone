import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Appointments', path: '/appointments' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Sign Up', path: '/signup' },
  { label: 'Login', path: '/login' },
];

export const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string): boolean => location.pathname === path;

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string): void => {
    navigate(path);
    setMobileOpen(false);
  };

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 280, height: '100%', bgcolor: 'background.paper' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => handleNavigation('/')}
        >
          <LocalHospitalIcon sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" color="primary.main" fontWeight={700}>
            StayHealthy
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} aria-label="close menu">
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ pt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                mx: 1,
                borderRadius: 2,
                bgcolor: isActive(item.path) ? 'primary.light' : 'transparent',
                '&:hover': {
                  bgcolor: isActive(item.path) ? 'primary.light' : 'action.hover',
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 600 : 400,
                  color: isActive(item.path) ? 'primary.contrastText' : 'text.primary',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          height: { xs: 60, md: 72 },
          backgroundColor: 'primary.main',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: { xs: 60, md: 72 },
            }}
          >
            {/* Logo and Brand */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
              onClick={() => handleNavigation('/')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigation('/')}
              aria-label="Go to homepage"
            >
              <LocalHospitalIcon
                sx={{
                  mr: 1,
                  fontSize: { xs: '1.75rem', md: '2rem' },
                  color: 'white',
                }}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  letterSpacing: '-0.5px',
                }}
              >
                StayHealthy
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      color: 'white',
                      fontWeight: isActive(item.path) ? 600 : 400,
                      fontSize: '0.95rem',
                      px: 2,
                      py: 1,
                      position: 'relative',
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 6,
                        left: '50%',
                        transform: isActive(item.path)
                          ? 'translateX(-50%) scaleX(1)'
                          : 'translateX(-50%) scaleX(0)',
                        width: '60%',
                        height: 2,
                        backgroundColor: 'white',
                        borderRadius: 1,
                        transition: 'transform 0.2s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        '&::after': {
                          transform: 'translateX(-50%) scaleX(1)',
                        },
                      },
                    }}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="open navigation menu"
                onClick={handleDrawerToggle}
                sx={{
                  p: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <MenuIcon sx={{ fontSize: '1.75rem' }} />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NavigationBar;

