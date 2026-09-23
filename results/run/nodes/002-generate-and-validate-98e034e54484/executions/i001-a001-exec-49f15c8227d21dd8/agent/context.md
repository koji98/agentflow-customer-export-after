# Context Manifest

Context entries are pointers. The runtime does not copy or truncate source context into this prompt package.

## Pointers

| Name | Kind | Pointer | What | Why |
| --- | --- | --- | --- | --- |
| `customer_export_ticket` | `workspace_file` | `./TICKET.md` | Customer export defect and observable acceptance contract. | The export must preserve the operator’s filters and every customer field. |
| `project_guide` | `workspace_file` | `./README.md` | Local commands, source layout, and public API semantics. | The repair must preserve existing listing behavior and public routes. |
| `preview_contract` | `workspace_file` | `./EXPORT_PREVIEW.md` | The operator-facing preview behavior and stable preview API contract. | Count, sample, filter scope, and download behavior must agree for the operator to make an informed decision. |
| `plan` | `artifact` | `results/run/nodes/001-deep-work-plan-9c25ab584330/executions/i001-a001-exec-d46bd0c10700079a/artifacts/plan.md` | Artifact "plan" produced by node "export_readiness__managed__pattern_deep_work__plan". | This task needs the producer artifact as evidence for its contract. |

