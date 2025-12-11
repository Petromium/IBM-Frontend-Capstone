import { z } from 'zod';

// OWASP A03: Input validation with Zod schemas

// Password complexity requirements (OWASP A07)
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must not exceed 128 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

// Email validation with strict regex
const emailSchema = z
  .string()
  .email('Invalid email address')
  .max(254, 'Email must not exceed 254 characters')
  .transform((email) => email.toLowerCase().trim());

// Name validation - sanitized for XSS
const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
  .transform((name) => name.trim());

// Role validation
const roleSchema = z.enum(['Doctor', 'Patient', 'Admin'], {
  required_error: 'Role is required',
  invalid_type_error: 'Invalid role selected',
});

// Sign Up form schema
export const signUpSchema = z.object({
  role: roleSchema,
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Login form schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

// Review form schema
export const reviewSchema = z.object({
  patientName: nameSchema,
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating cannot exceed 5'),
  feedback: z
    .string()
    .min(10, 'Feedback must be at least 10 characters')
    .max(1000, 'Feedback must not exceed 1000 characters')
    .transform((text) => text.trim()),
});

// Appointment booking schema
export const appointmentSchema = z.object({
  doctorId: z.string().uuid('Invalid doctor ID'),
  date: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, 'Appointment date must be today or in the future'),
  time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  notes: z.string().max(500, 'Notes must not exceed 500 characters').optional(),
});

// Search query schema - sanitized for injection
export const searchSchema = z.object({
  query: z
    .string()
    .max(100, 'Search query too long')
    .transform((q) => q.trim().replace(/[<>]/g, '')), // Basic XSS prevention
  specialty: z.string().optional(),
});

// Type exports using z.infer
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type AppointmentFormData = z.infer<typeof appointmentSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;

// Utility function to format validation errors
export const formatZodErrors = (error: z.ZodError): Record<string, string> => {
  const errors: Record<string, string> = {};
  error.errors.forEach((err) => {
    if (err.path.length > 0) {
      errors[err.path[0].toString()] = err.message;
    }
  });
  return errors;
};
