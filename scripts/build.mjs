// Genera index.html (español) y en/index.html (inglés). Sin dependencias.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, axis, spans, english, text } from '../src/content.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cssSource = readFileSync(join(root, 'src/styles.css'), 'utf8');
const stepJs = readFileSync(join(root, 'src/explain.js'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function css(base) {
  return cssSource
    .replace('{{FONT_BODY}}', `${base}assets/fonts/onest.woff2`)
    .replace('{{FONT_DISPLAY}}', `${base}assets/fonts/bricolage.woff2`)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*\n\s*/g, '')
    .replace(/\s*([{};:,>])\s*/g, '$1')
    .replace(/;}/g, '}');
}

/* ---------- iconos de trazo ---------- */
const icons = {
  client: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  api: '<path d="M4 8h12m0 0-3-3m3 3-3 3M20 16H8m0 0 3-3m-3 3 3 3"/>',
  usecase: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><circle cx="12" cy="12" r="2.5"/>',
  adapter: '<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>',
  db: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M9 7h6"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5"/>',
  cloud: '<path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 8.5a4.75 4.75 0 0 1 0 9.5z"/>',
};
const icon = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[name]}</svg>`;
const nodeIcons = ['client', 'api', 'usecase', 'adapter', 'db', 'check'];
const downIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/></svg>';

/* ---------- ilustración hexagonal de la portada ---------- */
function hex(cx, cy, r) {
  return Array.from({ length: 6 }, (_, k) => {
    const a = (-90 + 60 * k) * Math.PI / 180;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
}
function heroArt(e) {
  const cx = 220, cy = 200, R = 150;
  const pills = e.heroLabels.map((label, k) => {
    const a = (-90 + 60 * k) * Math.PI / 180;
    const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
    const w = Math.max(54, label.length * 7.6 + 18);
    return `<g class="pill"><rect x="${(x - w / 2).toFixed(1)}" y="${(y - 13).toFixed(1)}" width="${w.toFixed(1)}" height="26" rx="13"/><text x="${x.toFixed(1)}" y="${(y + 4.5).toFixed(1)}">${esc(label)}</text></g>`;
  }).join('');
  return `<figure class="art">
<svg viewBox="0 0 440 400" role="img" aria-label="${esc(e.heroCaption)}">
<polygon class="hex-out" points="${hex(cx, cy, R)}"/>
<polygon class="hex-mid" points="${hex(cx, cy, 102)}"/>
<g class="ring-in"><polygon class="hex-in" points="${hex(cx, cy, 56)}"/></g>
<text class="hex-core" x="${cx}" y="${cy + 5}">${esc(e.heroRings[0])}</text>
${pills}
</svg>
<ul class="legend"><li class="kind-free"><i></i>${esc(e.heroRings[0])}</li><li class="kind-study"><i></i>${esc(e.heroRings[1])}</li><li class="kind-work"><i></i>${esc(e.heroRings[2])}</li></ul>
<figcaption>${esc(e.heroCaption)}</figcaption>
</figure>`;
}

/* ---------- trayectoria ---------- */
const years = axis.to - axis.from;
function yearFraction(iso) {
  const d = new Date(`${iso}T12:00:00Z`);
  const s = Date.UTC(d.getUTCFullYear(), 0, 1), e = Date.UTC(d.getUTCFullYear() + 1, 0, 1);
  return d.getUTCFullYear() + (d.getTime() - s) / (e - s);
}
const pct = (y) => ((y - axis.from) / years) * 100;
const fmt = (n) => `${n.toFixed(2)}%`;
function trace(e, lang) {
  const labels = [];
  for (let y = axis.from; y < axis.to; y++) labels.push(`<span style="--x:${fmt(pct(y))}">${y}</span>`);
  const rows = spans.map((s, i) => {
    const a = pct(yearFraction(s.start));
    const b = s.end ? pct(yearFraction(s.end)) : 100;
    const [name, detail, dates] = s[lang];
    return `<li class="row kind-${s.kind}" style="--i:${i}"><p class="what"><b>${esc(name)}</b> <span>${esc(detail)}, ${esc(dates)}</span></p>
