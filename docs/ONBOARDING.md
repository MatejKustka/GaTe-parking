# Onboarding: read this before you write any code

Follow these steps in order. Never skip the first-time setup; it prevents most git problems.

## 1. Install the tools (once)

| Tool                                                              | Why                             | Check                   |
| ----------------------------------------------------------------- | ------------------------------- | ----------------------- |
| [Git](https://git-scm.com)                                        | Version control                 | `git --version`         |
| [Node.js 22](https://nodejs.org)                                  | Runs frontend and backend       | `node -v` (22 or newer) |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Local MongoDB                   | `docker --version`      |
| [GitHub CLI](https://cli.github.com)                              | Lets `/ship` open pull requests | `gh --version`          |
| [Claude Code](https://claude.com/claude-code)                     | Handles git for you             | `claude --version`      |

Then log in once: `gh auth login` (choose GitHub.com, HTTPS, login with browser).

Tell git who you are:

```
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"
```

## 2. Get the project (once)

```
git clone https://github.com/MatejKustka/GaTe-parking.git
cd GaTe-parking
npm install
cp .env.example .env
docker compose up -d mongo
npm run dev
```

Frontend: http://localhost:3000. Backend health check: http://localhost:8080/api/health.

You must be a collaborator on the GitHub repo to push. Ask a maintainer to add you.

## 3. Open Claude Code in the project folder

```
claude
```

Claude reads `CLAUDE.md` and knows the team rules. You never need to type git commands yourself.

## 4. Your daily workflow

1. **Pick your task** in `docs/PBS.md` (or ask the team). Use only your own task.
2. `/start-task feat/short-name` creates your own branch from the latest `main`.
3. Write code (ask Claude for help). Stay inside your task.
4. Before you finish, run `npm run check`. It must pass.
5. `/save` commits your work.
6. `/sync` brings in your teammates' changes. Do this at least daily and before shipping.
7. `/ship` pushes your branch and opens a pull request.
8. The AI reviewer comments, and a teammate must approve. Fix feedback with `/save` then `/ship` again.
9. After the PR is merged, run `/start-task` for your next task. Always start from a fresh branch.

## 5. Rules that keep us from colliding

- **Never work on `main`.** It is protected; GitHub will reject direct pushes.
- **One task, one branch, one pull request.** Small PRs get reviewed faster.
- **Do not edit other people's files or shared contracts** (API shapes, DB schema, data model) without talking to the team first.
- **Never commit `.env` or any secret.** Put new variables in `.env.example` with empty/placeholder values.
- **If git looks scary, stop and ask Claude** to explain the state of your work. Your work is almost always safe. Do not use `--force` or "reset" on your own.
- Our scope is decided in `docs/SCOPE.md`. Start with your user story in the README.

## 6. Where things are

| Folder / file     | What                                    |
| ----------------- | --------------------------------------- |
| `frontend/`       | React + TypeScript app (Vite)           |
| `backend/`        | Node.js + Express + MongoDB API         |
| `docs/`           | PBS, scope, API docs, wireframes, tests |
| `CONTRIBUTING.md` | Full workflow and review rules          |
| `CLAUDE.md`       | Rules Claude follows for this repo      |

## Useful commands

| Command                     | Does                                    |
| --------------------------- | --------------------------------------- |
| `npm run dev`               | Start backend and frontend              |
| `npm run check`             | Format check, lint, types, tests, build |
| `npm run format`            | Auto-format your code                   |
| `npm run lint:fix`          | Auto-fix lint problems                  |
| `docker compose up --build` | Run everything in containers            |
