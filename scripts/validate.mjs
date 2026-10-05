import { readdir, readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { skillCatalog } from './catalog.mjs';
import { sharedUsage } from './shared-usage.mjs';
import { publicEntries } from './public-files.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const expected = skillCatalog.map(({ name }) => name);
const errors = [];
const files = [];
const fail = (message) => errors.push(message);

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else files.push(full);
  }
}

function outsideScenario(text) {
  return text.replace(/^## Scenario\s*\n[\s\S]*?(?=^## |\s*$)/gm, '');
}

const skillsDir = path.join(root, 'skills');
const actual = (await readdir(skillsDir, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
if (JSON.stringify(actual) !== JSON.stringify([...expected].sort())) fail(`Unexpected skill folders: ${actual.join(', ')}`);
for (const name of expected) {
  const dir = path.join(skillsDir, name);
  const skillPath = path.join(dir, 'SKILL.md');
  try {
    const content = await readFile(skillPath, 'utf8');
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!match) fail(`${name}: missing frontmatter`);
    else {
      if (!new RegExp(`^name: ${name}$`, 'm').test(match[1])) fail(`${name}: incorrect name`);
      if (!/^description: .+/m.test(match[1])) fail(`${name}: missing description`);
    }
    if (!content.includes('This skill guides procedure; it grants no tools, permissions, or authority.')) fail(`${name}: missing authority disclaimer`);
    for (const [, link] of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      if (link.startsWith('references/')) {
        try { await stat(path.resolve(dir, link)); } catch { fail(`${name}: missing reference ${link}`); }
      }
    }
  } catch { fail(`${name}: missing SKILL.md`); }
}

for (const [skill, references] of Object.entries(sharedUsage)) {
  for (const reference of references) {
    const source = await readFile(path.join(root, 'shared', `${reference}.md`), 'utf8');
    let copy;
    try { copy = await readFile(path.join(root, 'skills', skill, 'references', `${reference}.md`), 'utf8'); } catch { copy = null; }
    if (copy !== source) fail(`${skill}: shared reference ${reference}.md differs from source`);
  }
}

await walk(root);
const publicFiles = publicEntries.flatMap((entry) => {
  const absolute = path.join(root, entry);
  const nested = files.filter((file) => file.startsWith(absolute + path.sep));
  return nested.length ? nested : [absolute];
});
const targets = publicFiles.filter((file) => !file.endsWith(path.join('scripts', 'validate.mjs')));
const portuguese = [
  /[ãõç]/i,
  /\b(?:é|não|está|são|ação|avaliação|lição)\b/i,
  /\b(?:ainda|aluno|alunos|atividade|aula|avaliação|com|contexto|correção|dados|dever|disciplina|estudante|estudantes|idioma|informações|nota|notas|pedido|pergunta|plano|professor|professora|proposta|publicado|publicada|rascunho|resposta|respostas|revisão|salvo|salva|sistema|tarefa|turma|usuário|usuária)\b/i,
];
const privacyAndSafety = [
  ['email address', /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
  ['Brazilian CPF', /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/],
  ['Brazilian phone number', /(?:\+?55\s*)?\(?\d{2}\)?\s*9?\d{4}[- .]?\d{4}\b/],
  ['credential or token', /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{20,}|AKIA[A-Z0-9]{16}|Bearer\s+[A-Za-z0-9._~+/-]{16,})\b/i],
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i],
  ['credential assignment', /\b(?:password|passwd|client_secret|api[_ -]?key|access[_ -]?token)\s*[:=]\s*["']?[^\s"']{8,}/i],
  ['internal or private URL', /\bhttps?:\/\/(?:localhost|127(?:\.\d{1,3}){3}|10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2}|[^\s/:]+\.(?:internal|intranet|local))(?:[:/\s?#]|$)/i],
  ['URL containing credentials', /\bhttps?:\/\/[^\s/@:]+:[^\s/@]+@/i],
];
// Hashed normalized terms let this public validator detect known internal references
// without distributing their names in the validator source itself.
const restrictedTermHashes = new Set([
  '8cfde6efdfc4ed5ab1f6acbbd1ba49bf31932f84d0a4c090eb41c7d151e8b180',
  '0f750e7206f9fc0241103e51fd0393e566ac1fd4bc67208ded8af70fd9357887',
  'b118a84a37269e06e6ee5c6915072f4f4993ead3e92f459f5d4160d33e786f02',
  '66b92ab82eb152165defa706387daff549643d886fb70223f574d73c9ea59016',
  'a882d8931167373c97d3e5740d03580309fd586a365b1e2f20c695b3d0fcdc5b',
  '3a67e5af1876218a2d8484b30d7e3d3741c46cf99c5b3b3d65750b3abc55298f',
  'a3153c09421d212eb44e20a4fb65829b8010b20c99cfffa5fa7be27dd649e948',
  'ad955b3834d82ea62b99110bfa24ca795b692904f050f845a34c08ff94378d3d',
  '9eb9a040d353083e320c34765107a4213d940a2a641044ae370572eb2bde0447',
  'adb0e8265a6c688b402dcf577d98faa68fc14c127714a880c50c3363a91e00f4',
  '833149461a83ffda6fbb40b9c0430362ed3fd490d79f1ce28ad8248701230cd0',
  '81d39757270e8aae949d1781045548ff4256310cf0d7f2ae6271e6dee5c48cf3',
]);
function containsRestrictedTerm(text) {
  const tokens = text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  for (let size = 1; size <= 3; size++) {
    for (let start = 0; start <= tokens.length - size; start++) {
      const phrase = tokens.slice(start, start + size).join(' ');
      const hash = createHash('sha256').update(phrase).digest('hex');
      if (restrictedTermHashes.has(hash)) return true;
    }
  }
  return false;
}
for (const file of targets) {
  const content = await readFile(file, 'utf8');
  const searchable = outsideScenario(content);
  if (!file.includes(`${path.sep}evals${path.sep}`)) {
    for (const pattern of portuguese) if (pattern.test(searchable)) fail(`${path.relative(root, file)}: Portuguese text detected outside scenario examples`);
  }
  for (const [label, pattern] of privacyAndSafety) if (pattern.test(content)) fail(`${path.relative(root, file)}: possible ${label} detected`);
  if (containsRestrictedTerm(content)) fail(`${path.relative(root, file)}: restricted internal reference detected`);
}
for (const name of expected) {
  const validation = await readFile(path.join(root, 'validation', `${name}.md`), 'utf8');
  if (!validation.includes('## Expected behavior')) fail(`${name}: missing Expected behavior section`);
  if (!validation.includes(`evals/${name}.json`) || !validation.includes('Live results: see evals report')) fail(`${name}: missing eval pointer or live results notice`);
  const evalPath = path.join(root, 'evals', `${name}.json`);
  try {
    const parsed = JSON.parse(await readFile(evalPath, 'utf8'));
    if (parsed.skill_name !== name) fail(`${name}: eval skill_name does not match`);
    if (!Array.isArray(parsed.evals) || parsed.evals.length !== 3) fail(`${name}: evals must contain exactly 3 cases`);
    const ids = new Set();
    for (const [index, evaluation] of (parsed.evals ?? []).entries()) {
      if (!Number.isInteger(evaluation.id) || ids.has(evaluation.id)) fail(`${name}: eval ${index + 1} needs a unique integer id`);
      ids.add(evaluation.id);
      if (typeof evaluation.prompt !== 'string' || !evaluation.prompt.trim()) fail(`${name}: eval ${index + 1} is missing prompt`);
      if (typeof evaluation.expected_output !== 'string' || !evaluation.expected_output.trim()) fail(`${name}: eval ${index + 1} is missing expected_output`);
      if (!Array.isArray(evaluation.files) || evaluation.files.length !== 0) fail(`${name}: eval ${index + 1} files must be []`);
      if (!Array.isArray(evaluation.assertions) || evaluation.assertions.length < 4 || evaluation.assertions.length > 7 || evaluation.assertions.some((assertion) => typeof assertion !== 'string' || !assertion.trim())) {
        fail(`${name}: eval ${index + 1} must have 4–7 non-empty string assertions`);
      }
    }
  } catch (error) {
    fail(`${name}: invalid or missing eval JSON (${error.message})`);
  }
}
const lessonValidation = await readFile(path.join(root, 'validation', 'lesson-planning.md'), 'utf8');
for (const required of ['Homework', 'Expected answers', 'Transition']) if (!lessonValidation.includes(required)) fail(`lesson-planning validation: missing ${required}`);
const courseSkill = await readFile(path.join(root, 'skills/course-architecture/SKILL.md'), 'utf8');
if (!courseSkill.includes('individual or class course syllabus, as requested by the teacher')) fail('course-architecture: missing teacher-selected syllabus scope');
if (!courseSkill.includes('context the teacher provides')) fail('course-architecture: missing teacher-provided context boundary');
const portalGuidance = await readFile(path.join(root, 'skills/course-architecture/references/bys-portal.md'), 'utf8');
for (const required of ['profiles and syllabuses are always individual', 'one syllabus per learner']) if (!portalGuidance.includes(required)) fail(`course-architecture BYS reference: missing Portal-specific rule (${required})`);
const reviewSkill = await readFile(path.join(root, 'skills/submission-review/SKILL.md'), 'utf8');
if (!reviewSkill.includes('both an explicit grading scale and explicit criteria')) fail('submission-review: missing explicit scale and criteria requirement');

if (errors.length) {
  console.error(`FAILED: ${errors.length} issue(s)`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else console.log(`OK: ${expected.length} standalone skills, references, shared-source parity, English copy, privacy and safety pattern scan, and validation specifications. Manual privacy review is documented in validation/security-review.md.`);
