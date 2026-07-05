# CareGuardian Changelog

All notable changes to CareGuardian are documented here.

This project follows a milestone-based development approach, with each version representing a significant improvement to the platform.

---

# v0.5 – Data Layer & Patient Management

**Status:** In Progress

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

**Status:** In Progress

### Added

- Patient search
- Diagnosis search
- Risk level filter

### Planned

- Discharge readiness filter
- Success notifications
- Error notifications
- Confirmation modal
- Client-side delete updates
- Sorting
- Pagination

---

# v0.4 – Improved User Experience

**Status:** Complete

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

**Status:** Complete

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

**Status:** Complete

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

**Status:** Complete

### Added

- Landing page
- Dashboard
- Patient review page
- Alert Center
- Follow-up Tracker
- Navigation
- Mock patient data
- Initial risk scoring