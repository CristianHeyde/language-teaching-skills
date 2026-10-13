# Eval results

## 0.19.0

Run on 2026-10-13 with the skill-creator method (Claude Sonnet answers, blind Claude grader, shuffled order). The submission-review cases gained assertions for the two-part output: a separated learner section with at most three priorities, each anchored by a before→after example.

Iteration 1 (3 eval cases + 5 anonymized real portal submissions, 0.19.0 vs 0.18.0): 0.19.0 was preferred in 7 of 8 cases and passed 17/19 assertions (0.18.0: 13/19). Learner-part score 4.62 vs 3.12, but accuracy dropped to 4.62 vs 4.88: in two real cases the new "after" example kept a false cognate or added content the learner never wrote.

Iteration 2 added one rule to `review-quality.md` (the "after" rewrites only the learner's own words, adds no new content, and is itself correct) and re-ran the 5 real cases:

| Version | Accuracy | Learner part | Teacher value | Preferred |
|---|---|---|---|---|
| 0.19.0 | 4.2 | 3.8 | 4.4 | 3 |
| 0.18.0 | 4.2 | 3.4 | 4.6 | 2 |

Accuracy is now on par. Open risk: in one real case both 0.19.0 runs missed a false cognate that 0.18.0 caught; five cases cannot separate noise from a trend, so recheck it in the next real-case round.

## 0.17.0

Run on 2026-10-12 with the skill-creator method: each case in `evals/<skill>.json` for the five changed skills ran once with the 0.17.0 skill and once with the 0.16.0 skill (Claude Sonnet subagents, no tools, simulated tool results embedded in the prompts). A separate blind grader (Claude Sonnet) received both answers in shuffled order, scored each assertion, gave each answer a 1–5 quality score, and stated a preference.

| Version | Assertions passed | Mean quality | Preferred |
|---|---|---|---|
| 0.17.0 | 82/83 | 4.33 | 5 |
| 0.16.0 | 82/83 | 4.27 | 3 |

Seven cases were ties. The assertions barely discriminate: both versions pass almost all of them, because the simulated context sits inside the prompt and both versions cite it. These cases therefore cannot show whether a skill fetches context on its own; that needs a run with real tools.

Open miss in the latest run:
- staff-assistance, case 2 (0.17.0): the Spanish reply opened with a Portuguese–Spanish mixed phrase instead of plain Spanish. The case is unchanged from 0.16.0; one sample, so it may be noise, but it is recorded as a regression to recheck.

Five skills gained one portal-tool simulation case, replacing an older case so every skill still has exactly three (per `scripts/validate.mjs`). course-architecture keeps its cases: its portal reference names the context sequence, but no simulation case was added yet. The simulated tool results are embedded in each prompt, so these cases check that context is cited before the proposal, not that the tools were called.

- task-design case 2 replaced the 15-minute Spanish café task for an A2 learner.
- submission-review case 2 replaced the daily-routine correction with subject-verb agreement.
- lesson-planning case 3 replaced the 60-minute B1 lesson without attendance data.
- study-planning case 2 replaced the Spanish A1 exchange-meeting plan.
- staff-assistance case 3 replaced the completion check with missing data.

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
