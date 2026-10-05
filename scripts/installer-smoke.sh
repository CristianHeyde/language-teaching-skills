#!/usr/bin/env bash
set -euo pipefail

package_root="$(cd "$(dirname "$0")/.." && pwd)"
repo_root="$(cd "$package_root/.." && pwd)"
if [[ -d "$repo_root/.delegate" ]]; then
  scratch_parent="$repo_root/.delegate/tmp"
  mkdir -p "$scratch_parent"
else
  scratch_parent="${TMPDIR:-/tmp}"
fi
if [[ -n "${SKILLS_BIN:-}" ]]; then
  skills_bin="$SKILLS_BIN"
else
  skills_bin="$(command -v skills || true)"
  if [[ -z "$skills_bin" && -x "$repo_root/.delegate/tools/node_modules/skills/bin/cli.mjs" ]]; then
    skills_bin="$repo_root/.delegate/tools/node_modules/skills/bin/cli.mjs"
  fi
fi
if [[ -z "$skills_bin" || ! -x "$skills_bin" ]]; then
  echo "Install the skills CLI or set SKILLS_BIN to its executable." >&2
  exit 1
fi
run_skills() {
  if [[ "$skills_bin" == *.mjs ]]; then node "$skills_bin" "$@"; else "$skills_bin" "$@"; fi
}

scratch="$(mktemp -d "$scratch_parent/installer-smoke.XXXXXX")"
trap 'rm -rf "$scratch"' EXIT

isolated="$scratch/cli"
mkdir -p "$isolated/home" "$isolated/config" "$isolated/data" "$isolated/cache" "$isolated/project"
export HOME="$isolated/home"
export XDG_CONFIG_HOME="$isolated/config"
export XDG_DATA_HOME="$isolated/data"
export XDG_CACHE_HOME="$isolated/cache"
cd "$isolated/project"

version="$(run_skills --version)"
printf 'skills version: %s\n' "$version"
if [[ "$version" != "1.7.0" ]]; then
  echo "Expected skills@1.7.0; found $version" >&2
  exit 1
fi
mapfile -t all_skills < <(node --input-type=module -e 'import { pathToFileURL } from "node:url"; const { skillCatalog } = await import(pathToFileURL(process.argv[1])); for (const skill of skillCatalog) console.log(skill.name)' "$package_root/scripts/catalog.mjs")
for skill in "${all_skills[@]}"; do
  isolated="$scratch/$skill"
  mkdir -p "$isolated/home" "$isolated/config" "$isolated/data" "$isolated/cache" "$isolated/project"
  export HOME="$isolated/home"
  export XDG_CONFIG_HOME="$isolated/config"
  export XDG_DATA_HOME="$isolated/data"
  export XDG_CACHE_HOME="$isolated/cache"
  cd "$isolated/project"

  echo "$skill: discovery"
  available="$(run_skills add "$package_root" --list 2>/dev/null)"
  for candidate in "${all_skills[@]}"; do
    if [[ "$available" != *"$candidate"* ]]; then
      echo "Skill missing from discovery: $candidate" >&2
      exit 1
    fi
  done
  echo "$skill: selective install"
  run_skills add "$package_root" --skill "$skill" --agent claude-code --copy --yes >/dev/null 2>&1
  echo "$skill: listing"
  installed="$(run_skills list --json 2>/dev/null)"
  if [[ "$installed" != *"\"name\": \"$skill\""* ]]; then
    echo "Skill missing after install: $skill" >&2
    exit 1
  fi
  echo "$skill: selective removal"
  run_skills remove "$skill" --agent claude-code --yes >/dev/null 2>&1
  echo "$skill: verify removal"
  remaining="$(run_skills list --json 2>/dev/null)"
  if [[ "$remaining" == *"\"name\": \"$skill\""* ]]; then
    echo "Skill still listed after removal: $skill" >&2
    exit 1
  fi
done
echo 'OK: all six skills discovered, selectively installed, listed, and removed in isolated HOME directories.'
