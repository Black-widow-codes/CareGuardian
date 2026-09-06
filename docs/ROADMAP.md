# CareGuardian Development Roadmap

CareGuardian is being developed incrementally, with each milestone strengthening the platform's clinical functionality, architecture, security, and readiness for future intelligent clinical decision support.

---

# Current Focus

## Current Version

**v0.7 – Security, Auditability & Access Control**

---

## Current Status

CareGuardian now has a working security foundation covering authentication, role-based authorization, staff account lifecycle management, administrator safeguards, and User Management audit logging.

The current development focus is completing remaining security verification and strengthening the audit foundation before expanding audit coverage to clinical activity.

---

# Completed

## Authentication Foundation

Implemented:

- Credentials-based authentication with Auth.js
- Secure password hashing with bcrypt
- JWT-based authenticated sessions
- Protected application routes
- Protected API endpoints
- Authenticated navigation
- Logout workflow
- Unauthorized access handling
- Database-backed user-role refresh during authenticated sessions
- Database-backed account-status refresh during authenticated sessions
- Inactive users prevented from authenticating
- Access revoked after a deactivated user's session refreshes

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

Authorization is enforced independently at the user-interface and API levels.

---

## User Management & Account Lifecycle

Implemented:

- View CareGuardian staff accounts
- Create staff accounts
- Edit names and email addresses
- Assign and update roles
- Change passwords when required
- Preserve passwords when no change is requested
- Prevent duplicate email addresses
- Hash passwords before storage
- Client-side and server-side password validation
- Activate and deactivate staff accounts
- Display Active and Inactive account status
- Prevent inactive users from authenticating
- Protect User Management APIs with server-side authorization

Passwords are never returned by User Management API responses.

---

## Administrator Safeguards

Implemented and verified:

- An administrator cannot deactivate their own authenticated account
- CareGuardian must retain at least one active Administrator
- The final active Administrator cannot be deactivated
- The final active Administrator cannot be changed to a non-administrator role

These safeguards are enforced by the server-side API.

---

## Patient Identity

Structured patient identity includes:

- Medical Record Number (MRN)
- First name
- Middle name
- Last name
- Preferred name
- Date of birth
- Sex at birth
- Gender identity
- Pronouns

CareGuardian retains compatibility with earlier patient records while using structured patient identity throughout current workflows.

---

## Audit Logging Foundation

Implemented:

- Persistent `AuditLog` database model
- Prisma migration for audit-log storage
- Actor identity snapshots
- Entity and action information
- Event descriptions and timestamps
- Database indexes supporting actor, entity, and timestamp lookup

Current User Management audit events include:

- `USER_CREATED`
- `USER_UPDATED`
- `USER_ROLE_CHANGED`
- `USER_DEACTIVATED`
- `USER_REACTIVATED`

Passwords and password hashes are excluded from audit records.

---

## Audit Log Interface

Implemented:

- Protected `/audit-logs` interface
- Display of the 100 most recent events
- Newest-first ordering
- Actor, action, target, description, and timestamp visibility
- Permission-aware Audit Log navigation
- `VIEW_AUDIT_LOGS` authorization

Verified access:

- Administrator can access the Audit Log
- Patient Safety Officer can access the Audit Log
- Nurse cannot access the Audit Log
- Unauthorized direct access redirects to the unauthorized page

---

# Current Security Hardening

The security foundation is functional, but additional work remains before CareGuardian should be considered production-ready for clinical use.

## Role Verification

Remaining:

- Complete Patient Safety Officer patient-workflow verification
- Verify restricted Patient Safety Officer patient actions
- Verify role-specific patient API behavior

## Session Security

Remaining:

- Review session expiration behavior
- Define an appropriate session lifetime
- Review broader logout and session invalidation behavior

## Authorization Architecture

Remaining:

- Reduce duplicated API authorization logic where appropriate
- Review permissions as additional clinical modules are introduced

## Audit Hardening

Remaining:

- Expand audit coverage beyond User Management
- Add audit filtering, search, and pagination
- Define audit retention policies
- Strengthen audit integrity controls
- Couple critical mutations and their audit writes transactionally where appropriate
- Add authentication-event logging
- Add authorization-failure logging
- Add additional security monitoring

The current User Management mutation and audit-write operations should not yet be considered transactionally atomic.

---

# Next Task

Strengthen the **v0.7 security and audit foundation**.

Immediate priorities are:

1. Complete remaining Patient Safety Officer workflow verification.
2. Review session expiration and broader invalidation behavior.
3. Improve audit integrity for critical mutations.
4. Expand audit coverage beyond User Management.
5. Add useful Audit Log filtering and search.

These improvements should be completed before CareGuardian's security architecture is treated as mature enough for broader clinical-module expansion.

---

# Next Major Milestone

## v0.8 – Clinical Auditability & Security Hardening

Planned capabilities include:

- Patient activity audit logging
- Authentication event logging
- Authorization failure logging
- Expanded administrative activity tracking
- Audit Log filtering and search
- Audit pagination
- Audit retention strategy
- Stronger audit integrity
- Session-security hardening
- Security monitoring foundations

Clinical audit coverage should eventually include events such as:

- Patient creation
- Patient updates
- Patient deletion
- User creation
- User profile changes
- Role changes
- Account activation and deactivation
- Password changes or resets
- Authentication events
- Authorization failures

Audit records should continue to identify who performed an action, what occurred, when it occurred, and the affected resource where appropriate.

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