# StayHealthy - Scrum Backlog

## Project Overview
**Project Name:** StayHealthy Medical Appointment Booking Application  
**Tech Stack:** React 18, TypeScript, MUI Material UI, Vite, Zod, React Hook Form  
**Start Date:** December 2024

---

## Sprint 1: Foundation & Core UI (Current Sprint)

### User Stories

#### US-001: Navigation Bar
**Status:** ✅ Complete  
**Story:** As a user, I want a responsive navigation bar, so that I can easily navigate between different sections of the application.

**Acceptance Criteria (BDD):**
```gherkin
Given I am on any page of the application
When the page loads
Then I should see a navigation bar with the StayHealthy logo
And I should see links to Appointments, Reviews, Sign Up, and Login

Given I am viewing the navigation bar on mobile
When I click the menu icon
Then I should see a drawer menu with all navigation options

Given I hover over a navigation link
When the link is not currently active
Then I should see a visual hover state
```

---

#### US-002: Sign Up Page
**Status:** ✅ Complete  
**Story:** As a new user, I want to create an account, so that I can access the appointment booking features.

**Acceptance Criteria (BDD):**
```gherkin
Given I am on the Sign Up page
When I view the form
Then I should see fields for Role, Name, Email, and Password

Given I select a role from the dropdown
When I click the dropdown
Then I should see options: Patient, Doctor, Admin

Given I enter an invalid email format
When I try to submit the form
Then I should see an error message "Invalid email address"

Given I enter a password less than 8 characters
When I try to submit the form
Then I should see password requirement error

Given I fill all fields correctly
When I click Sign Up
Then I should see a success message and be redirected to login
```

**OWASP Compliance:**
- ✅ A03: Input validation with Zod
- ✅ A07: Password complexity enforcement

---

#### US-003: Login Page
**Status:** ✅ Complete  
**Story:** As a registered user, I want to log in to my account, so that I can access my appointments and reviews.

**Acceptance Criteria (BDD):**
```gherkin
Given I am on the Login page
When the form is empty
Then the Login button should be disabled

Given I enter valid credentials
When I click Login
Then I should be redirected to the Dashboard

Given I enter invalid credentials
When I try to login
Then I should see an error message

Given I want to see my password
When I click the show password icon
Then my password should be visible
```

**OWASP Compliance:**
- ✅ A07: Rate limiting on auth (backend pending)
- ✅ A03: Input validation

---

#### US-004: Appointment Booking
**Status:** ✅ Complete  
**Story:** As a patient, I want to search for doctors and book appointments, so that I can get medical care.

**Acceptance Criteria (BDD):**
```gherkin
Given I am on the Appointments page
When I view the search section
Then I should see a search input and specialty filter chips

Given I click on a specialty chip
When I click Search
Then I should see doctors filtered by that specialty

Given I view a doctor card
Then I should see name, specialty, experience, rating, and Book button

Given I click Book Appointment
When the action completes
Then I should see a success notification
```

---

#### US-005: Reviews Page
**Status:** ✅ Complete  
**Story:** As a patient, I want to write reviews for doctors, so that I can share my experience.

**Acceptance Criteria (BDD):**
```gherkin
Given I am on the Reviews page
When I view the page
Then I should see a list of doctors I've visited

Given a review is not submitted
When I view the doctor card
Then I should see a "Pending" status and Write Review button

Given I click Write Review
When the dialog opens
Then I should see fields for Name, Rating (stars), and Feedback

Given I submit a review
When the submission is successful
Then the status should change to "Submitted"
```

---

#### US-006: Landing Page
**Status:** ✅ Complete  
**Story:** As a visitor, I want to see an attractive landing page, so that I understand what StayHealthy offers.

**Acceptance Criteria (BDD):**
```gherkin
Given I visit the homepage
When the page loads
Then I should see a hero section with call-to-action buttons
And I should see features, specialties, testimonials, and stats sections
```

