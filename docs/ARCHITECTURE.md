# CareGuardian Architecture

## Overview

CareGuardian is a Patient Safety Intelligence Platform.

The first MVP is focused on improving the safety of hospital discharge by ensuring critical information reaches the right person, at the right time, with accountability.

---

# Architecture Principles

The project follows a layered architecture.

```
User Interface
        │
        ▼
Components
        │
        ▼
Pages
        │
        ▼
Services
        │
        ▼
Business Logic
        │
        ▼
Data
```

Each layer has a single responsibility.

---

# Folder Structure

```
app/
```

Contains application routes and pages.

Examples:

- Dashboard
- Alerts
- Patients
- Follow-up

---

```
app/components/
```

Reusable UI components.

Examples:

- Navbar
- StatCard
- PatientCard
- AlertCard

---

```
data/
```

Temporary mock data.

This folder will eventually be replaced by a database.

---

```
services/
```

Responsible for retrieving and managing data.

Pages should communicate with services rather than directly accessing data.

Future versions will replace mock services with database services.

---

```
lib/
```

Contains reusable business logic.

Current example:

Risk Engine

Future examples:

- Clinical rules
- AI processing
- Validation logic

---

```
types/
```

Shared TypeScript models.

Examples:

- Patient
- Alert
- RiskLevel

---

```
docs/
```

Project documentation.

Contains:

- Roadmap
- Changelog
- Architecture
- Research
- Design decisions

---

# Current Technology Stack

Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

Development

- Git
- GitHub
- VS Code

Current Data Source

Mock Data

Future Data Source

- PostgreSQL
- Prisma ORM

Future AI

- OpenAI
- Clinical NLP

Future Standards

- HL7 FHIR
- SMART on FHIR

---

# Current Architecture Version

v0.2 – Clean Architecture

---

# Design Philosophy

The project prioritizes:

- Simplicity
- Maintainability
- Scalability
- Separation of concerns
- Healthcare interoperability
- Patient safety

Every new feature should fit within this architecture.