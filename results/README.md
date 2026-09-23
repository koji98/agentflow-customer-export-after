# Recorded run results

Graph: passed. Delivery: passed and review_ready=true. One cycle; zero supervisor interventions.

| Evidence | Actual result |
| --- | --- |
| Product tests | 12/12 passed |
| Independent export/listing checks | 24/24 passed |
| Independent preview checks | 5/5 passed |
| Simplicity | 1.00 |
| Operator clarity | 1.00 |
| Weighted score | 1.00 (threshold 0.85) |
| Graph time | 10m 25s |
| Delivery time | 2m 48s |
| Total | 13m 13s |

## Suggested walkthrough

1. [Implementation summary](operator/implementation-summary.md): what the worker changed and validated.
2. [Actual scorecard](operator/scorecard.json): both judges' exact explanations and scores.
3. [Deterministic command output](operator/deterministic-checks.log): twelve product tests and all twenty-nine independent cases.
4. [Agentflow review brief](run/delivery/01-review-brief.md) and [run learnings](run/delivery/02-run-learnings.md).
5. [Separate browser review](operator/browser-review.md): the preview still opens below the viewport. This is an open issue, not a repaired finding.
6. [Event stream](run/events.jsonl), [audit index](run/delivery/03-audit-index.md), and run/nodes/ for every execution, prompt, response, verification, log, and artifact.

[Provenance](PROVENANCE.md) explains path normalization, original hashes, the unchanged task contract, and the difference between the runnable graph and recorded graphs. [Archive manifest](archive-manifest.json) inventories all exported source files. [Machine-readable result](operator/rehearsal-summary.json) records exact timing and outcomes.

The source-based judges passed; the separate browser review found a visibility gap. Fix and revalidate that behavior before presenting the UI as complete. No revision loop occurred in this run. Keep the saved evidence available during a live demonstration because this run took longer than an eight-minute demo slot.
