# Changelog

## 0.19.0 — 2026-10-13

- Split the submission-review answer into two labeled parts, in this order: a short **Feedback for the learner** capped at three priorities — each with a before→after example taken from the submission and an action for the next submission — followed by the complete **Notes for the teacher**. The completion criterion and the eval assertions now require the separation, the three-priority cap, and the before→after anchors.

## 0.18.0 — 2026-10-13

- Named `get_class_context` as the single class-context read in the portal references of task-design, submission-review, study-planning, staff-assistance, and lesson-planning: a request about a class now uses the consolidated class context (roster, current levels, active study plans, recent sessions, and tasks) instead of the roster plus per-learner context, while `get_student_academic_context` deepens an individual learner.

## 0.17.0 — 2026-10-12

- Added a shared rule that, when authenticated context tools are available, skills retrieve each learner's current level and recent history before creating, adapting, correcting, or planning, and cite that evidence or state what was missing.
- Named the required context sequence in the portal references: for tasks, reviews, study plans, and staff questions, the class roster (when the request is about a class) followed by per-learner academic context; for lesson and course planning, the lesson design context for a class and the course design context for each learner, with academic context as a complement.
- Added eval cases that supply simulated context-tool results and check that responses cite each learner's level and adapt the proposal.

## 0.16.0 — 2026-10-04

- Clarified how to use connected teaching tools within their documented scope and moved draft, publication, and archiving procedures into the optional portal reference.
- Refined academic support, learner-work review, study-plan estimates, and course-design completion criteria.
- Grounded course design in CEFR Companion Volume can-do descriptors, flexible lesson stages, formative checks, and accessible participation.

## 0.15.1 — 2026-10-03

- Added guidance for reviewing affected classes, learners, and preserved submissions before archiving a task. The procedure is reversible and does not delete records.

## 0.15.0 — 2026-10-03

- Added announcement preview, publication, and reversible archiving guidance. Publication is confirmed against the exact recipient list; drafts expire and cannot be deleted through the connected tools.

## 0.14.0 — 2026-10-03

- Added proficiency registration and history-correction guidance with a short, exact-content confirmation. Correcting the latest entry also updates the current learner profile; older corrections affect history only.

## 0.13.0 — 2026-10-02

- Added notebook lookup and exact-content confirmation guidance for editing internal notebooks. External notebooks remain read-only.

## 0.12.0 — 2026-10-02

- Added attendance lookup for authorized classes and a 90-day window, plus confirmed attendance creation and reversible cancellation.

## 0.11.0 — 2026-10-02

- Added read-only guidance for checking contracted, completed, and remaining class sessions by learner and month.

## 0.10.0 — 2026-10-02

- Added teacher agenda lookup guidance for date ranges up to 90 days.

## 0.9.0 — 2026-10-01

- Added batch-publication guidance for tasks, reviews, and study plans, including per-item outcomes and visible partial failures.

## 0.8.0 — 2026-09-30

- Added lesson-plan draft discovery, creation, revision-checked editing, and migration-draft guidance.

## 0.7.0 — 2026-09-30

- Added review-draft creation, editing, cancellation, and confirmed publication guidance.

## 0.6.0 — 2026-09-30

- Added study-plan draft creation, editing, cancellation, and confirmed publication guidance.

## 0.5.0 — 2026-09-30

- Added learner-profile and syllabus draft guidance, including bundle retries and course-design context.

## 0.4.0 — 2026-09-30

- Added task draft, cancellation, and publication guidance to the optional portal reference.

## 0.3.0 — 2026-09-30

- Added optional portal guidance with connected read tools relevant to each standalone skill.
- Clarified that connected context is scoped to the authenticated connection and does not itself grant write authority.

## 0.2.0 — 2026-09-28

- Made all six standalone language-teaching skills useful to teachers with or without the portal.
- Rewrote package documentation and procedures in English; learning materials follow the teacher's requested language.
- Moved common guidance to canonical files under `shared/` with synchronization and divergence checks.
- Made portal details optional and scoped them to per-skill references.
- Clarified individual learner profiles and syllabuses, grade requirements, and lesson validation coverage.
- Marked synthetic scenarios as expected behavior and live runs as pending.
