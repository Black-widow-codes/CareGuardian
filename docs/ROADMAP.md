# CareGuardian Roadmap

## Current Version

**v0.6 – Identity & Access Management (IAM)**

---

# Product Vision

CareGuardian is a **Patient Safety Intelligence Platform**.

Its mission is to help healthcare teams reduce preventable patient harm by improving clinical communication, decision support, and accountability throughout the continuum of care.

The first product is:

## CareGuardian Discharge Safety Monitor

The Discharge Safety Monitor is the first module of the broader CareGuardian Platform.

---

# Platform Evolution

## Phase 1 — CareGuardian Discharge Safety Monitor

Current MVP

Focus:

- Safe patient discharge
- Clinical risk assessment
- Discharge readiness
- Patient administration
- Clinical alerts
- Identity & access management

---

## Phase 2 — Clinical Workflow Intelligence

Future modules:

- Clinical handoff intelligence
- Care coordination
- Follow-up tracking
- Clinical communication workflows

---

## Phase 3 — Patient Safety Intelligence Platform

Platform expansion:

- Medication Safety
- Documentation Integrity
- Early Risk Detection
- Incident Learning Network
- Hospital Safety Analytics

---

## Phase 4 — AI Clinical Intelligence Platform

Future AI capabilities:

- AI discharge review
- Clinical NLP
- Missing information detection
- AI-assisted risk explanation
- Explainable clinical recommendations
- Predictive patient safety analytics

---

# Development Roadmap

---

# v0.1 – Working Prototype

**Status:** ✅ Complete

Completed:

- Landing page
- Dashboard
- Patient review
- Alert Center
- Follow-up Tracker
- Navigation
- Mock patient data
- Initial risk engine

---

# v0.2 – Clean Architecture

**Status:** ✅ Complete

Completed:

- Shared components
- Shared TypeScript models
- Service layer
- Repository pattern foundation
- Reusable cards
- Shared mock data
- Risk Engine
- Improved project structure

---

# v0.3 – Clinical Decision Support Foundation

**Status:** ✅ Complete

Completed:

- Expanded patient model
- Medication reconciliation
- Follow-up tracking
- Pending tests
- Provider assignment
- Discharge instructions
- Home care referral
- Risk explanation
- Alert generation
- Discharge Readiness Engine
- Dashboard readiness summary

---

# v0.4 – Professional User Experience

**Status:** ✅ Complete

Completed:

- Reusable PageHeader
- Improved dashboard
- Improved patient review
- Improved safety score layout
- Improved checklist layout
- Improved risk explanation
- Responsive layouts
- Consistent page headers

---

# v0.5 – Data Layer & Patient Management

**Status:** ✅ Complete

## Sprint 1 — Database Foundation

Completed

- PostgreSQL
- Docker
- Prisma ORM
- Database migrations
- Seed data
- Prisma Studio

### Sprint 2 — Read Operations

Completed

- Patient Repository
- Alerts Repository
- GET Patients API
- GET Alerts API
- Frontend API layer
- usePatients
- useAlerts
- PostgreSQL integration
- Removed legacy mock services

### Sprint 3 — Patient Management

Completed

- Create patient
- Edit patient
- Delete patient
- Patient Management page
- Register Patient page
- Edit Patient page
- Reusable PatientForm
- Shared Create/Edit workflow

### Sprint 4 — Administration Experience

Completed

- Patient search
- Diagnosis search
- Risk filter
- Discharge readiness filter
- Toast notifications
- Reusable confirmation dialog
- Client-side delete updates
- Instant React updates

Future Enhancements

- Sorting
- Pagination
- Bulk actions

---

# v0.6 – Identity & Access Management (IAM)

**Status:** 🚧 In Progress

## Sprint 1 — Authentication Foundation

Completed

- Auth.js
- Prisma Adapter
- bcrypt password hashing
- User model
- UserRole enum
- Administrator seed
- Credentials authentication
- Custom login page
- Protected admin routes
- User navigation
- Authenticated user display
- Logout

## Sprint 2 — Authorization

In Progress

Completed

- Route protection
- Session integration
- Authenticated navigation

Remaining

- Role-based permissions
- API authorization
- User management
- Session improvements

---

# v0.7 – Enterprise Security

**Planned**

- Audit logging
- Activity timeline
- User management
- Password reset
- Account recovery
- Security dashboard
- Multi-factor authentication preparation
- Session auditing

---

# v0.8 – AI Clinical Intelligence

**Planned**

- AI discharge review
- Clinical NLP
- Missing information detection
- AI-generated risk explanations
- Explainable recommendations
- Predictive patient safety analytics

---

# Beyond v1.0

Future platform modules

- Clinical Handoff Intelligence
- Medication Safety
- Documentation Integrity
- Patient Identity Protection
- Early Risk Detection
- Incident Learning Network
- Hospital Safety Analytics
- AI Clinical Copilot
- FHIR Integration
- SMART on FHIR
- Hospital Administration Portal

---

# Major Milestones

✅ v0.1 Working Prototype

✅ v0.2 Clean Architecture

✅ v0.3 Clinical Decision Support

✅ v0.4 Professional User Experience

✅ v0.5 Full Stack Data Layer

🚧 v0.6 Identity & Access Management

⬜ v0.7 Enterprise Security

⬜ v0.8 AI Clinical Intelligence

⬜ v1.0 CareGuardian Platform

---

# Current Focus

Current Version

**v0.6 – Identity & Access Management**

Current Sprint

**Sprint 2 – Authorization**

Current Priority

Implement role-based access control (RBAC) and secure API authorization.

Next Major Milestone

**v0.7 – Enterprise Security**

---

# CareGuardian v1.0 Vision

The first production-ready release will include:

- Identity & Access Management
- Audit Logging
- Patient Management
- Clinical Decision Support
- Alerts
- Discharge Readiness
- PostgreSQL
- Prisma ORM
- REST APIs
- Modern React Architecture
- Professional Documentation

This release establishes the foundation for the broader **CareGuardian Patient Safety Intelligence Platform**.