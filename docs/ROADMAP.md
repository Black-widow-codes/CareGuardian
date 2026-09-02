# CareGuardian Development Roadmap

CareGuardian is being developed incrementally, with each milestone strengthening the platform's clinical functionality, architecture, security, and readiness for future intelligent clinical decision support.

---

# Current Focus

## Current Version

**v0.6 – Identity & Access Management**

---

## Current Sprint

**Sprint 2 – Authorization**

### Status

**API Authorization Complete**

---

## Completed

### Authentication Foundation

- Credentials-based authentication with Auth.js
- Secure password hashing with bcrypt
- JWT-based sessions
- User identity stored in authenticated sessions
- User roles stored in authenticated sessions
- Protected administration routes
- Authenticated navigation
- Logged-in user and role displayed in navigation

### Role-Based Access Control

Implemented application roles:

- ADMIN
- DISCHARGE_COORDINATOR
- NURSE
- PATIENT_SAFETY_OFFICER

Implemented centralized permission definitions through:

`lib/auth/permissions.ts`

Current permissions include:

- VIEW_PATIENTS
- CREATE_PATIENT
- EDIT_PATIENT
- DELETE_PATIENT
- VIEW_USERS
- MANAGE_USERS
- VIEW_AUDIT_LOGS

### UI Permission Enforcement

Patient Management now adapts available actions to the authenticated user's permissions.

Implemented:

- Permission-controlled New Patient action
- Permission-controlled Edit action
- Permission-controlled Delete action
- View access retained for authorized clinical roles
- Role passed securely from the authenticated server session to the Patient Management interface

### API Authorization

Server-side authorization is now enforced independently of the user interface.

Protected endpoints:

- `GET /api/patients` → requires VIEW_PATIENTS
- `POST /api/patients` → requires CREATE_PATIENT
- `PUT /api/patients/[id]` → requires EDIT_PATIENT
- `DELETE /api/patients/[id]` → requires DELETE_PATIENT
- `GET /api/alerts` → requires authenticated patient-view access

Authorization behavior:

- Unauthenticated requests return `401 Unauthorized`
- Authenticated users without the required permission return `403 Forbidden`
- Authorized users can perform permitted operations normally

### RBAC Verification

Role-based authorization was tested using ADMIN and NURSE accounts.

Verified:

- ADMIN can create patients
- NURSE cannot create patients
- NURSE can edit patients
- NURSE cannot delete patients
- NURSE can retrieve patient information
- Unauthenticated users cannot retrieve patient information
- Authenticated NURSE can retrieve clinical alerts
- Unauthenticated users cannot retrieve clinical alerts
- Direct API requests cannot bypass UI permission restrictions

---

# Remaining v0.6 Work

## User Management

Develop administrative tools for managing CareGuardian users.

Planned:

- User management page
- Create user workflow
- Assign roles
- Update user roles
- Disable or deactivate accounts
- Administrative user search
- Permission-aware user management controls

## Session Improvements

Planned:

- Session expiration handling
- Improved authentication error handling
- Session security review
- Logout behavior review
- Additional access-control testing across all roles

## Authorization Improvements

Planned:

- Test DISCHARGE_COORDINATOR permissions
- Test PATIENT_SAFETY_OFFICER permissions
- Reduce duplicated API authorization logic where appropriate
- Review permissions as new clinical modules are introduced

---

# Next Task

Begin **User Management** for v0.6.

The first objective will be to provide administrators with a secure interface for viewing and managing CareGuardian user accounts and roles.

---

# Next Major Milestone

## v0.7 – Enterprise Security

Planned capabilities:

- Enterprise audit logging
- User activity timeline
- Authentication event logging
- Session auditing
- Security monitoring
- Security dashboard
- Administrative activity tracking

The audit architecture should record sensitive actions such as:

- Patient creation
- Patient updates
- Patient deletion
- User creation
- Role changes
- Authentication events
- Authorization failures

---

# Future CareGuardian Direction

CareGuardian is being developed as a broader digital patient-safety and clinical decision-support platform.

The current Discharge Safety functionality represents the first major clinical module. Future modules will address additional points in the patient journey where preventable errors can occur.

## Surgical Safety & Reconciliation

A future Surgical Safety module will investigate digital verification of surgical instruments, sponges, needles, and other accountable items used during procedures.

Potential capabilities include:

- Pre-operative registration and scanning of accountable surgical items
- Digital surgical safety checklist
- Patient and procedure verification
- Intraoperative item tracking
- Pre-closure inventory reconciliation
- Detection of missing or unaccounted-for items
- Safety alerts when counts do not reconcile
- Required reconciliation or authorized clinical override
- Electronic clinician sign-off
- Complete audit trail of safety checks, discrepancies, and actions

Technologies such as barcode scanning, RFID, or other appropriate identification methods may be evaluated for item identification and reconciliation.

The system should supplement established surgical safety procedures rather than replace clinical staff, manual counts, or professional judgment.

## Clinical Intelligence and AI

Future development will investigate responsible use of artificial intelligence and predictive analytics across CareGuardian modules.

Potential capabilities include:

- AI-assisted discharge readiness
- Post-discharge risk prediction
- Explainable clinical decision support
- Clinical risk-factor explanations
- AI fairness and performance monitoring
- Human-in-the-loop clinical decision-making
- Model governance and auditability

AI-generated recommendations should support rather than replace clinical judgment.

Clinicians should be able to review recommendations, understand the factors contributing to them, take appropriate action, and override recommendations when clinically justified.

## Patient Safety Architecture

The long-term CareGuardian architecture will aim to connect multiple patient-safety functions:

**Patient Data → Safety Assessment → Risk Detection → Clinical Alert → Human Review → Intervention → Audit Trail → Outcome Monitoring**

This architecture can support different clinical safety modules while maintaining common authentication, authorization, auditing, interoperability, and governance infrastructure.

## Design Principle

CareGuardian should not assume that healthcare professionals will never make mistakes.

Instead, the platform should provide additional system-level safeguards designed to detect potential errors, support clinical teams, and help prevent an error from reaching the patient.

---

# Development Principle

CareGuardian development follows this sequence:

**Build → Test → Secure → Document → Commit → Expand**

Each major milestone should be tested and documented before development proceeds to the next major capability.