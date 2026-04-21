# A Parent's Guide to Literacy — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 7-topic parent literacy course with Australian norms, accessible from the Resources page, styled to match the existing Hello Learners site.

**Architecture:** Hub page (`literacy-guide.html`) with card grid linking to 7 individual topic pages in `literacy-guide/` folder. Each topic page has 5 sections: definition, age expectations (tabs), warning signs (with CTA), home activities (flip cards), and assessment info. New CSS for tabs, flip cards, and prev/next nav added to `components.css`. Existing JS patterns (accordion, scroll reveal) reused and extended.

**Tech Stack:** HTML, CSS (existing design system), vanilla JavaScript

---

## File Structure

| File | Purpose |
|------|---------|
| `literacy-guide.html` | Hub page with intro + 7 topic cards |
| `literacy-guide/phonological-awareness.html` | Topic 1 |
| `literacy-guide/phonics-and-decoding.html` | Topic 2 |
| `literacy-guide/reading-fluency.html` | Topic 3 |
| `literacy-guide/vocabulary.html` | Topic 4 |
| `literacy-guide/reading-comprehension.html` | Topic 5 |
| `literacy-guide/spelling.html` | Topic 6 |
| `literacy-guide/writing.html` | Topic 7 |
| `css/components.css` | Add tab, flip-card, topic-nav, and guide-card components |
| `css/responsive.css` | Add responsive rules for new components |
| `js/main.js` | Add tab switching and flip-card interaction logic |
| `our-resources.html` | Add link card to the literacy guide |

---

### Task 1: Add New CSS Components

**Files:**
- Modify: `css/components.css` (append new component styles)
- Modify: `css/responsive.css` (append responsive rules)

- [ ] **Step 1: Add tab component CSS to `css/components.css`**

Append to the end of `css/components.css`:

```css
/* ══════════════════════════════════════════════════════════════════════════
   LITERACY GUIDE — TABS
   ══════════════════════════════════════════════════════════════════════════ */

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tab {
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-full);
  border: 2px solid var(--charcoal-10);
  background: white;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--charcoal-70);
  cursor: pointer;
  transition: all var(--duration-fast) ease;
}

.tab:hover {
  border-color: var(--coral);
  color: var(--charcoal);
}

.tab.active {
  background: var(--coral);
  border-color: var(--coral);
  color: var(--cream);
}

.tab-panel {
  display: none;
  animation: tabFadeIn 0.3s ease;
}

.tab-panel.active {
  display: block;
}

@keyframes tabFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 2: Add flip-card component CSS to `css/components.css`**

Append below the tabs section:

```css
/* ══════════════════════════════════════════════════════════════════════════
   LITERACY GUIDE — FLIP CARDS
   ══════════════════════════════════════════════════════════════════════════ */

.flip-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.flip-card {
  perspective: 1000px;
  height: 14rem;
  cursor: pointer;
}

.flip-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s var(--ease-bounce);
  transform-style: preserve-3d;
}

.flip-card.flipped .flip-card__inner {
  transform: rotateY(180deg);
}

.flip-card__front,
.flip-card__back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: var(--radius-md);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.flip-card__front {
  background: var(--cream);
  border: 2px solid var(--charcoal-10);
  text-align: center;
}

.flip-card__front h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--charcoal);
  margin-bottom: 0.5rem;
}

.flip-card__front p {
  font-size: 0.8125rem;
  color: var(--charcoal-60);
}

.flip-card__back {
  background: var(--coral);
  color: var(--cream);
  transform: rotateY(180deg);
  overflow-y: auto;
}

.flip-card__back p {
  font-size: 0.9375rem;
  line-height: 1.6;
}

.flip-card__back .flip-card__hint {
  font-size: 0.75rem;
  opacity: 0.7;
  margin-top: auto;
  padding-top: 0.5rem;
}
```

- [ ] **Step 3: Add topic page navigation CSS to `css/components.css`**

Append below the flip cards section:

```css
/* ══════════════════════════════════════════════════════════════════════════
   LITERACY GUIDE — TOPIC NAV & GUIDE CARDS
   ══════════════════════════════════════════════════════════════════════════ */

.topic-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border-top: 1px solid var(--charcoal-10);
  margin-top: 4rem;
}

.topic-nav__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: var(--charcoal-70);
  transition: color var(--duration-fast) ease;
}

.topic-nav__link:hover {
  color: var(--coral);
}

.topic-nav__link--disabled {
  opacity: 0.3;
  pointer-events: none;
}

/* Guide hub cards */
.guide-card {
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  border: 2px solid var(--charcoal-10);
  background: white;
  transition: all var(--duration-fast) var(--ease-smooth);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.guide-card:hover {
  transform: translateY(-8px);
  border-color: var(--coral);
  box-shadow: var(--shadow-card-hover);
}

.guide-card__num {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--charcoal-60);
}

.guide-card__title {
  font-family: var(--font-headline);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--charcoal);
}

.guide-card__desc {
  font-size: 0.9375rem;
  color: var(--charcoal-70);
  line-height: 1.6;
}

