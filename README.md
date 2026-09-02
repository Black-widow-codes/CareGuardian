# CareGuardian

**Patient Safety Intelligence Platform**

**Tagline:** Detect Risk. Prevent Harm. Protect Patients.

CareGuardian is a patient safety platform designed to help healthcare teams identify potential safety problems before they cause patient harm.

It combines clinical decision support, safety monitoring, alerts, workflow checks, and accountability tools to provide an additional layer of protection during important stages of patient care.

CareGuardian supports healthcare professionals in making safer decisions. It does not replace clinical judgment.

---

## Mission

Improve patient safety by ensuring critical clinical information, safety checks, and identified risks reach the right person, at the right time, with accountability.

---

## Current MVP

The current MVP is the **CareGuardian Discharge Safety Monitor**.

It helps healthcare teams identify problems that could make a patient's discharge unsafe.

Before discharge, CareGuardian checks important requirements such as:

- Medication reconciliation
- Pending tests
- Follow-up appointments
- Provider assignment
- Discharge instructions
- Home-care referrals

The system uses this information to calculate a discharge safety score, identify risk factors, and generate alerts for issues that may need attention.

The healthcare team reviews these findings and makes the final clinical decision.

---

## How It Works

1. A patient is registered for discharge review.
2. CareGuardian checks the patient's discharge requirements.
3. The system calculates a safety score and risk level.
4. Missing or incomplete requirements are identified.
5. CareGuardian explains the factors contributing to the risk.
6. Safety alerts highlight issues that may require attention.
7. Authorized healthcare staff review the information and decide what action to take.

---

## Current Features

### Clinical Decision Support

- Clinical risk scoring
- Discharge readiness assessment
- Risk factor explanations
- Recommended actions
- Automatic safety alerts

### Patient Management

- View patients
- Register patients for discharge review
- Edit patient records
- Delete patient records
- Search by patient name or diagnosis
- Filter patients by risk level

### Dashboard

- Patient safety overview
- Risk summaries
- Discharge readiness summary
- Patient review list
- Patient filtering

### Alerts

- Automatic alerts based on identified clinical risk factors
- Alert Center for reviewing unresolved discharge risks

### Identity & Access Management

- Secure user authentication
- Role-based access control (RBAC)
- Permission-based actions
- Protected administrative pages
- Protected patient and alert APIs
- Server-side authorization

---

## Current Development Status

CareGuardian is currently in **v0.6 – Identity & Access Management**.

The current development phase is strengthening authentication, authorization, user access, and security before the platform expands into additional patient-safety capabilities.

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for the development roadmap.

See [`docs/CHANGELOG.md`](docs/CHANGELOG.md) for completed development milestones.

---

## Future Direction

CareGuardian is not intended to remain only a discharge application.

The long-term goal is to develop it into a modular **Patient Safety Intelligence Platform** supporting areas such as:

- Discharge Safety
- Surgical Safety & Reconciliation
- Clinical Handoffs
- Medication Safety
- Diagnostic Follow-up Safety
- Documentation Quality
- Predictive Risk Monitoring
- Hospital Safety Analytics
- Responsible AI-assisted clinical decision support

For the complete mission, vision, principles, and long-term platform direction, see [`docs/VISION.md`](docs/VISION.md).

---

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- REST API

### Database

- PostgreSQL
- Prisma ORM
- Docker

### Development Tools

- VS Code
- Git
- GitHub

---

## Architecture Overview

CareGuardian follows a layered full-stack architecture:

```text
User Interface
      ↓
Reusable Components
      ↓
React Hooks
      ↓
Frontend API Clients
      ↓
Next.js API Routes
      ↓
Repositories
      ↓
Prisma ORM
      ↓
PostgreSQL