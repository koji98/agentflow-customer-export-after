# Run Summary: 2026-09-24t10-42-57-811z-northstar-export-readiness-network-permissions-rerun

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

- Manifest: `results/2026-09-24/run/delivery/manifest.json`
- Delivery status: `passed`
- Review ready: `true`
- Review brief: `results/2026-09-24/run/delivery/01-review-brief.md`
- Intervention count: `0`
- Active failure count: `0`
- Recovered issue count: `0`

## Outcome Verification

- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__generate_validate` (attempt=1, iteration=1) -> `passed` (findings=0, blockers=0) - The implementation satisfies the export and preview contracts with focused changes, complete artifacts, and consistent validation evidence. The verifier reran `npm test && python3 showcase/acceptance/check_preview.py` successfully: 13/13 Node tests, 24/24 export/listing checks, and 5/5 preview checks passed. Protected files and dependencies were unchanged, and the documented lack of manual browser validation is a disclosed limitation rather than a contract blocker.
- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__plan` (attempt=1, iteration=1) -> `passed` (findings=1, blockers=0) - The planning node satisfies its contract. The declared plan comprehensively addresses export correctness, preview behavior, operator clarity, regression coverage, validation, and protected-file constraints. The completion packet is ready for verification, the artifact hash matches, and changed-files.json confirms no workspace edits.

## Workspace Changes

- `main`: status=`results/2026-09-24/run/workspace-changes/main/status.txt`, diff=`results/2026-09-24/run/workspace-changes/main/diff.patch`, changed_files=`results/2026-09-24/run/workspace-changes/main/changed-files.json` (8 files)

## Latest Executions

- `export_readiness__managed__pattern_deep_work__workflow__export_readiness` -> `passed` (attempt=1)
- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__completion_gate` -> `passed` (attempt=1, iteration=1)
- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__criteria_panel__export_readiness__managed__pattern_deep_work__criterion_01_behavior` -> `passed` (attempt=1, iteration=1) · evidence=passed
- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__criteria_panel__export_readiness__managed__pattern_deep_work__criterion_02_simplicity` -> `passed` (attempt=1, iteration=1) · evidence=passed
- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__criteria_panel__export_readiness__managed__pattern_deep_work__criterion_03_operator_clarity` -> `passed` (attempt=1, iteration=1) · evidence=passed
- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__generate_validate` -> `passed` (attempt=1, iteration=1) · outcome=passed
- `export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__plan` -> `passed` (attempt=1, iteration=1) · outcome=passed
