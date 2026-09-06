# CareGuardian Architecture

**Version:** v0.7 - Security, Auditability & Access Control

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
  |
  v
Next.js User Interface
  |
  v
Authentication & Authorization
  |
  v
Server Components / API Routes
  |
  v
Application & Clinical Logic
  |
  v
Prisma ORM
  |
  v
PostgreSQL
---

# Authentication Architecture

CareGuardian uses **Auth.js Credentials authentication** for staff sign-in.

Passwords are hashed with **bcrypt** before being stored in PostgreSQL. Plain-text passwords are not persisted.

Authentication sessions use JWT-based session handling. During authentication and session refresh, CareGuardian retrieves current security-sensitive user information from the database, including:

- User ID
- User role
- Account activation status

This prevents authorization decisions from depending indefinitely on stale role or account-status information.

If an account becomes inactive, the user is no longer treated as an authenticated CareGuardian user after the session refreshes.

---

# Role-Based Access Control

CareGuardian uses centralized role-based access control through:

`lib/auth/permissions.ts`

Current roles are:

- ADMIN
- DISCHARGE_COORDINATOR
- NURSE
- PATIENT_SAFETY_OFFICER

Current permissions include:

- VIEW_PATIENTS
- CREATE_PATIENT
- EDIT_PATIENT
- DELETE_PATIENT
- VIEW_USERS
- MANAGE_USERS
- VIEW_AUDIT_LOGS

Protected pages and API routes enforce permissions on the server.

Navigation visibility is not treated as a security control. A user who manually enters a protected URL must still pass the server-side permission check.

---

# User Account Lifecycle

CareGuardian supports active and inactive staff accounts through the `isActive` field on the User model.

Administrators can:

- Create staff accounts
- Assign roles
- Change roles
- Activate accounts
- Deactivate accounts
- Update staff account information

Inactive accounts cannot successfully authenticate.

Existing sessions also refresh account status from the database, allowing account deactivation to revoke continued application access.

---

# Administrator Safeguards

CareGuardian includes safeguards designed to prevent administrative lockout.

An administrator cannot deactivate their own currently authenticated account.

The system also prevents changes that would leave CareGuardian without at least one active administrator.

This protection applies when an active administrator would otherwise be:

- Deactivated
- Changed to a non-administrator role

These safeguards are enforced by the server-side user-management API.

---

# Audit Logging Architecture

CareGuardian stores security-relevant activity in the PostgreSQL `AuditLog` table.

Each audit record contains:

- Actor user ID
- Actor name
- Actor email
- Actor role
- Action
- Entity type
- Entity ID
- Human-readable description
- Timestamp

Actor identity details are stored as snapshots so historical records remain understandable even if a staff account is later changed.

Current user-management audit events include:

- USER_CREATED
- USER_UPDATED
- USER_ROLE_CHANGED
- USER_DEACTIVATED
- USER_REACTIVATED

Passwords and password hashes are not written to the audit log.

The AuditLog table is indexed for:

- Actor user ID
- Entity type and entity ID
- Creation timestamp

---

# Audit Log Access

CareGuardian provides a protected Audit Log interface at:

`/audit-logs`

The page currently displays the 100 most recent audit events, newest first.

Access requires the `VIEW_AUDIT_LOGS` permission.

Current roles with this permission are:

- ADMIN
- PATIENT_SAFETY_OFFICER

Nurses and Discharge Coordinators cannot access the page, even by manually entering the URL.

The navigation bar uses the same permission system, so the Audit Log link is displayed only to authorized users.

---

# Patient Data Architecture

Patient information is stored in PostgreSQL through Prisma.

The patient model supports structured patient identity, including:

- Medical Record Number (MRN)
- First name
- Middle name
- Last name
- Preferred name
- Sex at birth
- Gender identity
- Pronouns

A legacy patient name field remains available for compatibility while structured identity information supports newer workflows.

A shared patient display-name helper is used to present names consistently across CareGuardian.

---

# Database Layer

Prisma ORM provides the application data-access layer between Next.js and PostgreSQL.

Database schema changes are managed through Prisma migrations.

Current core persisted entities include:

- User
- Patient
- AuditLog

PostgreSQL runs in Docker for the current local development environment.

---

# Security Principles

The current CareGuardian architecture follows these foundational principles:

1. Authentication is verified on the server.
2. Authorization is permission-based and enforced on protected operations.
3. Passwords are hashed before storage.
4. Account status can revoke application access.
5. Administrator safeguards help prevent system lockout.
6. Security-relevant user-management activity is auditable.
7. Audit records do not contain passwords or password hashes.
8. User-interface visibility is not a substitute for server-side authorization.

---

# Current Architectural Boundary

CareGuardian is currently a development-stage patient-safety platform and should not yet be treated as a production clinical system.

Future production work will require additional capabilities such as:

- Expanded audit coverage for patient and clinical actions
- Audit-log filtering, search, pagination, and retention policies
- Stronger audit-log integrity controls
- Production-grade secrets management
- Enhanced session security
- Formal privacy and security review
- Backup and disaster-recovery procedures
- Production monitoring and alerting
- Healthcare interoperability
- Clinical validation and governance
- Deployment hardening

---

# Architectural Direction

CareGuardian should continue evolving as a modular **patient-safety and clinical decision-support platform**.

The Discharge Safety Monitor is the first clinical module rather than the architectural limit of the system.

Future patient-safety modules should reuse shared foundations for:

- Identity
- Authentication
- Authorization
- Patient identity
- Auditability
- Clinical data access
- Safety rules
- Clinical intelligence

This allows CareGuardian to expand without rebuilding its core security and patient-data architecture for each new module.