<div class="lane" aria-hidden="true"><span class="span-bar${s.end ? '' : ' open'}" style="--s:${fmt(a)};--w:${fmt(b - a)}"></span></div></li>`;
  }).join('\n');
  const legend = Object.entries(e.kinds).map(([k, label]) => `<li class="kind-${k}"><i></i>${esc(label)}</li>`).join('');
  return `<ul class="tlegend">${legend}<li class="note">${esc(e.traceNote)}</li></ul>
<div class="years" aria-hidden="true">${labels.join('')}</div>
<ol class="rows" style="--n:${years}">
${rows}
</ol>`;
}

function page(lang) {
  const t = text[lang];
  const e = t.explain;
  const base = lang === 'es' ? '' : '../';
  const nSteps = e.steps.length;
  const updated = new Intl.DateTimeFormat(t.locale, { month: 'long', year: 'numeric' }).format(new Date());
  const liShort = site.linkedin.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '');
  const ghShort = site.github.replace(/^https:\/\//, '');
  const printLine = [t.place, ghShort, liShort, site.email].filter(Boolean).join('  |  ');
  const emailBtn = site.email ? `<a class="btn" href="mailto:${esc(site.email)}">${esc(t.emailLabel)}</a>` : '';

  /* diagrama */
  const nodeLi = e.nodes.slice(0, 5).map((label, i) => `<li><button type="button" class="node" data-step="${i}">
<span class="ci">${icon(nodeIcons[i])}</span><span>${esc(label)}</span></button></li>`).join('\n');
  const band = `<button type="button" class="node band" data-step="5"><span class="ci">${icon('check')}</span><span>${esc(e.nodes[5])}</span></button>`;
  const steps = e.steps.map((s, i) => `<article class="step" id="paso-${i + 1}" data-step="${i}">
<p class="count">${esc(e.stepOf(i + 1, nSteps))}</p>
<h3>${esc(s.title)}</h3>
<p class="what">${esc(s.text)}</p>
<p class="uses-h">${esc(e.uses)}</p>
<ul class="chips">${s.uses.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>
${s.real ? `<p class="real"><b>${esc(e.real)}.</b> ${esc(s.real)}</p>` : ''}
</article>`).join('\n');
  const dots = e.steps.map((_, i) => `<button type="button" data-step="${i}" aria-label="${esc(e.stepOf(i + 1, nSteps))}"></button>`).join('');

  /* secciones */
  const stats = e.stats.map(([n, label]) => `<li class="stat"><b>${esc(n)}</b><span>${esc(label)}</span></li>`).join('\n');
  const layers = t.skills.map(([k, v], i) => `<section class="layer l${i % 3}"><h3>${esc(k)}</h3>
<ul class="chips">${v.split(/,\s*(?![^()]*\))/).map((x) => `<li>${esc(x.trim())}</li>`).join('')}</ul></section>`).join('\n');
  const projects = t.projects.map((p) => `<article class="project"><h3>${esc(p.name)}</h3>