.guide-card__arrow {
  margin-top: auto;
  color: var(--coral);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

/* Concern banner (within topic pages) */
.concern-banner {
  background: var(--coral-05);
  border: 1px solid var(--coral-20);
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-top: 2rem;
  text-align: center;
}

.concern-banner p {
  color: var(--charcoal-80);
  margin-bottom: 1rem;
}
```

- [ ] **Step 4: Add responsive rules to `css/responsive.css`**

Append inside the `@media (max-width: 1024px)` block:

```css
  .flip-cards {
    grid-template-columns: repeat(2, 1fr);
  }
```

Append inside the `@media (max-width: 700px)` block:

```css
  .flip-cards {
    grid-template-columns: 1fr;
  }

  .flip-card {
    height: 12rem;
  }

  .tabs {
    gap: 0.375rem;
  }

  .tab {
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
  }

  .topic-nav {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
```

- [ ] **Step 5: Commit**

```bash
git add css/components.css css/responsive.css
git commit -m "feat: add tab, flip-card, topic-nav, and guide-card CSS components"
```

---

### Task 2: Add Tab and Flip-Card JavaScript

**Files:**
- Modify: `js/main.js` (append new interaction handlers)

- [ ] **Step 1: Add tab switching and flip-card logic to `js/main.js`**

Append inside the IIFE (before the closing `})();`):

```javascript
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
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: add tab switching and flip-card interaction JS"
```

---

### Task 3: Build the Hub Page

**Files:**
- Create: `literacy-guide.html`

- [ ] **Step 1: Create `literacy-guide.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A Parent's Guide to Literacy | Hello Learners</title>
  <meta name="description" content="Understand the core literacy skills your child is developing — from preschool to Year 6. Learn what's typical, when to be concerned, and what you can do at home.">
  <meta property="og:title" content="A Parent's Guide to Literacy | Hello Learners">
  <meta property="og:description" content="A free guide for Australian parents covering phonological awareness, phonics, fluency, vocabulary, comprehension, spelling, and writing — with age-level expectations and home activities.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,700;0,6..72,800;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- NAV -->
  <nav class="nav"><div class="nav__inner">
    <a href="index.html" class="nav__logo nav__logo--animated" id="logo-container">
      <img src="images/logo.png" alt="Hello Learners Logo">
    </a>
    <div class="nav__links nav__links--animated">
      <a class="nav__link" href="who-we-are.html">Who we are</a><a class="nav__link" href="how-we-help.html">How we help</a><a class="nav__link" href="what-we-do.html">What we do</a><a class="nav__link" href="our-services.html">Our Services</a><a class="nav__link nav__link--active" href="our-resources.html">Our Resources</a><a class="nav__link" href="faq.html">FAQ</a>
    </div>
    <div class="nav__actions"><a href="enrol.html" class="btn btn--coral btn--md">Enrol this term</a><a href="tel:0300000000" class="btn btn--sky btn--md">Call now</a></div>
    <button class="nav__hamburger" id="hamburger" aria-label="Open menu"><span></span><span></span><span></span></button>
  </div></nav>
  <div class="nav__mobile-menu" id="mobile-menu">
    <a class="nav__mobile-link" href="who-we-are.html">Who we are</a><a class="nav__mobile-link" href="how-we-help.html">How we help</a><a class="nav__mobile-link" href="what-we-do.html">What we do</a><a class="nav__mobile-link" href="our-services.html">Our Services</a><a class="nav__mobile-link" href="our-resources.html">Our Resources</a><a class="nav__mobile-link" href="faq.html">FAQ</a>
    <a class="btn btn--coral btn--lg" href="enrol.html" style="margin-top: 2rem;">Enrol this term</a>
  </div>

  <!-- HERO -->
  <section class="section section--sand" style="padding-top: 16rem; text-align: center;">
    <div class="section__inner reveal-text" style="max-width: 48rem; margin: 0 auto;">
      <div class="breadcrumb" style="justify-content: center;">
        <a href="index.html">Home</a>
        <span class="breadcrumb__sep">/</span>
        <a href="our-resources.html">Resources</a>
        <span class="breadcrumb__sep">/</span>
        <span>Literacy Guide</span>
      </div>
      <span class="section-label">For parents</span>
      <h1 style="margin-bottom: 2rem;">A Parent's Guide to Literacy</h1>
      <p class="text-xl" style="color: var(--charcoal-70);">
        Literacy is more than just reading. It's a set of skills that build on each other — and understanding them helps you support your child at every stage. This guide breaks down each skill, what's typical at each age, and what you can do at home.
      </p>
    </div>
  </section>

  <!-- TOPIC CARDS -->
  <section class="section section--cream">
    <div class="section__inner">
      <div class="text-center mb-16 reveal-text">
        <h2>Explore the 7 Core Literacy Skills</h2>
        <p class="text-xl" style="max-width: 40rem; margin: 1rem auto 0; color: var(--charcoal-70);">Click any topic to learn what it is, what to expect at each age, and practical activities you can try at home.</p>
      </div>
      <div class="grid grid--3" style="gap: 2rem;">
        <a href="literacy-guide/phonological-awareness.html" class="guide-card reveal-text delay-1" style="border-color: var(--coral-20);">
          <span class="guide-card__num">Skill 1</span>
          <h3 class="guide-card__title">Phonological Awareness</h3>
          <p class="guide-card__desc">Hearing and playing with sounds in words — rhyming, syllables, and individual sounds.</p>
          <span class="guide-card__arrow">Explore <span class="material-symbols-outlined" style="font-size: 1.125rem;">arrow_forward</span></span>
        </a>
        <a href="literacy-guide/phonics-and-decoding.html" class="guide-card reveal-text delay-2" style="border-color: var(--sky-blue-20);">
          <span class="guide-card__num">Skill 2</span>
          <h3 class="guide-card__title">Phonics &amp; Decoding</h3>
          <p class="guide-card__desc">Connecting letters to sounds and using that knowledge to read words on the page.</p>
          <span class="guide-card__arrow">Explore <span class="material-symbols-outlined" style="font-size: 1.125rem;">arrow_forward</span></span>
        </a>
        <a href="literacy-guide/reading-fluency.html" class="guide-card reveal-text delay-3" style="border-color: var(--mauve-20);">
          <span class="guide-card__num">Skill 3</span>
          <h3 class="guide-card__title">Reading Fluency</h3>
          <p class="guide-card__desc">Reading accurately, at a good pace, and with natural expression.</p>
          <span class="guide-card__arrow">Explore <span class="material-symbols-outlined" style="font-size: 1.125rem;">arrow_forward</span></span>
        </a>
        <a href="literacy-guide/vocabulary.html" class="guide-card reveal-text delay-4" style="border-color: var(--marigold-20);">
          <span class="guide-card__num">Skill 4</span>
          <h3 class="guide-card__title">Vocabulary</h3>
          <p class="guide-card__desc">Understanding and using words — building a rich word bank through conversation and reading.</p>
          <span class="guide-card__arrow">Explore <span class="material-symbols-outlined" style="font-size: 1.125rem;">arrow_forward</span></span>
        </a>
        <a href="literacy-guide/reading-comprehension.html" class="guide-card reveal-text delay-5" style="border-color: var(--sky-blue-20);">
          <span class="guide-card__num">Skill 5</span>
          <h3 class="guide-card__title">Reading Comprehension</h3>
          <p class="guide-card__desc">Understanding what you read — making meaning from stories, texts, and information.</p>
          <span class="guide-card__arrow">Explore <span class="material-symbols-outlined" style="font-size: 1.125rem;">arrow_forward</span></span>
        </a>
        <a href="literacy-guide/spelling.html" class="guide-card reveal-text delay-6" style="border-color: var(--coral-20);">
          <span class="guide-card__num">Skill 6</span>
          <h3 class="guide-card__title">Spelling</h3>
          <p class="guide-card__desc">Recognising sound-letter patterns and applying them when writing words.</p>
          <span class="guide-card__arrow">Explore <span class="material-symbols-outlined" style="font-size: 1.125rem;">arrow_forward</span></span>
        </a>
        <a href="literacy-guide/writing.html" class="guide-card reveal-text delay-7" style="border-color: var(--mauve-20);">
          <span class="guide-card__num">Skill 7</span>
          <h3 class="guide-card__title">Writing</h3>
          <p class="guide-card__desc">Composing sentences, paragraphs, and ideas — putting thoughts on paper.</p>
          <span class="guide-card__arrow">Explore <span class="material-symbols-outlined" style="font-size: 1.125rem;">arrow_forward</span></span>
        </a>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section section--marigold">
    <div class="section__inner text-center reveal-text">
      <h2 style="margin-bottom: 1.5rem;">Have questions about your child's literacy?</h2>
      <p class="text-xl" style="max-width: 36rem; margin: 0 auto 2rem; color: var(--charcoal-80);">We're always happy to chat. No obligation, no pressure.</p>
      <a href="mailto:hello@hellokidstherapy.com.au" class="btn btn--coral btn--lg">Get in touch</a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer__inner">
      <div><div class="footer__brand-name">Hello Learners</div><p class="footer__brand-desc">Building a foundation of confidence through evidence-based literacy instruction.</p><p style="font-size: 0.8125rem; color: var(--charcoal-60); margin-top: 1rem; line-height: 1.6;">Serving families across Yarraville, Kensington, Footscray, Parkville, Brunswick, Carlton, Ascot Vale, Moonee Ponds and Maribyrnong.</p></div>
      <div><h4 class="footer__col-title">The Program</h4><div class="footer__links"><a href="what-we-do.html" class="footer__link">Overview</a><a href="index.html#how-it-works" class="footer__link">How it works</a><a href="how-we-help.html" class="footer__link">Is it right?</a></div></div>
      <div><h4 class="footer__col-title">Support</h4><div class="footer__links"><a href="mailto:hello@hellokidstherapy.com.au" class="footer__link">Contact Us</a><a href="faq.html" class="footer__link">FAQ</a><a href="#" class="footer__link">Privacy</a></div></div>
      <div><h4 class="footer__col-title">Stay Updated</h4><input type="email" class="footer__newsletter-input" placeholder="Email Address" aria-label="Newsletter email"><button class="footer__newsletter-btn">Subscribe</button></div>
    </div>
    <div class="footer__bottom"><p>&copy; 2025 Hello Learners Clinic. All rights reserved.</p></div>
  </footer>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add literacy-guide.html
