/* ===== Iowa Bat Center — interactions ===== */
(function () {
  'use strict';

  /* ---- data: Iowa bats ---- */
  var BATS = [
    {
      id: 'big-brown', name: 'Big Brown Bat', sci: 'Eptesicus fuscus',
      status: 'Stable', cls: 's-stable',
      blurb: 'A hardy, adaptable species and one of the bats Iowans encounter most — and the one most often mistaken for the Little Brown Bat.',
      facts: {
        'Wingspan': '32–40 cm', 'Weight': '15–26 grams',
        'Diet': 'Beetles & agricultural pests',
        'Roosts': 'Buildings, barns, caves & tree cavities',
        'Conservation': 'Relatively stable across its range'
      }
    },
    {
      id: 'eastern-red', name: 'Eastern Red Bat', sci: 'Lasiurus borealis',
      status: 'Apparently secure', cls: 's-secure',
      blurb: 'A striking rusty-red tree bat that roosts hidden among leaves like a dry leaf.',
      facts: {
        'Wingspan': '28–33 cm', 'Weight': '7–13 grams',
        'Diet': 'Moths, beetles & flying insects',
        'Roosts': 'Solitary, camouflaged in tree foliage',
        'Conservation': 'Migratory; affected by habitat loss & turbines'
      }
    },
    {
      id: 'hoary', name: 'Hoary Bat', sci: 'Lasiurus cinereus',
      status: 'Turbine risk', cls: 's-watch',
      blurb: 'Iowa’s largest bat, named for the frosted, silver-tipped fur on its coat.',
      facts: {
        'Wingspan': '34–41 cm', 'Weight': '20–35 grams',
        'Diet': 'Moths & larger flying insects',
        'Roosts': 'Solitary, in the foliage of trees',
        'Conservation': 'Long-distance migrant; vulnerable to wind turbines'
      }
    },
    {
      id: 'silver-haired', name: 'Silver-haired Bat', sci: 'Lasionycteris noctivagans',
      status: 'Migratory', cls: 's-secure',
      blurb: 'A woodland bat with black fur tipped in silver, often roosting under bark.',
      facts: {
        'Wingspan': '27–31 cm', 'Weight': '8–12 grams',
        'Diet': 'Soft-bodied insects, often over water',
        'Roosts': 'Under loose bark & in tree cavities',
        'Conservation': 'Migratory; sensitive to forest loss & turbines'
      }
    },
    {
      id: 'evening', name: 'Evening Bat', sci: 'Nycticeius humeralis',
      status: 'Apparently secure', cls: 's-secure',
      blurb: 'A southern species expanding into Iowa, often forming maternity colonies in trees and buildings.',
      facts: {
        'Wingspan': '26–30 cm', 'Weight': '6–14 grams',
        'Diet': 'Beetles & flying insects',
        'Roosts': 'Tree cavities & buildings; maternity colonies',
        'Conservation': 'Apparently secure; expanding its range northward'
      }
    },
    {
      id: 'little-brown', name: 'Little Brown Bat', sci: 'Myotis lucifugus',
      status: 'In sharp decline', cls: 's-decline',
      blurb: 'Once among Iowa’s most common bats, now hit hard by White-Nose Syndrome.',
      facts: {
        'Wingspan': '22–27 cm', 'Weight': '5–14 grams',
        'Diet': 'Midges, mosquitoes & small insects',
        'Roosts': 'Caves, mines & buildings in summer',
        'Conservation': 'Severely affected by White-Nose Syndrome'
      }
    },
    {
      id: 'tricolored', name: 'Tricolored Bat', sci: 'Perimyotis subflavus',
      status: 'Proposed endangered', cls: 's-decline',
      blurb: 'One of Iowa’s smallest bats, with distinctive tricolored fur — proposed for federal listing.',
      facts: {
        'Wingspan': '21–26 cm', 'Weight': '4–8 grams',
        'Diet': 'Small flying insects',
        'Roosts': 'Tree foliage in summer; caves in winter',
        'Conservation': 'Proposed federally endangered; severe White-Nose Syndrome impact'
      }
    },
    {
      id: 'northern-long-eared', name: 'Northern Long-eared Bat', sci: 'Myotis septentrionalis',
      status: 'Federally endangered', cls: 's-decline',
      blurb: 'A forest bat with long ears, now federally endangered after steep White-Nose Syndrome losses.',
      facts: {
        'Wingspan': '23–26 cm', 'Weight': '5–8 grams',
        'Diet': 'Moths & insects gleaned from foliage',
        'Roosts': 'Under bark & in cavities of forest trees',
        'Conservation': 'Federally endangered; devastated by White-Nose Syndrome'
      }
    },
    {
      id: 'indiana', name: 'Indiana Bat', sci: 'Myotis sodalis',
      status: 'Federally endangered', cls: 's-decline',
      blurb: 'A federally endangered species that hibernates in dense clusters, making it highly vulnerable.',
      facts: {
        'Wingspan': '24–27 cm', 'Weight': '5–9 grams',
        'Diet': 'Flying insects over water & woodland',
        'Roosts': 'Hibernates in caves; summers under loose bark',
        'Conservation': 'Federally endangered; sensitive to roost disturbance'
      }
    }
  ];

  /* ---- FAQ ---- */
  var FAQS = [
    { q: 'I found a bat — what should I do first?', a: 'Keep people and pets away, and do not touch the bat with bare hands. If it is safe, place a container over it and slide cardboard underneath, then contact Iowa Bat Center. If anyone may have had direct contact, call your physician and public health department first.' },
    { q: 'Can I get updates on a bat I dropped off?', a: 'We understand how much you care about the bat you brought to us. With the number of intakes we receive each day, it is very difficult to provide regular individual updates to everyone who would like one. Please know that each bat is given the best care we can provide, and we are grateful to you for taking the time to bring it to us.' },
    { q: 'Are bats dangerous or aggressive?', a: 'Bats are not aggressive and will generally avoid people. Like any wild mammal they can carry disease, so they should never be handled bare-handed — but a calm, contained bat poses little risk when handled correctly by trained individuals.' },
    { q: 'Do all bats have rabies?', a: 'No. In the wild, less than 1% of bats carry rabies. However, because any mammal can be infected and you cannot tell by looking, never handle a bat bare-handed and always seek medical advice after any possible contact.' },
    { q: 'Do you rabies test?', a: 'We do not rabies test for the public. Our purpose is to rehabilitate injured and sick bats with the intention of releasing them back to the wild. If you need a bat tested for rabies — for example, after a possible bite or exposure — you must take it to your local public health department, which can arrange testing.' },
    { q: 'There are bats living in my building. Can you remove them?', a: 'Iowa Bat Center does not provide bat removal or exclusion services. For bats roosting in a home or building, you will need to contact a licensed pest or wildlife control company that performs humane bat exclusions. We recommend choosing a provider who follows ethical, wildlife-friendly practices: a properly timed one-way exclusion that allows bats to leave but not return, never sealing bats inside, and never excluding during the maternity season (roughly June through mid-August) when flightless pups would be trapped and die. We are always glad to answer questions and point you toward safe, legal exclusion guidance.' },
    { q: 'Why do bats matter for Iowa?', a: 'Iowa’s bats are voracious insect predators. A single healthy bat can eat its own body weight in insects each night — often more than 1,000 mosquito-sized insects per hour, adding up to thousands every night and millions over a single summer. Across a colony, that means enormous numbers of agricultural pests and mosquitoes removed for free. Healthy bat populations support farms, forests, and quality of life across the state.' }
  ];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

  /* ---- render bat cards ---- */
  function renderBats() {
    var grid = document.getElementById('batGrid');
    if (!grid) return;
    grid.innerHTML = BATS.map(function (b) {
      var rows = Object.keys(b.facts).map(function (k) {
        return '<dt>' + esc(k) + '</dt><dd>' + esc(b.facts[k]) + '</dd>';
      }).join('');
      return '' +
        '<article class="bat-card" data-bat="' + b.id + '">' +
          '<div class="bat-card__media">' +
            '<img src="images/bat-' + b.id + '.svg" alt="' + esc(b.name) + ' (' + esc(b.sci) + ')" width="400" height="300" loading="lazy" class="bat-card__img">' +
            '<span class="bat-card__status ' + b.cls + '"><i class="dot"></i>' + esc(b.status) + '</span>' +
          '</div>' +
          '<div class="bat-card__body">' +
            '<h3>' + esc(b.name) + '</h3>' +
            '<span class="sci">' + esc(b.sci) + '</span>' +
            '<p class="blurb">' + esc(b.blurb) + '</p>' +
            '<div class="bat-facts"><div class="bat-facts__inner"><dl>' + rows + '</dl></div></div>' +
            '<button class="bat-toggle" type="button" aria-expanded="false">' +
              '<span class="lbl">Quick facts</span>' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m6 9 6 6 6-6"/></svg>' +
            '</button>' +
          '</div>' +
        '</article>';
    }).join('');

    grid.querySelectorAll('.bat-card').forEach(function (card) {
      var btn = card.querySelector('.bat-toggle');
      var lbl = card.querySelector('.lbl');
      btn.addEventListener('click', function () {
        var open = card.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        lbl.textContent = open ? 'Hide facts' : 'Quick facts';
      });
    });
  }

  /* ---- render FAQ ---- */
  function renderFaq() {
    var list = document.getElementById('faqList');
    if (!list) return;
    list.innerHTML = FAQS.map(function (f) {
      return '' +
        '<div class="faq-item">' +
          '<button class="faq-q" type="button" aria-expanded="false">' +
            '<span>' + esc(f.q) + '</span>' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>' +
          '</button>' +
          '<div class="faq-a"><div class="faq-a__inner"><p>' + esc(f.a) + '</p></div></div>' +
        '</div>';
    }).join('');
    list.querySelectorAll('.faq-item').forEach(function (item) {
      var q = item.querySelector('.faq-q');
      q.addEventListener('click', function () {
        var open = item.classList.toggle('open');
        q.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  /* ---- mobile nav ---- */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;
    function close() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); document.body.style.overflow = ''; }
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });

    var header = document.querySelector('.site-header');
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- contact form ---- */
  function initForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var success = document.getElementById('formSuccess');
    var fields = document.querySelector('.form-fields');
    var submitBtn = document.getElementById('submitBtn');
    var formNote = document.getElementById('formNote');

    /* rate-limiting: track submission timestamps in sessionStorage */
    var RATE_LIMIT_MS = 60000; /* 1 submission per minute */
    var RATE_KEY = 'ibc_form_last';

    function setInvalid(input, bad) {
      var field = input.closest('.field');
      if (field) field.classList.toggle('invalid', bad);
    }
    function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        if (!input.closest('.field') || !input.closest('.field').classList.contains('invalid')) return;
        validateField(input);
      });
    });
    function validateField(input) {
      var v = input.value.trim();
      var bad = false;
      if (input.hasAttribute('required') && !v) bad = true;
      if (input.type === 'email' && v && !validEmail(v)) bad = true;
      setInvalid(input, bad);
      return !bad;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* honeypot check */
      var honeypot = form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value) return;

      /* client-side rate limit */
      var last = sessionStorage.getItem(RATE_KEY);
      if (last && Date.now() - parseInt(last, 10) < RATE_LIMIT_MS) {
        formNote.textContent = 'Please wait a moment before sending another message.';
        return;
      }

      /* validate */
      var ok = true; var first = null;
      form.querySelectorAll('input[required], textarea[required], input[type=email]').forEach(function (input) {
        if (!validateField(input)) { ok = false; if (!first) first = input; }
      });
      if (!ok) { if (first) first.focus(); return; }

      /* submit */
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      formNote.textContent = '';

      var data = {
        name: form.querySelector('[name=name]').value.trim(),
        phone: form.querySelector('[name=phone]').value.trim(),
        email: form.querySelector('[name=email]').value.trim(),
        location: form.querySelector('[name=location]').value.trim(),
        description: form.querySelector('[name=description]').value.trim()
      };

      fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(function (res) {
        if (!res.ok) throw new Error('Server error ' + res.status);
        sessionStorage.setItem(RATE_KEY, String(Date.now()));
        fields.style.display = 'none';
        success.classList.add('show');
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
        formNote.textContent = 'Something went wrong. Please try again or email us directly at info@iowabatcenter.org.';
      });
    });
  }

  /* ---- stat count-up ---- */
  function initStats() {
    var vals = document.querySelectorAll('.stat .v[data-count]');
    if (!vals.length || !('IntersectionObserver' in window)) {
      vals.forEach(function (v) { v.querySelector('[data-num]').textContent = v.getAttribute('data-count'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseInt(el.getAttribute('data-count'), 10);
        var num = el.querySelector('[data-num]'), start = null, dur = 1400;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          num.textContent = Math.round(eased * target);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    vals.forEach(function (v) { io.observe(v); });
  }

  /* ---- reveal on scroll ---- */
  function initReveal() {
    var els = document.querySelectorAll('.section-head, .work-card, .bat-card, .res-card, .vision-item, .emergency__card, .about-grid, .stat');
    els.forEach(function (el) { el.classList.add('reveal'); });
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  function init() {
    document.getElementById('year').textContent = new Date().getFullYear();
    renderBats();
    renderFaq();
    initNav();
    initForm();
    initStats();
    initReveal();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
