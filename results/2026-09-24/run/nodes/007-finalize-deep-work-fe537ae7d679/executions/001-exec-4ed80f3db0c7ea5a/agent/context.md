# Context Manifest

Context entries are pointers. The runtime does not copy or truncate source context into this prompt package.

## Pointers

| Name | Kind | Pointer | What | Why |
| --- | --- | --- | --- | --- |
| `customer_export_ticket` | `workspace_file` | `./TICKET.md` | Customer export defect and observable acceptance contract. | The export must preserve the operator’s filters and every customer field. |
| `project_guide` | `workspace_file` | `./APP_GUIDE.md` | Local commands, source layout, and public API semantics. | The repair must preserve existing listing behavior and public routes. |
| `preview_contract` | `workspace_file` | `./EXPORT_PREVIEW.md` | The operator-facing preview behavior and stable preview API contract. | Count, sample, filter scope, and download behavior must agree for the operator to make an informed decision. |
| `completion_scorecard` | `artifact` | `results/2026-09-24/run/nodes/006-completion-gate-75e1c6516166/executions/i001-a001-exec-306cb45daffd89af/artifacts/scorecard.json` | Artifact "completion_scorecard" produced by node "export_readiness__managed__pattern_deep_work__completion_gate". | This task needs the producer artifact as evidence for its contract. |
| `work_notes` | `artifact` | `results/2026-09-24/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/artifacts/work-notes.md` | Artifact "work_notes" produced by node "export_readiness__managed__pattern_deep_work__generate_validate". | This task needs the producer artifact as evidence for its contract. |
| `draft_summary` | `artifact` | `results/2026-09-24/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/artifacts/draft-summary.md` | Artifact "draft_summary" produced by node "export_readiness__managed__pattern_deep_work__generate_validate". | This task needs the producer artifact as evidence for its contract. |