git commit -m "feat: add literacy guide hub page with 7 topic cards"
```

---

### Task 4: Build Topic Page — Phonological Awareness

**Files:**
- Create: `literacy-guide/phonological-awareness.html`

This is the first topic page and serves as the template for all other topic pages. It contains all 5 sections with complete Australian norms content.

- [ ] **Step 1: Create directory and `literacy-guide/phonological-awareness.html`**

```bash
mkdir -p "literacy-guide"
```

Then create the file with this content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phonological Awareness — What to Expect | Hello Learners</title>
  <meta name="description" content="What is phonological awareness? Learn what's typical from preschool to Year 6, warning signs to watch for, and activities to try at home. Based on Australian norms.">
  <meta property="og:title" content="Phonological Awareness — A Parent's Guide | Hello Learners">
  <meta property="og:description" content="Understand phonological awareness — the ability to hear and manipulate sounds in words. Australian age expectations, warning signs, and home activities.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,700;0,6..72,800;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <!-- NAV -->
  <nav class="nav"><div class="nav__inner">
    <a href="../index.html" class="nav__logo nav__logo--animated" id="logo-container">
      <img src="../images/logo.png" alt="Hello Learners Logo">
    </a>
    <div class="nav__links nav__links--animated">
      <a class="nav__link" href="../who-we-are.html">Who we are</a><a class="nav__link" href="../how-we-help.html">How we help</a><a class="nav__link" href="../what-we-do.html">What we do</a><a class="nav__link" href="../our-services.html">Our Services</a><a class="nav__link nav__link--active" href="../our-resources.html">Our Resources</a><a class="nav__link" href="../faq.html">FAQ</a>
    </div>
    <div class="nav__actions"><a href="../enrol.html" class="btn btn--coral btn--md">Enrol this term</a><a href="tel:0300000000" class="btn btn--sky btn--md">Call now</a></div>
    <button class="nav__hamburger" id="hamburger" aria-label="Open menu"><span></span><span></span><span></span></button>
  </div></nav>
  <div class="nav__mobile-menu" id="mobile-menu">
    <a class="nav__mobile-link" href="../who-we-are.html">Who we are</a><a class="nav__mobile-link" href="../how-we-help.html">How we help</a><a class="nav__mobile-link" href="../what-we-do.html">What we do</a><a class="nav__mobile-link" href="../our-services.html">Our Services</a><a class="nav__mobile-link" href="../our-resources.html">Our Resources</a><a class="nav__mobile-link" href="../faq.html">FAQ</a>
    <a class="btn btn--coral btn--lg" href="../enrol.html" style="margin-top: 2rem;">Enrol this term</a>
  </div>

  <!-- HERO -->
  <section class="section section--sand" style="padding-top: 16rem; padding-bottom: 4rem;">
    <div class="section__inner">
      <div class="breadcrumb reveal-text">
        <a href="../index.html">Home</a>
        <span class="breadcrumb__sep">/</span>
        <a href="../our-resources.html">Resources</a>
        <span class="breadcrumb__sep">/</span>
        <a href="../literacy-guide.html">Literacy Guide</a>
        <span class="breadcrumb__sep">/</span>
        <span>Phonological Awareness</span>
      </div>
      <span class="section-label">Skill 1 of 7</span>
      <h1 style="margin-bottom: 2rem;">Phonological Awareness</h1>
      <p class="text-xl" style="max-width: 42rem; color: var(--charcoal-70);">
        The ability to hear, identify, and play with sounds in spoken language — before letters even enter the picture.
      </p>
    </div>
  </section>

  <!-- SECTION 1: WHAT IS IT? -->
  <section class="section section--cream">
    <div class="section__inner">
      <div class="max-w-3xl reveal-text">
        <span class="section-label">Understanding the skill</span>
        <h2 style="margin-bottom: 2rem;">What is phonological awareness?</h2>
        <div style="display: flex; flex-direction: column; gap: 1.5rem; color: var(--charcoal-80); line-height: 1.8;">
          <p>Phonological awareness is the ability to notice and work with the sounds in spoken language. It's not about letters or reading yet — it's about <strong>hearing</strong>. Can your child hear that "cat" and "hat" rhyme? Can they clap out the syllables in "butterfly"? Can they tell you the first sound in "dog"?</p>
          <p>This skill is one of the strongest predictors of future reading success. Children who can play with sounds in words find it much easier to learn phonics later — because they already understand that words are made up of smaller sound parts.</p>
          <p>Phonological awareness develops in a predictable sequence: first children notice big chunks of sound (like rhymes and syllables), then they begin to hear individual sounds (phonemes) within words. It's a listening skill — no reading required.</p>
          <p><strong>Why it matters:</strong> Research consistently shows that phonological awareness is foundational to learning to read and spell. Children who struggle with this skill often struggle with reading, not because they aren't smart, but because their brain needs more support in processing the sound structure of language.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 2: WHAT TO EXPECT AT EACH AGE -->
  <section class="section section--sand">
    <div class="section__inner">
      <div class="max-w-4xl reveal-text">
        <span class="section-label">Age expectations</span>
        <h2 style="margin-bottom: 2rem;">What to expect at each age</h2>
        <p style="color: var(--charcoal-70); margin-bottom: 2rem;">These are general guides based on Australian developmental norms. Every child develops at their own pace — but these milestones give you a sense of what's typical.</p>

        <div class="tabs">
          <button class="tab active" data-target="pa-preschool">Preschool</button>
          <button class="tab" data-target="pa-foundation">Foundation</button>
          <button class="tab" data-target="pa-year1">Year 1</button>
          <button class="tab" data-target="pa-year2">Year 2</button>
          <button class="tab" data-target="pa-year3">Year 3</button>
          <button class="tab" data-target="pa-year4">Year 4</button>
          <button class="tab" data-target="pa-year5">Year 5</button>
          <button class="tab" data-target="pa-year6">Year 6</button>
        </div>
        <div class="tab-panels">
          <div class="tab-panel active" id="pa-preschool">
            <div style="background: var(--cream); border-radius: var(--radius-lg); padding: 2rem; border: 1px solid var(--charcoal-10);">
              <h4 style="margin-bottom: 1rem; color: var(--coral);">Preschool (3–4 years)</h4>
              <ul style="color: var(--charcoal-80); line-height: 1.8; padding-left: 1.25rem;">
                <li>Enjoys nursery rhymes and can join in with familiar ones</li>
                <li>Notices when two words sound the same (e.g. "cat" and "hat")</li>
                <li>Can clap along to syllables in their name with help</li>
                <li>Recognises familiar environmental sounds (doorbell, dog barking)</li>
                <li>Begins to play with silly sounds and made-up words</li>
              </ul>
            </div>
          </div>
          <div class="tab-panel" id="pa-foundation">
            <div style="background: var(--cream); border-radius: var(--radius-lg); padding: 2rem; border: 1px solid var(--charcoal-10);">
              <h4 style="margin-bottom: 1rem; color: var(--coral);">Foundation / Prep (~5 years)</h4>
              <ul style="color: var(--charcoal-80); line-height: 1.8; padding-left: 1.25rem;">
                <li>Produces rhyming words (real or made-up) — "What rhymes with cat? Bat, sat, dat!"</li>
                <li>Claps or counts syllables in words (e.g. "el-e-phant" = 3)</li>
                <li>Identifies the first sound in a word — "What sound does 'sun' start with?"</li>
                <li>Blends two sounds together to make a word — "/s/ … /un/ = sun"</li>
                <li>Recognises when words start with the same sound — "ball" and "bus"</li>
              </ul>
            </div>
          </div>
          <div class="tab-panel" id="pa-year1">
            <div style="background: var(--cream); border-radius: var(--radius-lg); padding: 2rem; border: 1px solid var(--charcoal-10);">
              <h4 style="margin-bottom: 1rem; color: var(--coral);">Year 1 (~6 years)</h4>
              <ul style="color: var(--charcoal-80); line-height: 1.8; padding-left: 1.25rem;">
                <li>Segments words into individual sounds — "cat" = /c/ /a/ /t/</li>
                <li>Blends 3–4 sounds together to read simple words</li>
                <li>Identifies the last sound in a word</li>
                <li>Deletes a sound from a word — "Say 'stop' without the /s/" → "top"</li>
                <li>Begins to substitute sounds — "Change the /c/ in cat to /b/" → "bat"</li>
              </ul>
            </div>
          </div>
          <div class="tab-panel" id="pa-year2">
            <div style="background: var(--cream); border-radius: var(--radius-lg); padding: 2rem; border: 1px solid var(--charcoal-10);">
              <h4 style="margin-bottom: 1rem; color: var(--coral);">Year 2 (~7 years)</h4>
              <ul style="color: var(--charcoal-80); line-height: 1.8; padding-left: 1.25rem;">
                <li>Manipulates sounds fluently — can delete, add, and substitute sounds in words</li>
                <li>Segments and blends words with consonant clusters — "string" = /s/ /t/ /r/ /i/ /ng/</li>
                <li>Recognises and works with multi-syllable words at the sound level</li>
                <li>Phonological awareness is mostly automatic and supports reading and spelling</li>
              </ul>
            </div>
          </div>
          <div class="tab-panel" id="pa-year3">
            <div style="background: var(--cream); border-radius: var(--radius-lg); padding: 2rem; border: 1px solid var(--charcoal-10);">
              <h4 style="margin-bottom: 1rem; color: var(--coral);">Year 3 (~8 years)</h4>
              <ul style="color: var(--charcoal-80); line-height: 1.8; padding-left: 1.25rem;">
                <li>Sound awareness is well established and largely automatic</li>
                <li>Can break apart complex multi-syllable words into sounds</li>
                <li>Uses sound awareness to self-correct reading errors</li>
                <li>Applies sound knowledge to attempt unfamiliar words in reading and spelling</li>
              </ul>
            </div>
          </div>
          <div class="tab-panel" id="pa-year4">
            <div style="background: var(--cream); border-radius: var(--radius-lg); padding: 2rem; border: 1px solid var(--charcoal-10);">
              <h4 style="margin-bottom: 1rem; color: var(--coral);">Year 4 (~9 years)</h4>
              <ul style="color: var(--charcoal-80); line-height: 1.8; padding-left: 1.25rem;">
                <li>Phonological awareness operates in the background — children don't need to consciously think about sounds</li>
                <li>Supports spelling of longer, more complex words</li>
                <li>Helps with learning new vocabulary through sound patterns</li>
                <li>If still struggling at this age, targeted support is strongly recommended</li>
              </ul>
            </div>
          </div>
          <div class="tab-panel" id="pa-year5">
            <div style="background: var(--cream); border-radius: var(--radius-lg); padding: 2rem; border: 1px solid var(--charcoal-10);">
              <h4 style="margin-bottom: 1rem; color: var(--coral);">Year 5 (~10 years)</h4>
              <ul style="color: var(--charcoal-80); line-height: 1.8; padding-left: 1.25rem;">
                <li>Sound awareness supports understanding of word morphology (prefixes, suffixes, roots)</li>
                <li>Aids pronunciation and spelling of subject-specific vocabulary</li>
                <li>Underpins the ability to learn words from other languages</li>
              </ul>
            </div>
          </div>
          <div class="tab-panel" id="pa-year6">
            <div style="background: var(--cream); border-radius: var(--radius-lg); padding: 2rem; border: 1px solid var(--charcoal-10);">
              <h4 style="margin-bottom: 1rem; color: var(--coral);">Year 6 (~11 years)</h4>
              <ul style="color: var(--charcoal-80); line-height: 1.8; padding-left: 1.25rem;">
                <li>Fully automatic — children use sound knowledge without thinking about it</li>
                <li>Supports advanced spelling, vocabulary development, and comprehension</li>
                <li>Any remaining difficulties at this stage will benefit from specialist support before secondary school</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 3: WHEN TO BE CONCERNED -->
  <section class="section section--cream">
    <div class="section__inner">
      <div class="max-w-3xl reveal-text">
        <span class="section-label">When to be concerned</span>
        <h2 style="margin-bottom: 2rem;">Signs your child may need extra support</h2>
        <p style="color: var(--charcoal-70); margin-bottom: 2rem;">Every child develops at their own pace — but some signs are worth paying attention to. You might want to seek support if your child:</p>

        <div class="tabs">
          <button class="tab active" data-target="concern-preschool">Preschool</button>
          <button class="tab" data-target="concern-foundation">Foundation</button>
          <button class="tab" data-target="concern-year1">Year 1</button>
          <button class="tab" data-target="concern-year2plus">Year 2+</button>
        </div>
        <div class="tab-panels">
          <div class="tab-panel active" id="concern-preschool">
            <div style="background: var(--coral-05); border-radius: var(--radius-lg); padding: 2rem; border: 1px solid var(--coral-20);">
              <h4 style="margin-bottom: 1rem; color: var(--coral);">Preschool (3–4 years)</h4>
              <ul style="color: var(--charcoal-80); line-height: 1.8; padding-left: 1.25rem;">
                <li>Shows no interest in nursery rhymes or rhyming games</li>
                <li>Can't clap along to syllables in simple words with help</li>
                <li>Doesn't notice when words sound the same or different</li>
                <li>Has difficulty remembering the words to familiar songs</li>
              </ul>
            </div>
          </div>
          <div class="tab-panel" id="concern-foundation">
            <div style="background: var(--coral-05); border-radius: var(--radius-lg); padding: 2rem; border: 1px solid var(--coral-20);">
              <h4 style="margin-bottom: 1rem; color: var(--coral);">Foundation / Prep (~5 years)</h4>
              <ul style="color: var(--charcoal-80); line-height: 1.8; padding-left: 1.25rem;">
                <li>Can't produce a rhyming word — even a made-up one</li>
                <li>Struggles to identify the first sound in common words</li>
                <li>Can't blend two sounds together to make a word</li>
                <li>Finds it hard to clap syllables even with practice</li>
              </ul>
            </div>
          </div>
          <div class="tab-panel" id="concern-year1">
            <div style="background: var(--coral-05); border-radius: var(--radius-lg); padding: 2rem; border: 1px solid var(--coral-20);">
              <h4 style="margin-bottom: 1rem; color: var(--coral);">Year 1 (~6 years)</h4>
              <ul style="color: var(--charcoal-80); line-height: 1.8; padding-left: 1.25rem;">
                <li>Can't segment simple 3-sound words (e.g. "cat" into /c/ /a/ /t/)</li>
                <li>Struggles to blend sounds together to read words</li>
                <li>Can't delete or substitute sounds in words</li>
                <li>Reading progress is significantly behind peers</li>
              </ul>
            </div>
          </div>
          <div class="tab-panel" id="concern-year2plus">
            <div style="background: var(--coral-05); border-radius: var(--radius-lg); padding: 2rem; border: 1px solid var(--coral-20);">
              <h4 style="margin-bottom: 1rem; color: var(--coral);">Year 2 and beyond</h4>
              <ul style="color: var(--charcoal-80); line-height: 1.8; padding-left: 1.25rem;">
                <li>Still struggles with any of the skills listed above</li>
                <li>Has difficulty sounding out unfamiliar words</li>
                <li>Spelling errors suggest they aren't hearing the sounds in words correctly</li>
                <li>Reading feels effortful and slow — even for simple texts</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="concern-banner">
          <p style="font-weight: 700; font-size: 1.125rem;">If any of this sounds like your child, we'd love to help.</p>
          <p>Hello Learners is designed for exactly these children — and no referral or diagnosis is needed to get started.</p>
          <a href="../enrol.html" class="btn btn--coral btn--md" style="margin-top: 1rem;">Check availability this term</a>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 4: ACTIVITIES TO TRY AT HOME -->
  <section class="section section--sand">
    <div class="section__inner">
      <div class="max-w-4xl reveal-text">
        <span class="section-label">Try at home</span>
        <h2 style="margin-bottom: 1rem;">Activities to build phonological awareness</h2>
        <p style="color: var(--charcoal-70); margin-bottom: 2rem;">These are simple things you can do at home — in the car, at the dinner table, or before bed. Click any card to see the details.</p>

        <div class="flip-cards">
          <div class="flip-card">
            <div class="flip-card__inner">
              <div class="flip-card__front">
                <h4>Rhyme Time</h4>
                <p>Ages: Preschool–Foundation</p>
              </div>
              <div class="flip-card__back">
                <p>Take turns thinking of words that rhyme. Start with a word like "cat" and see how many rhymes you can find together. Silly made-up words count! "Cat, bat, sat, dat, gat…"</p>
                <span class="flip-card__hint">Tap to flip back</span>
              </div>
            </div>
          </div>
          <div class="flip-card">
            <div class="flip-card__inner">
              <div class="flip-card__front">
                <h4>Sound Spy</h4>
                <p>Ages: Foundation–Year 1</p>
              </div>
              <div class="flip-card__back">
                <p>"I spy something that starts with /mmm/." Use the sound, not the letter name. Let your child look around and guess. Great for car rides or while waiting.</p>
                <span class="flip-card__hint">Tap to flip back</span>
              </div>
            </div>
          </div>
          <div class="flip-card">
            <div class="flip-card__inner">
              <div class="flip-card__front">
                <h4>Clap It Out</h4>
                <p>Ages: Preschool–Foundation</p>
              </div>
              <div class="flip-card__back">
                <p>Clap the syllables in words together. Start with names — "Ma-ma" (2 claps), "El-e-phant" (3 claps). Then try food, animals, or anything around you.</p>
                <span class="flip-card__hint">Tap to flip back</span>
              </div>
            </div>
          </div>
          <div class="flip-card">
            <div class="flip-card__inner">
              <div class="flip-card__front">
                <h4>Robot Talk</h4>
                <p>Ages: Foundation–Year 1</p>
              </div>
              <div class="flip-card__back">
                <p>Say words in "robot voice" — one sound at a time. "/d/ … /o/ … /g/" — can your child blend them together? "Dog!" Start with 3-sound words and build up.</p>
                <span class="flip-card__hint">Tap to flip back</span>
              </div>
            </div>
          </div>
          <div class="flip-card">
            <div class="flip-card__inner">
              <div class="flip-card__front">
                <h4>Odd One Out</h4>
                <p>Ages: Foundation–Year 2</p>
              </div>
              <div class="flip-card__back">
                <p>Say three words — two that rhyme and one that doesn't. "Cat, hat, dog — which one doesn't belong?" This builds attention to sounds and is great for dinner time.</p>
                <span class="flip-card__hint">Tap to flip back</span>
              </div>
            </div>
          </div>
          <div class="flip-card">
            <div class="flip-card__inner">
              <div class="flip-card__front">
                <h4>Sound Swap</h4>
                <p>Ages: Year 1–Year 3</p>
              </div>
              <div class="flip-card__back">
                <p>"What happens if we change the /c/ in 'cat' to /b/?" → "bat!" This is advanced phonological awareness and directly supports reading and spelling. Keep it playful.</p>
                <span class="flip-card__hint">Tap to flip back</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 5: HOW IT'S ASSESSED -->
  <section class="section section--cream">
    <div class="section__inner">
      <div class="max-w-3xl reveal-text">
        <span class="section-label">Assessment</span>
        <h2 style="margin-bottom: 2rem;">How phonological awareness is assessed</h2>
        <div style="display: flex; flex-direction: column; gap: 1.5rem; color: var(--charcoal-80); line-height: 1.8;">
          <p>In Australian schools, phonological awareness is typically assessed in the early years — particularly in Foundation and Year 1. Teachers and speech pathologists look at a child's ability to work with sounds in spoken language, not their reading of printed text.</p>
          <p><strong>What teachers look for:</strong></p>
          <ul style="padding-left: 1.25rem;">
            <li>Can the child identify and produce rhyming words?</li>
            <li>Can they segment words into syllables?</li>
            <li>Can they identify the first, last, and middle sounds in words?</li>
            <li>Can they blend individual sounds together to make a word?</li>
            <li>Can they delete or substitute sounds in words?</li>
          </ul>
          <p><strong>Common assessments used in Australian schools:</strong></p>
          <ul style="padding-left: 1.25rem;">
            <li><strong>PASM</strong> (Phonological Awareness Screening Measure) — widely used in Victorian schools to identify children who may need additional phonological support</li>
            <li><strong>Sutherland Phonological Awareness Test (SPAT-R)</strong> — a comprehensive assessment used by speech pathologists</li>
            <li><strong>CTOPP-2</strong> (Comprehensive Test of Phonological Processing) — a detailed assessment used when a learning difficulty is suspected</li>
            <li><strong>School-based literacy benchmarking</strong> — many schools use their own screening tools at the start of Foundation and Year 1</li>
          </ul>
          <p>If your child's school has flagged concerns about phonological awareness, or if you're noticing some of the warning signs above, a speech pathologist can conduct a more detailed assessment to understand exactly where your child needs support.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- TOPIC NAV -->
  <section class="section section--sand" style="padding-top: 0;">
    <div class="section__inner">
      <div class="max-w-3xl">
        <div class="topic-nav">
          <span class="topic-nav__link topic-nav__link--disabled">
            <span class="material-symbols-outlined">arrow_back</span> Previous
          </span>
          <a href="../literacy-guide.html" class="topic-nav__link">
            <span class="material-symbols-outlined">grid_view</span> All topics
          </a>
          <a href="phonics-and-decoding.html" class="topic-nav__link">
            Next: Phonics &amp; Decoding <span class="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer__inner">
      <div><div class="footer__brand-name">Hello Learners</div><p class="footer__brand-desc">Building a foundation of confidence through evidence-based literacy instruction.</p><p style="font-size: 0.8125rem; color: var(--charcoal-60); margin-top: 1rem; line-height: 1.6;">Serving families across Yarraville, Kensington, Footscray, Parkville, Brunswick, Carlton, Ascot Vale, Moonee Ponds and Maribyrnong.</p></div>
      <div><h4 class="footer__col-title">The Program</h4><div class="footer__links"><a href="../what-we-do.html" class="footer__link">Overview</a><a href="../index.html#how-it-works" class="footer__link">How it works</a><a href="../how-we-help.html" class="footer__link">Is it right?</a></div></div>
      <div><h4 class="footer__col-title">Support</h4><div class="footer__links"><a href="mailto:hello@hellokidstherapy.com.au" class="footer__link">Contact Us</a><a href="../faq.html" class="footer__link">FAQ</a><a href="#" class="footer__link">Privacy</a></div></div>
      <div><h4 class="footer__col-title">Stay Updated</h4><input type="email" class="footer__newsletter-input" placeholder="Email Address" aria-label="Newsletter email"><button class="footer__newsletter-btn">Subscribe</button></div>
    </div>
    <div class="footer__bottom"><p>&copy; 2025 Hello Learners Clinic. All rights reserved.</p></div>
  </footer>
  <script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify tabs, flip cards, and layout work**

```bash
open "literacy-guide/phonological-awareness.html"
```

- [ ] **Step 3: Commit**

```bash
git add literacy-guide/phonological-awareness.html
git commit -m "feat: add phonological awareness topic page with full Australian norms content"
```

---

### Task 5: Build Remaining 6 Topic Pages

**Files:**
- Create: `literacy-guide/phonics-and-decoding.html`
- Create: `literacy-guide/reading-fluency.html`
- Create: `literacy-guide/vocabulary.html`
- Create: `literacy-guide/reading-comprehension.html`
- Create: `literacy-guide/spelling.html`
- Create: `literacy-guide/writing.html`

Each page follows the exact same 5-section structure as `phonological-awareness.html` (Task 4). The content for each topic must be:
- Written in Darcie's warm, approachable voice
- Based on Australian/Victorian curriculum norms
- Age expectations covering Preschool through Year 6
- Warning signs with CTA to enrol page (in "When to be concerned" section only)
- 6 home activities as flip cards
- Assessment info referencing Australian assessments and school practices

**Topic-specific content requirements:**

**Phonics & Decoding (Skill 2):**
- Definition: connecting letters/letter patterns to sounds, using that to read words. Includes print awareness concepts (holding books, reading left-to-right, understanding that print carries meaning)
- Expectations: letter-sound knowledge progression from Foundation alphabet to Year 6 multi-syllable decoding
- Warning signs: not knowing letter sounds by end of Foundation, guessing at words from pictures, slow to apply phonics when reading
- Activities: alphabet hunts, word building with magnetic letters, decodable book reading, syllable sorting
- Assessment: Victorian English Online Interview, PM Benchmarks, decodable text running records

**Reading Fluency (Skill 3):**
- Definition: reading with accuracy, appropriate pace, and natural expression — the bridge between decoding and comprehension
- Expectations: from word-by-word reading in Foundation to smooth expressive reading by Year 4–6
- Warning signs: reading word-by-word beyond Year 1, ignoring punctuation, losing meaning because all effort goes to decoding
- Activities: paired reading, repeated reading of favourite books, echo reading, reader's theatre
- Assessment: running records, WCPM (words correct per minute) benchmarks, expression/prosody rubrics

**Vocabulary (Skill 4):**
- Definition: understanding words (receptive) and using them (expressive) — breadth and depth of word knowledge
- Expectations: from 2,000-word vocabulary in preschool to understanding figurative and subject-specific language by Year 6
- Warning signs: limited vocabulary for age, difficulty explaining ideas, not understanding instructions, avoiding reading because too many unknown words
- Activities: word-rich conversations, reading aloud and discussing new words, word maps, word-of-the-day
- Assessment: PPVT (Peabody Picture Vocabulary Test), CELF vocabulary subtests, classroom vocabulary checks

**Reading Comprehension (Skill 5):**
- Definition: understanding and making meaning from what is read — goes beyond decoding individual words
- Expectations: from understanding simple picture books in preschool to inferring meaning and critically analysing texts by Year 6
- Warning signs: can read words but can't retell what happened, doesn't make predictions, struggles with "why" and "how" questions
- Activities: asking questions before/during/after reading, retelling stories, making predictions, connecting books to own life
- Assessment: PAT Reading (ACER), NAPLAN reading component, classroom comprehension tasks, retelling rubrics

**Spelling (Skill 6):**
- Definition: understanding the relationships between sounds and letters/letter patterns and applying them in writing
- Expectations: from invented spelling in Foundation to conventional spelling with complex patterns by Year 6
- Warning signs: spelling the same word differently each time, not applying taught patterns, spelling that doesn't reflect the sounds in the word
- Activities: look-say-cover-write-check, word sorts by pattern, spelling games, dictation activities
- Assessment: South Australian Spelling Test, Words Their Way spelling inventories, classroom spelling assessments

**Writing (Skill 7):**
- Definition: composing text to communicate ideas — from drawing and letter formation to structured paragraphs and narratives
- Expectations: from mark-making and drawing in preschool to planning, drafting, and editing multi-paragraph texts by Year 6
- Warning signs: avoids writing, ideas are much stronger verbally than on paper, handwriting is effortful and slow, difficulty organising thoughts in writing
- Activities: journal writing, shared writing with a parent, story starters, writing for real purposes (lists, cards, letters)
- Assessment: NAPLAN writing, teacher writing samples and rubrics, Brightpath writing assessment

**Navigation between pages:**

| Page | Previous | Next |
|------|----------|------|
| Phonics & Decoding | Phonological Awareness | Reading Fluency |
| Reading Fluency | Phonics & Decoding | Vocabulary |
| Vocabulary | Reading Fluency | Reading Comprehension |
| Reading Comprehension | Vocabulary | Spelling |
| Spelling | Reading Comprehension | Writing |
| Writing | Spelling | (disabled) |

- [ ] **Step 1: Create `literacy-guide/phonics-and-decoding.html`**

Follow the exact structure from Task 4's phonological awareness page. Use the content requirements above. Set the hero label to "Skill 2 of 7", update breadcrumb, title, meta description, and topic nav links.

- [ ] **Step 2: Create `literacy-guide/reading-fluency.html`**

Same structure. Skill 3 of 7. Content per requirements above.

- [ ] **Step 3: Create `literacy-guide/vocabulary.html`**

Same structure. Skill 4 of 7. Content per requirements above.

- [ ] **Step 4: Create `literacy-guide/reading-comprehension.html`**

Same structure. Skill 5 of 7. Content per requirements above.

- [ ] **Step 5: Create `literacy-guide/spelling.html`**

Same structure. Skill 6 of 7. Content per requirements above.

- [ ] **Step 6: Create `literacy-guide/writing.html`**

Same structure. Skill 7 of 7. Content per requirements above. Next link is disabled.

- [ ] **Step 7: Open each page in browser and verify navigation links work between all pages**

```bash
open "literacy-guide/phonics-and-decoding.html"
```

Click through prev/next on each page to verify the chain is complete.

- [ ] **Step 8: Commit**

```bash
git add literacy-guide/
git commit -m "feat: add 6 remaining topic pages with Australian norms content"
```

---

### Task 6: Link from Resources Page

**Files:**
- Modify: `our-resources.html`

- [ ] **Step 1: Add literacy guide card to the resources grid in `our-resources.html`**

Find the closing `</div>` of the grid (after the "Supporting Your Child at Home" card) and add a new card before it:

```html
        <div class="card-service reveal-text delay-4" style="padding: 2.5rem; grid-column: span 2;">
          <span style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); background: var(--coral-10); color: var(--charcoal-70); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem;">For Parents</span>
          <h4 style="margin-bottom: 0.75rem;">A Parent's Guide to Literacy</h4>
          <p style="color: var(--charcoal-70);">Understand the 7 core literacy skills, what's typical at each age from preschool to Year 6, and practical activities you can do at home to support your child.</p>
          <a href="literacy-guide.html" style="display: inline-flex; align-items: center; gap: 0.25rem; font-weight: 700; color: var(--coral); margin-top: 1rem;">Explore the guide <span class="material-symbols-outlined" style="font-size: 1.125rem;">arrow_forward</span></a>
        </div>
```

- [ ] **Step 2: Commit**

```bash
git add our-resources.html
git commit -m "feat: add literacy guide link card to resources page"
```

---

### Task 7: Final Verification

- [ ] **Step 1: Open the hub page and click through all 7 topics**

```bash
open "literacy-guide.html"
```

Verify:
- Hub page loads with 7 cards
- Each card links to the correct topic page
- Each topic page has all 5 sections
- Tabs switch correctly for age expectations and warning signs
- Flip cards flip on click
- Prev/next navigation works across all 7 pages
- Breadcrumbs are correct on all pages
- Mobile responsive (resize browser to test)
- Resources page links to the hub

- [ ] **Step 2: Commit all remaining changes (if any fixes were needed)**

```bash
git add -A
git commit -m "fix: final adjustments to literacy guide pages"
```
