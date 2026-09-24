# Where this example came from

The current app was made by the September 24 Agentflow rerun. Its source, page, tests, and customer data match the recorded result. The remaining download-control bug has not been fixed by hand.

- [Latest run versions, source, and file hashes](../results/2026-09-24/PROVENANCE.md)
- [First run source and file hashes](../results/first-run-provenance.md)
- [Fairness audit](../results/2026-09-24/operator/graph-audit.md)

The new run started from the public before repo at `8c5387e80a736ceeda41994c1af93b41881b8340`. It used Agentflow `460fdf31d94390a1aaf12a8f309ebcbf8c4b1d13`, Node 24.18.0, and Codex CLI 0.144.5. The direct worker and judge logs name GPT-5.6-sol with medium reasoning. The graph still says `auto`.

The tags `before-network-permissions` and `after-network-permissions` mark this run's two app states. The older `before-agentflow` and `after-agentflow` tags still mark the first run.

The task and its graph were kept unchanged during the rerun. Setup guides were updated afterward. In the public repo, acceptance tools live inside `showcase/acceptance/`; the agent can read them and is told not to edit them. An outside hash check confirmed that they stayed unchanged. One sentence in the original ticket still describes the earlier layout, where these tools lived outside the app.

After the recorded run, the `npm start` command was set to use port **4318** by default. This lets the before app keep using **4317** while both run at once. This setup change and its guide updates do not change the saved app source, tests, customer data, or run results.

[Back to the app](../README.md) · [Run the workflow](RUN.md)
