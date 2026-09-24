# Where this run came from

The agent started in a fresh clone of the public before repo at commit `8c5387e80a736ceeda41994c1af93b41881b8340`. It did not start from the earlier finished app.

| Part | Recorded value |
| --- | --- |
| Agentflow commit | `460fdf31d94390a1aaf12a8f309ebcbf8c4b1d13`, merged PR #60 |
| Agentflow branch | `master`, the repo's default branch |
| Node | 24.18.0 |
| Codex CLI | 0.144.5 |
| Graph model setting | `auto` |
| Direct worker and judge model logs | GPT-5.6-sol, medium reasoning |
| Run ID | `2026-09-24t10-42-57-811z-northstar-export-readiness-network-permissions-rerun` |
| Graph time | 728.739 seconds |
| Report time | About 43.348 seconds |
| Whole run | About 772.087 seconds |

The graph did not change for this rerun. The starting graph's SHA-256 is `421c4b7bb166bb0ebebfb0c29bfc848ad402713c35491b5e0871240648d44a72`. The launch record is in [launch.json](operator/launch.json). The graph snapshot in the run folder is Agentflow's expanded record; the runnable authored file is at the repo root.

## What is saved?

- **216 raw run files**, with no files omitted.
- **47 operator evidence files**: before and after checks, hashes, launch details, and later review notes.
- [archive-manifest.json](archive-manifest.json), with original and copied hashes.
- [product-sha256.json](product-sha256.json), proving the published app matches the final run workspace.

The first run's 230 archived evidence files were checked before and after copying. They stayed byte-for-byte the same. They remain under `results/run/` and `results/operator/`.

The app source, page, tests, and customer data are copied exactly. We did not fix the browser issue by hand. Guides were updated after the run. Those guide edits are not agent work.

## Why paths differ

Computer-specific paths were replaced with portable labels. The new run root becomes `results/2026-09-24/run`, the working app becomes `.`, and the operator evidence becomes `results/2026-09-24/operator`. Home, temporary, and runtime paths use labels. Scores, model replies, event order, and times were not rewritten. Original logs are retained locally.

The copies are a readable record, not a folder prepared for `agentflow resume`. Hashes inside old messages still refer to their original files. The archive manifest records both versions of each copied file. A focused secret scan found no known secret patterns; the two credential settings files contain no configured tools or secrets.

The generated audit index references an optional `runtime/observations.jsonl` that the run did not create. This is an absent optional file, not a lost archive file. Later browser observations are in [browser-review.md](operator/browser-review.md).

## Fairness limits

The starting README linked to the old result, and the agents read it. The tests were also visible. No prior-solution fetch was found in the saved trace, but this must be called an open-book demo. See [the audit](operator/graph-audit.md).

Use `before-network-permissions` and `after-network-permissions` to compare this run's app code. The older `before-agentflow` and `after-agentflow` tags remain unchanged.
