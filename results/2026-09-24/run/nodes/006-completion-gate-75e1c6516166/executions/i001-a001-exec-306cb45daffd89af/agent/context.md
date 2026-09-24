# Context Manifest

Context entries are pointers. The runtime does not copy or truncate source context into this prompt package.

## Pointers

| Name | Kind | Pointer | What | Why |
| --- | --- | --- | --- | --- |
| `customer_export_ticket` | `workspace_file` | `./TICKET.md` | Customer export defect and observable acceptance contract. | The export must preserve the operator’s filters and every customer field. |
| `project_guide` | `workspace_file` | `./APP_GUIDE.md` | Local commands, source layout, and public API semantics. | The repair must preserve existing listing behavior and public routes. |
| `preview_contract` | `workspace_file` | `./EXPORT_PREVIEW.md` | The operator-facing preview behavior and stable preview API contract. | Count, sample, filter scope, and download behavior must agree for the operator to make an informed decision. |
| `criterion_01_result` | `artifact` | `results/2026-09-24/run/nodes/003-completion-criterion-behavior-38af039dce36/executions/i001-a001-exec-1dce0da035259202/artifacts/verification.json` | Artifact "verification_json" produced by node "export_readiness__managed__pattern_deep_work__criterion_01_behavior". | This task needs the producer artifact as evidence for its contract. |
| `criterion_02_result` | `artifact` | `results/2026-09-24/run/nodes/004-completion-criterion-simplicity-b6a79a212e3f/executions/i001-a001-exec-5f3d8df7e49b2f08/artifacts/verification.json` | Artifact "verification_json" produced by node "export_readiness__managed__pattern_deep_work__criterion_02_simplicity". | This task needs the producer artifact as evidence for its contract. |
| `criterion_03_result` | `artifact` | `results/2026-09-24/run/nodes/005-completion-criterion-operator-clarity-02d7462b7481/executions/i001-a001-exec-d3211ef81bbcfd45/artifacts/verification.json` | Artifact "verification_json" produced by node "export_readiness__managed__pattern_deep_work__criterion_03_operator_clarity". | This task needs the producer artifact as evidence for its contract. |

