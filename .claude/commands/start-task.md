---
description: Start a new task on a fresh, correctly named branch from the latest main
argument-hint: <type>/<short-description>  e.g. feat/vehicle-registration
allowed-tools: Bash(git status:*), Bash(git fetch:*), Bash(git switch:*), Bash(git checkout:*), Bash(git pull:*), Bash(git branch:*), Bash(git stash:*)
---

Start a new task for a user who may not know git. Requested branch name: `$ARGUMENTS`

1. Run `git status`. If there are uncommitted changes, stop and explain to the user in plain language; offer to commit them with `/save` first (or stash them). Do not discard anything.
2. If `$ARGUMENTS` is empty or not in the form `<type>/<short-description>` with type `feat`, `fix`, `docs`, `test` or `chore` (lowercase, hyphens), ask the user what they are working on and propose a valid name.
3. `git fetch origin`, then `git switch main` and `git pull --ff-only origin main`.
4. `git switch -c <branch-name>`. If the branch already exists, tell the user and ask whether to switch to it instead.
5. Confirm in one or two plain sentences: which branch they are now on and that it starts from the latest main.
