# Authoring Review

- Status: `warnings`
- Mode: `strict`
- Findings: `10`
- Serious: `0`
- Warnings: `10`

## Findings

### 1. handoff

- Severity: `warning`
- Node: `export_readiness__managed__pattern_deep_work__plan`
- Path: `$.graph.steps[0].body.steps[0].context[5].ref`
- Message: Node "export_readiness__managed__pattern_deep_work__plan" consumes automatic artifact "export_readiness__managed__pattern_deep_work__criterion_01_behavior.verification_json".
- Recommendation: Prefer a named declared artifact for durable downstream handoffs.

### 2. handoff

- Severity: `warning`
- Node: `export_readiness__managed__pattern_deep_work__plan`
- Path: `$.graph.steps[0].body.steps[0].context[6].ref`
- Message: Node "export_readiness__managed__pattern_deep_work__plan" consumes automatic artifact "export_readiness__managed__pattern_deep_work__criterion_01_behavior.stdout".
- Recommendation: Prefer a named declared artifact for durable downstream handoffs.

### 3. handoff

- Severity: `warning`
- Node: `export_readiness__managed__pattern_deep_work__plan`
- Path: `$.graph.steps[0].body.steps[0].context[7].ref`
- Message: Node "export_readiness__managed__pattern_deep_work__plan" consumes automatic artifact "export_readiness__managed__pattern_deep_work__criterion_01_behavior.stderr".
- Recommendation: Prefer a named declared artifact for durable downstream handoffs.

### 4. handoff

- Severity: `warning`
- Node: `export_readiness__managed__pattern_deep_work__plan`
- Path: `$.graph.steps[0].body.steps[0].context[8].ref`
- Message: Node "export_readiness__managed__pattern_deep_work__plan" consumes automatic artifact "export_readiness__managed__pattern_deep_work__criterion_02_simplicity.verification_json".
- Recommendation: Prefer a named declared artifact for durable downstream handoffs.

### 5. handoff

- Severity: `warning`
- Node: `export_readiness__managed__pattern_deep_work__plan`
- Path: `$.graph.steps[0].body.steps[0].context[9].ref`
- Message: Node "export_readiness__managed__pattern_deep_work__plan" consumes automatic artifact "export_readiness__managed__pattern_deep_work__criterion_03_operator_clarity.verification_json".
- Recommendation: Prefer a named declared artifact for durable downstream handoffs.

### 6. handoff

- Severity: `warning`
- Node: `export_readiness__managed__pattern_deep_work__completion_gate`
- Path: `$.graph.steps[0].body.steps[3].context[3].ref`
- Message: Node "export_readiness__managed__pattern_deep_work__completion_gate" consumes automatic artifact "export_readiness__managed__pattern_deep_work__criterion_01_behavior.verification_json".
- Recommendation: Prefer a named declared artifact for durable downstream handoffs.

### 7. handoff

- Severity: `warning`
- Node: `export_readiness__managed__pattern_deep_work__completion_gate`
- Path: `$.graph.steps[0].body.steps[3].context[4].ref`
- Message: Node "export_readiness__managed__pattern_deep_work__completion_gate" consumes automatic artifact "export_readiness__managed__pattern_deep_work__criterion_01_behavior.stdout".
- Recommendation: Prefer a named declared artifact for durable downstream handoffs.

### 8. handoff

- Severity: `warning`
- Node: `export_readiness__managed__pattern_deep_work__completion_gate`
- Path: `$.graph.steps[0].body.steps[3].context[5].ref`
- Message: Node "export_readiness__managed__pattern_deep_work__completion_gate" consumes automatic artifact "export_readiness__managed__pattern_deep_work__criterion_01_behavior.stderr".
- Recommendation: Prefer a named declared artifact for durable downstream handoffs.

### 9. handoff

- Severity: `warning`
- Node: `export_readiness__managed__pattern_deep_work__completion_gate`
- Path: `$.graph.steps[0].body.steps[3].context[6].ref`
- Message: Node "export_readiness__managed__pattern_deep_work__completion_gate" consumes automatic artifact "export_readiness__managed__pattern_deep_work__criterion_02_simplicity.verification_json".
- Recommendation: Prefer a named declared artifact for durable downstream handoffs.

### 10. handoff

- Severity: `warning`
- Node: `export_readiness__managed__pattern_deep_work__completion_gate`
- Path: `$.graph.steps[0].body.steps[3].context[7].ref`
- Message: Node "export_readiness__managed__pattern_deep_work__completion_gate" consumes automatic artifact "export_readiness__managed__pattern_deep_work__criterion_03_operator_clarity.verification_json".
- Recommendation: Prefer a named declared artifact for durable downstream handoffs.
