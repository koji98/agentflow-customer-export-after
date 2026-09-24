# What happened in the new run

The task passed on the first work cycle. Agentflow finished all seven steps and produced a review-ready report. The whole run took **12 minutes 52 seconds**: about 12 minutes 9 seconds for the graph, then 43 seconds for its report.

## The results

| Check | Before | After |
| --- | --- | --- |
| Original or current app tests | 6/6 | 13/13 |
| Fixed task checks | 16/29 | 29/29 |
| Simplicity AI score | Not run | 1.00 |
| Clear preview text AI score | Not run | 1.00 |
| Setup tests, run separately | Not part of the graph | 4/4 |

The code changes cover eight files. The agent shared the matching rules between the list, export, and preview; fixed CSV quoting; added the preview endpoint; and built a dialog with count, scope, columns, sample, cancel, and download controls. It added seven tests. It added no dependencies and left all 21 protected inputs unchanged.

The first six tests were too narrow to prove the new task was done. Read [why six tests could pass](tests-explained.md).

## Did the permission fix work?

Yes, in this run. Both judge logs say `sandbox: read-only (network access enabled)`. Each judge then ran `npm test` and got 13 passed, zero failed, and zero skipped. The prior run's local-server `EPERM` did not recur. See [judge-test-evidence.json](judge-test-evidence.json) for exact log lines.

Agentflow was built from merged commit `460fdf31d94390a1aaf12a8f309ebcbf8c4b1d13`. Its default branch is named `master`. The graph was unchanged. Codex CLI was 0.144.5. Its `auto` setting selected GPT-5.6-sol with medium reasoning in the direct worker and judge logs. The first saved run used GPT-5.5 and CLI 0.142.2, so this is not a controlled comparison of only the permission change.

## What the full scores missed

The desktop preview is now visible as soon as it opens. But when the preview request fails, a blue download control stays on screen with no link. The browser review also found ordinary cells used for the sample table's headings. These findings do not change the saved scores. They show the limits of code-and-text review and string-matching UI tests. See the [browser check](browser-review.md).

The agent's new UI test checks words in source files. It never opens a browser. Passing that test cannot prove that a control is hidden, visible, or easy to use.

## A detour hidden by the short report

The plan said that the preview contract was “not implemented.” Agentflow's broad placeholder detector treated those words as unfinished plan content. `af complete check` failed. The agent read the detector and changed the sentence to say “absent.” The check then passed. No task rule or check was weakened.

This happened inside the planning step, so it did not create a second graph attempt or a supervisor intervention. It is a real tool-friction finding even though the generated run-learnings file says no concrete improvement was found. The [plan log](../run/nodes/001-deep-work-plan-9c25ab584330/executions/i001-a001-exec-d46bd0c10700079a/human-debug/harness/stderr.log) records the failed completion check at line 1226 and the wording change at line 1536.

**Suggested Agentflow improvement:** distinguish a plan describing missing product behavior from an unfinished placeholder. Test this with a small completion-check case before changing the rule.

## Is the demo fair?

The graph contains a task and checks, not the finished solution or fake scores. But the starting README links to prior results, and the agents read it. The acceptance checks are visible too. Call this an **open-book workflow demo**, not a blind test or proof that Agentflow beats Codex alone. Read the [full fairness audit](graph-audit.md).

## What was preserved

The app is the exact result of the run. The operator did not repair its remaining bugs or change any scores. The first run's 230 archived evidence files are kept unchanged. New guides and this review were written after the run and were not fed back to its agents.
