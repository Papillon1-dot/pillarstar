/* Always open a new page at the top (unless a #section link was used) */
(function () {
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
  function toTop() {
    if (location.hash && document.querySelector(location.hash)) return;
    var html = document.documentElement, prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }
  toTop();
  document.addEventListener('DOMContentLoaded', toTop);
  window.addEventListener('load', toTop);
  window.addEventListener('pageshow', function (e) { if (e.persisted) toTop(); });
})();
(function () {
  var root = document.documentElement;
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var hb = header ? header.getBoundingClientRect().bottom : 80;
      root.style.setProperty('--menu-top', Math.max(0, hb) + 'px');
      var open = root.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { root.classList.remove('nav-open'); document.body.style.overflow = ''; });
    });
  }

  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Contact form: composes the enquiry and hands it to WhatsApp (company line).
  var form = document.getElementById('enquiry-form');
  if (form) {
    var WHATSAPP = '2348033412910';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      var get = function (id) { return (document.getElementById(id).value || '').trim(); };
      var name = get('f-name'), org = get('f-org'), email = get('f-email'), phone = get('f-phone'), topic = get('f-topic'), msg = get('f-message');
      if (!name || !msg || (!email && !phone)) {
        status.textContent = 'Please add your name, a message, and an email address or phone number so we can reply.';
        return;
      }
      var text = encodeURIComponent('Website enquiry: Pillar-Star Industries Limited') + '%0A%0A' +
        encodeURIComponent('Name: ' + name) + '%0A' +
        (org ? encodeURIComponent('Organisation: ' + org) + '%0A' : '') +
        (email ? encodeURIComponent('Email: ' + email) + '%0A' : '') +
        (phone ? encodeURIComponent('Phone: ' + phone) + '%0A' : '') +
        encodeURIComponent('Subject: ' + topic) + '%0A%0A' + encodeURIComponent(msg);
      var url = 'https://wa.me/' + WHATSAPP + '?text=' + text;
      var w = null;
      try { w = window.open(url, '_blank', 'noopener'); } catch (err) { w = null; }
      status.innerHTML = '';
      var p = document.createTextNode('Your message is ready. If WhatsApp did not open, ');
      var a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'open it here to send';
      status.appendChild(p); status.appendChild(a); status.appendChild(document.createTextNode('.'));
    });
  }
})();
(function () {
  var bar = document.getElementById('announce'), x = document.getElementById('announce-close');
  try { if (sessionStorage.getItem('ps-announce') === 'off' && bar) bar.hidden = true; } catch (e) {}
  if (x && bar) x.addEventListener('click', function () { bar.hidden = true; try { sessionStorage.setItem('ps-announce', 'off'); } catch (e) {} });
})();

(function () {
  document.querySelectorAll('.dd').forEach(function (dd) {
    var b = dd.querySelector('.dd-btn');
    if (!b) return;
    b.addEventListener('click', function (e) { e.preventDefault(); var o = dd.classList.toggle('open'); b.setAttribute('aria-expanded', o ? 'true' : 'false'); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) { dd.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); } });
  });
  document.querySelectorAll('.media img').forEach(function (img) {
    function gone() { img.remove(); }
    if (img.complete && img.naturalWidth === 0) gone(); else img.addEventListener('error', gone);
  });
})();

(function () {
  function place(dd) {
    var p = dd.querySelector('.dd-panel'); if (!p || window.innerWidth <= 960) return;
    p.style.left = '0px';
    var r = p.getBoundingClientRect(), max = window.innerWidth - 16;
    if (r.right > max) p.style.left = (max - r.right) + 'px';
  }
  document.querySelectorAll('.dd').forEach(function (dd) {
    dd.addEventListener('mouseenter', function () { place(dd); });
    dd.addEventListener('focusin', function () { place(dd); });
    var b = dd.querySelector('.dd-btn'); if (b) b.addEventListener('click', function () { place(dd); });
  });
  window.addEventListener('resize', function () { document.querySelectorAll('.dd').forEach(place); });
})();
