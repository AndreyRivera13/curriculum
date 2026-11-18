(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var board = document.querySelector('.board');
  if (!board) return;

  var tiles = Array.prototype.slice.call(board.querySelectorAll('.tile'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.quests .quest'));
  var intro = document.querySelector('.quest.intro');
  var pawn = board.querySelector('.pawn');
  var total = parseInt(board.getAttribute('data-levels'), 10);
  var chest = tiles[total];
  var xpEl = document.getElementById('xp');
  var lvEl = document.getElementById('lv');
  var barEl = document.getElementById('xpbar');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var seen = {};
  var seenCount = 0;
  var current = 0;

  function panelFor(i) {
    for (var k = 0; k < panels.length; k++) {
      if (panels[k].getAttribute('data-i') === String(i)) return panels[k];
    }
    return null;
  }

  function place(i) {
    var b = board.getBoundingClientRect();
    var r = tiles[i].getBoundingClientRect();
    pawn.style.transform = 'translate(' + (r.left - b.left + r.width / 2) + 'px,' + (r.top - b.top) + 'px)';
  }

  function move(i) {
    if (!reduce) {
      pawn.classList.add('moving');
      setTimeout(function () { pawn.classList.remove('moving'); }, 520);
    }
    place(i);
  }

  function hud() {
    xpEl.textContent = String(seenCount * 100);
    lvEl.textContent = String(seenCount);
    barEl.style.setProperty('--p', (seenCount / total * 100) + '%');
  }

  function burst() {
    if (reduce) return;
    var b = board.getBoundingClientRect();
    var r = chest.getBoundingClientRect();
    for (var k = 0; k < 14; k++) {
      var c = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      c.setAttribute('class', 'sp burst');
      c.setAttribute('viewBox', '0 0 10 8');
      c.setAttribute('aria-hidden', 'true');
      c.innerHTML = '<use href="#s-coin"/>';
      c.style.left = (r.left - b.left + r.width / 2) + 'px';
      c.style.top = (r.top - b.top + r.height / 2) + 'px';
      c.style.setProperty('--dx', (Math.random() * 240 - 120) + 'px');
      c.style.setProperty('--dy', (-60 - Math.random() * 120) + 'px');
      board.appendChild(c);
      (function (el) { setTimeout(function () { el.remove(); }, 1100); })(c);
    }
  }

  function show(i) {
    panels.forEach(function (p) { p.hidden = true; });
    if (intro) intro.hidden = true;
    var p = panelFor(i);
    if (p) p.hidden = false;
    tiles.forEach(function (t, k) {
      if (k === i) t.setAttribute('aria-current', 'step'); else t.removeAttribute('aria-current');
    });
  }

  function select(i, focus) {
    if (i < 0 || i > total) return;
    if (i === total && seenCount < total) {
      show(i);
      var p = panelFor(i);
      if (p && !reduce) {
        p.classList.remove('shake');
        void p.offsetWidth;
        p.classList.add('shake');
      }
      if (focus) tiles[i].focus();
      return;
    }
    current = i;
    move(i);
    show(i);
    if (i < total && !seen[i]) {
      seen[i] = true;
      seenCount++;
      tiles[i].classList.add('seen');
      hud();
      if (seenCount === total) {
        chest.removeAttribute('data-locked');
        var cp = panelFor(total);
        if (cp) cp.setAttribute('data-open', '');
      }
    }
    if (i === total) burst();
    if (focus) tiles[i].focus();
  }

  tiles.forEach(function (t, i) {
    t.addEventListener('click', function (e) {
      e.preventDefault();
      select(i, false);
    });
  });

  board.addEventListener('keydown', function (e) {
    var step = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') step = 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') step = -1;
    else if (e.key === 'Home') { e.preventDefault(); select(0, true); return; }
    else if (e.key === 'End') { e.preventDefault(); select(total, true); return; }
    if (!step) return;
    e.preventDefault();
    select(Math.max(0, Math.min(total, current + step)), true);
  });

  panels.forEach(function (p) { p.hidden = true; });
  if (intro) intro.hidden = false;
  place(0);
  hud();
  window.addEventListener('resize', function () { place(current); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place(current); });
})();
