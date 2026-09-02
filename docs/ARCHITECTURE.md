# CareGuardian Architecture

**Version:** v0.6 – Identity & Access Management

---

# Overview

CareGuardian is a **Patient Safety Intelligence Platform** designed to help healthcare teams identify potential safety risks and reduce preventable patient harm.

The current MVP is the **CareGuardian Discharge Safety Monitor**, which provides clinical decision support for safer hospital discharge.

CareGuardian is designed as a modular platform. The current architecture provides a foundation for additional patient-safety modules such as Surgical Safety & Reconciliation, clinical handoffs, medication safety, diagnostic follow-up, predictive risk monitoring, and AI-assisted clinical decision support.

---

# Architectural Principles

## Separation of Concerns

Different parts of the application have clearly defined responsibilities.

For example:

- Pages provide application screens.
- Components provide reusable interface elements.
- Hooks manage frontend data.
- API routes handle server requests.
- Repositories manage database access.
- Business logic contains clinical safety rules.
- Authentication identifies users.
- Authorization controls what users are allowed to do.

This keeps clinical logic, security, presentation, and database operations separated.

---

## Reusable Components

Common interface elements are implemented as reusable components.

Examples include:

- Navbar
- PageHeader
- PatientCard
- AlertCard
- StatCard
- PatientForm
- DischargeReadinessBadge

This reduces duplicated code and helps maintain a consistent interface.

---

## Business Logic Isolation

Clinical safety rules should not be embedded directly inside React components.

Current clinical logic includes:

- Risk Engine
- Discharge Readiness Engine
- Alert Generator

Future clinical intelligence and AI services should follow the same principle.

This allows clinical rules to evolve independently from the user interface.

---

## Database Independence

Pages and React components should not communicate directly with Prisma.

Database operations are handled through the repository layer.

This creates the following separation:

```text
Application
     ↓
Repository
     ↓
Prisma ORM
     ↓
PostgreSQL