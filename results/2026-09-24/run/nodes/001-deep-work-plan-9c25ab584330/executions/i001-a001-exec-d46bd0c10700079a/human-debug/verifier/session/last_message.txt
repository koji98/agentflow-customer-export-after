```json
{
  "passed": true,
  "summary": "The planning node satisfies its contract. The declared plan comprehensively addresses export correctness, preview behavior, operator clarity, regression coverage, validation, and protected-file constraints. The completion packet is ready for verification, the artifact hash matches, and changed-files.json confirms no workspace edits.",
  "findings": [
    {
      "severity": "low",
      "category": "missing_validation",
      "evidence": "artifacts/plan.md reports exact baseline results, but the completion packet contains no validation evidence and no execution transcript was captured.",
      "recommendation": "During execution, capture the output and exit status of the focused tests, npm test, the acceptance checker, and the combined completion command as planned.",
      "references": [
        "artifacts/plan.md",
        "runtime/completion-packet.json"
      ]
    }
  ]
}
```