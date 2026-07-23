# CareGuardian Changelog

All notable changes to CareGuardian are documented here.

This project follows a milestone-based development approach, with each version representing a significant improvement to the platform.

---

# v0.6 – Identity & Access Management (IAM)

**Status:** 🚧 In Progress

## Sprint 1 – Authentication Foundation

### Added

#### Authentication

- Integrated Auth.js for application authentication
- Credentials-based authentication
- Custom login page
- Secure logout functionality
- Protected administrator routes

#### User Management

- User database model
- UserRole enum
- Administrator seed account
- Secure password hashing with bcrypt
- Prisma authentication integration

#### Session Management

- JWT session strategy
- User ID stored in session
- User role stored in session
- Authenticated user navigation
- Logged-in user display

#### Security

- Protected administrative pages
- Authentication middleware
- Session validation

---

## Sprint 2 – Authorization

**Status:** 🚧 In Progress

### Added

#### Role-Based Access Control (RBAC)

- Centralized RBAC architecture
- Strongly typed Permission model
- Strongly typed UserRole model
- Permission mapping for each role
- `hasPermission()` authorization helper

Supported roles:

- Administrator
- Nurse
- Discharge Coordinator
- Patient Safety Officer

#### Route Authorization

- Server-side authorization
- Protected Patient Management page
- Unauthorized redirect handling
- Session-based permission validation

#### Architecture

- Server / Client component separation
- Authorization handled in Server Components
- Interactive UI handled in Client Components

### In Progress

#### User Interface Authorization

- Permission-aware Patient Management page
- Role-specific action visibility
- Conditional rendering based on permissions

#### Planned

- API authorization
- User management
- Session improvements

---

# v0.5 – Data Layer & Patient Management

**Status:** ✅ Complete

## Sprint 1 – Database Foundation

### Added

- PostgreSQL database
- Docker development environment
- Prisma ORM
- Patient database schema
- Initial database migration
- Seed data
- Prisma Studio support
- Patient Repository
- Prisma client helper

---

## Sprint 2 – Read Operations

### Added

- GET /api/patients
- GET /api/alerts
- Frontend patient API
- Frontend alert API
- usePatients hook
- useAlerts hook

### Changed

- Dashboard now loads patients from PostgreSQL
- Patient List now loads patients from PostgreSQL
- Patient Details now load from PostgreSQL
- Alerts now load from PostgreSQL

### Removed

- Legacy patient service
- Legacy alert service
- Mock data dependency for application reads

---

## Sprint 3 – Patient Management

### Added

#### Backend

- Create Patient API
- Update Patient API
- Delete Patient API

#### Administration

- Patient Management page
- Register Patient page
- Edit Patient page
- Reusable PatientForm
- Shared Create/Edit workflow
- Delete patient workflow

### Improved

- Loading state during form submission
- Navigation between administration pages

---

## Sprint 4 – Administration Experience

**Status:** ✅ Complete

### Added

- Patient search
- Diagnosis search
- Risk level filter
- Discharge readiness filter
- Success notifications
- Error notifications
- Confirmation dialog
- Client-side delete updates
- Instant React updates

### Planned

- Sorting
- Pagination
- Bulk actions

---

# v0.4 – Professional User Experience

**Status:** ✅ Complete

### Added

- Reusable PageHeader
- Improved dashboard layout
- Improved patient review layout
- Improved safety score display
- Improved discharge checklist
- Improved risk explanation panel
- Consistent page headers

---

# v0.3 – Clinical Decision Support Foundation

**Status:** ✅ Complete

### Added

- Expanded patient model
- Medication reconciliation tracking
- Pending test tracking
- Follow-up tracking
- Provider assignment tracking
- Discharge instructions tracking
- Home care referral tracking
- Risk Explanation component
- Discharge Readiness Engine
- Alert Generator

### Improved

- Clinical risk engine
- Dashboard summaries
- Patient review workflow

---

# v0.2 – Clean Architecture

**Status:** ✅ Complete

### Added

- Shared TypeScript models
- Service layer
- Shared components
- Risk Engine
- Reusable cards
- Shared mock data

### Improved

- Component reuse
- Project organization
- Separation of concerns

---

# v0.1 – Working Prototype

**Status:** ✅ Complete

### Added

- Landing page
- Dashboard
- Patient review page
- Alert Center
- Follow-up Tracker
- Navigation
- Mock patient data
- Initial risk scoring