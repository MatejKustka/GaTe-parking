# Contributing

Everything a team member needs to work on GaŤe Parking: setup, daily workflow, rules for commits and pull requests, CI, and releases. Read it once, top to bottom, before your first change.

## 1. Setup (once)

| Tool                                                              | Why                             | Check                   |
| ----------------------------------------------------------------- | ------------------------------- | ----------------------- |
| [Git](https://git-scm.com)                                        | Version control                 | `git --version`         |
| [Node.js 22](https://nodejs.org)                                  | Runs frontend and backend       | `node -v` (22 or newer) |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Local MongoDB                   | `docker --version`      |
| [GitHub CLI](https://cli.github.com)                              | Lets `/ship` open pull requests | `gh --version`          |
| [Claude Code](https://claude.com/claude-code)                     | Handles git for you             | `claude --version`      |

- Log in once: `gh auth login` (GitHub.com, HTTPS, browser).
- Claim your free Copilot via [GitHub Education](https://education.github.com/pack) so Copilot can review your PRs.
- Tell git who you are:
  ```
  git config --global user.name "Your Name"
  git config --global user.email "your-github-email@example.com"
  ```
- Ask a maintainer to add you as a collaborator on the repo (Write role).

Get the project and start it:

```
git clone https://github.com/MatejKustka/GaTe-parking.git
cd GaTe-parking
npm install
cp .env.example .env
docker compose up -d mongo
npm run dev
```

Frontend: http://localhost:3000. Backend health: http://localhost:8080/api/health. Then open Claude Code in the folder with `claude`; it reads `CLAUDE.md` and knows the team rules.

## 2. Daily workflow

1. Pick your task (your user story in the README, or `docs/PBS.md`). Work only on your own task.
2. `/start-task feat/short-name` creates your branch from the latest `main`.
3. Write code (ask Claude for help). Stay inside your task.
4. `npm run check` must pass (format, lint, types, tests, build).
5. `/save` commits. `/sync` brings in your teammates' changes (do it daily and before shipping).
6. `/ship` pushes the branch and opens a pull request.
7. Fix review feedback with `/save` then `/ship`. After the merge, start the next task with a fresh `/start-task`.

Other commands: `npm run dev` (start everything), `npm run format` (auto-format), `npm run lint:fix`, `docker compose up --build` (full stack in containers).

Rules that keep us from colliding:

- **Never work on `main`.** One task, one branch, one pull request.
- **Do not edit other people's files or shared contracts** (API shapes, DB schema, data model) without talking to the team first. Backend changes that affect the API need `docs/api/` updated.
- **Never commit `.env` or any secret.** New variables go in `.env.example` with empty or placeholder values.
- **If git looks scary, stop and ask Claude** to explain. Your work is almost always safe. Never use `--force` or "reset" on your own.
- Scope is decided in `docs/SCOPE.md`.

Branch names: `<type>/<short-description>` with type `feat`, `fix`, `docs`, `test` or `chore` (e.g. `feat/vehicle-registration`).

## 3. Commits

[Conventional Commits](https://www.conventionalcommits.org), **one line only**, no body:

```
<type>(<optional scope>): <short description in lower case>
feat(reservations): add time window validation
```

- Types: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`, `style`, `ci`.
- Imperative, lower case, no full stop, 72 characters max. One logical change per commit.
- Good: `fix(auth): reject expired tokens`. Bad: `Fixed stuff`, `WIP`, `Update README.md.`
- The `Co-Authored-By: ...` line Claude adds at the end is allowed.
- Dependabot's `chore(deps): ...` commits are exempt.

CI checks every commit in your PR. `/save` writes a valid message for you. To fix a bad one, ask Claude; do not rewrite history yourself.

## 4. Pull requests

Nobody pushes to `main`. Everything goes through a pull request (PR) with a review, green CI and a squash merge. GitHub enforces most of this through the ruleset in `.github/rulesets/main-protection.json`.

**Opening (`/ship` does it):**

- Title is a Conventional Commit, e.g. `feat(reservations): add time window validation`. Squash merging makes the title the commit on `main`.
- Fill in the template: what, why (link the user story or PBS task, e.g. `US 5`), how to test, checklist.
- One topic only, under about 400 changed lines. Bigger? Split it. No drive-by refactors or reformatting of other people's files.
- Open as a draft while unfinished; mark it ready when CI is green and you reviewed your own diff. Add a screenshot for UI changes.

**Review (enforced):**

- One approval from a teammate who did not push the last commit. New commits dismiss earlier approvals.
- All review conversations must be resolved. Copilot reviews every PR and again after each push; treat its comments as a free first review and fix them or reply why not.
- Changes to CI, Docker, tooling and Claude rules (`.github/CODEOWNERS`) also need a maintainer's approval.
- Reviewers: read the diff, run the branch if the change is non-trivial, check it against the user story. Be specific and kind. Review within one working day. Approve only what you read.

**Merging (enforced):** `Check`, `Commit messages`, `PR title`, `Docker build` and `Smoke test` green, branch up to date with `main`, squash merge only. The author merges their own approved PR. Never merge a red or conflicted PR and never bypass the rules, not even for a tiny fix.

## 5. CI and Docker

- **Never weaken the checks to get a PR through.** No skipped or deleted tests, no `eslint-disable` / `@ts-ignore` to hide real problems, no lowered coverage thresholds (70% minimum), no `continue-on-error`, no editing workflows to bypass a failure. Fix the cause.
- CI jobs: `Check` (format, lint, types, tests, build), `Commit messages` and `PR title` (Conventional Commits), `Docker build`, `Smoke test` (the full stack starts and `/api/health` answers). `npm audit` and CodeQL run too.
- Files that control CI, Docker, tooling and Claude rules (`.github/`, Dockerfiles, `docker-compose.yml`, `eslint.config.js`, root `package.json`, `.claude/`, `CLAUDE.md`) are in `.github/CODEOWNERS`; a maintainer must approve changes to them.
- Docker: only `backend/Dockerfile`, `frontend/Dockerfile` and `docker-compose.yml` define images and the local stack. Images build from the repo root with `npm ci`, run as non-root, contain no dev dependencies or secrets, and keep their `HEALTHCHECK`. Compose waits for healthy dependencies.
- `GET /api/health` returns 200 `{status:"ok",db:"up"}`, or 503 when MongoDB is down. Keep it working.

## 6. Releases

A release is a version tag on `main` plus a GitHub release and two Docker images on `ghcr.io`. Done once per sprint, by maintainers only (usernames in `.github/maintainers.txt`; the workflow refuses everyone else).

| Version  | When                                |
| -------- | ----------------------------------- |
| `v0.1.0` | Sprint 1 review (before the demo)   |
| `v0.2.0` | Sprint 2 review                     |
| `v0.3.0` | Sprint 3 review                     |
| `v1.0.0` | Final submission                    |
| `v0.x.1` | Hotfix between sprints (patch bump) |

**How:** repo, Actions, **Release**, Run workflow, type the version. (Or `/release v0.1.0` in Claude Code, or push the tag by hand: `git tag -a v0.1.0 -m v0.1.0 && git push origin v0.1.0`.) The workflow checks the version format and that it is new, that you are a listed maintainer, that the tag is on `main`, and that `main` is green. Then it publishes the images and the release (`0.x` as pre-release). Release notes are generated from merged PR titles.

**If something goes wrong:** never delete or move a tag or release and never reuse a version; publish the next patch (`v0.1.1`). If the workflow failed before creating the tag, fix the cause and run it again.

## 7. Project layout

| Folder      | Purpose                                                           |
| ----------- | ----------------------------------------------------------------- |
| `backend/`  | Node.js + Express + MongoDB API and tests                         |
| `frontend/` | React + TypeScript app and tests                                  |
| `docs/`     | `SCOPE.md`, `PBS.md`, API docs, wireframes, business model, tests |

## 8. Maintainer setup (once, in GitHub settings)

- Settings, Rules, Rulesets: import `.github/rulesets/main-protection.json` and `tag-protection.json`. Enable the Copilot code review rule there.
- Settings, General, Pull Requests: squash merging only, default message "Pull request title", auto-delete head branches.
- Settings, Collaborators: teammates on **Write**, one or two maintainers on **Admin**. Rulesets treat people by role, so if everyone is Admin everyone can bypass the rules and the protection means nothing. The release check in `maintainers.txt` works regardless.
- Secrets: never commit `.env`, keys or credentials. Bugs: use the bug report issue template and link the requirement or user story.
