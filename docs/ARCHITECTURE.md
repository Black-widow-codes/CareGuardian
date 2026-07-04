# CareGuardian Architecture

**Version:** v0.5 – Full Stack Architecture

---

# Overview

CareGuardian is a **Patient Safety Intelligence Platform** designed to help healthcare teams identify, communicate, and reduce preventable patient harm during transitions of care.

The current Minimum Viable Product (MVP) is the **CareGuardian Discharge Safety Monitor**, which provides clinical decision support for safer hospital discharge.

Although the current implementation focuses on discharge safety, the platform architecture is designed to support future patient safety modules including medication safety, clinical handoffs, documentation integrity, predictive risk monitoring, and AI-assisted clinical decision support.

---

# Architectural Principles

The architecture follows several guiding principles.

## Single Responsibility

Each layer has one responsibility and should not perform the responsibilities of another layer.

Examples:

- Pages render screens.
- Components render UI.
- Hooks manage frontend data.
- Repositories manage database access.
- Business logic contains clinical rules.

---

## Separation of Concerns

The user interface never communicates directly with the database.

All communication flows through the API and repository layers.

---

## Reusable Components

User interface elements should be reusable whenever possible.

Examples include:

- PageHeader
- PatientCard
- AlertCard
- StatCard
- PatientForm
- DischargeReadinessBadge

---

## Business Logic Isolation

Clinical decision rules belong in the business logic layer rather than inside React components.

Current examples include:

- Risk Engine
- Discharge Readiness Engine
- Alert Generator

Future AI services will also integrate at this layer.

---

## Database Independence

React pages should never communicate directly with Prisma.

Database operations are isolated behind repository classes.

This makes the application easier to maintain, test, and extend.

---

## Explainable Clinical Intelligence

Every recommendation produced by CareGuardian should be explainable.

The platform is designed to support healthcare professionals rather than replace clinical judgement.

---

# System Architecture

```
Users
      │
      ▼
Next.js App Router
      │
      ▼
Reusable Components
      │
      ▼
React Hooks
(usePatients, useAlerts)
      │
      ▼
Frontend API Layer
      │
      ▼
REST API Routes
(app/api)
      │
      ▼
Repositories
      │
      ▼
Business Logic
(lib)
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL
```

---

# Folder Structure

## app/

Application routes built using the Next.js App Router.

Examples:

- Dashboard
- Patients
- Alerts
- Follow-up
- Administration

---

## app/components/

Reusable user interface components.

Examples:

- Navbar
- PageHeader
- PatientCard
- AlertCard
- StatCard
- PatientForm
- DischargeReadinessBadge

---

## app/api/

REST API endpoints used by the frontend.

Current endpoints include:

- GET /api/patients
- POST /api/patients
- PUT /api/patients/:id
- DELETE /api/patients/:id
- GET /api/alerts

Future endpoints will support authentication, AI services, and additional platform modules.

---

## hooks/

Reusable React hooks responsible for retrieving frontend data.

Current hooks include:

- usePatients
- useAlerts

Hooks communicate with the API layer rather than directly accessing the database.

---

## repositories/

Repository layer responsible for database operations.

Current repository:

- PatientRepository

Future repositories:

- AlertRepository
- UserRepository
- AuditRepository

---

## lib/

Business logic and clinical decision support.

Current modules include:

- Risk Engine
- Discharge Readiness Engine
- Alert Generator

Future modules may include:

- AI Clinical Review
- Clinical NLP
- Medication Safety Rules
- FHIR Integration

---

## prisma/

Database schema, migrations, and seed scripts.

Contains:

- Prisma schema
- Database migrations
- Seed data

---

## types/

Shared TypeScript models.

Current models include:

- Patient
- Alert
- RiskLevel

Future models will expand as additional platform modules are introduced.

---

## docs/

Project documentation.

Includes:

- README
- Vision
- Roadmap
- Changelog
- Architecture
- Healthcare innovation research

---

# Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

---

## Backend

- Next.js Route Handlers
- REST API

---

## Database

- PostgreSQL
- Prisma ORM

---

## Development

- Docker
- Git
- GitHub
- VS Code

---

## Planned Technologies

- OpenAI
- HL7 FHIR
- SMART on FHIR

---

# Data Flow

A typical request follows this sequence:

```
Browser
   │
   ▼
Page
   │
   ▼
Hook
   │
   ▼
Frontend API Client
   │
   ▼
REST API
   │
   ▼
Repository
   │
   ▼
Business Logic
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
```

This layered approach separates presentation, business logic, and persistence while maintaining a clean and scalable architecture.

---

# Current Architecture Status

Current Version:

**v0.5 – Full Stack Architecture**

Current implementation includes:

- Full-stack Next.js application
- PostgreSQL database
- Prisma ORM
- Repository pattern
- REST API
- React hooks
- Clinical decision support engines
- Patient administration module

---

# Future Architecture

The architecture is designed to support future expansion into a broader Patient Safety Intelligence Platform.

Planned platform modules include:

- Discharge Safety
- Clinical Handoff Intelligence
- Medication Safety
- Documentation Integrity
- Patient Identity Protection
- Early Risk Detection
- Incident Learning Network
- Hospital Safety Analytics
- AI Clinical Intelligence

The current architecture is intended to support these future capabilities without requiring significant structural changes.