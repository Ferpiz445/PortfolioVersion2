/* ── Age calculation ── */
(function setAge() {
  var born = new Date(2002, 16, 12); // adjust to real birth date if needed
  const today = new Date();
  let age = today.getFullYear() - born.getFullYear();
  const m = today.getMonth() - born.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < born.getDate())) age--;
  const el = document.getElementById('idade');
  if (el) el.textContent = age;
})();

/* ── Dynamic year ── */
(function setYear() {
  const el = document.getElementById('ano');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ── Scroll nav sections ── */
(function navScroll() {
  const sections = {
    'home-buttom':      'home-tela',
    'logo-buttom':      'home-tela',
    'about-buttom':     'about-tela',
    'portfolio-buttom': 'portfolio-tela',
    'skills-buttom':    'skills-tela',
    'contatos-buttom':  'contatos-tela',
    'hero-portfolio-btn': 'portfolio-tela',
    'hero-contact-btn':   'contatos-tela',
  };

  Object.entries(sections).forEach(([btnId, sectionId]) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // close mobile menu if open
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ── Mobile menu toggle ── */
const toggle = document.getElementById('menu-toggle');
const menu   = document.getElementById('menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

/* ── Header scroll class ── */
(function headerScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    last = y;
  }, { passive: true });
})();

/* ── Active nav link on scroll ── */
(function activeNav() {
  const sectionIds = ['home-tela', 'about-tela', 'portfolio-tela', 'skills-tela', 'contatos-tela'];
  const navMap = {
    'home-tela':      'home-buttom',
    'about-tela':     'about-buttom',
    'portfolio-tela': 'portfolio-buttom',
    'skills-tela':    'skills-buttom',
    'contatos-tela':  'contatos-buttom',
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));
        const navId = navMap[entry.target.id];
        const navEl = document.getElementById(navId);
        if (navEl) navEl.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();

/* ── 3D Card tilt ── */
(function card3D() {
  const wrap = document.querySelector('.card-wrap');
  if (!wrap) return;

  const INTENSITY = 15; // degrees

  wrap.addEventListener('mousemove', e => {
    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -INTENSITY;
    const ry = ((e.clientX - cx) / (rect.width  / 2)) *  INTENSITY;
    wrap.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
  });

  wrap.addEventListener('mouseleave', () => {
    wrap.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  });

  wrap.addEventListener('touchstart', () => {
    wrap.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  }, { passive: true });
})();

/* ── Portfolio card click (expand/highlight) ── */
(function portfolioCards() {
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.portfolio-card').forEach(c => c.classList.remove('active'));
      card.classList.toggle('active');
    });
  });
})();

/* ── Pause strip animation on hover ── */
(function pauseStrip() {
  document.querySelectorAll('.strip-track').forEach(track => {
    track.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
    track.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
  });
})();