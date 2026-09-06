# CareGuardian Changelog

All notable changes to CareGuardian are documented here.

This project follows a milestone-based development approach, with each version representing a significant improvement to the platform.

---

# v0.6 – Identity & Access Management (IAM)

**Status:** In Progress

## Sprint 1 – Authentication Foundation

**Status:** Complete

### Added

#### Authentication

- Integrated Auth.js for application authentication
- Credentials-based authentication
- Custom login page
- Secure logout functionality
- Protected administrator routes

#### User Management Foundation

- User database model
- `UserRole` enum
- Administrator seed account
- Secure password hashing with bcrypt
- Prisma authentication integration

#### Session Management

- JWT session strategy
- User ID stored in authenticated sessions
- User role stored in authenticated sessions
- Authenticated navigation
- Logged-in user display

#### Security

- Protected administrative pages
- Authentication middleware
- Session validation

---

## Sprint 2 – Authorization

**Status:** Complete

### Added

#### Role-Based Access Control (RBAC)

- Centralized RBAC architecture
- Strongly typed `Permission` model
- Strongly typed `UserRole` model
- Permission mapping for each application role
- Reusable `hasPermission()` authorization helper

Supported roles:

- Administrator
- Nurse
- Discharge Coordinator
- Patient Safety Officer

Current permissions:

- `VIEW_PATIENTS`
- `CREATE_PATIENT`
- `EDIT_PATIENT`
- `DELETE_PATIENT`
- `VIEW_USERS`
- `MANAGE_USERS`
- `VIEW_AUDIT_LOGS`

#### UI Authorization

- Permission-aware Patient Management interface
- Role-specific action visibility
- Permission-controlled New Patient action
- Permission-controlled Edit action
- Permission-controlled Delete action
- Server-side session role passed to the Patient Management client component
- Access Denied page for restricted administrative routes
- Administrator-only Admin navigation
- Simplified navigation account display without exposing the raw role label

#### Patient API Authorization

Added server-side RBAC enforcement to patient API operations.

Protected:

- `GET /api/patients` with `VIEW_PATIENTS`
- `POST /api/patients` with `CREATE_PATIENT`
- `PUT /api/patients/[id]` with `EDIT_PATIENT`
- `DELETE /api/patients/[id]` with `DELETE_PATIENT`

Authorization responses distinguish between:

- `401 Unauthorized` for unauthenticated requests
- `403 Forbidden` for authenticated users without the required permission

#### Alert API Authorization

- Protected `GET /api/alerts`
- Requires an authenticated session
- Requires patient-view access
- Prevents unauthenticated access to clinical alert information

#### Authorization Testing

Created role-based test accounts for authorization verification.

Verified:

- Administrator can create patients
- Nurse cannot create patients
- Nurse can edit patients
- Nurse cannot delete patients
- Nurse can retrieve patient information
- Unauthenticated users cannot retrieve patient information
- Nurse can retrieve clinical alerts
- Unauthenticated users cannot retrieve clinical alerts
- Discharge Coordinator can view, create, and edit patients
- Discharge Coordinator cannot access User Management
- Direct restricted user-management API requests from a Discharge Coordinator return `403 Forbidden`
- Direct API requests cannot bypass tested UI authorization restrictions

#### Architecture

- Authorization enforced independently at the UI and API layers
- Server Components handle protected page authorization
- Client Components handle permission-aware interaction
- API routes independently validate authenticated sessions and permissions
- Central permission model reused across frontend and backend authorization

### Security Improvements

- Patient data is no longer available through unauthenticated patient API requests
- Clinical alerts are no longer available through unauthenticated API requests
- Hidden UI controls are no longer relied upon as the primary security boundary
- Direct unauthorized patient creation requests are rejected
- Direct unauthorized patient deletion requests are rejected
- Restricted user-management operations are protected at the API level

---

## Sprint 3 – User Management & Identity Hardening

**Status:** Complete

### Added

#### Structured Patient Identity

Expanded the patient model to support structured identity information.

Added:

- Medical Record Number (MRN)
- First name
- Middle name
- Last name
- Preferred name
- Sex at birth
- Gender identity
- Pronouns
- Shared patient display-name handling

The legacy patient `name` field remains temporarily for compatibility with existing records during migration.

#### User Management

Added secure administrative User Management.

Current capabilities:

- User Management page
- View staff accounts
- Create staff accounts
- Edit user names
- Edit user email addresses
- Assign user roles
- Update user roles
- Optional password reset during account editing
- Preserve the current password when no password change is requested
- Duplicate email detection
- Password hashing before storage
- Password validation on both client and server
- Protected User Management routes
- Protected User Management APIs
- Permission-aware New User action
- Permission-aware Edit User action

Protected user-management endpoints:

- `GET /api/users` with `VIEW_USERS`
- `POST /api/users` with `MANAGE_USERS`
- `PUT /api/users/[id]` with `MANAGE_USERS`

Passwords are not returned by User Management API responses.

#### User Management Verification

Verified:

- Administrator can view User Management
- Administrator can create staff accounts
- Administrator can edit staff accounts
- Created users can authenticate successfully
- Editing a user without entering a new password preserves the existing password
- Nurse cannot access User Management
- Discharge Coordinator cannot access User Management
- Direct unauthorized user-update API calls return `403 Forbidden`

#### Navigation

- Admin navigation is displayed only to the Administrator role
- Admin navigation now links to User Management
- Clinical roles no longer see an Admin navigation item
- User role text was removed from the main navigation to reduce interface clutter

#### Account Lifecycle & Session Security

Added secure staff account lifecycle management.

Implemented:

