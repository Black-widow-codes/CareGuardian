# CareGuardian Roadmap

## Current Version

v0.2 – Clean Architecture

---

## Product Direction

CareGuardian is a Patient Safety Intelligence Platform.

The current MVP is:

CareGuardian Discharge Safety Monitor

The MVP is the entry point into the broader platform, not the final product.

---

## Current Goal

Finish the clean architecture phase before adding new features.

---

## v0.1 – Working Prototype

Status: Complete

Completed:
- Landing page
- Dashboard
- Patient review page
- Dynamic patient pages
- Alert center
- Follow-up tracker
- Navigation
- Mock patient data
- Mock alert data
- Basic risk engine

---

## v0.2 – Clean Architecture

Status: In Progress

Goal:
Create a maintainable codebase with consistent structure.

Completed:
- Shared components
- Shared patient data
- Shared alert data
- Shared TypeScript types
- Risk engine
- Patient service
- Alert service
- Dashboard uses patient service

Remaining:
- Alerts page uses alert service
- Patient detail page uses patient service
- Patient list page uses patient service
- Follow-up page structure reviewed
- Standardize imports
- Commit v0.2 milestone

Definition of Done:
No page should import mock data directly. Pages should use services.

---

## v0.3 – Clinical Risk Model

Goal:
Replace simple issue-based scoring with a clinical discharge safety model.

Planned:
- Add discharge checklist fields
- Add medication reconciliation status
- Add pending test ownership
- Add follow-up appointment status
- Add provider assignment status
- Update risk engine rules
- Display explainable risk contributors

---

## v0.4 – Improved User Experience

Planned:
- Better dashboard layout
- Risk badges
- Safety score component
- Page header component
- Search and filters
- Cleaner patient review workflow

---

## v0.5 – Data Layer

Planned:
- PostgreSQL
- Prisma
- Seed data
- API routes
- Replace mock data with database-backed services

---

## v0.6 – Authentication and Roles

Planned:
- Login
- Role-based access
- Discharge Coordinator role
- Nurse role
- Patient Safety Officer role

---

## v0.7 – AI/NLP Features

Planned:
- Discharge summary analysis
- Missing information detection
- Follow-up extraction
- Risk explanation generation

---

## Future Platform Modules

- Clinical Handoff Intelligence
- Documentation Integrity
- Medication Safety
- Patient Identity Protection
- Surgical Safety
- Early Risk Detection
- Incident Learning Network
- Hospital Resilience Dashboard

---

## Current Next Task

Finish v0.2 by updating remaining pages to use the service layer.