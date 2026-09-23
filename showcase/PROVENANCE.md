# Before-environment provenance

The application is byte-for-byte the original broken dashboard at source commit `e875f94c455716bcd33162b5f95a4224897d33ec`, except for the repository presentation README and ignore rules. The original app README is preserved as APP_GUIDE.md. EXPORT_PREVIEW.md is the exact additional task contract present before the expanded run; it is committed here so future runs start clean.

The graph is a portable packaging of the graph used for run `2026-09-23t21-58-04-755z-northstar-export-readiness-preview-rehearsal`. Its repository path, checker command, guide path, and protection for the now-colocated showcase files differ from the recorded launch. The outcomes, two rubric texts, thresholds, weights, maximum cycles, and runtime profiles are unchanged. See AUTHORING.md for the exact portable prose.

The original Agentflow runtime was built from commit `bf7399955a45ea9e8fe0959c64be7a06649d997f` of https://github.com/koji98/agentflow. The runtime is a prerequisite, not vendored into this repository. Node 24 and Python 3 are also required. Model selection remains `auto`; authenticated Codex access and current model behavior can affect a later run.

The independent acceptance oracle does not import the product implementation. Its canonical fixture is separately committed under showcase/acceptance. The checker relocation changes only where check_preview.py imports check_export.py.