---

#### US-007: Dashboard
**Status:** ✅ Complete  
**Story:** As a logged-in user, I want to see my dashboard, so that I can manage my appointments.

**Acceptance Criteria (BDD):**
```gherkin
Given I am logged in
When I access the Dashboard
Then I should see my upcoming appointments
And I should see quick action buttons
And I should see notifications
```

---

## Sprint 2: Backend Integration (Upcoming)

### User Stories

#### US-008: Backend API Setup with Type-Safe Integration
**Status:** 🔲 Pending  
**Story:** As a developer, I want a secure backend API with end-to-end type safety, so that the frontend can persist data without type errors.

**Acceptance Criteria:**
- Express.js with TypeScript
- Drizzle ORM for database (type-safe queries)
- Zod validation on all endpoints (shared schemas)
- OWASP-compliant security headers (Helmet.js)
- Rate limiting on auth endpoints

**Type-Safe Integration Options (Evaluated):**

| Approach | Pros | Cons | Recommendation |
|----------|------|------|----------------|
| **tRPC** | Zero codegen, instant type inference, React Query built-in | Requires monorepo, not RESTful | ⭐ Best for DX |
| **OpenAPI + orval** | RESTful, Swagger docs, language agnostic | Requires codegen step, types can drift | Best for REST APIs |
| **Shared Types Package** | Simple setup, works with existing Express | Manual sync, no runtime validation | Good for small teams |
| **Hono + Zod OpenAPI** | Modern, lightweight, first-class OpenAPI | Newer ecosystem | Good alternative |

**Recommended Stack:** tRPC + Drizzle + Zod
```
Frontend (React) ←→ tRPC Client ←→ tRPC Server ←→ Drizzle ORM ←→ PostgreSQL
                         ↑
                    Zod Schemas (shared)
```

**Benefits:**
- End-to-end type safety (no `any` types)
- Automatic React Query integration
- Zod validation (OWASP A03 compliant)
- Drizzle type inference from database schema

---

#### US-009: User Authentication
**Status:** 🔲 Pending  
**Story:** As a user, I want secure authentication, so that my account is protected.

**Acceptance Criteria:**
- bcrypt password hashing (cost factor ≥ 10)
- JWT token-based sessions
- Session timeout configuration
- Account lockout after failed attempts

---

#### US-010: Doctor Management
**Status:** 🔲 Pending  
**Story:** As an admin, I want to manage doctors, so that the system has accurate provider data.

---

#### US-011: Appointment CRUD
**Status:** 🔲 Pending  
**Story:** As a patient, I want to create, view, and cancel appointments.

---

## Sprint 3: Testing & Deployment

### User Stories

#### US-012: Unit Tests
**Status:** 🔲 Pending  
**Story:** As a developer, I want comprehensive unit tests, so that code quality is maintained.

---

#### US-013: E2E Tests
**Status:** 🔲 Pending  
**Story:** As a QA engineer, I want E2E tests, so that user flows are verified.

---

#### US-014: CI/CD Pipeline
**Status:** 🔲 Pending  
**Story:** As a DevOps engineer, I want automated deployment, so that releases are consistent.

---

## Backlog (Future Sprints)

- US-015: Two-Factor Authentication (2FA)
- US-016: Email Notifications
- US-017: Doctor Calendar Management
- US-018: Patient Medical Records
- US-019: Payment Integration
- US-020: Admin Analytics Dashboard

---

## Definition of Done

1. ✅ Code compiles without errors
2. ✅ All acceptance criteria met
3. ✅ Unit tests written and passing
4. ✅ E2E tests for critical paths
5. ✅ OWASP security checklist passed
6. ✅ Code reviewed and approved
7. ✅ Documentation updated
8. ✅ No console errors in browser
9. ✅ Responsive on mobile and desktop
10. ✅ Accessibility standards met (WCAG 2.1 AA)

