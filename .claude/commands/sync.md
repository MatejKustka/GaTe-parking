---
description: Bring the latest main into your current branch
allowed-tools: Bash(git status:*), Bash(git fetch:*), Bash(git merge:*), Bash(git branch:*), Bash(git diff:*), Bash(git log:*)
---

Update the user's current branch with the latest `main`. The user may not know git.

1. Run `git branch --show-current`. If it is `main`, explain that `/sync` is for task branches, run `git pull --ff-only origin main` and stop.
2. Run `git status`. If there are uncommitted changes, stop and tell the user to run `/save` first.
3. `git fetch origin`, then `git merge origin/main`.
4. If the merge succeeds, say so in plain language.
5. If there are conflicts, do not abort silently or pick a side blindly. List the conflicted files, explain what a conflict is in one sentence, and resolve each one together with the user, keeping both their work and the teammate's work. If the user prefers to stop, run `git merge --abort` (this restores the branch to how it was before `/sync`).
