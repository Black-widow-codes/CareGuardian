# CareGuardian Features

## Overview

CareGuardian is a **Patient Safety Intelligence Platform** designed to help healthcare teams identify potential safety risks, strengthen critical clinical workflows, and reduce preventable patient harm.

The current MVP is the **CareGuardian Discharge Safety Monitor**.

It focuses on identifying discharge safety gaps before a patient leaves the hospital while providing healthcare professionals with explainable risk information, discharge-readiness support, and safety alerts.

---

# Dashboard

## Clinical Overview

The dashboard provides healthcare staff with a quick overview of current patient safety information.

Current capabilities include:

- Patient statistics
- Risk overview
- Discharge readiness summary
- Patient review list
- Quick access to patient records
- Risk-based filtering

---

# Patient Management

## Patient Records

Authorized users can:

- View patient records
- Register patients for discharge review
- Edit patient information
- Delete patient records when permitted by their role

Patient actions are controlled through role-based permissions.

## Patient Identity

CareGuardian supports structured patient identity information, including:

- Medical Record Number (MRN)
- First name
- Middle name
- Last name
- Preferred name
- Date of birth
- Sex at birth
- Gender identity
- Pronouns

The application uses structured patient names while maintaining compatibility with earlier patient records.

## Search & Filtering

Current capabilities include:

- Search by patient name
- Search by diagnosis
- Filter by clinical risk level

Planned:

- Discharge readiness filtering
- Additional sorting and filtering options

---

# Clinical Decision Support

## Risk Engine

CareGuardian automatically evaluates discharge safety using structured clinical rules.

Current assessment factors include:

- Medication reconciliation
- Follow-up appointments
- Pending diagnostic tests
- Provider assignment
- Discharge instructions
- Home-care referrals

The system uses these factors to calculate a safety score and determine the patient's current risk level.

---

## Discharge Readiness Engine

CareGuardian evaluates whether discharge requirements have been sufficiently completed.

A patient may be classified as:

- Ready for Discharge
- Ready with Actions Required
- Not Ready for Discharge

The assessment provides decision support to healthcare professionals. It does not replace clinical judgment.

---

## Risk Explanation

CareGuardian explains why a patient received a particular safety assessment.

Current capabilities include:

- Identification of contributing risk factors
- Explanation of incomplete discharge requirements
- Recommended actions
- Connection between identified risks and safety alerts

This allows healthcare professionals to understand why the system identified a patient as requiring additional attention.

---

# Alert Center

CareGuardian automatically generates safety alerts based on identified patient risks.

Current capabilities include:

- High-risk patient alerts
- Missing discharge requirement alerts
- Clinical follow-up reminders
- Alert review through the Alert Center
- Protected alert API access

Alerts are generated from patient safety information and are intended to draw attention to issues that may require clinical review.

---

# Identity & Access Management

CareGuardian includes authentication and role-based authorization to control access to patient information and system functions.

## Authentication

Current capabilities include:

- Secure user login
- Password hashing
- Authenticated user sessions
- Protected application routes
- Protected API endpoints
- Logout and return to the login screen

## Role-Based Access Control

Current system roles include:

- Administrator
- Discharge Coordinator
- Nurse
- Patient Safety Officer

Permissions determine which actions each role can perform.

Current permissions include:

- View patients
- Create patients
- Edit patients
- Delete patients
- View users
- Manage users
- View audit logs

## Authorization

Authorization is enforced at both the user-interface and API levels.

Examples include:

- Nurses can view and edit patient records but cannot create or delete patients.
- Discharge Coordinators can view, create, and edit patient records but cannot access User Management.
- Administrators can perform full patient management and manage staff accounts.
- Unauthorized API requests return `401 Unauthorized`.
- Authenticated users without the required permission receive `403 Forbidden`.
- Users without permission to access an administrative page are redirected to an Access Denied page.

This prevents users from bypassing interface restrictions by directly calling protected APIs.

---

# Administration

## Patient Administration

Current capabilities include:

- Patient management
- Shared patient forms
- CRUD operations
- Search and filtering
- Permission-aware user interface

## User Management

Authorized administrators can manage CareGuardian staff accounts through the User Management interface.

Current capabilities include:

- View system users
- Create staff accounts
- Edit user names
- Edit user email addresses
- Assign CareGuardian roles
- Change a user's password when required
- Preserve the existing password when no password change is requested
- Prevent duplicate user email addresses
- Validate passwords on both the client and server
- Restrict User Management to authorized administrators
- Protect User Management APIs with server-side authorization

Passwords are hashed before storage and are never returned by the User Management API.

Planned administrative capabilities include:

- Account activation and deactivation
- Additional account security controls
- Sorting and pagination
- Administrative audit logging

---

# Data Layer

Current implementation includes:

- PostgreSQL
- Prisma ORM
- Repository pattern
- REST API
- React Hooks

The repository layer separates application logic from direct database access and provides a foundation for future platform expansion.

---

# Security & Auditability

## Current

- User authentication
- Password hashing
- Authenticated sessions
- Role-based access control (RBAC)
- Permission-based authorization
- Protected patient APIs
- Protected alert APIs
- Protected user-management APIs
- Server-side authorization
- Administrative user management
- Client-side and server-side password validation
- Unauthorized access handling
- `401 Unauthorized` handling
- `403 Forbidden` handling
- Permission-aware navigation and interface controls

## Planned

- Account activation and deactivation
- Session management improvements
- Audit logging
- Security event tracking
- Login attempt monitoring
- Additional enterprise security controls

---

# Artificial Intelligence & Clinical Intelligence

Artificial intelligence is a future CareGuardian capability rather than a replacement for healthcare professionals or the platform's existing safety rules.

Potential future capabilities include:

- AI-assisted discharge readiness
- Post-discharge risk prediction
- Clinical NLP
- Missing clinical information detection
- Explainable clinical recommendations
- Predictive patient-safety analytics
- AI fairness and performance monitoring
- Human-in-the-loop decision support
- Model governance and auditability

AI-generated recommendations should support rather than replace clinical judgment.

---

# Future Platform Modules

CareGuardian is being designed as a modular patient-safety platform.

The **Discharge Safety Monitor** is the current clinical module.

Future areas may include:

- Surgical Safety & Reconciliation
- Clinical Handoffs
- Medication Safety
- Diagnostic Follow-up Safety
- Documentation Quality
- Post-Discharge Monitoring
- Predictive Risk Monitoring
- Hospital Safety Analytics
- AI-assisted Clinical Decision Support

## Surgical Safety & Reconciliation

A future Surgical Safety & Reconciliation module will investigate additional digital safeguards around surgical procedures.

Potential capabilities include:

- Pre-operative accountable-item registration
- Barcode, RFID, or other appropriate item identification
- Digital surgical safety checks
- Intraoperative item tracking
- Pre-closure inventory reconciliation
- Detection of missing or unaccounted-for items
- Safety alerts when reconciliation fails
- Clinician verification and sign-off
- Auditable records of safety checks and actions

These capabilities would supplement established surgical counts, checklists, and clinical procedures rather than replace them.

---

# Development Principle

CareGuardian should provide additional system-level safeguards around healthcare processes where incomplete information, workflow failures, or human error could contribute to patient harm.

The platform is designed to:

**Detect Risk → Explain the Problem → Alert the Appropriate Person → Support Human Review → Record the Action**

Healthcare professionals remain responsible for clinical decisions.