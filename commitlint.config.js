export default {
  // Dependabot writes its own messages (capitals, long titles, a body); do not fail on them.
  ignores: [(message) => /^chore\(deps(-dev)?\):/.test(message)],
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "test", "chore", "refactor", "style", "ci"],
    ],
    "header-max-length": [2, "always", 72],
    // Start with a lower-case word, but allow names and acronyms later (JWT, GaŤe, API).
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-full-stop": [2, "never", "."],
    "body-empty": [2, "always"],
  },
};
