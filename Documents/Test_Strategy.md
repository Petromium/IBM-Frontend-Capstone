# StayHealthy - Test Strategy

## Testing Pyramid

```
        ┌─────────┐
       /  E2E     \          ~10% - Critical user flows
      /  (Playwright)\
     ├───────────────┤
    /   Integration   \      ~20% - API & component integration
   /    (Vitest)       \
  ├─────────────────────┤
 /       Unit Tests      \   ~70% - Functions, utils, components
/        (Vitest)         \
└─────────────────────────┘
```

---

## Test Configuration

### Vitest Setup

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
      ],
    },
  },
});
```

### Test Setup File

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
```

---

## Unit Tests

### Validation Schemas (utils/validation.ts)

```typescript
// src/utils/validation.test.ts
import { describe, it, expect } from 'vitest';
import { signUpSchema, loginSchema, reviewSchema } from './validation';

describe('signUpSchema', () => {
  it('validates correct signup data', () => {
    const validData = {
      role: 'Patient',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecurePass1!',
    };
    const result = signUpSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const invalidData = {
      role: 'Patient',
      name: 'John Doe',
      email: 'invalid-email',
      password: 'SecurePass1!',
    };
    const result = signUpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('rejects weak password', () => {
    const invalidData = {
      role: 'Patient',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'weak',
    };
    const result = signUpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe('loginSchema', () => {
  it('validates correct login data', () => {
    const validData = {
      email: 'john@example.com',
      password: 'anypassword',
    };
    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});

describe('reviewSchema', () => {
  it('validates correct review data', () => {
    const validData = {
      patientName: 'John Doe',
      rating: 5,
      feedback: 'Great experience with the doctor!',
    };
    const result = reviewSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects short feedback', () => {
    const invalidData = {
      patientName: 'John Doe',
      rating: 5,
      feedback: 'Good',
    };
    const result = reviewSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
```

---

## Component Tests

### NavigationBar

```typescript
// src/components/NavigationBar/NavigationBar.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { NavigationBar } from './NavigationBar';
import { medicalTheme } from '../../theme/theme';

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <ThemeProvider theme={medicalTheme}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </ThemeProvider>
  );
};

describe('NavigationBar', () => {
  it('renders the StayHealthy brand', () => {
    renderWithProviders(<NavigationBar />);
    expect(screen.getByText('StayHealthy')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderWithProviders(<NavigationBar />);
    expect(screen.getByText('Appointments')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('navigates to correct route on link click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<NavigationBar />);
    
    await user.click(screen.getByText('Appointments'));
    expect(window.location.pathname).toBe('/appointments');
  });
});
```

### SignUp Form

```typescript
// src/pages/SignUp.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { SignUp } from './SignUp';
import { medicalTheme } from '../theme/theme';

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <ThemeProvider theme={medicalTheme}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </ThemeProvider>
  );
};

describe('SignUp Page', () => {
  it('renders the signup form', () => {
    renderWithProviders(<SignUp />);
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('shows validation errors for invalid input', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignUp />);
    
    await user.type(screen.getByLabelText(/email/i), 'invalid');
    await user.click(screen.getByRole('button', { name: /sign up/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignUp />);
    
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    await user.click(screen.getByLabelText(/show password/i));
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
```

---

## E2E Tests (Playwright)

### Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### User Flow Tests

```typescript
// e2e/signup-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Sign Up Flow', () => {
  test('user can complete signup', async ({ page }) => {
    await page.goto('/signup');
    
    // Fill form
    await page.getByLabel('Role').click();
    await page.getByRole('option', { name: 'Patient' }).click();
    await page.getByLabel('Full Name').fill('John Doe');
    await page.getByLabel('Email Address').fill('john@example.com');
    await page.getByLabel('Password').fill('SecurePass1!');
    
    // Submit
    await page.getByRole('button', { name: /sign up/i }).click();
    
    // Verify success
    await expect(page.getByText(/success/i)).toBeVisible();
  });

  test('shows validation errors', async ({ page }) => {
    await page.goto('/signup');
    
    await page.getByLabel('Email Address').fill('invalid');
    await page.getByRole('button', { name: /sign up/i }).click();
    
    await expect(page.getByText(/invalid email/i)).toBeVisible();
  });
});

// e2e/appointments.spec.ts
test.describe('Appointment Booking', () => {
  test('user can search and view doctors', async ({ page }) => {
    await page.goto('/appointments');
    
    // Search
    await page.getByPlaceholder(/search/i).fill('Cardiology');
    await page.getByRole('button', { name: /search/i }).click();
    
    // Verify results
    await expect(page.getByText('Dr. Sarah Johnson')).toBeVisible();
  });

  test('user can filter by specialty', async ({ page }) => {
    await page.goto('/appointments');
    
    await page.getByRole('button', { name: 'Dermatology' }).click();
    
    await expect(page.getByText('Dr. Michael Chen')).toBeVisible();
  });
});
```

---

## Test Commands

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests headed (visible browser)
npm run test:e2e:headed

# Run specific test file
npm run test -- validation.test.ts
```

---

## OWASP Security Tests

### A03: Injection Prevention

```typescript
describe('XSS Prevention', () => {
  it('sanitizes user input with special characters', () => {
    const maliciousInput = '<script>alert("xss")</script>';
    const result = searchSchema.safeParse({ query: maliciousInput });
    
    if (result.success) {
      expect(result.data.query).not.toContain('<script>');
    }
  });
});
```

### A07: Authentication Tests

```typescript
describe('Password Validation', () => {
  const testCases = [
    { password: 'short', valid: false, reason: 'too short' },
    { password: 'nouppercase1!', valid: false, reason: 'no uppercase' },
    { password: 'NOLOWERCASE1!', valid: false, reason: 'no lowercase' },
    { password: 'NoNumber!!', valid: false, reason: 'no number' },
    { password: 'NoSpecial1', valid: false, reason: 'no special char' },
    { password: 'ValidPass1!', valid: true, reason: 'meets all criteria' },
  ];

  testCases.forEach(({ password, valid, reason }) => {
    it(`${valid ? 'accepts' : 'rejects'} password: ${reason}`, () => {
      const result = signUpSchema.safeParse({
        role: 'Patient',
        name: 'Test User',
        email: 'test@example.com',
        password,
      });
      expect(result.success).toBe(valid);
    });
  });
});
```

---

## Coverage Requirements

| Category | Minimum Coverage |
|----------|-----------------|
| Statements | 80% |
| Branches | 75% |
| Functions | 80% |
| Lines | 80% |

### Critical Paths (100% Coverage Required)
- Authentication flows
- Form validation
- Navigation routing

