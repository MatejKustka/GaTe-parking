---
description: Commit your work on the current branch
argument-hint: <short message, optional>
allowed-tools: Bash(git status:*), Bash(git branch:*), Bash(git diff:*), Bash(git add:*), Bash(git commit:*), Bash(git log:*), Bash(git switch:*)
---

Commit the user's work safely. The user may not know git. Message hint: `$ARGUMENTS`

1. `git branch --show-current`. If it is `main`, do NOT commit. Ask for a branch name (`<type>/<short-description>`), create it with `git switch -c`, which carries the uncommitted changes along, then continue.
2. `git status` and `git diff` to see what changed. Summarize it in plain language.
3. Warn and exclude anything that should not be committed: `.env` or other secrets, `node_modules`, build output, large or unrelated files. Stage specific files by name, not blindly `git add -A`, if anything suspicious is present.
4. Commit with a short imperative message, optionally typed (`feat: ...`, `fix: ...`). Use `$ARGUMENTS` as the basis if given. End the message with the attribution line from the session's system reminder, if one is present.
5. Tell the user the work is saved locally and that `/ship` will upload it.
