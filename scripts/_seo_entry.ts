// Genera pàgines HTML estàtiques (SEO) a partir de les dades del test:
//   public/seo/pregunta-{id}-{lang}.html  (12 × 4)
//   public/seo/partit-{id}-{lang}.html    (11 × 4)
//   public/seo/index.html
//   public/sitemap.xml
// S'executa abans de `vite build` via scripts/build-seo.mjs (esbuild + node).
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { questions } from "../src/data/questions";
import { parties } from "../src/data/parties";
import type { Language, LocalizedString, Stance } from "../src/types";

const ROOT = process.cwd();
const OUT = join(ROOT, "public", "seo");
const BASE = "https://aquienvoto.info";
const LANGS: Language[] = ["es", "ca", "gl", "eu"];

const STANCE_LABELS: Record<Language, Record<Stance, string>> = {
  es: { a_favor: "A favor", en_contra: "En contra", parcial: "Con matices", abstencion: "Abstención" },
  ca: { a_favor: "A favor", en_contra: "En contra", parcial: "Amb matisos", abstencion: "Abstenció" },
  gl: { a_favor: "A favor", en_contra: "En contra", parcial: "Con matices", abstencion: "Abstención" },
  eu: { a_favor: "Alde", en_contra: "Aurka", parcial: "Matizekin", abstencion: "Abstentzioa" },
};

const CTA_LABELS: Record<Language, string> = {
  es: "Haz el test (12 preguntas)",
  ca: "Fes el test (12 preguntes)",
  gl: "Fai o test (12 preguntas)",
  eu: "Egin testa (12 galdera)",
};

const POSITIONS_H: Record<Language, string> = {
  es: "Qué dice cada partido",
  ca: "Què diu cada partit",
  gl: "Que di cada partido",
  eu: "Zer esaten du alderdi bakoitzak",
};

const EVIDENCE_H: Record<Language, string> = {
  es: "Fuentes",
  ca: "Fonts",
  gl: "Fontes",
  eu: "Iturriak",
};

const CTX_TEXTS: Record<Language, string> = {
  es: "Posiciones basadas en votaciones reales registradas en el Congreso de los Diputados durante la legislatura. Sin interpretaciones: solo votos.",
  ca: "Posicions basades en votacions reals registrades al Congrés dels Diputats durant la legislatura. Sense interpretacions: només vots.",
  gl: "Posicións baseadas en votacións reais rexistradas no Congreso dos Deputados durante a lexislatura. Sen interpretacións: só votos.",
  eu: "Kongresuan legegintzaldian erregistratutako bozketetan oinarritutako jarrerak. Interpretaziorik gabe: bozketa hutsak.",
};

