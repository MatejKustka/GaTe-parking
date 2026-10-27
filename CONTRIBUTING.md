# Contributing

Team 3 workflow for GaŤe Parking.

New here? Start with [docs/ONBOARDING.md](docs/ONBOARDING.md).

## Branches

- `main` is always working. Do not push to it directly; open a pull request.
- Branch from `main` and name branches `<type>/<short-description>`, where type is one of `feat`, `fix`, `docs`, `test`, `chore`.
  Examples: `feat/vehicle-registration`, `fix/plate-validation`.
- Keep branches short-lived and rebase or merge `main` before opening the PR.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org), **one line only**, no body:

```
<type>: <short description in lower case>
<type>(<scope>): <short description in lower case>
```

- Types: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`, `style`, `ci`.
- Imperative mood, lower case, no full stop, 72 characters max.
- Optional scope in brackets: `feat(reservations): add time window validation`.
- Good: `fix(auth): reject expired tokens`. Bad: `Fixed stuff`, `WIP`, `Update README.md.`
- One logical change per commit.
- The attribution line (`Co-Authored-By: ...`) that Claude adds at the end is allowed; it is not a body.

CI runs commitlint on every commit in your PR (`Commit messages` check). `/save` writes a valid message for you. To fix a bad message after the fact, ask Claude; do not rewrite history yourself.

## Pull requests

Nobody pushes to `main`; everything goes through a PR with a review, a green CI and a squash merge. The full rules are in [docs/PULL_REQUESTS.md](docs/PULL_REQUESTS.md). Read them before your first PR. Short version:

- PR title is a Conventional Commit; description follows the template and links the user story or PBS task.
- One topic, under ~400 changed lines.
- One teammate approval (not the last pusher), all conversations resolved, Copilot comments answered.
- Squash merge only, after CI is green and the branch is up to date.
- Backend changes that affect the API need `docs/api/` updated. Frontend and backend owners must not change each other's agreed contracts unilaterally (spec changes go through the analyst).

## Review and CI

- Every PR runs CI (format, lint, type check, tests, build, Docker build). It must be green.
- Enable GitHub Copilot code review (repo Settings, Rules, add the Copilot review rule) so a bot reviews each PR. Address its comments or reply why not.
- `main` is protected by a GitHub ruleset (see `.github/rulesets/main-protection.json`): PR required, 1 approval, green CI.
- Releases: see [docs/RELEASING.md](docs/RELEASING.md). Maintainers run Actions -> Release -> Run workflow (or `/release vX.Y.Z`); the workflow publishes Docker images to GHCR and creates the GitHub release.

## CI and Docker rules

- **CI must be green to merge**: `Check` (format, lint, types, tests with 70% coverage minimum, build), `Commit messages` and `PR title` (Conventional Commits), `Docker build`, and `Smoke test` (the full stack starts and `/api/health` answers). Security checks (`npm audit`, CodeQL) also run.
- **Never weaken the checks to get a PR through.** No skipped or deleted tests, no `eslint-disable`/`@ts-ignore` to hide real problems, no lowered coverage thresholds, no `continue-on-error`, no editing workflows to bypass a failure. Fix the cause instead.
- Files that control CI, Docker, tooling and Claude rules (`.github/`, Dockerfiles, `docker-compose.yml`, `eslint.config.js`, root `package.json`, `.claude/`, `CLAUDE.md`) are listed in `.github/CODEOWNERS`: a maintainer must approve any change to them.
- **Docker**: only `backend/Dockerfile`, `frontend/Dockerfile` and `docker-compose.yml` define images and the local stack. Images build from the repo root with `npm ci`, run as a non-root user, and contain no dev dependencies or secrets. Every image keeps its `HEALTHCHECK`. Compose waits for healthy dependencies (Mongo, then backend, then frontend).
- Health: `GET /api/health` returns 200 `{status:"ok",db:"up"}` or 503 when MongoDB is down. Keep it working.

## Using Claude Code

The repo ships rules in `CLAUDE.md` and slash commands in `.claude/commands/`, so you do not need to know git commands:

1. `/start-task feat/my-task` to begin on a new branch
2. work, then `/save` to commit
3. `/sync` to pull in teammates' changes
4. `/ship` to push and open a pull request

Maintainers use `/release v0.1.0` to start a release (see `docs/RELEASING.md`).

## Project layout

| Folder      | Purpose                                                 |
| ----------- | ------------------------------------------------------- |
| `backend/`  | Backend application, DB migrations, backend tests       |
| `frontend/` | Frontend application and its tests                      |
| `docs/`     | PBS, business model, API docs, wireframes, test reports |

## Secrets

Never commit `.env` files, keys or credentials. Add new variables to `.env.example` with empty values.

## Bugs

Use the bug report issue template and link the defect to the requirement or user story it violates.
