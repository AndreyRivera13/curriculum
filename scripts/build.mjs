// Genera index.html (español) y en/index.html (inglés). Sin dependencias.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, axis, spans, text } from '../src/content.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cssSource = readFileSync(join(root, 'src/styles.css'), 'utf8');
const years = axis.to - axis.from;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function yearFraction(iso) {
  const d = new Date(`${iso}T12:00:00Z`);
  const start = Date.UTC(d.getUTCFullYear(), 0, 1);
  const end = Date.UTC(d.getUTCFullYear() + 1, 0, 1);
  return d.getUTCFullYear() + (d.getTime() - start) / (end - start);
}
const pct = (year) => ((year - axis.from) / years) * 100;
const fmt = (n) => `${n.toFixed(2)}%`;

function css(base) {
  return cssSource
    .replace('{{FONT_BODY}}', `${base}assets/fonts/onest.woff2`)
    .replace('{{FONT_DISPLAY}}', `${base}assets/fonts/bricolage.woff2`)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*\n\s*/g, '')
    .replace(/\s*([{};:,>])\s*/g, '$1')
    .replace(/;}/g, '}');
}

const icon = {
  down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/></svg>',
};

function trace(t, lang) {
  const labels = [];
  for (let y = axis.from; y < axis.to; y++) {
    labels.push(`<span style="--x:${fmt(pct(y))}">${y}</span>`);
  }
  const rows = spans.map((s, i) => {
    const start = pct(yearFraction(s.start));
    const end = s.end ? pct(yearFraction(s.end)) : 100;
    const [name, detail] = s[lang];
    return `<li class="row kind-${s.kind}" style="--i:${i}">
<p class="what"><b>${esc(name)}</b> <span>${esc(detail)}, ${esc(s.dates[lang])}</span></p>
<div class="lane" aria-hidden="true"><span class="bar-span${s.end ? '' : ' open'}" style="--s:${fmt(start)};--w:${fmt(end - start)}"></span></div>
</li>`;
  }).join('\n');
  const legend = Object.entries(t.kinds)
    .map(([k, label]) => `<li><i class="kind-${k}"></i>${esc(label)}</li>`).join('');
  return `<section class="trace" id="trayectoria" aria-labelledby="h-trace"><div class="wrap">
<div class="sec-head"><h2 id="h-trace">${esc(t.traceTitle)}</h2><p>${esc(t.traceIntro)}</p></div>
<ul class="legend">${legend}<li class="note">${esc(t.traceNote)}</li></ul>
<div class="years" aria-hidden="true">${labels.join('')}</div>
<ol class="rows" style="--n:${years}">
${rows}
</ol>
</div></section>`;
}

