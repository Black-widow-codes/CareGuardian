# CareGuardian Authentication Plan

## Goal

Add secure authentication and role-based access control to CareGuardian.

---

## Current Status

Completed:

- Auth.js package installed
- Prisma adapter installed
- bcryptjs installed
- User model added
- UserRole enum added
- Admin user seeded

---

## Planned Authentication Flow

1. User visits a protected page.
2. If not authenticated, user is redirected to login.
3. User signs in with email and password.
4. Password is verified using bcrypt.
5. Session is created.
6. User role is attached to session.
7. Protected pages check authentication and role.

---

## Initial Roles

- ADMIN
- DISCHARGE_COORDINATOR
- NURSE
- PATIENT_SAFETY_OFFICER

---

## Protected Routes

Initial protected area:

```text
/admin/*