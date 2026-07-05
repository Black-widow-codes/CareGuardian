# CareGuardian Features

## Overview

CareGuardian is a **Patient Safety Intelligence Platform** designed to help healthcare teams reduce preventable harm through clinical decision support, workflow automation, and explainable safety intelligence.

The current MVP is the **CareGuardian Discharge Safety Monitor**.

---

# Dashboard

## Clinical Overview

- Patient statistics
- Risk overview
- Discharge readiness summary
- Quick access to patient reviews

---

# Patient Management

## Patient Records

- View patient records
- Register new patients
- Edit patient information
- Delete patient records

## Search & Filtering

- Search by patient name
- Search by diagnosis
- Filter by clinical risk level

*(Discharge readiness filtering planned.)*

---

# Clinical Decision Support

## Risk Engine

Automatically evaluates discharge safety using structured clinical rules.

Current assessment factors include:

- Medication reconciliation
- Follow-up appointments
- Pending diagnostic tests
- Provider assignment
- Discharge instructions
- Home care referrals

---

## Discharge Readiness Engine

Determines whether a patient is:

- Ready for Discharge
- Ready with Actions Required
- Not Ready for Discharge

---

## Risk Explanation

Explains why a patient received a particular risk score and identifies contributing clinical factors.

---

# Alert Center

Automatically generates alerts based on patient safety risks.

Current capabilities include:

- High-risk patient alerts
- Missing discharge requirements
- Clinical follow-up reminders

---

# Administration

Current capabilities:

- Patient management
- Shared patient form
- CRUD operations
- Search
- Risk filtering

Planned:

- Sorting
- Pagination
- Success notifications
- Confirmation dialogs

---

# Data Layer

Current implementation:

- PostgreSQL
- Prisma ORM
- Repository pattern
- REST API
- React Hooks

---

# Security

Planned:

- Authentication
- Role-based access control
- Session management
- Audit logging

---

# Artificial Intelligence

Planned:

- AI discharge summary review
- Clinical NLP
- Missing information detection
- Explainable recommendations
- Predictive patient safety analytics

---

# Future Platform Modules

- Clinical Handoff Intelligence
- Medication Safety
- Documentation Integrity
- Patient Identity Protection
- Early Risk Detection
- Incident Learning Network
- Hospital Safety Analytics
- AI Clinical Intelligence