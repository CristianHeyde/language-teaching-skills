import { cp, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicEntries as files } from './public-files.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destinationArg = process.argv[2];

if (!destinationArg) {
  console.error('Usage: node scripts/export-public.mjs <destination>');
  process.exit(1);
}

const destination = path.resolve(destinationArg);
if (destination === root || root.startsWith(`${destination}${path.sep}`) || destination.startsWith(`${root}${path.sep}`)) {
  console.error('Destination must be outside the package source directory.');
  process.exit(1);
}

await mkdir(destination, { recursive: true });
const entries = await readdir(destination, { withFileTypes: true });
const unexpected = entries.filter((entry) => entry.name !== '.git');
if (unexpected.length) {
  console.error(`Destination must be empty except for .git/: ${unexpected.map(({ name }) => name).join(', ')}`);
  process.exit(1);
}
const gitEntry = entries.find((entry) => entry.name === '.git');
if (gitEntry && !gitEntry.isDirectory()) {
  console.error('Destination .git entry must be a directory.');
  process.exit(1);
}


for (const file of files) {
  const source = path.join(root, file);
  await stat(source);
  const target = path.join(destination, file);
  await mkdir(path.dirname(target), { recursive: true });
  await cp(source, target, { recursive: true, errorOnExist: true, force: false });
}

console.log(`OK: exported ${files.length} allowlisted entries to ${destination}`);
