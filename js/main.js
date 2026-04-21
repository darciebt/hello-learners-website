/* ==========================================================================
   HELLO LEARNERS — Main JavaScript
   Scroll reveals, FAQ accordion, Nav animation, Mobile menu
   ========================================================================== */

(function () {
  'use strict';

  /* ── Scroll-Triggered Reveal Animations ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll('.reveal-text, .reveal-card, .pop-in-card')
    .forEach((el) => revealObserver.observe(el));

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-item__trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all items
      document.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('active');
        i.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Nav Logo Scroll Animation (Homepage only) ── */
  const logoContainer = document.getElementById('logo-container');
  if (logoContainer && logoContainer.classList.contains('nav__logo--animated')) {
    const navLinks = document.querySelector('.nav__links--animated');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
      if (window.scrollY > scrollThreshold) {
        document.body.classList.add('nav-scrolled');
        if (navLinks) navLinks.style.opacity = '1';
      } else {
        document.body.classList.remove('nav-scrolled');
        if (navLinks) navLinks.style.opacity = '0';
      }
    }, { passive: true });
  }

  /* ── Mobile Menu Toggle ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', !isOpen);

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Literacy Guide Tabs ── */
  document.querySelectorAll('.tabs').forEach((tabContainer) => {
    const tabs = tabContainer.querySelectorAll('.tab');
    const panelGroup = tabContainer.nextElementSibling;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        // Deactivate all tabs and panels in this group
        tabs.forEach((t) => t.classList.remove('active'));
        panelGroup.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));

        // Activate clicked tab and matching panel
        tab.classList.add('active');
        const target = panelGroup.querySelector('#' + tab.dataset.target);
        if (target) target.classList.add('active');
      });
    });
  });

  /* ── Flip Cards ── */
  document.querySelectorAll('.flip-card').forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
})();
