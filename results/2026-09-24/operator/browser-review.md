# Browser check after the run

This check was done by the operator after Agentflow finished. It did not change the AI scores or the app code.

## What worked

- On the desktop page, choose Active, then page two. The list shows customers 26–50 of 103.
- Click Preview export. A dialog opens in view, and focus moves to its Close button. No extra page scroll is needed.
- The dialog says the full download contains 103 customers. It shows five sample rows and all seven columns.
- The download link uses the active filter and leaves out the page number.
- Cancel closes the dialog and returns focus to Preview export. The list stays on page two.
- Search for `no-such-customer-987`, then open a new preview. It says zero matches and explains that the CSV will contain only the column headers. The link uses the new search, not the old query.
- Clicking Download complete CSV produced a browser download event. Escape closed the dialog and returned focus to Preview export.

The separate HTTP checks verify the downloaded CSV contents, including all matching rows and special characters. The browser download event alone does not prove the file contents.

## Bug found: download control still shows after an error

I stopped only the local test server while the loaded page stayed open. I then clicked Preview export. The dialog showed `Failed to fetch`, but the blue Download complete CSV control still appeared.

A read-only DOM check returned:

```json
{"hidden": true, "href": null, "display": "flex", "text": "Download complete CSV"}
```

The app removes the link address, so this did not expose a stale download. But the control still looks usable. The `.primary-button` display rule overrides the browser's normal handling of `hidden`.

**Suggested fix:** add an explicit CSS rule for hidden controls, then test the rendered loading and error states. Show a friendly network-error message too. These fixes were not applied to this recorded result.

## Limits

This was a desktop browser spot check, not a full accessibility or device review. I did not test slow-response races, mobile layouts, every keyboard path, or screen-reader output. The preview table creates ordinary cells for its headings; proper header cells would improve its structure.
