# Evidence provenance and export policy

Recorded run: `2026-09-23t21-58-04-755z-northstar-export-readiness-preview-rehearsal`. Runtime commit: `bf7399955a45ea9e8fe0959c64be7a06649d997f`. Packaged before commit: `e72e8a5124b408505040a60913b54137d98f14d2`.

The app source, UI, tests, and data match the recorded final workspace. The known preview-visibility issue is preserved. No manual repair was mixed into the scored result. Documentation, graph portability, and evidence packaging were added after the run.

Every one of the 202 run files is included under run/, including delivery, the event stream, state, authored and compiled graphs, all node executions, prompts, responses, verdicts, logs, artifacts, and patches. The two credential-config.json files contain empty credential_specs and tools arrays; they hold no credentials. A scan found no API keys, bearer tokens, JWTs, GitHub tokens, or populated secret-shaped JSON fields. No run files were omitted.

Absolute paths have been normalized: the recorded workspace becomes `.`, the original run root becomes `results/run`, and operator evidence becomes `results/operator`. Home and temporary directory prefixes become placeholders. These are presentation changes only; judge text, scores, timestamps, IDs, and event ordering remain intact. archive-manifest.json records original and exported SHA-256 hashes for each source file. Its original hashes refer to the untouched source evidence, not to the normalized copies. Hashes embedded inside archived runtime files likewise retain their original meaning.

The archived graphs, events, state, and prompts are historical evidence, not a resumable runtime root after relocation. Use the portable graph in the before repository to execute a new run. The root graph includes portability adjustments documented in showcase/PROVENANCE.md; results/recorded-graph.json preserves the original graph's structure with path normalization only.

The original review brief flags EXPORT_PREVIEW.md as untracked. It existed before the run; prelaunch and postrun hashes prove it was unchanged. The before repository now commits that context. The separate browser review is an operator observation and was not input to either recorded rubric judge.

This is one successful cycle, not an observed recovery demonstration. Reported 1.0 scores are judgments under the authored rubric, not guarantees of defect-free software. Total observed duration including delivery was 13m 13s.

The original generated audit index contains one link to `runtime/observations.jsonl`. That optional file was never created in the source run, which recorded no operator interventions. Its absence is preserved; it was not omitted during export. All other local links in the delivery review brief, learnings, audit index, and repository entry documents were verified. The separate browser observations are in operator/browser-review.md.
