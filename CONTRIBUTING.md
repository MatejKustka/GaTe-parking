# Contributing

Team 3 workflow for GaŤe Parking.

## Branches

- `main` is always working. Do not push to it directly; open a pull request.
- Branch from `main` and name branches `<type>/<short-description>`, where type is one of `feat`, `fix`, `docs`, `test`, `chore`.
  Examples: `feat/vehicle-registration`, `fix/plate-validation`.
- Keep branches short-lived and rebase or merge `main` before opening the PR.

## Commits

Short imperative subject line, optionally prefixed with the type:

```
feat: add vehicle plate validation
fix: reject duplicate plates for active users
```

## Pull requests

- One topic per PR, linked to the PBS task or user story it implements.
- Fill in the PR template.
- At least one teammate reviews before merge. Do not merge your own PR without review.
- Backend changes that affect the API need the API docs in `docs/` updated.
- Frontend and backend owners must not change each other's agreed contracts unilaterally (see PBS: spec changes go through the analyst).

## Project layout

| Folder | Purpose |
|---|---|
| `backend/` | Backend application, DB migrations, backend tests |
| `frontend/` | Frontend application and its tests |
| `docs/` | PBS, business model, API docs, wireframes, test reports |

## Secrets

Never commit `.env` files, keys or credentials. Add new variables to `.env.example` with empty values.

## Bugs

Use the bug report issue template and link the defect to the requirement or user story it violates.
