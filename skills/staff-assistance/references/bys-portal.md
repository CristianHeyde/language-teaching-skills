# Optional guidance for BYS portal users

Use this guidance when authenticated BYS MCP tools are available, even if the teacher does not mention the portal. Use returned data only within the connection's scope. Make a write action only after an explicit request and the required confirmation for its exact content and destination. This reference does not grant access or authority; the standalone skill works without a portal connection.

## Academic context and records

Terms such as study activity, assigned task, submission, completion, and outcome refer to different records. State saved or published status only when the corresponding tool result confirms it.

Read tools include `whoami`, `list_my_classes`, `list_teacher_agenda`, `list_class_contracts`, `list_attendance_records`, `list_student_notebooks`, `search_students`, `get_class_context`, `get_student_academic_context`, `get_student_proficiency`, `list_class_students`, `list_pending_reviews`, `get_submission_for_review`, `get_study_plan`, and `list_plan_completions`. Retrieve a submission record only when asked; requests to evaluate or correct its content belong to submission-review. Before answering a question about a class, run `get_class_context` for the roster, levels, plans, recent sessions, and tasks; `get_student_academic_context` deepens an individual learner when needed. For a question about an already identified learner, go straight to `get_student_academic_context`. Then cite each learner's level evidence or state what context was missing.

- `list_student_notebooks` requires a student ID and returns at most 100 notebooks from classes in scope. Teachers see their own classes; administrators see their expanded organization scope.
- `list_teacher_agenda` requires explicit start and end dates and accepts up to 90 days.
- `list_class_contracts` accepts an optional authorized `classId`, a `month` in `YYYY-MM`, or an inclusive `startMonth`/`endMonth` range of at most 12 months. It does not return metadata or financial data.
- `list_attendance_records` requires a date range of at most 90 days and accepts an optional authorized `classId`.
- Proficiency reads return recent history entry IDs for later correction. Do not infer access from a supplied ID.

## Announcements

Only administrators can select the all-students audience; teachers can publish to their own classes or students in those classes. For an explicit publish request, use `request_announcement_publish`, show the preview, obtain confirmation for the exact title, body, destination, urgency, and recipient set, then call `confirm_announcement_publish`. The preview expires in five minutes; there is no persistent announcement draft. To archive, use `request_announcement_archive`, show its effect, obtain confirmation, and call `confirm_announcement_archive`. Only the author or an administrator can archive a published announcement. Archiving dismisses it for every recipient and preserves notifications. MCP exposes no announcement deletion tool.

## Proficiency records

Teachers can register and correct evaluations only for students in their own classes; administrators have expanded scope. For an explicit request, use `request_proficiency_assessment` then `confirm_proficiency_assessment` to register an evaluation, or `request_proficiency_assessment_update` then `confirm_proficiency_assessment_update` to correct one history entry. Obtain confirmation for the exact preview, which expires after five minutes. An update fails if the entry or latest evaluation changed. Editing the latest entry synchronizes the current profile; editing an older entry changes history only. The original assessor remains attached. MCP exposes no proficiency deletion tool.

## Attendance records

Attendance writes require a read-write connection and an explicit request. Use `request_attendance_record` then `confirm_attendance_record` to create a record. To cancel, use `request_attendance_cancellation` then `confirm_attendance_cancellation`. Cancellation marks the record `CancelledByStaff`, returns its consumption to the class contract, and preserves history. MCP exposes no permanent attendance deletion tool.

## Student notebooks

Notebook edits require a read-write connection and an explicit request. Use `request_student_note_update`, present the exact preview, obtain confirmation, then call `confirm_student_note_update`. The preview expires after five minutes and confirmation fails if the notebook changed. MCP refuses edits to external notebooks and exposes no notebook deletion tool.
