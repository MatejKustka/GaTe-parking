# GaŤe Parking: rules for Claude Code

Student team project (team 3) with 11 contributors, many of whom are new to git. Your job is to keep git safe and simple for them while they work. Read `README.md`, `CONTRIBUTING.md` and `docs/PBS.md` for project context.

## Git rules (always follow)

1. **Never commit or push directly to `main`.** If the current branch is `main`, create a branch first.
2. **Never force-push** (`--force`, `--force-with-lease`) and never `git reset --hard`, `git clean -fd`, `git checkout .` or delete branches/files the user did not ask about. If a git problem seems to need one of these, stop and explain the situation in plain language first.
3. **One person, one branch, one topic.** Branch names: `<type>/<short-description>` with type `feat`, `fix`, `docs`, `test` or `chore` (e.g. `feat/vehicle-registration`).
4. **Sync before you start and before you push**: fetch, then merge `origin/main` into the branch. Resolve conflicts with the user, never by discarding their or a teammate's changes.
5. **Only touch your own area.** Stay inside the files needed for the user's PBS task. Do not reformat, rename or reorganize other people's code, and do not change shared contracts (API shapes, DB schema, data model) unless the task says so. If a change is needed outside the task, tell the user to talk to the team first.
6. **Never commit secrets**: `.env`, keys, credentials, tokens. Use `.env.example` for new variables.
7. **Changes reach `main` only through a pull request** reviewed by a teammate. Never merge a PR the user opened without a review.
8. Commit messages: short, imperative, optionally typed (`feat: add plate validation`). Commit only when the user asks, or via the commands below.

## Talking to the user

Assume the user does not know git. Explain what you are about to do in one plain sentence, and what happened afterwards. Do not use jargon without a short explanation. When something goes wrong, say what state their work is in (it is safe / it is not committed yet) before proposing a fix.

## Project layout

- `backend/`: backend app, DB migrations, backend tests
- `frontend/`: frontend app and tests
- `docs/`: PBS, API docs, business model, wireframes, test reports

The tech stack is not chosen yet. Do not introduce a framework, language or dependency manager on your own. If the user asks for one, check `README.md` first and ask whether the team has agreed on it.

## Domain reminders

- Roles: signed-in user and administrator. Admins can edit and delete any reservation; users only their own.
- Vehicles have a license plate, engine type (combustion / electric) and size (small / standard / large).
- Spots have a type (standard / disabled / EV), a size and a status (free / reserved / occupied).
- The PBS (gate access, EV chargers, analytics) and the user stories (reservations, payment, notifications) currently differ. Do not assume which is authoritative; ask if a task depends on it.

## Slash commands

| Command | Use |
|---|---|
| `/start-task <name>` | Sync with `main` and create a correctly named branch |
| `/sync` | Bring the latest `main` into your branch |
| `/save <message>` | Commit your work on your branch (never on `main`) |
| `/ship` | Push your branch and open a pull request |
| `/release <version>` | Maintainers only: tag a release from `main` |

## Quality

Keep changes small and match the surrounding code style (`.editorconfig`). Add or update tests and docs for what you change. Do not leave debug code, commented-out blocks or stray files.
