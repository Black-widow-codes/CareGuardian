# CareGuardian Roadmap

## Current Version

v0.5 – Data Layer

---

## Product Direction

CareGuardian is a Patient Safety Intelligence Platform.

The current MVP is:

CareGuardian Discharge Safety Monitor

The MVP is the entry point into the broader platform, not the final product.

---

## Current Goal

Complete v0.5 by moving patient and alert reads from mock data to PostgreSQL through API routes.

---

## v0.1 – Working Prototype

Status: Complete

Completed:
- Landing page
- Dashboard
- Patient review page
- Dynamic patient pages
- Alert center
- Follow-up tracker
- Navigation
- Mock patient data
- Basic risk engine

---

## v0.2 – Clean Architecture

Status: Complete

Completed:
- Shared components
- Shared patient data
- Shared TypeScript types
- Risk engine
- Patient service
- Alert service
- Service layer migration
- Reusable PatientCard
- Reusable AlertCard
- Reusable StatCard

---

## v0.3 – Clinical Decision Support Foundation

Status: Complete

Completed:
- Expanded clinical patient model
- Added discharge checklist fields
- Added medication reconciliation status
- Added pending test status
- Added follow-up appointment status
- Added provider assignment status
- Updated risk engine rules
- Added structured risk factors
- Added risk explanation panel
- Added automatic alert generation
- Added discharge readiness engine
- Added discharge readiness badge
- Added dashboard readiness summary
- Added patient filtering by readiness

---

## v0.4 – Improved User Experience

Status: Complete

Completed:
- Improved dashboard layout
- Improved statistic cards
- Added reusable PageHeader component
- Improved patient review header
- Improved patient summary section
- Improved safety score layout
- Improved discharge checklist layout
- Improved risk explanation layout
- Applied consistent page headers to Dashboard, Patients, Alerts, and Follow-up pages

---

## v0.5 – Data Layer

Status: In Progress

### Sprint 1 – Database Foundation

Status: Complete

Completed:
- PostgreSQL running in Docker
- Prisma installed
- Prisma initialized
- DATABASE_URL configured
- Patient model added to Prisma schema
- Initial migration created
- Database seeded with patient data
- Prisma Studio verified

### Sprint 2 – Read Operations

Status: In Progress

Completed:
- Patient repository created
- Prisma client helper created
- GET /api/patients created
- GET /api/alerts created
- Frontend patient API client created
- usePatients hook created
- Dashboard reads patients through API
- Patients page reads patients through API
- Patient details page reads from database

Remaining:
- Create frontend alert API client
- Create useAlerts hook
- Alerts page reads alerts through API
- Remove legacy patientService if no longer used
- Remove remaining mock patient reads

### Sprint 3 – Write Operations

Planned:
- Create patient
- Update patient
- Delete patient

### Sprint 4 – Remove Mock Data

Planned:
- Remove mockPatients
- Remove legacy mock services
- Database becomes the single source of truth

---

## v0.6 – Authentication and Roles

Planned:
- Login
- Role-based access
- Discharge Coordinator role
- Nurse role
- Patient Safety Officer role

---

## v0.7 – AI/NLP Features

Planned:
- Discharge summary analysis
- Missing information detection
- Follow-up extraction
- Risk explanation generation

---

## Future Platform Modules

- Clinical Handoff Intelligence
- Documentation Integrity
- Medication Safety
- Patient Identity Protection
- Surgical Safety
- Early Risk Detection
- Incident Learning Network
- Hospital Resilience Dashboard

---

## Current Next Task

Create `useAlerts` and migrate the Alerts page to read alerts through `/api/alerts`.