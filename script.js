/* =========================================================
   Mathieu Dumas — portfolio
   Aucune dépendance. Tout est optionnel : si ce fichier ne
   se charge pas, la page reste lisible et navigable.
   ========================================================= */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------
     1. Face avant du switch : 24 ports, quelques liens actifs
     ------------------------------------------------------- */
  (function buildSwitch() {
    var panel = document.querySelector('.switch__ports');
    if (!panel) return;

    // État de chaque port : '' libre, 'up' lien établi, 'act' trafic
    var states = [
      'up', 'act', '', 'up', 'up', '', 'act', 'up', '', '', 'up', 'act',
      'up', '', 'up', 'up', 'act', '', '', 'up', 'act', '', 'up', 'up'
    ];

    var frag = document.createDocumentFragment();

    states.forEach(function (state, i) {
      var port = document.createElement('span');
      port.className = 'pt';
      if (state === 'up') port.classList.add('is-up');
      if (state === 'act') port.classList.add('is-' + (reduced ? 'up' : 'act'));
      if (i === 23) port.classList.add('is-uplink');       // dernier port = uplink
      port.style.setProperty('animation-delay', (i % 7) * 0.23 + 's');
      frag.appendChild(port);
    });

    panel.appendChild(frag);
  })();

  /* -------------------------------------------------------
     2. Port actif dans le panneau de navigation
     ------------------------------------------------------- */
  (function scrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.port'));
    if (!links.length) return;

    var targets = links
      .map(function (link) {
        var el = document.querySelector(link.getAttribute('href'));
        return el ? { link: link, el: el } : null;
      })
      .filter(Boolean);

    var ticking = false;

    function update() {
      ticking = false;
      var offset = window.scrollY + window.innerHeight * 0.28;
      var current = null;

      targets.forEach(function (t) {
        if (t.el.offsetTop <= offset) current = t;
      });

      targets.forEach(function (t) {
        var on = t === current;
        t.link.classList.toggle('is-active', on);
        if (on) {
          t.link.setAttribute('aria-current', 'true');
        } else {
          t.link.removeAttribute('aria-current');
        }
      });
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  })();

  /* -------------------------------------------------------
     3. Révélation des blocs au défilement
     ------------------------------------------------------- */
  (function reveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // Léger décalage entre voisins d'un même groupe
        var siblings = Array.prototype.slice.call(el.parentNode.children);
        var rank = Math.min(siblings.indexOf(el), 4);
        el.style.transitionDelay = rank * 70 + 'ms';
        el.classList.add('is-in');
        observer.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* -------------------------------------------------------
     4. Filtre des expériences
     ------------------------------------------------------- */
  (function filterXp() {
    var buttons = document.querySelectorAll('.filter__btn');
    var cards = document.querySelectorAll('.xp');
    var empty = document.querySelector('.xp-empty');
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var wanted = btn.dataset.filter;
        var shown = 0;

        buttons.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-on', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });

        cards.forEach(function (card) {
          var keep = wanted === 'tout' || card.dataset.cat === wanted;
          card.hidden = !keep;
          if (keep) shown++;
        });

        if (empty) empty.hidden = shown > 0;
      });
    });
  })();

  /* -------------------------------------------------------
     5. Copier l'adresse e-mail
     ------------------------------------------------------- */
  (function copyMail() {
    document.querySelectorAll('.copy').forEach(function (btn) {
      var initial = btn.textContent;

      btn.addEventListener('click', function () {
        var value = btn.dataset.copy || '';

        function done(ok) {
          btn.textContent = ok ? 'Adresse copiée' : 'Copie impossible';
          btn.classList.toggle('is-done', ok);
          window.setTimeout(function () {
            btn.textContent = initial;
            btn.classList.remove('is-done');
          }, 2200);
        }

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(value).then(function () { done(true); },
                                                    function () { done(false); });
        } else {
          // Repli pour les pages servies en http
          var field = document.createElement('textarea');
          field.value = value;
          field.setAttribute('readonly', '');
          field.style.position = 'fixed';
          field.style.opacity = '0';
          document.body.appendChild(field);
          field.select();
          var ok = false;
          try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
          document.body.removeChild(field);
          done(ok);
        }
      });
    });
  })();

  /* -------------------------------------------------------
     6. Liens encore vides : on le dit au lieu de ne rien faire
        (supprime cette partie quand tous les liens sont remplis)
     ------------------------------------------------------- */
  (function placeholders() {
    document.querySelectorAll('[data-placeholder]').forEach(function (link) {
      var initial = link.textContent;
      link.addEventListener('click', function (event) {
        event.preventDefault();
        link.textContent = 'Lien à compléter';
        window.setTimeout(function () { link.textContent = initial; }, 1800);
      });
    });
  })();

})();
