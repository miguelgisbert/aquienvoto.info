// Compila scripts/_seo_entry.ts amb esbuild i l'executa amb Node
// per generar les pàgines SEO de public/seo/ i el sitemap.xml.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const outDir = mkdtempSync(join(tmpdir(), "seo-build-"));
const outfile = join(outDir, "entry.mjs");

await build({
  entryPoints: [join(process.cwd(), "scripts", "_seo_entry.ts")],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile,
  logLevel: "silent",
});

execFileSync(process.execPath, [outfile], { stdio: "inherit" });
