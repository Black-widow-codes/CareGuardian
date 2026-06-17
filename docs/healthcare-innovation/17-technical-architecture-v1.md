# CareGuardian Technical Architecture v1

## Purpose

This document defines the initial technical architecture for the CareGuardian MVP.

The architecture is designed to support:

* Discharge safety monitoring
* Missing information detection
* Risk scoring
* Alert generation
* Follow-up tracking

while remaining simple enough for a prototype implementation.

---

# Architecture Overview

```text
User
    ↓

Next.js Frontend

    ↓

API Layer

    ↓

Business Logic Layer

    ↓

Database

    ↓

Reporting & Analytics
```

---

# Frontend Layer

## Technology

* Next.js
* React
* TypeScript
* Tailwind CSS

## Responsibilities

* Dashboard
* Patient Review Screen
* Risk Summary Screen
* Alert Center
* Follow-Up Tracker

## Benefits

* Fast development
* Modern UI
* Mobile responsive
* Strong TypeScript support

---

# Backend Layer

## Technology

* Next.js API Routes

Future Options:

* Node.js
* Express
* NestJS

## Responsibilities

* Process requests
* Manage patient review workflows
* Generate risk scores
* Manage alerts
* Manage follow-up tasks

---

# Business Logic Layer

## Responsibilities

### Missing Information Checker

Validates:

* Diagnosis present
* Medication list present
* Follow-up plan present
* Provider assigned
* Pending tests documented

---

### Risk Scoring Engine

Inputs:

* Missing information
* Follow-up gaps
* Pending tests
* Documentation quality

Outputs:

* Low Risk
* Medium Risk
* High Risk

---

### Alert Engine

Generates alerts when:

* Information is missing
* Tasks are overdue
* Follow-up ownership is unclear

---

# Database Layer

## Technology

PostgreSQL

## Core Tables

* Users
* Patients
* DischargeReviews
* RiskScores
* Alerts
* FollowUpTasks
* AuditLogs

---

# AI/NLP Layer

## Version 1

Rule-based logic

Examples:

* Missing follow-up plan
* Missing medication information
* Missing provider assignment

Reason:

Easy to explain
Easy to validate
Suitable for capstone development

---

## Version 2

Natural Language Processing

Potential Capabilities:

* Information extraction
* Clinical summarization
* Follow-up detection
* Missing information detection

Potential Technologies:

* OpenAI APIs
* Azure AI
* Open-source NLP models

---

# Security Layer

## Authentication

Future:

* Role-based access control

Roles:

* Discharge Coordinator
* Nurse
* Physician
* Pharmacist
* Patient Safety Officer

---

## Privacy

Requirements:

* PHIPA compliance
* PIPEDA awareness
* Audit logging
* Secure access controls

---

# Reporting Layer

## Features

* Risk trends
* Alert summaries
* Follow-up completion rates
* Discharge safety metrics

---

# Deployment Architecture

## Development

Local Machine

* VS Code
* GitHub
* PostgreSQL

---

## Prototype Hosting

Frontend:

* Vercel

Database:

* PostgreSQL

---

# MVP Technical Scope

Included:

* Dashboard
* Patient Review
* Missing Information Checker
* Risk Scoring
* Alert Management
* Follow-Up Tracking

Excluded:

* Real hospital integration
* Live EHR connectivity
* Real patient data
* Advanced machine learning

---

# Architecture Principles

1. Simple before complex.
2. Explainable before intelligent.
3. Safety before automation.
4. Human oversight always required.
5. Modular design for future expansion.

---

# Future Evolution

Phase 1

Discharge Safety Monitor

↓

Phase 2

Clinical Handoff Intelligence

↓

Phase 3

Patient Safety Intelligence Platform

↓

Phase 4

Healthcare Safety Ecosystem
