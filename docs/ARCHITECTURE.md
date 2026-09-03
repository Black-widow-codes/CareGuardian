# CareGuardian Architecture

**Version:** v0.6 – Identity & Access Management

---

# Overview

CareGuardian is a **Patient Safety Intelligence Platform** designed to help healthcare teams identify potential safety risks, strengthen clinical safety workflows, and reduce preventable patient harm.

The current MVP is the **CareGuardian Discharge Safety Monitor**, which provides clinical decision support for safer hospital discharge.

CareGuardian is designed as a modular platform. The architecture provides a foundation for future patient-safety modules such as:

- Surgical Safety & Reconciliation
- Clinical Handoffs
- Medication Safety
- Diagnostic Follow-up Safety
- Post-Discharge Monitoring
- Predictive Risk Monitoring
- Hospital Safety Analytics
- AI-assisted Clinical Decision Support

---

# Technology Stack

The current CareGuardian application uses:

- Next.js
- React
- TypeScript
- PostgreSQL
- Prisma ORM
- Auth.js
- bcrypt
- Tailwind CSS

Docker is used to support the local PostgreSQL development environment.

---

# High-Level Architecture

CareGuardian currently follows a layered web application architecture.

```text
User
  ↓
Next.js User Interface
  ↓
Authentication & Authorization
  ↓
Server Components / API Routes
  ↓
Application & Clinical Logic
  ↓
Prisma ORM
  ↓
PostgreSQL