(function () {
  document.documentElement.classList.add('js');
  var box = document.querySelector('.flowbox');
  if (!box) return;
  var n = parseInt(box.getAttribute('data-steps'), 10);
  var steps = Array.prototype.slice.call(box.querySelectorAll('.step'));
  var nodes = Array.prototype.slice.call(box.querySelectorAll('.node'));
  var dots = Array.prototype.slice.call(box.querySelectorAll('.dots button'));
  var prev = box.querySelector('[data-dir="-1"]');
  var next = box.querySelector('[data-dir="1"]');
  var current = 0;

  function show(i) {
    if (i < 0 || i >= n) return;
    current = i;
    steps.forEach(function (s, k) { s.hidden = k !== i; });
    nodes.forEach(function (b, k) {
      var li = b.parentNode;
      b.classList.toggle('on', k === i);
      b.classList.toggle('done', k < i);
      if (li && li.tagName === 'LI') li.classList.toggle('done', k < i);
      if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
    dots.forEach(function (d, k) {
      if (k === i) d.setAttribute('aria-current', 'step'); else d.removeAttribute('aria-current');
    });
    prev.disabled = i === 0;
    next.disabled = i === n - 1;
  }

  nodes.forEach(function (b) {
    b.addEventListener('click', function () { show(parseInt(b.getAttribute('data-step'), 10)); });
  });
  dots.forEach(function (d) {
    d.addEventListener('click', function () { show(parseInt(d.getAttribute('data-step'), 10)); });
  });
  prev.addEventListener('click', function () { show(current - 1); });
  next.addEventListener('click', function () { show(current + 1); });
  box.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
  });

  show(0);
})();
