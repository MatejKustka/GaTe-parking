# Pull request rules

Nobody pushes to `main` except repo admins (the ruleset's only bypass, for emergencies and setup). Everyone else must use a pull request (PR). Keep teammates on the **Write** role: if everyone is Admin, everyone can bypass the rules and the protection is meaningless. GitHub enforces most of this (see `.github/rulesets/main-protection.json`); the rest is team agreement.

## Before you open a PR

- Work on your own branch (`/start-task`), one task per branch.
- Run `npm run check` locally; it must pass.
- Run `/sync` so your branch contains the latest `main` and has no conflicts.
- Review your own diff once. Remove debug code, stray files and unrelated changes.

## Opening the PR (`/ship` does this)

- **Title:** a Conventional Commit, lower case, max 72 characters, e.g. `feat(reservations): add time window validation`. Squash merging makes this title the commit on `main`, and CI rejects bad titles.
- **Description:** fill in the template: what changed, why (link the user story or PBS task, e.g. `US 5`), how a reviewer can test it, and the checklist.
- **Size:** aim for under ~400 changed lines. If it is bigger, split it into several PRs. Small PRs get reviewed faster and better.
- **One topic only.** No drive-by refactors, no formatting of other people's files.
- **Draft:** open as a draft while work is in progress. Mark it "Ready for review" when CI is green and you have checked it yourself. Drafts do not get a Copilot review.
- UI changes: add a screenshot. API changes: update `docs/api/`.

## Review

Every PR needs **one approval from a teammate who did not push the last commit**. This is enforced.

- The author cannot approve or merge their own PR without a review.
- **Copilot** reviews each PR and comments again after each push. Treat its comments as a free first review. Fix them or reply with why not. **All review conversations must be resolved before merging** (enforced).
- Changes to CI, Docker, tooling and Claude rules (see `.github/CODEOWNERS`) also need a maintainer's approval.
- Reviewers: read the diff, run the branch if the change is non-trivial, and check it against the user story. Be specific and kind; many of us are new. Review within one working day.
- Approve only what you actually looked at. "LGTM" without reading is not a review.
- New commits after approval dismiss the approval (enforced), so the reviewer sees the final code.

## Merging

- CI must be green: `Check`, `Commit messages`, `PR title`, `Docker build`, `Smoke test` (enforced).
- **Squash merge only** (enforced): one clean commit per PR on `main`.
- The branch must be up to date with `main` before merging (enforced). Use `/sync` if GitHub says it is behind.
- The author merges their own approved PR. Delete the branch afterwards (automatic if enabled in repo settings).
- Never merge a red or conflicted PR, and never bypass the rules, even for a "tiny fix". Open a PR for it.
- After merging, start your next task with `/start-task` from a fresh branch.

## Repo settings to turn on (maintainer, once)

Settings → General → Pull Requests:

- Allow squash merging only (untick merge commits and rebase merging).
- Default commit message: **Pull request title**.
- Automatically delete head branches.

Settings → Rules → Rulesets: import `.github/rulesets/main-protection.json`.
