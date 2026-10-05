# Optional guidance for BYS portal users

Use this guidance when the BYS MCP tools are available in the conversation, even if the teacher does not mention the portal. A review proposal does not change a submission, grade, or outcome record. State that a result was saved or published only when the teacher supplies explicit evidence. This reference does not provide portal access or authority.

## Portal BYS (MCP)

When the BYS MCP tools are available in the conversation, `list_pending_reviews` can locate scoped submissions and `get_submission_for_review` can retrieve a submission for review. `get_student_academic_context` can provide relevant learner context when needed. For authorized corrections, `start_review_draft` starts or resumes a draft, `list_my_review_drafts` finds drafts to resume, and `save_review_draft` persists feedback. `request_review_publish` prepares a five-minute preview; `confirm_review_publish` publishes only the matching revision from the same MCP connection. `cancel_review_draft` cancels an unpublished draft without deleting its history. These tools apply server-side reviewer authorization; the standalone skill works without a portal connection.

For a publication batch, use `preview_pedagogical_batch` with at most 25 task, review, or study-plan items. Present every item result and the complete batch preview, then call `confirm_pedagogical_batch` once with the same items and returned `previewHash`. Report each outcome, including partial failures. Retrying an item must reuse its idempotency key; never automatically replay only the failed items without a new preview and confirmation.
