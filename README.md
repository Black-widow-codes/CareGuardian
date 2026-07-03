# CareGuardian

**Patient Safety Intelligence Platform**

**Tagline:** Safer Discharges. Better Outcomes.

CareGuardian is a Patient Safety Intelligence Platform that helps healthcare teams identify discharge risks before patients leave the hospital through clinical decision support, workflow automation, and explainable safety intelligence.

---

## Current MVP

The current MVP is the **CareGuardian Discharge Safety Monitor**.

It focuses on improving hospital discharge safety by identifying missing or incomplete discharge information, generating safety alerts, and helping care teams determine whether a patient is ready for discharge.

---

## Current Features

### Clinical Decision Support

- Clinical risk scoring
- Discharge readiness assessment
- Risk factor explanation
- Recommended actions
- Automatic alert generation

### Patient Management

- View patients
- Register patients for discharge review
- Edit patient records
- Delete patient records
- Search by patient name or diagnosis
- Filter by risk level

### Dashboard

- Risk overview
- Discharge readiness summary
- Patient review list
- Patient filtering

### Alerts

- Automatic safety alerts generated from clinical risk factors
- Alert Center for reviewing open discharge risks

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

### Development

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