- Active and inactive account status
- Administrator-controlled account activation and deactivation
- Inactive accounts blocked from authentication
- Existing sessions refresh current role information from the database
- Existing sessions refresh current account status from the database
- Deactivated users lose continued application access after session refresh
- User Management displays Active and Inactive account status
- Server-side validation of account-status updates

#### Administrator Safeguards

Added protections against accidental loss of administrative access.

Implemented:

- Administrators cannot deactivate their own currently authenticated account
- CareGuardian must retain at least one active Administrator
- The final active Administrator cannot be deactivated
- The final active Administrator cannot be changed to a non-administrator role
- Administrator safeguards are enforced by the server-side API

#### Account Lifecycle Verification

Verified:

- Administrator can deactivate another staff account
- Administrator can reactivate another staff account
- Inactive users cannot authenticate
- Existing authenticated users lose access after their account is deactivated and the session refreshes
- User role changes are reflected in existing sessions
- Administrator cannot deactivate their own account
- CareGuardian prevents removal of the final active Administrator
### Milestone Commit

`41cc42e` – `feat(users): add secure user management`

---

## Sprint 4 – Audit Logging & Security Monitoring

**Status:** Complete

### Added

#### Audit Logging Foundation

- Added persistent `AuditLog` database model
- Added Prisma migration for audit-log storage
- Added indexes for actor, entity, and timestamp lookup
- Actor identity stored as a historical snapshot
- Passwords and password hashes excluded from audit records

#### User Management Audit Events

CareGuardian now records:

- `USER_CREATED`
- `USER_UPDATED`
- `USER_ROLE_CHANGED`
- `USER_DEACTIVATED`
- `USER_REACTIVATED`

Each event records:

- Actor user ID
- Actor name
- Actor email
- Actor role
- Action
- Entity type
- Entity ID
- Human-readable description
- Timestamp

#### Audit Log Interface

- Added protected `/audit-logs` page
- Displays the 100 most recent events
- Events displayed newest first
- Displays actor identity, action, target, timestamp, and event details
- Added permission-aware Audit Log navigation
- Improved audit action badge presentation

#### Audit Authorization

Audit Log access requires `VIEW_AUDIT_LOGS`.

Authorized roles:

- Administrator
- Patient Safety Officer

Verified:

- Administrator can access the Audit Log
- Patient Safety Officer can access the Audit Log
- Nurse cannot access the Audit Log
- Direct URL access by an unauthorized role redirects to the unauthorized page
- Audit Log navigation is hidden from unauthorized roles

#### Interface Reliability

- Corrected invalid Role/Status table-cell nesting in User Management
- Removed the resulting React hydration error

---
## Remaining v0.6 Work

### Patient Safety Officer Verification

- Verify patient access
- Verify restricted patient actions
- Verify role-specific patient API behavior

### Session Security

- Review session expiration behavior
- Review logout and broader session invalidation behavior

### Authorization Improvements

- Reduce duplicated API authorization logic where appropriate
- Review permissions as new clinical modules are introduced

---
# v0.5 – Data Layer & Patient Management

**Status:** Complete

## Sprint 1 – Database Foundation

### Added

- PostgreSQL database
- Docker development environment
- Prisma ORM
- Patient database schema
- Initial database migration
- Seed data
- Prisma Studio support
- Patient Repository
- Prisma client helper

---

## Sprint 2 – Read Operations

### Added

- `GET /api/patients`
- `GET /api/alerts`
- Frontend patient API
- Frontend alert API
- `usePatients` hook
- `useAlerts` hook

### Changed

- Dashboard now loads patients from PostgreSQL
- Patient List now loads patients from PostgreSQL
- Patient Details now load from PostgreSQL
- Alerts now load from PostgreSQL

### Removed

- Legacy patient service
- Legacy alert service
- Mock data dependency for application reads

---

## Sprint 3 – Patient Management

### Added

#### Backend

- Create Patient API
- Update Patient API
- Delete Patient API

#### Administration

- Patient Management page
- Register Patient page
- Edit Patient page
- Reusable PatientForm
- Shared Create/Edit workflow
- Delete patient workflow

### Improved

- Loading state during form submission
- Navigation between administration pages

---

## Sprint 4 – Administration Experience

**Status:** Complete

### Added

- Patient search
- Diagnosis search
- Risk level filter
- Discharge readiness filter
- Success notifications
- Error notifications
- Confirmation dialog
- Client-side delete updates
- Instant React updates

### Planned

- Sorting
- Pagination
- Bulk actions

---

# v0.4 – Professional User Experience

**Status:** Complete

### Added

- Reusable PageHeader
- Improved dashboard layout
- Improved patient review layout
- Improved safety score display
- Improved discharge checklist
- Improved risk explanation panel
- Consistent page headers

---

# v0.3 – Clinical Decision Support Foundation

**Status:** Complete

### Added

- Expanded patient model
- Medication reconciliation tracking
- Pending test tracking
- Follow-up tracking
- Provider assignment tracking
- Discharge instructions tracking
- Home care referral tracking
- Risk Explanation component
- Discharge Readiness Engine
- Alert Generator

### Improved

- Clinical risk engine
- Dashboard summaries
- Patient review workflow

---

# v0.2 – Clean Architecture

**Status:** Complete

### Added

- Shared TypeScript models
- Service layer
- Shared components
- Risk Engine
- Reusable cards
- Shared mock data

### Improved

- Component reuse
- Project organization
- Separation of concerns

---

# v0.1 – Working Prototype

**Status:** Complete

### Added

- Landing page
- Dashboard
- Patient review page
- Alert Center
- Follow-up Tracker
- Navigation
- Mock patient data
- Initial risk scoring