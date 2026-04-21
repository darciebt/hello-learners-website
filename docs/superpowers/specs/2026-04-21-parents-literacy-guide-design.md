# Design: A Parent's Guide to Literacy

## Overview

A parent-facing literacy course for the Hello Learners website — a set of pages that explain core literacy skills in plain language, what to expect at each age (using Australian norms), warning signs, and practical home activities. Linked from the Resources page.

Inspired by [IRRC Family Guide](https://glossary.irrc-learning.org/) but rewritten with original wording, Australian curriculum norms, and Hello Learners branding.

## Structure

### Hub Page

- **File:** `literacy-guide.html` (in project root, alongside other pages)
- **Content:**
  - Hero section with title "A Parent's Guide to Literacy" and intro text explaining what the guide is and who it's for
  - Card grid with all 7 topics — each card links to its topic page
  - Cards styled consistently with existing site (same card patterns used elsewhere)
- **Navigation:** Linked from the Resources page (`our-resources.html`) as a new resource card

### Topic Pages

- **Location:** `literacy-guide/` folder (7 HTML files)
- **Files:**
  - `literacy-guide/phonological-awareness.html`
  - `literacy-guide/phonics-and-decoding.html`
  - `literacy-guide/reading-fluency.html`
  - `literacy-guide/vocabulary.html`
  - `literacy-guide/reading-comprehension.html`
  - `literacy-guide/spelling.html`
  - `literacy-guide/writing.html`

### Navigation Between Pages

- Each topic page has:
  - "Back to guide" link at the top
  - Previous/Next topic links at the bottom
- Standard site nav and footer on all pages

## 7 Topics

| # | Topic | Description |
|---|-------|-------------|
| 1 | Phonological Awareness | Hearing and playing with sounds in words — rhyming, syllables, individual sounds |
| 2 | Phonics & Decoding | Connecting letters to sounds and using that to read words (includes print awareness) |
| 3 | Reading Fluency | Reading accurately, at a good pace, and with expression |
| 4 | Vocabulary | Understanding and using words — building a rich word bank through conversation and reading |
| 5 | Reading Comprehension | Understanding what you read — making meaning from text, stories, and information |
| 6 | Spelling | Recognising sound-letter patterns and applying them in writing |
| 7 | Writing | Composing sentences, paragraphs, and ideas on paper |

## Age Levels

Each topic covers expectations across 8 age levels, based on Australian/Victorian curriculum norms:

1. Preschool (3-4 years)
2. Foundation (Prep, ~5 years)
3. Year 1 (~6 years)
4. Year 2 (~7 years)
5. Year 3 (~8 years)
6. Year 4 (~9 years)
7. Year 5 (~10 years)
8. Year 6 (~11 years)

## 5 Sections Per Topic Page

### 1. What is it?

- Plain-language definition of the skill
- Why it matters for reading and learning
- How it connects to other literacy skills
- Written in Darcie's warm, approachable voice — not clinical

### 2. What to expect at each age

- Interactive tabs or accordion for each age level (Preschool → Year 6)
- Each tab shows what's typical/expected at that age
- Based on Australian norms and Victorian Curriculum expectations
- Parent-friendly language — no jargon

### 3. When to be concerned

- Red flags / warning signs at each age level
- Framed gently — "You might want to seek support if..."
- **CTA at the bottom of this section only:** A gentle prompt linking to the enrol page, e.g. "If any of this sounds like your child, we'd love to help."
- This is the only section with a CTA — the rest of the content remains purely educational

### 4. Activities to try at home

- Practical strategies parents can do at home
- Grouped by age level
- Presented as flip cards (front: activity name, back: how to do it)
- Activities should feel natural, not like homework

### 5. How it's assessed

- What teachers and speech pathologists look for
- Common assessments used in Australian schools
- Helps parents understand school reports and assessment terminology

## Styling

- Matches existing Hello Learners site styling (same CSS, nav, footer, fonts, colours)
- Uses existing brand colour palette (coral, sky blue, mauve, marigold, sand)
- Tab/accordion components for age levels — consistent with FAQ accordion pattern already in the site
- Flip card components for home activities
- Responsive design matching existing pages

## Integration with Resources Page

- Add a new card to `our-resources.html` in the "Guides & Articles" grid
- Card label: "For Parents"
- Card title: "A Parent's Guide to Literacy"
- Card description: "Understand the core literacy skills, what's typical at each age, and what you can do at home to help."
- Links to `literacy-guide.html`

## SEO Considerations

- Each topic page has its own title tag and meta description targeting Australian parents searching for literacy information
- Example title: "Phonological Awareness — What to Expect | Hello Learners"
- Example meta: "What is phonological awareness? Learn what's typical from preschool to Year 6, warning signs to watch for, and activities to try at home."

## Content Sources for Australian Norms

- Victorian Curriculum F-10 (English — Reading and Viewing, Writing)
- Australian Curriculum v9 (English)
- Speech Pathology Australia position statements and resources
- Evidence-based literacy research (Science of Reading)

## Out of Scope

- Video content or embedded media
- User accounts or progress tracking
- Interactive quizzes or assessments
- Email gating — all content is freely accessible
