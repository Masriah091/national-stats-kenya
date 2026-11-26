// Kenya in Numbers — hand-in entrypoint.
//
// Copies the static site (app/) and its screenshots into the grader's
// output directory, then writes dossier.json with the kit's
// buildDossier helper. Node 22, standard library only; no network,
// no build step, no dependencies.
//
// Run it like this:
//   MAKEFUN_OUTPUT_DIR=/tmp/out-stats-maseiah990-a node main.ts
// Run it twice into two different directories: every output byte
// must be identical.

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

// The repository root is the directory holding this file.
const repoRoot = dirname(fileURLToPath(import.meta.url));

// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const dossierOptions = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

async function handIn() {
  mkdirSync(outDir, { recursive: true });

  // The whole site, verbatim: five pages, one stylesheet, three scripts.
  cpSync(join(repoRoot, "app"), join(outDir, "app"), { recursive: true });

  // Screenshots are optional on disk but required for the dossier.
  mkdirSync(join(outDir, "screenshots"), { recursive: true });
  const shotsDir = join(repoRoot, "screenshots");
  if (existsSync(shotsDir)) {
    cpSync(shotsDir, join(outDir, "screenshots"), { recursive: true });
  }

  // buildDossier reads app/ and screenshots/ out of the output
  // directory and returns the dossier the judge reads — as text or
  // as raw bytes. It refuses (throws) when any limit above is past,
  // so a bad hand-in fails loudly here instead of silently reaching
  // the judge. Write its return value through untouched: the scorer
  // requires dossier.json byte for byte as buildDossier writes it,
  // so never re-serialise it.
  const dossier = await buildDossier(outDir, dossierOptions);
  if (typeof dossier === "string" || dossier instanceof Uint8Array) {
    writeFileSync(join(outDir, "dossier.json"), dossier);
  } else {
    writeFileSync(join(outDir, "dossier.json"), JSON.stringify(dossier, null, 2));
  }

  console.log("Kenya in Numbers handed in to " + outDir);
}

await handIn();
