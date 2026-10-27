# GaŤe Parking

Web app for parking organization. UUN semestral project of team 3.

GaŤe Parking allows registered employees to enter the corporate parking lot via automatic license plate recognition at the gate. The system tracks available spots in real time, shows EV charger availability with discounted rates for electric cars, and provides administrators with occupancy analytics across peak hours.

## Context

GaŤe operates a strictly private company parking lot, accessible only to authorized employee vehicles through an automatic gate with license plate recognition.

| Persona    | Role                    | Needs                                                                      |
| ---------- | ----------------------- | -------------------------------------------------------------------------- |
| **Hynek**  | Manager / administrator | Monitor occupancy, make sure non-electric cars do not block EV chargers    |
| **Petr**   | Employee, electric car  | Automatic gate access, real-time charger availability, discounted charging |
| **Blanka** | Employee, petrol car    | Access to standard parking spots                                           |

## Domain model

```
Parking Lot ──contains──▶ Parking Spot ──has──▶ Car
                               └──────has──▶ Reservation

signed-in user ──has──▶ Car
signed-in user ──creates/deletes──▶ Reservation
administrator  ──edits/deletes──▶ Reservation
```

### Roles

- **Signed-in user**: registers cars, creates and deletes their own reservations, starts and ends parking, pays, sees their own history.
- **Administrator**: manages parking spots, edits and deletes any reservation, reviews the audit log.

### Dictionary

| Term                | Description                                                                                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vehicle**         | A vehicle registered by an employee: license plate (SPZ), engine type (combustion / electric), size category (small / standard / large). Engine type determines access to chargers and pricing discounts. |
| **ParkingSpot**     | A physical parking stall. Type: standard / disabled / EV. Status: free / reserved / occupied. Size: small / standard / large.                                                                             |
| **Reservation**     | A booking of a spot for a vehicle and a time window. Status: active / completed / cancelled.                                                                                                              |
| **ParkingSession**  | A vehicle's stay from automatic gate opening at entry until departure. Tracks real-time occupancy and duration.                                                                                           |
| **ChargingSession** | An EV charge on an equipped spot: start/end time, energy consumed (kWh), applied discount.                                                                                                                |
| **Notification**    | A message sent to a user about a reservation or session event.                                                                                                                                            |
| **Peak Hours**      | Time windows with highest traffic and occupancy (e.g. morning arrivals), monitored to plan capacity and chargers.                                                                                         |

## User stories

| #   | User story                               | Owner          | Actor         |
| --- | ---------------------------------------- | -------------- | ------------- |
| 1   | Display available parking spots          | Vojta          | User          |
| 2   | History of parking records               | Matěj          | User          |
| 3   | Start and end active parking             | Šimon          | User          |
| 4   | Reserve a parking spot                   | Honza Hubal    | User          |
| 5   | Register vehicle                         | Andrej         | User          |
| 6   | Deletion of reservation                  | Ludmila        | User / Admin  |
| 7   | View active parking reservation          | Jan Heller     | User          |
| 8   | Notifications                            | Leo            | User / System |
| 9   | Pay for a parking session                | Artur          | User          |
| 10  | Create a new parking spot with audit log | Rayhon         | Admin         |
| 11  | Edit an upcoming reservation             | Oleg Cingarski | User          |

### 1. Display available parking spots

Users see the current availability of a parking lot before travelling: total, available, occupied and reserved spots, optionally the status of individual spots.
_Flow:_ open app → list of parking lots with available counts → select a lot → lot detail with availability.

### 2. History of parking records

A logged-in user sees a "My History" list of their completed and cancelled parkings (date, spot number, price paid). Users see only their own history; administrators view other users' records via the audit log (US 10).

### 3. Start and end active parking

A user with a `reserved` reservation checks in ("Start Parking"): reservation → `active` with `startTime`, spot → `occupied`. On "End Parking": `endTime` recorded, reservation → `completed`, spot → `free`.

### 4. Reserve a parking spot

User selects a registered vehicle, a lot and a time window (end after start), then sees only spots that are free for the whole window and suitable for the vehicle:

- Combustion car: standard spots (disabled only if entitled), no EV spots.
- Electric car: EV and standard spots, with an EV-only filter.
- Size: a vehicle fits a spot of its own size category or larger.

On confirm, a Reservation with status `active` is created, the spot is marked reserved for the window and the lot's availability is updated.

### 5. Register vehicle

Under "My Vehicles" → "Add Vehicle", the user enters license plate, brand, model and engine type. The system validates the plate format and uniqueness across active users, saves the vehicle to the account and enables EV charging privileges for electric cars.

### 6. Deletion of reservation

Administrators can delete any reservation; users only their own. Flow: reservation list → detail → Delete → confirm → system verifies existence (and ownership for users) → delete → spot availability for that period is restored → confirmation. Declining returns to the list unchanged.

### 7. View active parking reservation

The user opens their active reservation and sees parking spot, vehicle, start time and current status.

### 8. Notifications

The system checks active reservations regularly (e.g. every minute) and sends push notifications when:

- a reservation starts soon (e.g. 30 min before),
- a reservation or session ends soon (e.g. 15 min before),
- a reservation is cancelled or deleted (e.g. by an admin, see US 6),
- the reserved spot is not available (e.g. occupied by another vehicle).

Each notification type can be toggled in settings (all on by default). Each is sent once per reservation and stored as a Notification record. Tapping it opens the reservation detail.

### 9. Pay for a parking session

For a completed session with an unpaid charge, the user sees lot, spot, start/end time and amount due, clicks "Pay", completes the payment steps and gets a confirmation. The payment is linked to the session. On failure or cancellation the charge stays unpaid and the user can retry.

### 10. Create a new parking spot with audit log

An administrator creates a Parking Spot (type, availability and other attributes) and assigns it to a Parking Lot. The creation is recorded in the Audit Log (user, action, date/time). The administrator can open an Activity History page to review the log of all users.

### 11. Edit an upcoming reservation

From "My Reservations" the user edits an upcoming reservation (e.g. time frame or vehicle) in a form prefilled with the current data. Changes are saved only if they do not overlap or conflict with other reservations.

## Work breakdown (PBS)

Sprints, feature areas and task ownership are in [docs/PBS.md](docs/PBS.md).

## Tech stack

| Part     | Technology                                                                                                                                   |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend | React, TypeScript, Vite, Vitest + Testing Library                                                                                            |
| Backend  | Node.js, Express, TypeScript, Mongoose, Vitest + Supertest                                                                                   |
| Database | MongoDB                                                                                                                                      |
| Tooling  | npm workspaces, ESLint, Prettier, Docker Compose                                                                                             |
| CI/CD    | GitHub Actions (checks and Docker build on PRs, images and release on `v*` tags), Copilot code review on PRs, CodeQL + npm audit, Dependabot |

## Getting started

**New to the team? Read [CONTRIBUTING.md](CONTRIBUTING.md) first and follow it step by step.**

```
npm install
cp .env.example .env
docker compose up -d mongo
npm run dev
```

Frontend on http://localhost:3000, backend on http://localhost:8080/api/health. Run `npm run check` before every pull request. Product scope is decided in [docs/SCOPE.md](docs/SCOPE.md).

## Repository structure

```
backend/      Backend app, DB migrations, backend tests
frontend/     Frontend app and tests
docs/         PBS, scope, API docs, business model, wireframes, test reports
.github/      PR and issue templates
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the branching, commit and review rules.

## License

See [LICENSE](LICENSE).
