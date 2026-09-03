# CareGuardian Development Roadmap

CareGuardian is being developed incrementally, with each milestone strengthening the platform's clinical functionality, architecture, security, and readiness for future intelligent clinical decision support.

---

# Current Focus

## Current Version

**v0.6 – Identity & Access Management**

---

## Current Sprint

**Sprint 3 – Identity & Access Hardening**

### Status

**Core Authentication, RBAC, and User Management Complete**

The remaining v0.6 work focuses on strengthening session security, completing role verification, and preparing the platform for enterprise auditability.

---

# Completed

## Authentication Foundation

Implemented:

- Credentials-based authentication with Auth.js
- Secure password hashing with bcrypt
- JWT-based sessions
- User identity stored in authenticated sessions
- User roles stored in authenticated sessions
- Protected application routes
- Authenticated navigation
- Logout workflow
- Unauthorized access handling

---

## Role-Based Access Control

Implemented application roles:

- ADMIN
- DISCHARGE_COORDINATOR
- NURSE
- PATIENT_SAFETY_OFFICER

Centralized permission definitions are maintained in:

`lib/auth/permissions.ts`

Current permissions include:

- VIEW_PATIENTS
- CREATE_PATIENT
- EDIT_PATIENT
- DELETE_PATIENT
- VIEW_USERS
- MANAGE_USERS
- VIEW_AUDIT_LOGS

---

## UI Permission Enforcement

CareGuardian adapts available actions and navigation to the authenticated user's permissions.

Implemented:

- Permission-controlled New Patient action
- Permission-controlled Edit Patient action
- Permission-controlled Delete Patient action
- Permission-aware User Management access
- Administrator-only Admin navigation
- Access Denied page for restricted administrative functions
- Authenticated user displayed in navigation
- Role information used for authorization without unnecessary role labels in the main navigation

---

## API Authorization

Server-side authorization is enforced independently of the user interface.

Protected patient and clinical endpoints include:

- `GET /api/patients` → requires VIEW_PATIENTS
- `POST /api/patients` → requires CREATE_PATIENT
- `PUT /api/patients/[id]` → requires EDIT_PATIENT
- `DELETE /api/patients/[id]` → requires DELETE_PATIENT
- `GET /api/alerts` → requires authenticated patient-view access

Protected user-management endpoints include:

- `GET /api/users` → requires VIEW_USERS
- `POST /api/users` → requires MANAGE_USERS
- `PUT /api/users/[id]` → requires MANAGE_USERS

Authorization behavior:

- Unauthenticated requests return `401 Unauthorized`
- Authenticated users without the required permission return `403 Forbidden`
- Authorized users can perform permitted operations normally
- Direct API requests cannot bypass interface permission restrictions

---

## User Management

Administrative User Management is implemented.

Current capabilities include:

- View CareGuardian staff accounts
- Create new staff accounts
- Edit user names
- Edit user email addresses
- Assign and update user roles
- Change user passwords when required
- Preserve an existing password when no password change is requested
- Prevent duplicate email addresses
- Hash passwords before storage
- Validate passwords on both the client and server
- Restrict User Management to authorized administrators
- Protect user-management APIs with server-side authorization

Passwords are never returned by User Management API responses.

---

## Patient Identity

Structured patient identity has been added to the CareGuardian patient model.

Implemented fields include:

- Medical Record Number (MRN)
- First name
- Middle name
- Last name
- Preferred name
- Date of birth
- Sex at birth
- Gender identity
- Pronouns

CareGuardian uses structured patient names while retaining compatibility with earlier patient records during migration.

---

## RBAC Verification

Role-based authorization has been manually tested across key workflows.

Verified:

### Administrator

- Can view User Management
- Can create users
- Can edit users
- Can assign roles
- Can manage patients

### Nurse

- Can view patient information
- Can edit patients
- Cannot create patients
- Cannot delete patients
- Cannot access User Management
- Direct restricted API requests return `403 Forbidden`

### Discharge Coordinator

- Can view patients
- Can create patients
- Can edit patients
- Cannot access User Management
- Cannot perform user-management operations through direct API requests
- Direct restricted user-management API requests return `403 Forbidden`

