import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { medicalTheme } from './theme/theme';
import { LandingPage } from './pages/LandingPage';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { AppointmentBooking } from './pages/AppointmentBooking';
import { Reviews } from './pages/Reviews';
import { Dashboard } from './pages/Dashboard';

function App(): React.ReactElement {
  return (
    <ThemeProvider theme={medicalTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes (TODO: Add auth guard) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<AppointmentBooking />} />
          <Route path="/reviews" element={<Reviews />} />
          
          {/* Fallback route */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
