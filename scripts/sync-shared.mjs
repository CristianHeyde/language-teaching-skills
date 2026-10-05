import { copyFile, mkdir, readFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sharedUsage } from './shared-usage.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
let differences = 0;
for (const [skill, references] of Object.entries(sharedUsage)) {
  const refDir = path.join(root, 'skills', skill, 'references');
  if (!check) await mkdir(refDir, { recursive: true });
  for (const reference of references) {
    const name = `${reference}.md`;
    const source = path.join(root, 'shared', name);
    const target = path.join(refDir, name);
    const sourceText = await readFile(source, 'utf8');
    let targetText;
    try { targetText = await readFile(target, 'utf8'); } catch { targetText = null; }
    if (targetText !== sourceText) {
      differences++;
      if (!check) await copyFile(source, target);
      else console.error(`Out of sync: skills/${skill}/references/${name}`);
    }
  }
  if (!check) {
    for (const name of ['shared-guidance.md']) {
      try { await unlink(path.join(refDir, name)); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    }
  }
}
if (check && differences) process.exitCode = 1;
else console.log(check ? 'OK: shared references match their sources.' : 'OK: shared references synchronized.');
