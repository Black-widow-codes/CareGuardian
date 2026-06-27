# CareGuardian Changelog

## v0.2 – Clean Architecture

Status: In Progress

### Added

- Shared TypeScript types
- Patient type
- Alert type
- RiskLevel type
- Patient service
- Alert service
- Reusable StatCard component
- Reusable PatientCard component
- Reusable AlertCard component
- Shared patient mock data
- Shared alert mock data
- Risk Engine v1

### Changed

- Dashboard now uses reusable components
- Dashboard now uses the patient service
- Patient cards now route to dynamic patient pages
- Alert cards now route to patient detail pages
- Risk level is calculated using the Risk Engine

### Fixed

- Duplicate component folder issue
- Incorrect import paths
- Dynamic patient routing issue
- Shared mock data location issue

### Remaining

- Update Alerts page to use alert service
- Update Patient Detail page to use patient service
- Update Patient List page to use patient service
- Review Follow-Up page structure
- Standardize imports
- Final v0.2 testing