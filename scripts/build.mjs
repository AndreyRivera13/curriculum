// Genera index.html (español) y en/index.html (inglés). Sin dependencias.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, quests, text } from '../src/content.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cssSource = readFileSync(join(root, 'src/styles.css'), 'utf8');
const gameJs = readFileSync(join(root, 'src/game.js'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- sprites en píxeles ---------- */
const SPRITES = {
  hero: { pal: { K: '#6B4630', S: '#E8B48A', E: '#10151A', B: '#4D6BFF', D: '#3248C4', J: '#2B3445', W: '#EEF1FF' }, g: [
    '....KKKK....',
    '...KKKKKK...',
    '..KKKKKKKK..',
    '..KSSSSSSK..',
    '..SSESSESS..',
    '..SSSSSSSS..',
    '...SSSSSS...',
    '..BBBBBBBB..',
    '.BBBBBBBBBB.',
    '.SBBBBBBBBS.',
    '.SBBDDDDBBS.',
    '..BBBBBBBB..',
    '..JJJ..JJJ..',
    '..JJJ..JJJ..',
    '..WWW..WWW..'] },
  coin: { g: [
    '..XXXXXX..',
    '.XXXXXXXX.',
    'XXXX..XXXX',
    'XXX.XX.XXX',
    'XXX.XX.XXX',
    'XXXX..XXXX',
    '.XXXXXXXX.',
    '..XXXXXX..'] },
  star: { g: [
    '.....X.....',
    '....XXX....',
    '....XXX....',
    'XXXXXXXXXXX',
    '.XXXXXXXXX.',
    '..XXXXXXX..',
    '..XXXXXXX..',
    '.XXXX.XXXX.',
    '.XX.....XX.'] },
  lock: { g: [
    '...XXXX...',
    '..XX..XX..',
    '..X....X..',
    'XXXXXXXXXX',
    'XXXXXXXXXX',
    'XXXX..XXXX',
    'XXXX..XXXX',
    'XXXXXXXXXX',
    'XXXXXXXXXX'] },
  chest: { g: [
    '.XXXXXXXXXX.',
    'XXXXXXXXXXXX',
    'X..........X',
    'XXXXXXXXXXXX',
    'X....XX....X',
    'X....XX....X',
    'X..........X',
    'XXXXXXXXXXXX'] },
  cloud: { g: [
    '...XXXX.....',
    '..XXXXXX.XX.',
    '.XXXXXXXXXXX',
    'XXXXXXXXXXXX',
    'XXXXXXXXXXXX',
    '.XXXXXXXXXX.'] },
  gem: { g: [
    '.XXXXXXXX.',
    'XXXXXXXXXX',
    '.XXXXXXXX.',
    '..XXXXXX..',
    '...XXXX...',
    '....XX....'] },
  chip: { g: [
    'XXXXXXXXXX',
    'X.XX.XX.XX',
    'XXXXXXXXXX',
    'X.XX.XX.XX',
    'XXXXXXXXXX',
    'X.XX.XX.XX',
    'XXXXXXXXXX'] },
  book: { g: [
    'XXXXXXXXX.',
    'X.......X.',
    'X.XXXXX.X.',
    'X.......X.',
    'X.XXXXX.X.',
    'X.......X.',
    'XXXXXXXXX.'] },
};
const dims = {};
function symbol(id) {
  const { g, pal } = SPRITES[id];
  const w = g[0].length;
  if (g.some((r) => r.length !== w)) throw new Error(`Sprite ${id}: filas de distinto ancho`);
  dims[id] = [w, g.length];
  let out = '';
  g.forEach((row, y) => {
    for (const m of row.matchAll(/([^.])\1*/g)) {
      const fill = pal ? pal[m[1]] : 'currentColor';
      out += `<rect x="${m.index}" y="${y}" width="${m[0].length}" height="1" fill="${fill}"/>`;
    }
  });
  return `<symbol id="s-${id}" viewBox="0 0 ${w} ${g.length}">${out}</symbol>`;
}
const spriteSheet = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">${Object.keys(SPRITES).map(symbol).join('')}</svg>`;
const sp = (id, cls = '') => `<svg class="sp ${cls}" viewBox="0 0 ${dims[id][0]} ${dims[id][1]}" aria-hidden="true" focusable="false"><use href="#s-${id}"/></svg>`;
const kindIcon = { study: 'book', work: 'chip', free: 'coin' };

function css(base) {
  return cssSource
    .replace('{{FONT_BODY}}', `${base}assets/fonts/onest.woff2`)
    .replace('{{FONT_PIXEL}}', `${base}assets/fonts/pixelify.woff2`)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*\n\s*/g, '')
    .replace(/\s*([{};:,>])\s*/g, '$1')
    .replace(/;}/g, '}');
}

const downIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/></svg>';

