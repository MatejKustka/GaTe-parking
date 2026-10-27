# Work breakdown (PBS)

Source: `PBS-Tym_3.xlsx` (team spreadsheet, the source of truth for task-level estimates and assignees). Task types: **ANA** analysis, **IMP** implementation, **TST** testing, **MNG** management.

## Sprints

| Sprint | Semester weeks | Focus |
|---|---|---|
| 1 | 5-7 | Foundation and employee access: repo, DB schema, base BE/FE apps, auth, employee/vehicle registration, business model and wireframes |
| 2 | 7-10 | Automatic gate access, parking availability, EV charger availability and tariffs |
| 3 | 10-12 | Occupancy analytics, final fixes, deployment, documentation, regression and release acceptance |

Each sprint also contains full-team meetings (planning, weekly coordination, review, retrospective), management tasks (progress tracking, spec-change approval, demo recording, minutes) and continuous verification (BE/FE tests, Bug Report). The course demo presentation is on 18 Nov 2026 (week 8).

## Feature areas

| Area | Sprint | Scope |
|---|---|---|
| Technical foundation | 1 | Repository, DB schema, sample data, base backend and frontend, linting/build/test pipelines, API client |
| Employee access | 1 | Authentication and employee/admin authorisation, registration, vehicle plate validation and EV flag, vehicle CRUD, admin access management |
| Automatic gate access | 2 | Recognition events and plate normalisation, entry decision and full-capacity rejection, gate open command, visit persistence, deduplication, admin gate/denial log |
| Parking availability | 2 | Occupied/free counting, atomic capacity updates, live availability, admin capacity configuration, stale-data states |
| EV charger availability | 2 | Charger status ingestion, stale/offline detection, charger list, base rate and EV discount tariff, admin charger configuration |
| Occupancy analytics | 3 | Hourly time-weighted occupancy, peak hour ranking, utilisation, date filters, admin-only endpoint and visualisation |
| Documentation and delivery | 3 | Deployment, backup/restore, API and setup docs, usage guide, acceptance evidence |

## Sprint 1 ownership

| Person | Tasks |
|---|---|
| Andrej Pavliščak | Base frontend app, routing and layout; employee registration and validation screen |
| Daniel Artur Hüttl | Frontend lint/build/test pipeline; login, logout and restricted navigation |
| Honza Heller | Vehicle plate validation, uniqueness and EV flag; vehicle create/edit/remove endpoints |
| Honza Hubal | Authentication and employee/admin authorisation; admin employee and access-management endpoints |
| Leo | Actors and permissions, features and acceptance criteria, registration/approval process, entry/exit processes, capacity rules, charger states, EV discount rules; BE and FE tests |
| Ludmila | Sample data; employee registration and access activation endpoints |
| Matěj | Repository setup, DB schema, base backend and environment configuration |
| Oleg | API client, loading and error states; vehicle list and edit form |
| Ray | EV tariff and admin analytics use cases, employee and admin wireframes, business model review, Bug Report template |
| Šimon | Data products (employee, vehicle, parking lot, visit, gate event, charger, tariff), data relationships, registration, gate and availability use cases, defect logging |
| Vojta | Sprint 1 backend defect fixes; authentication and employee API docs |

Sprint 2 and 3 tasks are mostly unassigned in the spreadsheet. Assign them there and keep this section in sync.
