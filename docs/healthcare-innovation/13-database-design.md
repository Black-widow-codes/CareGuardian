# CareGuardian Database Design

## Purpose

This document defines the core data model for the CareGuardian MVP.

The MVP focuses on Clinical Handoff Intelligence and Discharge Safety Monitoring.

The database must support:

* Patient discharge reviews
* Missing information detection
* Risk scoring
* Alert generation
* Follow-up tracking
* Audit logging

---

# Entity Relationship Overview

User
↓
Discharge Review
↓
Patient
↓
Risk Score
↓
Alerts
↓
Follow-Up Tasks

Audit Log records activity across all entities.

---

# Entity: User

## Description

Healthcare worker using CareGuardian.

Examples:

* Discharge Coordinator
* Nurse
* Physician
* Pharmacist
* Patient Safety Officer

## Fields

| Field      | Type     |
| ---------- | -------- |
| UserID     | UUID     |
| FirstName  | String   |
| LastName   | String   |
| Email      | String   |
| Role       | String   |
| Department | String   |
| CreatedAt  | DateTime |

---

# Entity: Patient

## Description

Patient being reviewed for discharge.

## Fields

| Field            | Type   |
| ---------------- | ------ |
| PatientID        | UUID   |
| FirstName        | String |
| LastName         | String |
| DateOfBirth      | Date   |
| AdmissionDate    | Date   |
| DischargeDate    | Date   |
| PrimaryDiagnosis | String |
| Status           | String |

---

# Entity: Discharge Review

## Description

Review performed before patient discharge.

## Fields

| Field                   | Type     |
| ----------------------- | -------- |
| ReviewID                | UUID     |
| PatientID               | UUID     |
| ReviewerID              | UUID     |
| ReviewDate              | DateTime |
| DischargeSummaryPresent | Boolean  |
| MedicationListPresent   | Boolean  |
| FollowUpPlanPresent     | Boolean  |
| PendingTestsDocumented  | Boolean  |
| AssignedProviderPresent | Boolean  |
| ReviewStatus            | String   |

## Possible Status Values

* Draft
* In Review
* Completed
* Approved

---

# Entity: Risk Score

## Description

Calculated discharge safety risk.

## Fields

| Field           | Type     |
| --------------- | -------- |
| RiskScoreID     | UUID     |
| ReviewID        | UUID     |
| Score           | Integer  |
| RiskLevel       | String   |
| CalculationDate | DateTime |

## Risk Levels

* Low
* Medium
* High

---

# Entity: Alert

## Description

Patient safety issue detected by CareGuardian.

## Fields

| Field            | Type     |
| ---------------- | -------- |
| AlertID          | UUID     |
| ReviewID         | UUID     |
| AlertType        | String   |
| AlertDescription | String   |
| Severity         | String   |
| Status           | String   |
| CreatedDate      | DateTime |

## Alert Examples

* Missing Medication Information
* Missing Follow-Up Plan
* Pending Test Unassigned
* Missing Provider Assignment

---

# Entity: Follow-Up Task

## Description

Action required after discharge.

## Fields

| Field           | Type     |
| --------------- | -------- |
| TaskID          | UUID     |
| PatientID       | UUID     |
| AssignedUserID  | UUID     |
| TaskDescription | String   |
| DueDate         | Date     |
| Status          | String   |
| CreatedDate     | DateTime |

## Task Status

* Open
* In Progress
* Completed
* Escalated

---

# Entity: Audit Log

## Description

Tracks all significant system activity.

## Fields

| Field          | Type     |
| -------------- | -------- |
| AuditID        | UUID     |
| UserID         | UUID     |
| ActionType     | String   |
| EntityAffected | String   |
| EntityID       | UUID     |
| Timestamp      | DateTime |

## Example Actions

* Review Created
* Risk Score Generated
* Alert Resolved
* Task Assigned
* Task Completed

---

# MVP Database Scope

Included:

* Users
* Patients
* Discharge Reviews
* Risk Scores
* Alerts
* Follow-Up Tasks
* Audit Logs

Excluded:

* Full EHR records
* Clinical imaging
* Laboratory systems
* Real-time interoperability interfaces

These may be added in future versions.

---

# Future Database Expansion

Potential future entities:

* Medication Reconciliation
* Duplicate Patient Detection
* Incident Reporting
* Surgical Safety Tracking
* Clinical Handoff Templates
* NLP Analysis Results
* Hospital Resilience Monitoring
