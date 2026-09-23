# Run Summary: 2026-09-23t21-58-04-755z-northstar-export-readiness-preview-rehearsal

- Graph: `northstar-export-readiness`
- Graph status: `passed`
- Delivery status: `passed`
- Review ready: `true`
- Evidence status: `clean`
- Workspace backend: `inplace`
- Snapshot seq: `57`
- Counts: `passed=7 failed=0 blocked=0 canceled=0 skipped=0`
- Soft verification counts: `passed=3 failed=0`
- Outcome verification counts: `passed=2 failed=0`

## Delivery Package

- Manifest: `results/run/delivery/manifest.json`
- Delivery status: `passed`
- Review ready: `true`
- Review brief: `results/run/delivery/01-review-brief.md`
- Intervention count: `0`
- Active failure count: `0`
- Recovered issue count: `0`

## Outcome Verification

- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__generate_validate` (attempt=1, iteration=1) -> `passed` (findings=1, blockers=0) - The completion packet is ready for verification, declared artifacts are present and substantive, and the recorded validation evidence satisfies the export repair and preview contracts.
- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__plan` (attempt=1, iteration=1) -> `passed` (findings=1, blockers=0) - The planning node satisfied its contract: it produced a focused execution plan for the customer export repair, identified concrete validation the executor should run, captured current failure evidence, and did not edit the workspace.

## Workspace Changes

- `main`: status=`results/run/workspace-changes/main/status.txt`, diff=`results/run/workspace-changes/main/diff.patch`, changed_files=`results/run/workspace-changes/main/changed-files.json` (9 files)

## Latest Executions

- `export_readiness__managed__pattern_deep_work__workflow__export_readiness` -> `passed` (attempt=1)
- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__completion_gate` -> `passed` (attempt=1, iteration=1)
- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__criteria_panel__export_readiness__managed__pattern_deep_work__criterion_01_behavior` -> `passed` (attempt=1, iteration=1) · evidence=passed
- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__criteria_panel__export_readiness__managed__pattern_deep_work__criterion_02_simplicity` -> `passed` (attempt=1, iteration=1) · evidence=passed
- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__criteria_panel__export_readiness__managed__pattern_deep_work__criterion_03_operator_clarity` -> `passed` (attempt=1, iteration=1) · evidence=passed
- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__generate_validate` -> `passed` (attempt=1, iteration=1) · outcome=passed
- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__plan` -> `passed` (attempt=1, iteration=1) · outcome=passed
