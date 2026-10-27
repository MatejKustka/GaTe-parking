---
description: Push your branch and open a pull request for review
allowed-tools: Bash(git status:*), Bash(git branch:*), Bash(git fetch:*), Bash(git merge:*), Bash(git push:*), Bash(git log:*), Bash(git diff:*), Bash(gh pr:*), Bash(gh auth:*)
---

Publish the user's branch for review. The user may not know git.

1. `git branch --show-current`. If it is `main`, stop: nothing is pushed to `main`. Suggest `/save` which moves the work onto a branch.
2. `git status`. If there are uncommitted changes, stop and tell the user to run `/save` first.
3. `git fetch origin` and `git merge origin/main`. On conflicts, follow the `/sync` procedure and resolve them with the user.
4. `git push -u origin <branch>`. Never use `--force`. If the push is rejected, explain why and stop rather than forcing.
5. Open a PR into `main` with `gh pr create`, filling in `.github/pull_request_template.md` (What / Why / How to test / Checklist) from the commit history. Link the PBS task or user story. End the PR description with the attribution line from the session's system reminder, if one is present. If `gh` is not installed or not logged in, give the user the GitHub link to open the PR manually.
6. Tell the user the PR link and that a teammate must review it before it is merged. Do not merge it.
