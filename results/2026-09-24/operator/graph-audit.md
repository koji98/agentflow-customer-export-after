# Is this a fair demo?

This is a small, open-book demo of a coding workflow. It is not a blind benchmark or proof that Agentflow beats a direct Codex run.

## What the graph gives the agent

The graph names the task: fix the CSV download and add an export preview. It says what users should be able to do and how the work will be checked. It does not include the finished source code, a patch, exact helper names, or scores to copy.

Knowing the required result is normal. For example, a filter matching 103 customers should produce 103 CSV rows. The checker computes the expected rows from a separate copy of the data. It uses Python's CSV reader to compare the actual download with those rows. The preview contract even says its example count is illustrative and must be computed from the data.

The AI review rules describe simple code and clear labels. They allow different designs and tell judges to cite the code. The scorecard is produced during the run.

## What weakens the claim

1. **The agent can read about the earlier result.** The starting README links to the finished app and says the first run passed on its first try. The plan agent, coding agent, and both AI judges read that README. Prior scores may also bias the judges. The showcase docs also describe a browser issue from the old run. Those files are available even when they are not explicit graph context. We introduced those links when we wrote the public demo guides. They should be kept outside the agent workspace for a blind test.
2. **The acceptance checks are visible and inside the writable repo.** The agent can read the tests, expected data, and reference query code. It is told not to edit them. An outside pre-run hash list lets us check afterward that these files stayed unchanged. That is an open-book test, not a hidden or physically read-only test suite. The original ticket still says the checker is outside the repo; that sentence is stale after public packaging.
3. **This is a hand-made task with known defects.** The product and task were built for this demo. Results from one run do not establish general reliability or a comparison with Codex alone.
4. **The model changed.** The earlier run used GPT-5.5. All four direct worker/judge model logs name GPT-5.6-sol. The graph still says `auto`. Changes in the output cannot be attributed only to network permissions.
5. **The UI judge reviews code and words.** Its rubric does not prove that the rendered page is easy to use. A separate browser check is still needed.

Do not describe this run as blind. I reviewed the saved shell-command blocks and model logs. They show README reads and reads of the acceptance checker. I found no logged fetch of the old finished repo or read of its source. This is evidence about the saved trace, not a complete network capture. Seeing a link does not prove that code was copied; it still creates a source of hints.

The extracted commands are in [logged-shell-commands.json](logged-shell-commands.json). The full logs are kept in the run archive. The outside hash check confirmed that all 21 protected input and showcase files stayed unchanged. No app code was changed by the operator after the run.

The planning agent also read Agentflow's own placeholder-check code to understand a false alarm. It changed “not implemented” to “absent” in its plan. It did not change that check or fill in a fake result. This was a wording workaround, not a copied solution.

## How to make a stronger test

- Give the agent only the app, task, and development guide. Keep audience guides, earlier scores, previous code, and links to answers in a separate folder outside the agent's read scope.
- Keep the normal developer tests visible. Add separate checks with new data and queries that the agent cannot read or edit.
- Pin the model and CLI version when comparing changes to Agentflow.
- Add browser observations to the evidence if claiming the UI works well in a browser.
- Use several tasks and report failed attempts as well as successful ones before making a reliability claim.

These are suggestions for a later benchmark. We did not change the task, test rules, or input files during this run to improve its score.

## Source pointers

- [Starting README](https://github.com/koji98/agentflow-customer-export-before/blob/8c5387e80a736ceeda41994c1af93b41881b8340/README.md): prior-result links and first-try claim.
- [Starting graph](https://github.com/koji98/agentflow-customer-export-before/blob/8c5387e80a736ceeda41994c1af93b41881b8340/agentflow.graph.json): task, three criteria, threshold, and retry limit.
- [Original tests](https://github.com/koji98/agentflow-customer-export-before/tree/8c5387e80a736ceeda41994c1af93b41881b8340/test): what the six checks cover.
- [Acceptance tools](https://github.com/koji98/agentflow-customer-export-before/tree/8c5387e80a736ceeda41994c1af93b41881b8340/showcase/acceptance): visible query reference and checks.