<ul class="flow">${p.flow.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
<p class="txt">${esc(p.text)}</p><a href="${esc(p.href)}" rel="noopener">${esc(p.cta)}</a></article>`).join('\n');
  const degKind = ['study', 'study', 'study', 'study', 'study'];
  const degIcon = ['cap', 'book', 'book', 'book', 'book'];
  const degrees = t.education.map((d, i) => `<li class="deg kind-${degKind[i]}${d.note === t.education[1].note && i === 1 ? ' ongoing' : ''}"><span class="ci">${icon(degIcon[i])}</span>
<div><b>${esc(d.name)}</b><span>${esc(d.org)}</span><span class="when">${esc(d.dates)}${d.note ? `, ${esc(d.note.replace(/\.$/, ''))}` : ''}</span></div></li>`).join('\n');
  const scale = english.levels.map((l, i) => {
    const cls = i === english.current ? 'now' : i === english.goal ? 'goal' : i < english.current ? 'reached' : '';
    const tag = i === english.current ? `<small>${esc(e.englishNow)}</small>` : i === english.goal ? `<small>${esc(e.englishGoal)}</small>` : '';
    return `<li class="${cls}">${tag}${l}</li>`;
  }).join('');
  const certName = t.certs[0].name;
  const jobKind = ['work', 'work', 'free'];
  const jobs = t.experience.map((x, i) => `<article class="job kind-${jobKind[i]}"><div class="jhead"><h3>${esc(x.org)}</h3><p class="jrole">${esc([x.role, x.place].filter(Boolean).join(', '))}</p><p class="jwhen">${esc(x.dates)}</p></div>
<ul class="jpts">${x.points.map((q) => `<li>${esc(q)}</li>`).join('')}</ul></article>`).join('\n');
  const contactBtns = [
    `<a class="btn main" href="${esc(site.linkedin)}" rel="me noopener">LinkedIn</a>`,
    `<a class="btn" href="${esc(site.github)}" rel="me noopener">GitHub</a>`,
    `<a class="btn" href="${base}${esc(site.pdf[lang])}" download>${downIcon}${esc(t.downloadPdf)}</a>`,
    site.email ? `<a class="btn" href="mailto:${esc(site.email)}">${esc(t.emailLabel)}</a>` : '',
  ].join('\n');

  /* bloque de impresión (el PDF) */
  const pExp = t.experience.map((x) => `<article class="entry"><p>${esc(x.dates)}</p>
<div><h3>${esc(x.org)} <span>${esc([x.role, x.place].filter(Boolean).join(', '))}</span></h3><ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div></article>`).join('\n');
  const pSkills = t.skills.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('\n');
  const pProj = t.projects.map((p) => `<div class="prj"><h3>${esc(p.name)}</h3> <span class="stack">${esc(p.stack)}</span><p>${esc(p.text)}</p><p>${esc(p.href.replace(/^https:\/\//, ''))}</p></div>`).join('\n');
  const pEdu = t.education.map((d) => `<li><span>${esc(d.dates)}</span><div><b>${esc(d.name)}</b><span class="org">${esc(d.org)}${d.note ? `. ${esc(d.note)}` : ''}</span></div></li>`).join('\n');
  const pCerts = t.certs.map((c) => `<li><b>${esc(c.name)}</b>${c.note ? `<span>${esc(c.note)}</span>` : ''}</li>`).join('\n');
  const pLangs = t.languages.map(([k, v]) => `<li><b>${esc(k)}</b><span>${esc(v)}</span></li>`).join('\n');

  const jsonld = {
    '@context': 'https://schema.org', '@type': 'Person', name: site.name, jobTitle: t.role,
    address: { '@type': 'PostalAddress', addressLocality: 'Cúcuta', addressCountry: 'CO' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad Francisco de Paula Santander' },
    sameAs: [site.github, site.linkedin],
  };

  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.description)}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#F2F3EF" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0D1115" media="(prefers-color-scheme: dark)">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.description)}">
<meta property="og:type" content="profile">
<link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="${base}assets/fonts/bricolage.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}assets/fonts/onest.woff2" as="font" type="font/woff2" crossorigin>
<style>${css(base)}</style>
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body id="top">
<div class="screen-only">
<a class="skip" href="#contenido">${esc(t.skip)}</a>
<header class="wrap bar">
<a class="mark" href="#top" aria-label="${esc(site.initials)}, ${esc(site.short)}">${esc(site.initials)}</a>
<a class="lang" href="${t.otherLang.href}" hreflang="${t.otherLang.code.toLowerCase()}" lang="${t.otherLang.code.toLowerCase()}" title="${esc(t.otherLang.title)}">${esc(t.otherLang.label)}</a>
</header>
<main id="contenido">
<section class="wrap hero" aria-labelledby="nombre">
<div>
<h1 id="nombre"><span>Brayam Andrey</span> <span>Oliveros Rivera</span></h1>
<p class="role">${esc(t.role)}</p>
<p class="place">${esc(t.place)}</p>
<p class="summary">${esc(t.summary)}</p>
<div class="actions">
<a class="btn main" href="${base}${esc(site.pdf[lang])}" download>${downIcon}${esc(t.downloadPdf)}</a>
<a class="btn" href="${esc(site.github)}" rel="me noopener">GitHub</a>
<a class="btn" href="${esc(site.linkedin)}" rel="me noopener">LinkedIn</a>
${emailBtn}
</div>
</div>
${heroArt(e)}
</section>

<section class="wrap block" id="servicio" aria-labelledby="h-flow">
<div class="sec-head"><h2 id="h-flow">${esc(e.flowTitle)}</h2><p class="intro">${esc(e.flowIntro)}</p></div>
<div class="flowbox" data-steps="${nSteps}">
<ol class="nodes">
${nodeLi}
</ol>
${band}
<div class="stepper" aria-live="polite">
<div class="steps">
${steps}
</div>
<div class="ctrl"><button type="button" class="cbtn" data-dir="-1">${esc(e.prev)}</button><div class="dots">${dots}</div><button type="button" class="cbtn" data-dir="1">${esc(e.next)}</button></div>
</div>
</div>
</section>

<section class="wrap block" id="cifras" aria-labelledby="h-stats">
<div class="sec-head"><h2 id="h-stats">${esc(e.statsTitle)}</h2></div>
<ul class="stats">
${stats}
</ul>
</section>

<section class="wrap block" id="trayectoria" aria-labelledby="h-trace">
<div class="sec-head"><h2 id="h-trace">${esc(e.traceTitle)}</h2><p class="intro">${esc(e.traceIntro)}</p></div>
${trace(e, lang)}
</section>

<section class="wrap block" id="experiencia" aria-labelledby="h-exp">
<div class="sec-head"><h2 id="h-exp">${esc(t.expTitle)}</h2></div>
<div class="jobs">
${jobs}
</div>
</section>

<section class="wrap block" id="tecnologias" aria-labelledby="h-skills">
<div class="sec-head"><h2 id="h-skills">${esc(t.skillsTitle)}</h2><p class="intro">${esc(e.skillsIntro)}</p></div>
<div class="layers">
${layers}
</div>
</section>

<section class="wrap block" id="proyectos" aria-labelledby="h-proj">
<div class="sec-head"><h2 id="h-proj">${esc(t.projectsTitle)}</h2><p class="intro">${esc(e.projectsIntro)}</p></div>
<div class="projects">
${projects}
</div>
<p class="more"><a href="${esc(site.github)}" rel="noopener">${esc(t.moreProjects)}</a></p>
</section>

<section class="wrap block" id="estudios" aria-labelledby="h-edu">
<div class="sec-head"><h2 id="h-edu">${esc(e.certTitle)}</h2></div>
<ul class="edu">
${degrees}
</ul>
<div class="certs"><span class="cert">${icon('cloud')}${esc(certName)}</span><span class="cnote">${esc(t.certs[1].note)}</span><a href="${esc(site.certificates)}" rel="noopener">${esc(t.certs[1].cta)}</a></div>
<div class="en"><h3>${esc(e.englishTitle)}</h3><p>${esc(e.englishNative)}</p>
<ol class="scale" aria-label="${esc(t.languages[1][1])}">${scale}</ol></div>
</section>
<section class="wrap block" id="contacto" aria-labelledby="h-contact">
<div class="sec-head"><h2 id="h-contact">${esc(t.contactTitle)}</h2><p class="intro">${esc(t.place)}</p></div>
<div class="actions">
${contactBtns}
</div>
</section>
</main>
<footer class="wrap foot"><p>${esc(t.updated)} ${esc(updated)}</p><p>${esc(e.builtWith)}</p></footer>
</div>

<div class="print-cv">
<h1>${esc(site.name)}</h1>
<p class="role">${esc(t.role)}</p>
<p class="place">${esc(t.place)}</p>
<p class="summary">${esc(t.summary)}</p>
<p class="contact">${esc(printLine)}</p>
<section><h2>${esc(t.expTitle)}</h2>
${pExp}
</section>
<section><h2>${esc(t.skillsTitle)}</h2><dl class="skills">
${pSkills}
</dl></section>
<section><h2>${esc(t.projectsTitle)}</h2>
${pProj}
</section>
<section><h2>${esc(t.eduTitle)}</h2><ul class="edu-p">
${pEdu}
</ul></section>
<section><h2>${esc(t.certTitle)}</h2><div class="two"><ul>
${pCerts}
</ul><ul>
${pLangs}
</ul></div></section>
<p class="upd">${esc(t.updated)} ${esc(updated)}</p>
</div>
<script>${stepJs}</script>
</body>
</html>
`;
}

mkdirSync(join(root, 'en'), { recursive: true });
writeFileSync(join(root, 'index.html'), page('es'));
writeFileSync(join(root, 'en/index.html'), page('en'));
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#10151A"/><text x="16" y="22" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" font-size="16" fill="#F2F3EF">BO</text></svg>`;
writeFileSync(join(root, 'assets/favicon.svg'), favicon);
console.log('Listo: index.html y en/index.html');
