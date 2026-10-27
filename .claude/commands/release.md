---
description: Maintainers only. Tag a release from main
argument-hint: <version>  e.g. v0.1.0
allowed-tools: Bash(git status:*), Bash(git branch:*), Bash(git fetch:*), Bash(git switch:*), Bash(git pull:*), Bash(git log:*), Bash(git tag:*), Bash(gh workflow run release.yml:*), Bash(gh run:*), Bash(gh release view:*), Bash(gh pr list:*)
---

Create a release. Requested version: `$ARGUMENTS`

This is for repo maintainers. Ask the user to confirm they are a maintainer before continuing.

1. Version must look like `vMAJOR.MINOR.PATCH` (e.g. `v0.1.0`). If missing or invalid, ask. Check `git tag` that it does not exist yet.
2. `git status` must be clean, otherwise stop. `git fetch origin`, `git switch main`, `git pull --ff-only origin main`.
3. Check there are no open PRs that the user expects to be in this release (`gh pr list`), and ask them to confirm `main` is what should ship (tests pass, docs updated).
4. Show the commits since the last tag (`git log <last-tag>..HEAD --oneline`, or all commits if no tag yet) and draft short release notes grouped by feat / fix / docs / other.
5. After the user approves the notes (they are just a preview; GitHub generates the final ones), start the release with `gh workflow run release.yml -f version=<version>`. The workflow checks the maintainer list, that `main` is green and that the version is new, then creates the tag, publishes the Docker images and the release. If `gh` is not available, tell the user to use Actions -> Release -> Run workflow on GitHub (see the Releases section of `CONTRIBUTING.md`).
6. Show the run with `gh run list --workflow release.yml --limit 1` and give the release link when done. Never move or delete an existing tag, never reuse a version, and never push tags by hand.
