# CareGuardian Capstone Proposal Outline

## Project Title

CareGuardian: A Patient Safety Intelligence Platform for Improving Clinical Information Continuity During Hospital Discharge

---

# Student Information

Program:

Digital Health Engineering Technology

Institution:

Centennial College

---

# Project Overview

CareGuardian is a digital health solution designed to reduce preventable patient harm caused by missing clinical information, communication failures, medication discrepancies, and incomplete transitions of care.

The initial MVP focuses on discharge safety by assisting healthcare professionals in identifying information gaps before patients leave the hospital.

---

# Problem Statement

Healthcare organizations continue to experience preventable patient harm due to:

* Missing discharge information
* Communication failures
* Medication discrepancies
* Unassigned follow-up responsibilities
* Delayed or lost test results

These issues frequently occur during transitions of care and may contribute to adverse events, readmissions, delayed treatment, and patient safety incidents.

Current systems often store information but do not actively verify that critical information is complete, communicated, and acted upon.

---

# Project Goal

Design and develop a prototype system that helps healthcare professionals identify discharge-related patient safety risks before discharge approval.

The prototype will support:

* Information completeness checking
* Risk scoring
* Alert generation
* Follow-up tracking

---

# Objectives

1. Analyze discharge workflows and patient safety challenges.

2. Design a discharge safety monitoring solution.

3. Develop a prototype dashboard and review workflow.

4. Implement rule-based patient safety checks.

5. Generate explainable risk scores and alerts.

6. Evaluate the prototype using simulated patient scenarios.

---

# Target Users

Primary User:

* Discharge Coordinator

Secondary Users:

* Nurses
* Physicians
* Pharmacists
* Patient Safety Officers

---

# Proposed Solution

The MVP will include:

### Dashboard

Provides visibility into discharge risks.

### Patient Review Screen

Allows review of discharge information.

### Missing Information Checker

Identifies incomplete discharge documentation.

### Risk Score Engine

Calculates discharge safety risk.

### Alert Center

Displays patient safety alerts.

### Follow-Up Tracker

Tracks accountability for post-discharge actions.

---

# Technologies

Frontend:

* Next.js
* React
* TypeScript
* Tailwind CSS

Backend:

* Next.js API Routes

Database:

* PostgreSQL

AI Components:

* Rule-based safety checks
* NLP planning for future versions

Version Control:

* GitHub

Deployment:

* Vercel

---

# Data Model

Core Entities:

* User
* Patient
* Discharge Review
* Risk Score
* Alert
* Follow-Up Task
* Audit Log

---

# AI and NLP Components

The initial prototype will focus on explainable rule-based logic.

Future AI capabilities may include:

* Clinical information extraction
* Follow-up detection
* Clinical summarization
* Advanced risk analysis

The system will support healthcare professionals rather than replace clinical judgment.

---

# Expected Benefits

Potential benefits include:

* Improved discharge quality
* Reduced information loss
* Better follow-up accountability
* Increased patient safety awareness
* Reduced preventable harm

---

# Evaluation Plan

The prototype will be evaluated using simulated discharge cases.

Measures may include:

* Number of missing items detected
* Alert accuracy
* User satisfaction
* Workflow efficiency
* Completeness of discharge reviews

---

# Scope

Included:

* Prototype application
* Simulated patient data
* Rule-based safety checks
* Risk scoring
* Alert generation

Excluded:

* Real patient data
* Hospital EHR integration
* Clinical diagnosis
* Medication prescribing
* Autonomous decision-making

---

# Long-Term Vision

CareGuardian is intended to evolve into a broader Patient Safety Intelligence Platform.

Future modules may include:

* Clinical Handoff Intelligence
* Documentation Integrity
* Medication Safety
* Patient Identity Protection
* Surgical Safety
* Early Risk Detection
* Incident Learning Network
* Hospital Resilience Dashboard

---

# Success Criteria

The capstone will be considered successful if the prototype can:

1. Review discharge information.
2. Detect missing information.
3. Generate meaningful alerts.
4. Produce explainable risk scores.
5. Demonstrate a realistic healthcare workflow.
6. Support safer discharge decision-making.
