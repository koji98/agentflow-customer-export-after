# Browser review of the first preview rehearsal

Observed directly in the Codex browser at `http://127.0.0.1:4320/` on 2026-09-23. This operator review is separate from the graph's source-based rubric judges and was not injected into their prompts. No application files were changed by this review.

## Confirmed interactions

- Selected Active and moved to page two: the listing showed 26–50 of 103 customers.
- Opened Preview export: the preview stated “103 matching customers will be included in the full CSV download.” It listed all seven exported columns and labeled the first five records as a sample. The sample started with C001 despite the listing being on page two.
- Changed Segment to Growth while the preview was open: the previous preview disappeared. Reopening showed 35 matching customers and the new active/growth scope, with C002 as the first sample record.
- Clicked Cancel: the preview disappeared.
- Searched for `does-not-exist-xyz` and reopened the preview: the count was zero, no sample table appeared, and the message said downloading would create a CSV with column headers only.
- Browser warning/error log query returned an empty list during these checks.

## Finding: opening the preview does not reveal it in the viewport

At a 1280×720 browser viewport, clicking Preview export left the top of the dashboard visible and focus on “Preview export.” The newly revealed preview sits below the customer directory. A DOM measurement after opening it returned the “Review customer export” heading at y=1147.5, beyond the 720-pixel viewport. The screenshot after the click also showed no preview in view.

This can make the button appear unresponsive until the operator scrolls down. Before presenting the feature live, make opening the preview reveal it and move focus appropriately, or place the preview in a visible dialog. Add a browser acceptance check for that behavior. The source-only clarity rubric deliberately excludes claims about rendered layout, so a passing score does not close this finding.

## Limits

These checks did not exercise delayed-network races, a full keyboard-accessibility audit, or the browser's download event. The graph's deterministic HTTP/CSV checks provide the file-content evidence. This is a focused browser walkthrough, not exhaustive UI assurance.
