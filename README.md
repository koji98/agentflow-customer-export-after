# Agentflow customer export — after

The actual application produced by the expanded Agentflow rehearsal, together with the full run history and real scorecards. The app source is preserved as generated, including the known preview-visibility issue.

**Result:** 12/12 product tests, 29/29 independent checks, simplicity 1.00, operator clarity 1.00. One cycle, zero supervisor interventions. Graph and delivery passed in 13m 13s total.

Start with the [results walkthrough](results/README.md), [scorecard](results/operator/scorecard.json), or [original review brief](results/run/delivery/01-review-brief.md).

## Run the resulting dashboard

Requires Node 24 and Python 3; no npm dependencies.

```sh
PORT=4318 npm start
```

Open http://127.0.0.1:4318. Select Active, move to page two, and choose Preview export. It describes all 103 matching customers, shows a five-record sample, and exports the complete result. The preview opens below the directory without scrolling into view; scroll down to inspect it. See the [browser finding](results/operator/browser-review.md).

## Verify the result

```sh
npm test
python3 showcase/acceptance/check_preview.py
git diff before-agentflow..HEAD -- src public test
```

The tests and checker should all pass. The comparison isolates the generated application changes from the added documentation and evidence.

## Repository contents

- src/, public/, test/, and data/: the exact recorded resulting application.
- agentflow.graph.json: the portable workflow also committed in the before repository.
- TICKET.md, EXPORT_PREVIEW.md, APP_GUIDE.md: original task inputs.
- showcase/: portable acceptance tools and graph authoring/provenance notes.
- results/run/: the complete recorded run, including prompts, responses, events, attempts, checks, artifacts, delivery, and diffs.
- results/operator/: saved scorecard, test output, baseline checks, preflight, integrity evidence, timing, and independent browser review.
- results/archive-manifest.json: original and exported hashes for every archived source file.

The recorded run used the original graph and paths; packaging made paths portable and committed pre-existing task context. [Evidence provenance](results/PROVENANCE.md) documents these changes. Archived runtime files are an audit record, not a relocated resumable run. Use the separate `agentflow-customer-export-before` repository for a fresh execution. Both repos share the `before-agentflow` commit; this repository adds the actual outcome in a second commit.
