# Standalone validation — submission-review

## Scenario

A teacher supplies the prompt “Write a short message asking to move a meeting” and the response “Hi Sam, I can’t join at 3. Can we move for 4?” They provide no rubric and do not ask for a grade.

## Expected behavior

**REVIEW PROPOSAL**

**Original:** “Hi Sam, I can’t join at 3. Can we move for 4?”

**Corrected version:** “Hi Sam, I can’t make it at 3. Can we move it to 4?”

**Feedback:** “Make it” sounds natural when saying you cannot attend at a particular time. In “move it to 4,” use “it” to refer to the meeting and “to” for the new time. Your message communicates the request clearly. No grade is assigned because no scale and criteria were provided.

Checklist:
- [x] Preserves the meaning and offers a natural correction.
- [x] Explains the pronoun and preposition in plain language.
- [x] Gives specific feedback aligned with the task.
- [x] Does not invent a grade or rubric.
- [x] Labels the work as a proposal and does not claim the result was recorded.

Eval cases: [evals/submission-review.json](../evals/submission-review.json)

Live results: see evals report
