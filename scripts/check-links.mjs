#!/usr/bin/env node
// Verifica que tots els enllaços d'evidència de src/data/questions.ts responguin 200.

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "src", "data", "questions.ts");

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const CONGRESO_BASE =
  "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XV&_iniciativas_id=";

function extract(source) {
  const urls = new Set();

  for (const m of source.matchAll(/url:\s*"([^"]+)"/g)) urls.add(m[1]);

  for (const m of source.matchAll(/congreso\(\s*"([^"]+)"\s*\)/g))
    urls.add(CONGRESO_BASE + m[1]);

  // votacion("15-{sessio}-{numero}", …) → pàgina de quevotan.eu
  for (const m of source.matchAll(/votacion\(\s*"15-(\d+)-(\d+)"/g))
    urls.add(`https://quevotan.eu/XV/votacion/${m[1]}/${m[2]}/`);

  for (const m of source.matchAll(
    /boeEli\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)/g
  ))
    urls.add(`https://www.boe.es/eli/es/${m[1]}/${m[2]}/${m[3]}/${m[4]}/${m[5]}`);

  for (const m of source.matchAll(/boeAct\(\s*"([^"]+)"\s*\)/g))
    urls.add(`https://www.boe.es/buscar/act.php?id=${m[1]}`);

  return [...urls];
}

function keywordFor(url) {
  if (url.includes("quevotan.eu")) return /Qué votan|quevotan/i;
  if (url.includes("boe.es")) return /BOE-A-|BOE\.es/;
  if (url.includes("congreso.es") && url.endsWith(".PDF")) return null;
  if (url.includes("congreso.es"))
    return /Proposici|Real Decreto|Proyecto de Ley|Moci|Ley Org|B.squeda de iniciativas|Colapso|amnist/i;
  if (url.includes("lamoncloa.gob.es")) return /Moncloa|Gobierno de espa|compartir/i;
  return null;
}

async function check(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, "Accept-Language": "es,ca;q=0.8" },
      redirect: "follow",
      signal: AbortSignal.timeout(30000),
    });
    const buf = Buffer.from(await res.arrayBuffer());
    const text = buf.subarray(0, 400000).toString("utf8");
    if (!res.ok) return { url, ok: false, reason: `HTTP ${res.status}` };
    if (buf.length < 2000) return { url, ok: false, reason: `massa petit (${buf.length} B)` };
    if (/<title>[^<]*\b404\b|\bError 404\b/i.test(text))
      return { url, ok: false, reason: "conté 404" };
    const kw = keywordFor(url);
    if (kw && !kw.test(text)) return { url, ok: false, reason: "keyword no trobada" };
    return { url, ok: true, reason: `${res.status}, ${buf.length} B` };
  } catch (error) {
    return { url, ok: false, reason: error?.name === "TimeoutError" ? "timeout" : String(error) };
  }
}

const source = await readFile(file, "utf8");
const urls = extract(source);
console.log(`Verificant ${urls.length} enllaços de ${file.replace(root + "/", "")}…\n`);

const results = [];
for (const url of urls) {
  const r = await check(url);
  results.push(r);
  console.log(`${r.ok ? "OK  " : "FAIL"} ${r.reason.padEnd(18)} ${url}`);
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} OK`);
if (failed.length > 0) process.exit(1);
