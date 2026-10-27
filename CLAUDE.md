# GaŤe Parking: rules for Claude Code

Student team project (team 3) with 11 contributors, many of whom are new to git. Your job is to keep git safe and simple for them while they work. Read `README.md`, `CONTRIBUTING.md` and `docs/PBS.md` for project context.

## Git rules (always follow)

1. **Never commit or push directly to `main`.** If the current branch is `main`, create a branch first.
2. **Never force-push** (`--force`, `--force-with-lease`) and never `git reset --hard`, `git clean -fd`, `git checkout .` or delete branches/files the user did not ask about. If a git problem seems to need one of these, stop and explain the situation in plain language first.
3. **One person, one branch, one topic.** Branch names: `<type>/<short-description>` with type `feat`, `fix`, `docs`, `test` or `chore` (e.g. `feat/vehicle-registration`).
4. **Sync before you start and before you push**: fetch, then merge `origin/main` into the branch. Resolve conflicts with the user, never by discarding their or a teammate's changes.
5. **Only touch your own area.** Stay inside the files needed for the user's PBS task. Do not reformat, rename or reorganize other people's code, and do not change shared contracts (API shapes, DB schema, data model) unless the task says so. If a change is needed outside the task, tell the user to talk to the team first.
6. **Never commit secrets**: `.env`, keys, credentials, tokens. Use `.env.example` for new variables.
7. **Changes reach `main` only through a pull request** reviewed by a teammate (rules: `CONTRIBUTING.md`). PR titles are single-line Conventional Commits. Never approve a PR on the user's behalf, and never merge a PR that is unreviewed, red or has unresolved conversations. Keep PRs to one topic and under ~400 changed lines.
8. Commit messages must follow Conventional Commits as a **single line**: `<type>(<optional scope>): <lower-case imperative description>`, max 72 characters, no body, no full stop. Types: feat, fix, docs, test, chore, refactor, style, ci. Example: `feat(vehicles): add plate validation`. Only the attribution trailer may follow. Commit only when the user asks, or via the commands below. CI rejects other formats.

## Talking to the user

Assume the user does not know git. Explain what you are about to do in one plain sentence, and what happened afterwards. Do not use jargon without a short explanation. When something goes wrong, say what state their work is in (it is safe / it is not committed yet) before proposing a fix.

## Project layout

- `backend/`: backend app, DB migrations, backend tests
- `frontend/`: frontend app and tests
- `docs/`: PBS, API docs, business model, wireframes, test reports

Stack: React + TypeScript (Vite) frontend, Node.js + Express + TypeScript backend, MongoDB (Mongoose). npm workspaces; run `npm run check` (format, lint, types, tests, build) before committing or shipping. Do not introduce other frameworks or dependency managers without team agreement. New contributors follow `CONTRIBUTING.md`.

## Domain reminders

- Roles: signed-in user and administrator. Admins can edit and delete any reservation; users only their own.
- Vehicles have a license plate, engine type (combustion / electric) and size (small / standard / large).
- Spots have a type (standard / disabled / EV), a size and a status (free / reserved / occupied).
- Scope is decided in `docs/SCOPE.md`: the 11 user stories are the MVP; gate hardware, live charger status/tariffs and analytics are stretch. Check it before building something that is not in a user story.

## Slash commands

| Command              | Use                                                  |
| -------------------- | ---------------------------------------------------- |
| `/start-task <name>` | Sync with `main` and create a correctly named branch |
| `/sync`              | Bring the latest `main` into your branch             |
| `/save <message>`    | Commit your work on your branch (never on `main`)    |
| `/ship`              | Push your branch and open a pull request             |
| `/release <version>` | Maintainers only: tag a release from `main`          |

## CI and Docker integrity

Never make CI pass by weakening it. Do not skip, delete or loosen tests, add `eslint-disable` / `@ts-ignore` / `continue-on-error`, lower coverage thresholds, or edit `.github/`, Dockerfiles, `docker-compose.yml`, `eslint.config.js` or root `package.json` unless the user's task is about them (these need maintainer approval, see `.github/CODEOWNERS`). If a check fails, fix the cause or explain it to the user. Keep every Docker `HEALTHCHECK` and the `/api/health` endpoint working.

## Quality

Keep changes small and match the surrounding code style (`.editorconfig`). Add or update tests and docs for what you change. Do not leave debug code, commented-out blocks or stray files.
