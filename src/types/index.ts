// User roles for RBAC (OWASP A01)
export type UserRole = 'Doctor' | 'Patient' | 'Admin';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Doctor specific interface
export interface Doctor {
  id: string;
  userId: string;
  name: string;
  specialty: string;
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  avatar?: string;
  bio?: string;
  education?: string;
  hospital?: string;
  availableSlots?: TimeSlot[];
}

// Medical specialties
export type Specialty =
  | 'Cardiology'
  | 'Dermatology'
  | 'Pediatrics'
  | 'Orthopedics'
  | 'Neurology'
  | 'Ophthalmology'
  | 'Psychiatry'
  | 'General Medicine'
  | 'Dentistry'
  | 'Gynecology';

// Time slot for appointments
export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// Appointment status
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

// Appointment interface
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  specialty: Specialty;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Review interface
export interface Review {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: Specialty;
  rating: number;
  feedback: string;
  submitted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  role: UserRole;
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt: string;
}

// Form validation schemas (used with Zod)
export interface ValidationError {
  field: string;
  message: string;
}

