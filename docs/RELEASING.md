# Releasing

A release is a version tag on `main` (e.g. `v0.1.0`) plus a GitHub release and two Docker images published to GitHub's container registry (`ghcr.io`). The Release workflow does all of it; you only decide the version and press a button.

## Versions

Semantic versioning, staying on `0.x` until the final submission:

| Version  | When                                |
| -------- | ----------------------------------- |
| `v0.1.0` | Sprint 1 review (before the demo)   |
| `v0.2.0` | Sprint 2 review                     |
| `v0.3.0` | Sprint 3 review                     |
| `v1.0.0` | Final submission                    |
| `v0.x.1` | Hotfix between sprints (patch bump) |

Releases happen once per sprint, not per feature. `0.x` releases are marked as pre-releases automatically.

## Who can release

Only the GitHub usernames listed in [`.github/maintainers.txt`](../.github/maintainers.txt). The workflow refuses everyone else, whatever permissions they have on the repo. Changes to that file need maintainer approval (CODEOWNERS).

## How to release

**Recommended (no terminal needed):** repo → **Actions** → **Release** → **Run workflow** → type the version → Run.

The workflow checks that:

- the version looks like `vX.Y.Z` and does not exist yet,
- you are listed in `maintainers.txt`,
- `main` is green (Check, Docker build, Smoke test),

then creates the tag, builds and pushes both images (`<version>` and `latest`) and creates the GitHub release with automatic notes.

**Alternatives** (same checks apply):

- Claude Code: `/release v0.1.0` starts the same workflow for you.
- By hand: `git switch main && git pull && git tag -a v0.1.0 -m "v0.1.0" && git push origin v0.1.0`. A tag that is not on `main`, or pushed by someone not in `maintainers.txt`, makes the workflow fail and publishes nothing.
- GitHub UI: Releases -> Draft a new release -> new tag from `main`. The workflow still builds the images and keeps the notes you wrote.

## Release notes

Notes are generated from the merged PRs (their titles are Conventional Commits, so they read well). Edit the release text on GitHub afterwards if you want to add highlights.

## If something goes wrong

- **Never delete or move a tag or release**, and never reuse a version. Publish the next patch version (`v0.1.1`) with the fix.
- Workflow failed before publishing: fix the cause (the log says what) and run it again with the same version, as long as the tag was not created.
- Wrong release is already out: publish the fix as a new patch version and mark the bad release as a pre-release on GitHub.

## Permissions note

GitHub's tag ruleset (`.github/rulesets/tag-protection.json`) and the `main` ruleset can only treat people by role (Admin or Write). If everyone on the team is an Admin, those role-based protections do nothing, because Admins can bypass or disable them. Keep teammates on **Write**, and only one or two maintainers on **Admin**. The `maintainers.txt` check in the Release workflow works regardless of roles.