function page(lang) {
  const t = text[lang];
  const base = lang === 'es' ? '' : '../';
  const other = text[lang === 'es' ? 'en' : 'es'];
  const updated = new Intl.DateTimeFormat(t.locale, { month: 'long', year: 'numeric' }).format(new Date());
  const liShort = site.linkedin.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '');
  const ghShort = site.github.replace(/^https:\/\//, '');
  const printLine = [t.place, ghShort, liShort, site.email].filter(Boolean).join('  |  ');

  const experience = t.experience.map((e) => `<article class="entry">
<p class="when">${esc(e.dates)}</p>
<div><h3>${esc(e.org)} <span>${esc([e.role, e.place].filter(Boolean).join(', '))}</span></h3>
<ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>
</article>`).join('\n');

  const skills = t.skills.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('\n');

  const projects = t.projects.map((p) => `<article class="project">
<h3>${esc(p.name)}</h3><p class="stack">${esc(p.stack)}</p><p>${esc(p.text)}</p>
<a href="${esc(p.href)}" rel="noopener"><span class="cta">${esc(p.cta)}</span><span class="print-only">${esc(p.href.replace(/^https:\/\//, ''))}</span></a>
</article>`).join('\n');

  const education = t.education.map((e) => `<li><span class="when">${esc(e.dates)}</span>
<div><b>${esc(e.name)}</b><span class="org">${esc(e.org)}${e.note ? `. ${esc(e.note)}` : ''}</span></div></li>`).join('\n');

  const certs = t.certs.map((c) => `<li><b>${esc(c.name)}</b>${c.note ? `<span>${esc(c.note)}</span>` : ''}${c.href ? `<a class="no-print" href="${esc(site[c.href])}" rel="noopener">${esc(c.cta)}</a>` : ''}</li>`).join('\n');
  const langs = t.languages.map(([k, v]) => `<li><b>${esc(k)}</b><span>${esc(v)}</span></li>`).join('\n');

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: t.role,
    address: { '@type': 'PostalAddress', addressLocality: 'Cúcuta', addressCountry: 'CO' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad Francisco de Paula Santander' },
    sameAs: [site.github, site.linkedin],
  };

  const emailBtn = site.email
    ? `<a class="btn" href="mailto:${esc(site.email)}">${esc(t.emailLabel)}</a>` : '';
  const photo = site.photo
    ? `<img class="photo" src="${base}${esc(site.photo)}" alt="" width="160" height="160" decoding="async">` : '';

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
<a class="skip" href="#contenido">${esc(t.skip)}</a>
<header class="wrap bar">
<a class="mark" href="#top" aria-label="${esc(site.initials)}, ${esc(site.short)}">${esc(site.initials)}</a>
<a class="lang" href="${t.otherLang.href}" hreflang="${t.otherLang.code.toLowerCase()}" lang="${t.otherLang.code.toLowerCase()}" title="${esc(t.otherLang.title)}">${esc(t.otherLang.label)}</a>
</header>
<main id="contenido">
<section class="wrap hero" aria-labelledby="nombre">
${photo}
<h1 id="nombre"><span>Brayam Andrey</span> <span>Oliveros Rivera</span></h1>
<p class="role">${esc(t.role)}</p>
<p class="place">${esc(t.place)}</p>
<p class="summary">${esc(t.summary)}</p>
<p class="print-only contact">${esc(printLine)}</p>
<div class="actions">
<a class="btn main" href="${base}${esc(site.pdf[lang])}" download>${icon.down}${esc(t.downloadPdf)}</a>
<a class="btn" href="${esc(site.github)}" rel="me noopener">GitHub</a>
<a class="btn" href="${esc(site.linkedin)}" rel="me noopener">LinkedIn</a>
${emailBtn}
</div>
</section>
${trace(t, lang)}
<section class="wrap block" id="experiencia" aria-labelledby="h-exp">
<div class="sec-head"><h2 id="h-exp">${esc(t.expTitle)}</h2></div>
${experience}
</section>
<section class="wrap block" id="tecnologias" aria-labelledby="h-skills">
<div class="sec-head"><h2 id="h-skills">${esc(t.skillsTitle)}</h2></div>
<dl class="skills">
${skills}
</dl>
</section>
<section class="wrap block" id="proyectos" aria-labelledby="h-proj">
<div class="sec-head"><h2 id="h-proj">${esc(t.projectsTitle)}</h2></div>
<div class="projects">
${projects}
</div>
<p class="more"><a href="${esc(site.github)}" rel="noopener">${esc(t.moreProjects)}</a></p>
</section>
<section class="wrap block" id="estudios" aria-labelledby="h-edu">
<div class="sec-head"><h2 id="h-edu">${esc(t.eduTitle)}</h2></div>
<ul class="edu">
${education}
</ul>
</section>
<section class="wrap block" id="certificaciones" aria-labelledby="h-cert">
<div class="sec-head"><h2 id="h-cert">${esc(t.certTitle)}</h2></div>
<div class="two">
<ul class="certs">
${certs}
</ul>
<ul class="langs">
${langs}
</ul>
</div>
</section>
</main>
<footer class="wrap foot"><p>${esc(t.updated)} ${esc(updated)}</p><p class="no-print">${esc(t.builtWith)}</p></footer>
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
