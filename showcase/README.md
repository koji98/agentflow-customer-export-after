# Where to find things

[Back to the app guide](../README.md)

The app lives in `src/`, `public/`, and `data/`. The `showcase/` folder holds the guides and tools used to run this demo and check the work.

## Start with these guides

| File | What it helps you do |
| --- | --- |
| [README.md](../README.md) at the top of the repo | Start the app and try it. |
| [SETUP.md](SETUP.md) | Fix setup errors. |
| [RUN.md](RUN.md) | Install the AI tools and run Agentflow. |
| [AUTHORING.md](AUTHORING.md) | See the workflow and understand the scores. |
| [PROVENANCE.md](PROVENANCE.md) | See where the example came from and which versions it used. |

## The app and its task

| File or folder | What is inside |
| --- | --- |
| `src/` | Code for the server, customer search, and export. |
| `public/` | The page, buttons, and styles you see in the browser. |
| `data/customers.json` | 137 made-up customers. |
| `test/` | Tests for the app. |
| [agentflow.graph.json](../agentflow.graph.json) | The steps and rules Agentflow runs. |
| [TICKET.md](../TICKET.md) | The original request to fix the CSV download. |
| [EXPORT_PREVIEW.md](../EXPORT_PREVIEW.md) | The original request for the preview. |
| [APP_GUIDE.md](../APP_GUIDE.md) | The app notes given to the AI. |
| [AGENTS.md](../AGENTS.md) | Rules the coding agent must follow. |

The four original task files keep the exact words used for the task. The guides above explain the demo in plain language.

## Checks in `showcase/acceptance/`

These checks ask whether the app does what the task needs. They test the app from the outside, using a separate copy of the expected data.

| File | What it does |
| --- | --- |
| [check_export.py](acceptance/check_export.py) | Checks CSV rows, filters, sorting, page limits, and text with special characters. |
| [check_preview.py](acceptance/check_preview.py) | Runs the export checks, then checks the preview. Together there are 29 cases. |
| [customers.json](acceptance/customers.json) | Holds the expected customer data for the checks. |
| [protected-files.json](acceptance/protected-files.json) | Stores file fingerprints to detect changes to protected data and task rules. |
| [preview-contract.sha256](acceptance/preview-contract.sha256) | Stores a fingerprint of the preview task file to detect edits. |

A file fingerprint is called a **hash**. If a file changes, its hash changes too.

## Setup tools in `showcase/setup/`

| File | What it does |
| --- | --- |
| [doctor.mjs](setup/doctor.mjs) | Checks that you have the tools needed to run the app. Its workflow mode also checks Agentflow, Codex, and sign-in. |
| [doctor.test.mjs](setup/doctor.test.mjs) | Checks that the doctor spots common setup problems. |

## Earlier saved checks in `showcase/verification/`

These files are from the first run and public setup checks. For the current app, use the [September 24 evidence](../results/2026-09-24/README.md).

| File | What it shows |
| --- | --- |
| [baseline-tests.log](verification/baseline-tests.log) | The before app passes its 6 existing tests. |
| [baseline-acceptance.log](verification/baseline-acceptance.log) | The before app passes only 16 of the 29 task checks. |
| [preflight-summary.json](verification/preflight-summary.json) | The workflow file passed the check needed before a run. It also lists the warning summary. |
| [after-tests.log](verification/after-tests.log) | The after app passes all 12 app tests. |
| [after-acceptance.log](verification/after-acceptance.log) | The after app passes all 29 task checks. |
| [packaging-review.json](verification/packaging-review.json) | The copied app, scores, and saved files were checked against the original run. |

## The full run is in `results/`

Open the [results guide](../results/README.md) first. It links to the actual scores, AI messages, test logs, and browser check.

The files in `showcase/verification/` come from our later checks of these repos. The files in `results/` tell the story of the recorded run.

When you run the workflow, it runs the checks again. These saved logs are only a record of an earlier check.
