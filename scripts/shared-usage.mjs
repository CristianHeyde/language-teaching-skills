import { skillCatalog } from './catalog.mjs';

export const sharedUsage = Object.fromEntries(skillCatalog.map(({ name, sharedReferences }) => [name, sharedReferences]));
