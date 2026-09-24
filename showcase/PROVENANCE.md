# Where this example came from

[Back to the app guide](../README.md)

This is the app made by the recorded Agentflow run. Its code, page, tests, and customer data match the result from that run. The preview still needs you to scroll down to see it.

The run started from the broken app at Git commit `e875f94c455716bcd33162b5f95a4224897d33ec`.

| Saved copy | Git tag | Git commit |
| --- | --- | --- |
| Before the run | `before-agentflow` | `e72e8a5124b408505040a60913b54137d98f14d2` |
| After the run | `after-agentflow` | `da85448451f79c19c07eae28a48b88d1cff66af6` |

A tag is a name for a saved point in Git history. Use the tags to compare the app code before and after the run.

See [about the saved files](../results/PROVENANCE.md) for details about the run logs and scores.

## Which versions were used?

| Part | Saved run | Public setup guide |
| --- | --- | --- |
| Node.js | 24.18.0 | 24.18.0 |
| Python | 3.12 | 3.10 or later |
| Codex CLI | 0.142.2 | 0.144.5, tested during setup checks |
| Model | GPT-5.5, medium reasoning | The graph lets Codex choose its default |
| Agentflow | The Git commit below | The same Git commit |

Agentflow commit: `bf7399955a45ea9e8fe0959c64be7a06649d997f` in [koji98/agentflow](https://github.com/koji98/agentflow).

The graph says `"model": "auto"`. A later run may use a different model and get a different result. See [Run the workflow](RUN.md) for setup steps.

## What changed when we shared the example?

We changed file paths so the graph can run from a new clone. The check command now uses tools inside `showcase/acceptance/`. The app notes are in `APP_GUIDE.md`.

We also told the AI to leave the workflow and showcase files alone. The task, AI scoring rules, score limits, and number of tries stayed the same.

In the original run, the check tools lived outside the app folder. Here, they live in the repo and have their own copy of the expected data. The rules tell the AI to leave them alone.

## What was added later?

We added setup guides, `.nvmrc`, a lockfile, the doctor tool, and GitHub checks for Linux and macOS. We then rewrote the reader guides in plain English.

These changes did not change the app code or the original task files. The saved Git tags still point to the same before and after copies.
