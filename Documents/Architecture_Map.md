# StayHealthy - Architecture Map

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   React Application                      │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐   │   │
│  │  │  Pages  │ │Components│ │  Hooks  │ │   Utils     │   │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────────┘   │   │
│  │                                                          │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │              MUI Theme Provider                  │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       API LAYER (Future)                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 Express.js Server                        │   │
│  │  ┌─────────┐ ┌───────────┐ ┌──────────┐ ┌──────────┐   │   │
│  │  │ Routes  │ │Middleware │ │Controllers│ │ Services │   │   │
│  │  └─────────┘ └───────────┘ └──────────┘ └──────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER (Future)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  PostgreSQL  │  │    Redis     │  │   Storage    │          │
│  │  (Drizzle)   │  │  (Sessions)  │  │   (Files)    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Directory Structure

```
src/
├── components/           # Reusable UI components
│   └── NavigationBar/
│       ├── NavigationBar.tsx
│       └── index.ts
├── pages/               # Route-level components
│   ├── LandingPage.tsx
│   ├── SignUp.tsx
│   ├── Login.tsx
│   ├── AppointmentBooking.tsx
│   ├── Reviews.tsx
│   ├── Dashboard.tsx
│   └── index.ts
├── theme/               # MUI theme configuration
│   └── theme.ts
├── types/               # TypeScript interfaces
│   └── index.ts
├── utils/               # Utility functions
│   └── validation.ts    # Zod schemas
├── hooks/               # Custom React hooks (future)
├── services/            # API service functions (future)
├── store/               # State management (future)
├── App.tsx              # Root component with routing
├── main.tsx             # Entry point
└── index.css            # Global styles
```

---

## Component Dependency Map

```
App.tsx
├── ThemeProvider (MUI)
├── CssBaseline (MUI)
└── BrowserRouter
    └── Routes
        ├── LandingPage
        │   └── NavigationBar
        ├── SignUp
        │   ├── NavigationBar
        │   └── Form (react-hook-form + zod)
        ├── Login
        │   ├── NavigationBar
        │   └── Form (react-hook-form + zod)
        ├── AppointmentBooking
        │   ├── NavigationBar
        │   └── DoctorCard (internal)
        ├── Reviews
        │   ├── NavigationBar
        │   ├── ReviewCard (internal)
        │   └── ReviewDialog (internal)
        └── Dashboard
            ├── NavigationBar
            ├── StatCard (internal)
            └── AppointmentItem (internal)
```

---

## Data Flow

### Form Submission Flow
```
User Input → React Hook Form → Zod Validation → Form State
                                    │
                                    ▼
                              Valid? ──No──► Show Error
                                    │
                                   Yes
                                    │
                                    ▼
                         Submit to API (future)
                                    │
                                    ▼
                         Success/Error Response
                                    │
                                    ▼
                         Update UI State
```

### Navigation Flow
```
NavigationBar
    │
    ├── Click Logo ──────────────► / (LandingPage)
    ├── Click Appointments ───────► /appointments
    ├── Click Reviews ────────────► /reviews
    ├── Click Sign Up ────────────► /signup
    └── Click Login ──────────────► /login
```

---

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.x | UI Framework |
| react-router-dom | 6.x | Client-side Routing |
| @mui/material | 5.x | UI Component Library |
| @mui/icons-material | 5.x | Material Icons |
| @emotion/react | 11.x | CSS-in-JS (MUI) |
| @emotion/styled | 11.x | Styled Components (MUI) |
| zod | 3.x | Schema Validation |
| react-hook-form | 7.x | Form Management |
| @hookform/resolvers | 3.x | Zod + RHF Integration |
| axios | 1.x | HTTP Client |

---

## Security Architecture (OWASP)

### Client-Side Security
1. **Input Validation** (A03)
   - All forms validated with Zod schemas
   - XSS prevention through React's JSX escaping
   - Sanitization of user inputs

2. **Authentication UI** (A07)
   - Password complexity indicator
   - Show/hide password toggle
   - Disabled submit until valid

### Future Backend Security
1. **Access Control** (A01)
   - RBAC middleware
   - Route protection

2. **Cryptography** (A02)
   - bcrypt for passwords
   - HTTPS enforcement

3. **Rate Limiting** (A07)
   - Auth endpoints: 5 req/15min
   - API endpoints: 100 req/15min

---

## State Management Strategy

### Current: Local State
- Component-level useState
- Form state via react-hook-form
- No global state needed yet

### Future: Consider
- React Context for auth state
- TanStack Query for server state
- Zustand if complex client state needed

---

## API Contract (Future)

### Authentication
```typescript
POST /api/auth/signup
Body: { role, name, email, password }
Response: { user, token }

POST /api/auth/login
Body: { email, password }
Response: { user, token }

POST /api/auth/logout
Response: { success: true }
```

### Appointments
```typescript
GET /api/appointments
Response: { appointments: Appointment[] }

POST /api/appointments
Body: { doctorId, date, time, notes? }
Response: { appointment: Appointment }

DELETE /api/appointments/:id
Response: { success: true }
```

### Doctors
```typescript
GET /api/doctors?specialty=&search=
Response: { doctors: Doctor[] }

GET /api/doctors/:id
Response: { doctor: Doctor }
```

### Reviews
```typescript
GET /api/reviews
Response: { reviews: Review[] }

POST /api/reviews
Body: { doctorId, rating, feedback }
Response: { review: Review }

PUT /api/reviews/:id
Body: { rating, feedback }
Response: { review: Review }
```

