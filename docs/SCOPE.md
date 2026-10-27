# Scope decision

The PBS (`docs/PBS.md`) and the 11 user stories (README) described different products. This document resolves it. It is a proposed default chosen to unblock the team; change it by pull request if the team (or the course analyst) decides otherwise.

## Decision

**The 11 user stories are the product scope (MVP).** They have owners, detailed scenarios and form a complete reservation-based parking app. The PBS stays the plan for effort, sprints and people, and its tasks are mapped onto the stories below.

## Mapping

| PBS area                                                  | Decision                                                                                                                                                                                                              |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Technical foundation                                      | In scope. Needed by every story (this repo scaffold, DB, API client).                                                                                                                                                 |
| Employee access (auth, registration, vehicles)            | In scope. Covers **US 5 Register Vehicle** and the sign-in/roles every story needs.                                                                                                                                   |
| Parking availability                                      | In scope. Covers **US 1 Display available spots**. Admin capacity configuration is covered by **US 10 Create parking spot**.                                                                                          |
| Automatic gate access (license-plate events, gate opener) | **Simulated only.** No real recognition hardware. A plate-event endpoint may be added later (stretch); entry/exit is represented by **US 3 Start and end parking**.                                                   |
| EV charger availability and tariffs                       | **Reduced.** EV spots and engine-type rules are in scope via **US 4 Reserve a spot**. Live charger status and discounted tariffs are stretch, as is `ChargingSession`.                                                |
| Occupancy analytics / peak hours                          | **Stretch.** Mentioned in the vision and for administrators, but no user story. Do after the 11 stories are done.                                                                                                     |
| Documentation and delivery                                | In scope.                                                                                                                                                                                                             |
| _(no PBS tasks yet)_                                      | Stories not covered by the PBS need tasks added: **US 2 History**, **US 4 Reserve**, **US 6 Delete reservation**, **US 7 View active reservation**, **US 8 Notifications**, **US 9 Pay**, **US 11 Edit reservation**. |

## Resolved ambiguities

- Reservation statuses: `reserved` (booked, not started) -> `active` (parking started, US 3) -> `completed`; or `cancelled`. US 4 creating a reservation as `active` is read as "booked and valid", stored as `reserved`.
- Spot statuses: `free`, `reserved`, `occupied`.
- Roles: `user` and `admin`. Admins can edit/delete any reservation; users only their own.
- The app is called **GaŤe Parking** (not "SmartGate").
- Payment (US 9) is a mocked payment provider, no real money.
- Notifications (US 8) are in-app plus optional web push; no SMS/mobile push for the MVP.

## Working agreement

Estimates in the spreadsheet marked as dates (e.g. `46143`) were corrupted by the spreadsheet app; treat them as unknown and re-estimate during sprint planning.
