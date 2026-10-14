# Standalone validation — submission-review

## Scenario

A teacher supplies the prompt “Write a short message asking to move a meeting” and the response “Hi Sam, I can’t join at 3. Can we move for 4?” They provide no rubric and do not ask for a grade.

## Expected behavior

**REVIEW PROPOSAL**

**Original:** “Hi Sam, I can’t join at 3. Can we move for 4?”

**Corrected version:** “Hi Sam, I can’t make it at 3. Can we move it to 4?”

**Feedback for the learner:** One priority: natural phrasing for scheduling. Before: “I can’t join at 3.” → After: “I can’t make it at 3.” For your next message, use “make it” when you cannot attend at a particular time.

**Notes for the teacher:** The message communicates the request clearly. The priority pattern is natural phrasing for scheduling: “make it” when you cannot attend at a particular time, and “move it to 4” with “it” for the meeting and “to” for the new time. Everything supplied could be evaluated. No grade is assigned because no scale and criteria were provided.

Checklist:
- [x] Preserves the meaning and offers a natural correction.
- [x] Separates the learner feedback from the teacher notes.
- [ ] When saved to the BYS portal, each relevant correction becomes an anchored `rangeComment`; learner feedback goes to `generalFeedback` and teacher notes to `internalObservation` (not exercised in this standalone sample).
- [x] Keeps the learner part within three priorities, each with a before→after example from the submission.
- [x] Explains the pronoun and preposition in plain language.
- [x] Gives specific feedback aligned with the task.
- [x] Does not invent a grade or rubric.
- [x] Labels the work as a proposal and does not claim the result was recorded.

Eval cases: [evals/submission-review.json](../evals/submission-review.json)

Live results: see evals report
