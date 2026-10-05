# Eval results

## 0.16.0 (2026-10-04)

Each case in `evals/<skill>.json` ran three times with Codex `gpt-6-luna` (medium effort, read-only sandbox, no tools, empty working directory): with the 0.16.0 skill, with the 0.15.1 skill, and without a skill. A separate grader (`gpt-6-sol`, medium effort) received the three answers in shuffled order without labels, scored each assertion, and gave each answer an overall 1–5 quality score.

| Version | Assertions passed | Mean quality |
|---|---|---|
| 0.16.0 | **94/99 (95%)** | **4.61** |
| 0.15.1 | 90/99 (91%) | 4.39 |
| No skill | 71/99 (72%) | 3.33 |

Iteration 1 scored 0.16.0 at 89/99: lesson plans dropped homework once stages became a menu, and submission review noted a missing grading scale without asking for it. Iteration 2 re-ran lesson-planning, study-planning, and submission-review after restoring default homework, ending with a direct question for the scale and criteria, and stating the learner's level and unsupplied study days.

Open misses in the latest run, all minor:
- lesson-planning, case 3: says prior study is unconfirmed but not attendance.
- staff-assistance, case 2: does not route syllabus creation to course-architecture.
- staff-assistance, case 3: does not name the missing activity status.
- study-planning, case 1: does not say specific study days were not supplied.
- study-planning, case 3: asks for the goal but not the current level or skill.

The evals do not yet cover cases added by 0.16.0 behavior, such as audio without a transcript, profile-only requests, or lessons that must fit a short duration.

## 0.15.1 (2026-09-28)

Run on 2026-09-28 with the skill-creator method: each case in `evals/<skill>.json` ran twice, once with the skill loaded and once without (baseline), using Codex `gpt-6-luna` (medium effort, read-only sandbox, no tools). A separate grader (`gpt-6-sol`, medium effort) scored each assertion on both answers without knowing which answer used the skill.

| Skill | Cases | With skill | Baseline | Iteration |
|---|---|---|---|---|
| study-planning | 3 | 17/17 | 8/17 | 1 |
| submission-review | 3 | 16/16 | 12/16 | 1 |
| task-design | 3 | 17/17 | 14/17 | 1 |
| lesson-planning | 3 | 17/18 | 13/18 | 2 |
| course-architecture | 3 | 16/17 | 14/17 | 2 |
| staff-assistance | 3 | 14/16 | 12/16 | 2 |
| **Total** | 18 | **97/101 (96%)** | 73/101 (72%) | |

Iteration 2 re-ran the three skills changed after iteration 1: an explicit trigger to read `references/bys-portal.md`, harder staff-assistance cases, and English assertions. The BYS portal case in course-architecture (a class syllabus becomes one syllabus per learner) failed in iteration 1 and passes in iteration 2.

Open misses in the latest run, all minor:
- course-architecture, case 1: the proposal is not labeled "individual".
- lesson-planning, case 3: the transition out of the review segment does not lead into the main activity.
- staff-assistance, case 2: the answer does not ask for each learner's details, and it does not require confirmation of the exact content and destination before publishing.

Raw outputs and gradings are not stored in the package; they are session artifacts.
