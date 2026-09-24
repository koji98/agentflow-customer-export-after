# About the saved files

[Back to the results](README.md)

This repo keeps the app and files from one real Agentflow run. The app code, page, tests, and data match that run. The known scroll issue is still there.

## What is included?

- **202 run files** in `run/`: plans, AI messages, checks, scores, logs, and reports.
- **28 files** in `operator/`: saved checks and notes from the person running the demo.
- [archive-manifest.json](archive-manifest.json): a list of the copied files and their fingerprints.

No run files were left out. The copied files were scanned for secrets. The two files named `credential-config.json` have empty settings and contain no credentials.

The guides, setup tools, and public repo layout were added after the run.

## Why do some paths look different?

We changed paths that only worked on the original computer. This lets you follow the files in this repo.

| Original location | Location shown here |
| --- | --- |
| The app's working folder | `.` |
| The saved run folder | `results/run` |
| The extra checks and notes | `results/operator` |
| Home and temporary folders | Placeholder names |

The AI comments, scores, times, IDs, and order of events were kept. The original files were also kept separately without these path changes.

Each file has a **hash**, which works like a fingerprint. The file list records hashes for both the original file and the copy here. A path change can make these hashes differ. Hashes written inside the old logs still refer to the original files.

## Can I restart this saved run?

Use the [before repo](https://github.com/koji98/agentflow-customer-export-before) to start a new run. These saved files are a record to read; they are not set up to resume from this folder.

The [recorded graph](recorded-graph.json) keeps the original workflow with updated paths. The runnable graph at the top of the repo also has changes that let it find the public check tools. See [where the example came from](../showcase/PROVENANCE.md).

## Notes that may look odd

**The preview task was marked as untracked.** The file `EXPORT_PREVIEW.md` existed before the run, but had not been added to Git. Its hashes before and after the run match. The before repo now includes it in Git.

**One link in the old audit index has no file.** It points to `runtime/observations.jsonl`. The original run never created that optional file. It was not lost when we copied the run. The separate browser notes are in [browser-review.md](operator/browser-review.md).

**The browser issue did not affect the AI scores.** The browser check happened separately. Its findings were not sent to either judge. A score of 1.00 means the judge passed the work under its rules; it does not prove there are no bugs.

## IDs for checking the source

| Item | Value |
| --- | --- |
| Run ID | `2026-09-23t21-58-04-755z-northstar-export-readiness-preview-rehearsal` |
| Agentflow commit | `bf7399955a45ea9e8fe0959c64be7a06649d997f` |
| First public before commit | `e72e8a5124b408505040a60913b54137d98f14d2` |

The saved run took **13 minutes and 13 seconds** and passed on its first try. It does not show how a failed try would be repaired.