const STANCES_H: Record<Language, string> = {
  es: "Posiciones en las 12 preguntas",
  ca: "Posicions en les 12 preguntes",
  gl: "Posicións nas 12 preguntas",
  eu: "Jarrerak 12 galdetan",
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function loc(v: LocalizedString, lang: Language): string {
  return v[lang];
}

function stanceLabel(lang: Language, stance: Stance): string {
  return STANCE_LABELS[lang][stance] ?? stance;
}

function metaDesc(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > 155 ? `${clean.slice(0, 152)}…` : clean;
}

function homeHref(lang: Language): string {
  return lang === "es" ? `${BASE}/` : `${BASE}/?lang=${lang}`;
}

function page(opts: {
  lang: Language;
  title: string;
  description: string;
  canonical: string;
  self: string;
  body: string;
}): string {
  const { lang, title, description, canonical, self, body } = opts;
  const hreflangs = LANGS.map((l) => {
    const href = l === "es" ? `${BASE}/` : `${BASE}/?lang=${l}`;
    return `<link rel="alternate" hreflang="${l}" href="${href}" />`;
  }).join("\n  ");
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(canonical)}" />
  ${hreflangs}
  <link rel="alternate" hreflang="x-default" href="${BASE}/" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="aQuiénVoto.info" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <meta property="og:image" content="${BASE}/og.png" />
  <meta property="og:locale" content="${lang}_ES" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${BASE}/og.png" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      background: #f9fafb; color: #111827; line-height: 1.6; }
    .wrap { max-width: 720px; margin: 0 auto; padding: 36px 20px 72px; }
    .brand { color: #2563eb; font-weight: 800; text-decoration: none; font-size: 17px; }
    h1 { font-size: 28px; margin: 16px 0 8px; line-height: 1.25; }
    .lead { color: #4b5563; margin-bottom: 8px; }
    .ctx { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px;
      padding: 16px 18px; margin: 18px 0; color: #374151; font-size: 15px; }
    h2 { font-size: 19px; margin: 26px 0 12px; }
    .row { display: flex; align-items: flex-start; gap: 12px; background: #fff;
      border: 1px solid #e5e7eb; border-radius: 10px; padding: 10px 14px; margin: 8px 0; }
    .dot { width: 12px; height: 12px; border-radius: 999px; margin-top: 7px; flex: none; }
    .who { font-weight: 700; font-size: 14px; min-width: 110px; }
    .stance { font-size: 13px; font-weight: 700; padding: 2px 8px; border-radius: 999px;
      background: #f3f4f6; color: #374151; white-space: nowrap; }
    .note { font-size: 13px; color: #6b7280; }
    .evidence { font-size: 13px; color: #6b7280; margin: 4px 0 0; }
    .evidence a { color: #2563eb; }
    .cta { display: inline-block; margin-top: 28px; background: #2563eb; color: #fff;
      font-weight: 700; text-decoration: none; padding: 13px 26px; border-radius: 10px; }
    .foot { margin-top: 40px; font-size: 13px; color: #9ca3af; }
    .foot a { color: #2563eb; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrap">
    <a class="brand" href="${homeHref(lang)}">aQuiénVoto.info</a>
${body}
    <a class="cta" href="${homeHref(lang)}">${CTA_LABELS[lang]}</a>
    <p class="foot"><a href="${homeHref(lang)}">aQuiénVoto.info</a> — 12 votaciones reales del Congreso. Cero IA.</p>
    <p class="foot">${esc(self)}</p>
  </div>
</body>
</html>
`;
}

mkdirSync(OUT, { recursive: true });
const written: string[] = [];

// --- Pàgines de pregunta ---
for (const q of questions) {
  for (const lang of LANGS) {
    const title = `${loc(q.title, lang)} | aQuiénVoto.info`;
    const description = metaDesc(loc(q.description, lang));
    const self = `seo/pregunta-${q.id}-${lang}.html`;
    const canonical = `${BASE}/${self}`;

    const rows = parties
      .map((p) => {
        const pos = q.positions.find((x) => x.party === p.id);
        if (!pos) return "";
        const note = pos.note ? loc(pos.note, lang) : "";
        return `    <div class="row">
      <span class="dot" style="background:${p.color}"></span>
      <span class="who">${esc(loc(p.short, lang))}</span>
      <span class="stance">${esc(stanceLabel(lang, pos.stance))}</span>
      ${note ? `<span class="note">${esc(note)}</span>` : ""}
    </div>`;
      })
      .filter(Boolean)
      .join("\n");

    const evidence = q.evidence
      .map(
        (e) =>
          `    <p class="evidence">· <a href="${esc(e.url)}" rel="noopener">${esc(
            e.title
          )}</a> (${esc(e.date)})</p>`
      )
      .join("\n");

    const body = `    <h1>${esc(loc(q.title, lang))}</h1>
    <p class="lead">${esc(loc(q.description, lang))}</p>
    <div class="ctx">${esc(loc(q.context, lang))}</div>
    <h2>${POSITIONS_H[lang]}</h2>
${rows}
${evidence ? `    <h2>${EVIDENCE_H[lang]}</h2>\n${evidence}\n` : ""}`;

    writeFileSync(join(ROOT, "public", self), page({ lang, title, description, canonical, self, body }));
    written.push(self);
  }
}

// --- Pàgines de partit ---
for (const p of parties) {
  for (const lang of LANGS) {
    const full = loc(p.full, lang);
    const title = `${full} en el test | aQuiénVoto.info`;
    const description = metaDesc(
      `Qué vota ${full} según votaciones reales del Congreso: sus posiciones en las 12 preguntas del test de aQuiénVoto.info.`
    );
    const self = `seo/partit-${p.id}-${lang}.html`;
    const canonical = `${BASE}/${self}`;
    const note = p.note ? loc(p.note, lang) : p.scope ? loc(p.scope, lang) : "";

    const rows = questions
      .map((q) => {
        const pos = q.positions.find((x) => x.party === p.id);
        const stance = pos ? stanceLabel(lang, pos.stance) : "—";
        return `    <div class="row">
      <span class="who" style="min-width:0;flex:1">${esc(loc(q.title, lang))}</span>
      <span class="stance">${esc(stance)}</span>
    </div>`;
      })
      .join("\n");

    const body = `    <h1>${esc(full)}</h1>
    ${note ? `<p class="lead">${esc(note)}</p>` : ""}
    <div class="ctx">${CTX_TEXTS[lang]}</div>
    <h2>${STANCES_H[lang]}</h2>
${rows}`;

    writeFileSync(join(ROOT, "public", self), page({ lang, title, description, canonical, self, body }));
    written.push(self);
  }
}

// --- Índex SEO ---
const indexBody = `    <h1>aQuiénVoto.info — preguntes i partits</h1>
    <p class="lead">Tot el contingut del test en una pàgina.</p>
    <h2>${POSITIONS_H.ca}</h2>
${questions
  .map(
    (q) =>
      `    <p>· <a href="pregunta-${q.id}-es.html">${esc(loc(q.title, "es"))}</a> — <a href="pregunta-${q.id}-ca.html">català</a> · <a href="pregunta-${q.id}-gl.html">galego</a> · <a href="pregunta-${q.id}-eu.html">euskera</a></p>`
  )
  .join("\n")}
    <h2>Partits</h2>
${parties
  .map(
    (p) =>
      `    <p>· <a href="partit-${p.id}-es.html">${esc(loc(p.full, "es"))}</a> — <a href="partit-${p.id}-ca.html">català</a> · <a href="partit-${p.id}-gl.html">galego</a> · <a href="partit-${p.id}-eu.html">euskera</a></p>`
  )
  .join("\n")}`;

writeFileSync(
  join(OUT, "index.html"),
  page({
    lang: "ca",
    title: "Índex SEO — aQuiénVoto.info",
    description: "Índex de preguntes i partits del test electoral de aQuiénVoto.info.",
    canonical: `${BASE}/seo/index.html`,
    self: "seo/index.html",
    body: indexBody,
  })
);
written.push("seo/index.html");

// --- Sitemap ---
const urls = [
  { loc: `${BASE}/`, changefreq: "daily", priority: "1.0" },
  { loc: `${BASE}/?lang=ca`, changefreq: "daily", priority: "0.9" },
  { loc: `${BASE}/?lang=gl`, changefreq: "daily", priority: "0.9" },
  { loc: `${BASE}/?lang=eu`, changefreq: "daily", priority: "0.9" },
  { loc: `${BASE}/embed.html`, changefreq: "monthly", priority: "0.4" },
  ...written
    .filter((w) => w !== "seo/index.html")
    .map((w) => ({ loc: `${BASE}/${w}`, changefreq: "weekly", priority: "0.7" })),
  { loc: `${BASE}/seo/index.html`, changefreq: "weekly", priority: "0.5" },
];

writeFileSync(
  join(ROOT, "public", "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`
);

console.log(`SEO: ${written.length} pàgines + sitemap.xml`);
