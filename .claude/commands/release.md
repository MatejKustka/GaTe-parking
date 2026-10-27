---
description: Maintainers only. Tag a release from main
argument-hint: <version>  e.g. v0.1.0
allowed-tools: Bash(git status:*), Bash(git branch:*), Bash(git fetch:*), Bash(git switch:*), Bash(git pull:*), Bash(git log:*), Bash(git tag:*), Bash(git push origin v*), Bash(gh release:*), Bash(gh pr:*)
---

Create a release. Requested version: `$ARGUMENTS`

This is for repo maintainers. Ask the user to confirm they are a maintainer before continuing.

1. Version must look like `vMAJOR.MINOR.PATCH` (e.g. `v0.1.0`). If missing or invalid, ask. Check `git tag` that it does not exist yet.
2. `git status` must be clean, otherwise stop. `git fetch origin`, `git switch main`, `git pull --ff-only origin main`.
3. Check there are no open PRs that the user expects to be in this release (`gh pr list`), and ask them to confirm `main` is what should ship (tests pass, docs updated).
4. Show the commits since the last tag (`git log <last-tag>..HEAD --oneline`, or all commits if no tag yet) and draft short release notes grouped by feat / fix / docs / other.
5. After the user approves the notes: `git tag -a <version> -m "<version>"`, `git push origin <version>`, and `gh release create <version> --notes "<notes>"` if `gh` is available.
6. Report the tag and release link. Never move or delete an existing tag, and never push anything other than the tag.