function page(lang) {
  const t = text[lang];
  const g = t.game;
  const base = lang === 'es' ? '' : '../';
  const n = quests.length;
  const today = new Date().toISOString().slice(0, 10);
  const updated = new Intl.DateTimeFormat(t.locale, { month: 'long', year: 'numeric' }).format(new Date());
  const liShort = site.linkedin.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '');
  const ghShort = site.github.replace(/^https:\/\//, '');
  const printLine = [t.place, ghShort, liShort, site.email].filter(Boolean).join('  |  ');

  /* ---- mapa ---- */
  const tiles = quests.map((q, i) => {
    const d = q[lang];
    return `<li><a class="tile kind-${q.kind}" href="#nivel-${i + 1}" data-i="${i}">
${sp(kindIcon[q.kind], 'ic')}${sp('star', 'star')}
<span class="n">${esc(g.level)} ${i + 1}</span><span class="t">${esc(d.short)}</span><span class="d">${esc(d.dates)}</span></a></li>`;
  }).join('\n');
  const chestTile = `<li><a class="tile chest" href="#cofre" data-i="${n}" data-locked>
${sp('chest', 'ic ic-open')}${sp('lock', 'ic ic-lock')}
<span class="n">${esc(g.chestName)}</span><span class="t">${esc(g.chestSub)}</span></a></li>`;

  const panels = quests.map((q, i) => {
    const d = q[lang];
    const last = i === n - 1;
    const tag = last ? (q.start > today ? g.next : g.current) : q.ongoing ? g.ongoing : '';
    const body = Array.isArray(d.body)
      ? `<ul class="pts">${d.body.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`
      : `<p class="body">${esc(d.body)}</p>`;
    const loot = d.loot.length
      ? `<p class="loot-h">${esc(g.loot)}</p><ul class="loot">${d.loot.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>` : '';
    return `<article class="quest kind-${q.kind}" id="nivel-${i + 1}" data-i="${i}">
${tag ? `<span class="tag">${esc(tag)}</span>` : ''}
<h3><span class="lv">${esc(g.level)} ${i + 1}</span>${esc(d.name)}</h3>
<p class="meta">${esc(d.org)}, ${esc(d.dates)}</p>
${body}${loot}
</article>`;
  }).join('\n');

  const chestLinks = [
    `<a class="btn main" href="${esc(site.linkedin)}" rel="me noopener">LinkedIn</a>`,
    `<a class="btn" href="${esc(site.github)}" rel="me noopener">GitHub</a>`,
    `<a class="btn" href="${base}${esc(site.pdf[lang])}" download>${downIcon}PDF</a>`,
    site.email ? `<a class="btn" href="mailto:${esc(site.email)}">${esc(t.emailLabel)}</a>` : '',
  ].join('\n');
  const chestPanel = `<article class="quest chest-panel" id="cofre" data-i="${n}">
<h3>${esc(g.chestName)}</h3>
<p class="body locked">${esc(g.chestLocked)}</p>
<div class="opened"><p class="body"><b>${esc(g.chestOpen)}.</b> ${esc(g.chestBody)}</p>
<div class="actions">${chestLinks}</div></div>
</article>`;
  const intro = `<article class="quest intro" data-intro><h3>${esc(g.introTitle)}</h3><p class="body">${esc(g.introBody)}</p></article>`;

  /* ---- inventario, logros, misiones ---- */
  const inventory = t.skills.map(([k, v], i) => `<section class="slot k${i % 3}"><h3>${esc(k)}</h3>
<ul>${v.split(/,\s*(?![^()]*\))/).map((x) => `<li>${esc(x.trim())}</li>`).join('')}</ul></section>`).join('\n');

  const badges = g.badges.map((b) => `<li class="badge${b.locked ? ' locked' : ''}"><span class="gem">${sp(b.icon)}</span>
<div><b>${esc(b.name)}</b><span>${esc(b.note)}</span></div></li>`).join('\n');

  const missions = t.projects.map((p) => `<article class="mission"><h3>${esc(p.name)}</h3><p class="stack">${esc(p.stack)}</p><p>${esc(p.text)}</p>
<a href="${esc(p.href)}" rel="noopener">${esc(p.cta)}</a></article>`).join('\n');

  const sheet = g.sheet.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
  const emailBtn = site.email ? `<a class="btn" href="mailto:${esc(site.email)}">${esc(t.emailLabel)}</a>` : '';

  /* ---- bloque de impresión (el PDF) ---- */
  const pExp = t.experience.map((e) => `<article class="entry"><p>${esc(e.dates)}</p>
<div><h3>${esc(e.org)} <span>${esc([e.role, e.place].filter(Boolean).join(', '))}</span></h3><ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div></article>`).join('\n');
  const pSkills = t.skills.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('\n');
  const pProj = t.projects.map((p) => `<div class="prj"><h3>${esc(p.name)}</h3> <span class="stack">${esc(p.stack)}</span><p>${esc(p.text)}</p><p>${esc(p.href.replace(/^https:\/\//, ''))}</p></div>`).join('\n');
  const pEdu = t.education.map((e) => `<li><span>${esc(e.dates)}</span><div><b>${esc(e.name)}</b><span class="org">${esc(e.org)}${e.note ? `. ${esc(e.note)}` : ''}</span></div></li>`).join('\n');
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
<meta name="theme-color" content="#0B0F14" media="(prefers-color-scheme: dark)">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.description)}">
<meta property="og:type" content="profile">
<link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="${base}assets/fonts/pixelify.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}assets/fonts/onest.woff2" as="font" type="font/woff2" crossorigin>
<style>${css(base)}</style>
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body id="top">
${spriteSheet}
<div class="screen-only">
<a class="skip" href="#contenido">${esc(t.skip)}</a>
<header class="hud"><div class="wrap bar">
<a class="mark" href="#top" aria-label="${esc(site.initials)}, ${esc(site.short)}">${esc(site.initials)}</a>
<p class="xp"><span>${esc(g.hudXp)} <b id="xp">0</b></span><span class="xpbar" aria-hidden="true"><i id="xpbar"></i></span><span><span class="lab">${esc(g.hudLevels)} </span><b id="lv">0</b>/${n}</span></p>
<a class="lang" href="${t.otherLang.href}" hreflang="${t.otherLang.code.toLowerCase()}" lang="${t.otherLang.code.toLowerCase()}" title="${esc(t.otherLang.title)}">${esc(t.otherLang.label)}</a>
</div></header>
<main id="contenido">
<section class="wrap hero" aria-labelledby="nombre">
<div>
<h1 id="nombre"><span>Brayam Andrey</span> <span>Oliveros Rivera</span></h1>
<p class="role">${esc(t.role)}</p>
<p class="place">${esc(t.place)}</p>
<p class="summary">${esc(t.summary)}</p>
<div class="actions">
<a class="btn main" href="#mapa">${esc(g.start)}</a>
<a class="btn" href="${base}${esc(site.pdf[lang])}" download>${downIcon}${esc(t.downloadPdf)}</a>
<a class="btn" href="${esc(site.github)}" rel="me noopener">GitHub</a>
<a class="btn" href="${esc(site.linkedin)}" rel="me noopener">LinkedIn</a>
${emailBtn}
</div>
</div>
<div class="screen">
<div class="arena">${sp('coin', 'coin')}${sp('coin', 'coin')}${sp('coin', 'coin')}${sp('hero', 'hero-sprite')}</div>
<div class="floor"></div>
<div class="sheet"><h2>${esc(g.sheetTitle)}</h2><dl>${sheet}</dl></div>
</div>
</section>
<section class="wrap block" id="mapa" aria-labelledby="h-map">
<div class="sec-head"><h2 class="title" id="h-map">${esc(g.mapTitle)}</h2><p class="intro">${esc(g.mapIntro)}</p></div>
<div class="screen board" data-levels="${n}">
<div class="pawn" aria-hidden="true">${sp('hero')}</div>
<ol class="path">
${tiles}
${chestTile}
</ol>
</div>
<div class="quests" aria-live="polite">
${intro}
${panels}
${chestPanel}
</div>
</section>
<section class="wrap block" id="inventario" aria-labelledby="h-inv">
<div class="sec-head"><h2 class="title" id="h-inv">${esc(g.invTitle)}</h2><p class="intro">${esc(g.invIntro)}</p></div>
<div class="inv">
${inventory}
</div>
</section>
<section class="wrap block" id="logros" aria-labelledby="h-logros">
<div class="sec-head"><h2 class="title" id="h-logros">${esc(g.badgesTitle)}</h2></div>
<ul class="badges">
${badges}
</ul>
<p class="more"><a href="${esc(site.certificates)}" rel="noopener">${esc(g.coursesLink)}</a></p>
</section>
<section class="wrap block" id="misiones" aria-labelledby="h-mis">
<div class="sec-head"><h2 class="title" id="h-mis">${esc(g.missionsTitle)}</h2></div>
<div class="missions">
${missions}
</div>
<p class="more"><a href="${esc(site.github)}" rel="noopener">${esc(t.moreProjects)}</a></p>
</section>
</main>
<footer class="wrap foot"><p>${esc(t.updated)} ${esc(updated)}</p><p>${esc(g.builtWith)}</p></footer>
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
<section><h2>${esc(t.eduTitle)}</h2><ul class="edu">
${pEdu}
</ul></section>
<section><h2>${esc(t.certTitle)}</h2><div class="two"><ul>
${pCerts}
</ul><ul>
${pLangs}
</ul></div></section>
<p class="upd">${esc(t.updated)} ${esc(updated)}</p>
</div>
<script>${gameJs}</script>
</body>
</html>
`;
}

mkdirSync(join(root, 'en'), { recursive: true });
writeFileSync(join(root, 'index.html'), page('es'));
writeFileSync(join(root, 'en/index.html'), page('en'));
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#10151A"/><text x="16" y="22" text-anchor="middle" font-family="monospace" font-weight="800" font-size="16" fill="#FFD34D">BO</text></svg>`;
writeFileSync(join(root, 'assets/favicon.svg'), favicon);
console.log('Listo: index.html y en/index.html');
