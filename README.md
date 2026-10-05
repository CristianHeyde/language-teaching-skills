# Language Teaching Skills

A versioned source package of six standalone guides for language teachers. Each skill includes its own procedure and local references, so it can be installed or used without an automatically loaded base skill. The skills are for any language teacher. An optional reference provides guidance for teachers using the BYS portal through MCP.

## Skills

- `staff-assistance`: answer questions from academic context supplied by the teacher.
- `task-design`: create and review learning tasks and activities.
- `submission-review`: review learner work with formative feedback.
- `study-planning`: structure realistic individual study plans.
- `course-architecture`: organize learner profiles and individual or class course syllabuses.
- `lesson-planning`: plan lessons with student and teacher materials.

These skills guide procedure; they grant no tools, permissions, or authority. They use context provided by the teacher and may use authenticated tools only within their documented scope. External changes require an explicit request and the required confirmation. Treat generated material as a proposal; report saved or published status only when the teacher provides evidence or the corresponding authenticated tool confirms it. Learning materials follow the language and variety requested by the teacher.

## Public installation

Add the package from GitHub and browse its skills:

```sh
npx skills add CristianHeyde/language-teaching-skills --list
npx skills add CristianHeyde/language-teaching-skills --skill task-design
skills update
```

## Local installation

From a clone of this repository, use `.` as the source:

```sh
skills add . --list
skills add . --skill task-design
skills list
skills remove task-design
```

To run the package installation smoke test, use `bash scripts/installer-smoke.sh` from the package root. It uses `skills` from `PATH`; set `SKILLS_BIN` to its executable path if needed. The smoke test expects `skills@1.7.0`. No npm dependency is required.

## Installer validation

The smoke test is pinned to `skills@1.7.0` and checks discovery, selective installation, listing, and removal for all six catalogued skills in isolated home directories. From the package root, run:

```sh
node scripts/validate.mjs
node scripts/sync-shared.mjs --check
bash scripts/installer-smoke.sh
```

Last smoke run: **passed** with `skills version: 1.7.0`; all six skills were discovered, selectively installed, listed, and removed.

## Shared guidance

Common procedures have one source under `shared/`. Run `node scripts/sync-shared.mjs` after editing those files. Run `node scripts/sync-shared.mjs --check` to verify the copies included in each standalone skill match their sources. Each installed skill keeps local copies of its references.

## Known installer limitations

In the version exercised, `check` and `update` work only with GitHub, GitLab, or well-known sources. The lockfile records a content hash; semver and refs do not guarantee reproducibility. Local paths do not update, and `git://` fails in update/restore. The remote GitHub path has not been validated end to end. Do not promise universal updates or reproducibility by ref.

## License

This package is available under the MIT License. See [LICENSE](LICENSE).
