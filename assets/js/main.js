// Navigation scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
}

// Scroll animations (Intersection Observer)
const animateElements = document.querySelectorAll('.animate-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

animateElements.forEach(el => observer.observe(el));

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// Trigger counters when hero is visible
const heroStats = document.querySelector('.hero__stats');
if (heroStats) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.unobserve(heroStats);
    }
  }, { threshold: 0.5 });
  statsObserver.observe(heroStats);
}

// Terminal typing animation
function initTerminal() {
  const lines = document.querySelectorAll('.terminal__line');
  lines.forEach(line => {
    const delay = parseInt(line.getAttribute('data-delay') || 0);
    const textEl = line.querySelector('.terminal__text');

    setTimeout(() => {
      line.style.animationDelay = '0s';
      line.style.opacity = '1';

      if (textEl) {
        const text = textEl.getAttribute('data-type');
        if (text) {
          let i = 0;
          const typeInterval = setInterval(() => {
            textEl.textContent = text.substring(0, i + 1);
            i++;
            if (i >= text.length) clearInterval(typeInterval);
          }, 40);
        }
      }
    }, delay);
  });
}

// Start terminal when visible
const terminal = document.querySelector('.terminal');
if (terminal) {
  const termObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      initTerminal();
      termObserver.unobserve(terminal);
    }
  }, { threshold: 0.3 });
  termObserver.observe(terminal);
}