### Authentication Protection

- Unauthenticated users cannot retrieve protected patient information
- Unauthenticated users cannot retrieve protected clinical alerts
- Interface restrictions cannot be bypassed through tested direct API requests

---

# Remaining v0.6 Work

## Complete Role Verification

The Patient Safety Officer role still requires complete workflow verification.

Planned:

- Test PATIENT_SAFETY_OFFICER patient access
- Test PATIENT_SAFETY_OFFICER restricted actions
- Test audit-log permission behavior when audit logging becomes available
- Review all role permissions before closing v0.6

---

## Session Security

Current JWT sessions capture role information at authentication time.

Before role administration is considered fully hardened, CareGuardian should address the possibility that a user's permissions may change while an existing session remains active.

Planned:

- Ensure role changes are reflected securely in active or subsequent sessions
- Review session expiration behavior
- Review authentication error handling
- Review logout and session invalidation behavior
- Define appropriate session lifetime
- Test access after administrative role changes

---

## Account Lifecycle

Planned:

- Account activation and deactivation
- Prevent inactive users from authenticating
- Safeguards against accidental loss of administrative access
- Review administrator self-role changes
- Additional account security controls

Hard deletion of staff accounts should not be the default account-management strategy because historical user identity may be required for future audit records.

---

# Next Task

Complete **v0.6 Identity & Access Hardening**.

The immediate priorities are:

1. Verify the Patient Safety Officer role.
2. Strengthen session behavior when user roles change.
3. Review administrator account safeguards.
4. Prepare authentication and authorization events for future audit logging.

Once these controls are stable and tested, v0.6 can be closed and development can move to enterprise auditability.

---

# Next Major Milestone

## v0.7 – Enterprise Security & Auditability

Planned capabilities include:

- Enterprise audit logging
- User activity timeline
- Authentication event logging
- Authorization failure logging
- Session auditing
- Security monitoring
- Administrative activity tracking
- Audit review interface

The audit architecture should support sensitive events such as:

- Patient creation
- Patient updates
- Patient deletion
- User creation
- User profile changes
- Role changes
- Password changes or resets
- Authentication events
- Authorization failures

Audit records should identify who performed an action, what action occurred, when it occurred, and the affected resource where appropriate.

---

# Future CareGuardian Direction

CareGuardian is being developed as a broader digital patient-safety and clinical decision-support platform.

The current **Discharge Safety Monitor** represents the first major clinical module.

Future modules will address additional points in the patient journey where preventable errors can occur.

---

## Surgical Safety & Reconciliation

A future Surgical Safety & Reconciliation module will investigate digital safeguards around surgical procedures and accountable items.

Potential capabilities include:

- Pre-operative registration and scanning of accountable surgical items
- Digital surgical safety checks
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

---

## Clinical Intelligence and AI

Future development will investigate the responsible use of artificial intelligence and predictive analytics across CareGuardian modules.

Potential capabilities include:

- AI-assisted discharge readiness
- Post-discharge risk prediction
- Explainable clinical decision support
- Clinical NLP
- Missing clinical information detection
- Predictive patient-safety analytics
- AI fairness and performance monitoring
- Human-in-the-loop clinical decision-making
- Model governance and auditability

AI-generated recommendations should support rather than replace clinical judgment.

Clinicians should be able to review recommendations, understand contributing factors, take appropriate action, and override recommendations when clinically justified.

---

## Patient Safety Architecture

The long-term CareGuardian architecture aims to connect multiple patient-safety functions:

**Patient Data → Safety Assessment → Risk Detection → Clinical Alert → Human Review → Intervention → Audit Trail → Outcome Monitoring**

This architecture can support multiple clinical safety modules while maintaining common authentication, authorization, auditing, interoperability, and governance infrastructure.

---

# Design Principle

CareGuardian should not assume that healthcare professionals will never make mistakes.

Instead, the platform should provide additional system-level safeguards designed to detect potential errors, support clinical teams, and help prevent an error from reaching the patient.

---

# Development Principle

CareGuardian development follows this sequence:

**Build → Test → Secure → Document → Commit → Expand**

Each major milestone should be tested and documented before development proceeds to the next major capability.