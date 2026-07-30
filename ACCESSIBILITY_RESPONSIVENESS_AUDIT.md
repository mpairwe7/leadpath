# LeadPath — Accessibility & Responsiveness Audit

**Audit date**: 30 July 2026
**Scope**: all 13 routes, light and dark themes, 320px–1920px
**Verified against**: the production build (`pnpm build` + `pnpm start`), not the dev server

---

## How this was measured

Every number below came from running the site, not from reading the source. The
harness is reproducible:

| Tool | What it checked |
|---|---|
| axe-core 4.12.1 (Playwright) | WCAG 2.0/2.1/2.2 A + AA rules and best-practice rules, 13 pages × 4 configurations (light/dark × mobile/desktop) |
| Chrome DevTools Protocol `Accessibility.getFullAXTree` | landmark roles as the accessibility tree actually exposes them |
| Custom nesting-aware contrast checker | every text node against its resolved ancestor background, including alpha blends and gradient stops, in both themes |
| Playwright, 6 viewports | horizontal overflow at 320 / 390 / 412 / 768 / 1280 / 1920 |
| Playwright, real `Tab` keypresses | focus indicators, Escape handling, skip-link behaviour |
| Playwright, landscape viewports | menu reachability at 667×375, 844×390, 320×480 |

Two caveats about method, so the results are not over-read:

- **Target size** is evaluated against WCAG 2.5.8 (AA, 24×24 CSS px) *with* the
  inline and spacing exceptions applied. A naive "everything must be 44px" count
  reports dozens of false failures; the 44px figure is Apple HIG / Material
  guidance, not a WCAG AA requirement.
- **Programmatic `.focus()` does not reliably trigger `:focus-visible`.** Focus
  indicators must be tested with real keypresses or the result is a false
  negative. This audit uses real `Tab` presses.

---

## Result

```
axe-core, 13 pages × 4 configurations ........ 0 violations
Contrast, light theme ........................ 0 failures
Contrast, dark theme ......................... 0 failures
Landmarks (main/navigation/contentinfo) ...... 13/13
Heading order (one h1, no skipped levels) .... 13/13
Skip link (first stop, visible, moves focus).. 13/13
Horizontal overflow, 13 pages × 6 viewports .. 78/78 clean
WCAG 2.5.8 target size ....................... 13/13 (0 real failures)
Focus indicators ............................. 25/25 tab stops
Mobile menu reachability ..................... 5/5 viewports
Production build ............................. passes
```

---

## What was fixed on 30 July 2026

### Phase 1 — WCAG Level A and blocking mobile defects

**Mobile menu was unusable in landscape.** The open panel is 595px tall inside a
`position: fixed` nav with `overflow-y: visible`. On 667×375, 844×390 and
320×480 the lower items sat below the fold, and because the nav is fixed,
scrolling the page did not reveal them — verified by scrolling 400px and
re-measuring (the last link stayed at bottom=570). The Donate CTA, the primary
conversion action, was unreachable on any phone held sideways.
Fixed with `max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain`.
Now reachable at 5/5 viewports.

**Two `<select>` elements had no accessible name** (axe *critical*, WCAG 4.1.2).
`/get-involved` used a hand-rolled form where all six labels lacked `htmlFor`
and all six controls lacked `id`. The inputs escaped detection only because a
`placeholder` supplied a fallback name — fragile, and it disappears on typing
(WCAG 3.3.2). All six are now properly associated; 17/17 labels site-wide.

**`contentinfo` landmark was missing on every page.** `<Navbar>` and `<Footer>`
rendered *inside* `<main>`. Per HTML-AAM a `<footer>` descended from `<main>`
does not map to `contentinfo`, so landmark navigation could not reach the
footer — confirmed in the accessibility tree, which exposed only `main` and
`navigation`. `Navbar`/`main`/`Footer` now live in `app/layout.tsx` as
siblings; the 13 pages return fragments.

**No skip link** (WCAG 2.4.1, Level A). The first tab stop was the logo, and
keyboard users traversed 8+ navigation stops on every page before reaching
content. A skip link is now the first stop on all 13 pages.

**Horizontal scroll at 320px** (WCAG 1.4.10 Reflow) on the home page —
`scrollWidth` 347 vs 320. Traced to the `shrink-0` status badge in
`ProgramCard` beside a non-shrinking title group. Fixed with `min-w-0` and
`flex-wrap`.

### Phase 2 — WCAG AA

| Item | Before | After |
|---|---|---|
| Pillar numerals (`text-accent-ink/70` on white) | 3.00:1 | **5.38:1** |
| Status badge (`success-ink` on its own 10% tint) | 4.39:1 | **6.22:1** |

The badge was fixed by moving the light-theme `--success-ink` token from
lime-700 to lime-800. The token is theme-scoped, so the dark value (`#a3e635`)
is unchanged.

**Escape now closes both disclosures** and returns focus to the trigger, per
the WAI-ARIA disclosure pattern. Previously neither the mobile menu nor the
desktop Programmes dropdown responded to Escape, and the dropdown closed only
on outside *mousedown* — so tabbing away left it open. It now also closes on
focus-out.

**Heading order.** `/contact`, `/credits` and `/donate/thank-you` jumped h1→h3.
The latter two inherited the skip entirely from the footer's `<h3>`; the footer
now uses h2/h3. `/contact` gained an `sr-only` h2 naming its contact-method
section.

### Phase 3 — Polish to current platform guidance

- **`prefers-reduced-motion` is now honoured.** Under `reduce`, elements with
  motion went from **64 to 0** and the longest duration from **300ms to 0ms**.
  Previously only two components opted in and `globals.css` had no media block.
- **Touch targets**: menu toggle 40→**44px**, form fields 42→**46px**,
  theme-switcher buttons 28→**36px**.
- **`autocomplete`** added to all 9 identity fields across the three forms
  (WCAG 1.3.5).
- **Form success states** are now `role="status"` and receive focus. Previously
  the confirmation replaced the form, dropping focus to `<body>` with nothing
  announced.

---

## Known remaining items

Stated explicitly rather than scored away:

- **Theme-switcher buttons are 36px, not 44px.** Reaching 44 would make the
  three-segment control ~140px wide and risked reintroducing the 320px navbar
  overflow. They pass WCAG 2.5.8 AA via the spacing exception.
- **Footer links are ~20px tall**, unchanged. They also pass 2.5.8 via the
  spacing exception (32px pitch), but they are below platform guidance.
- **Body scroll is not locked** behind the open mobile menu. `overscroll-contain`
  prevents scroll chaining, which covers the practical case.

## Not covered by this audit

This audit makes no claim about:

- **Real-device or real-assistive-technology testing.** Everything here is
  headless Chromium. No VoiceOver, NVDA, JAWS or TalkBack session was run, and
  automated tooling catches only a portion of real barriers.
- **Cross-browser behaviour.** Firefox and WebKit were not exercised.
- **Core Web Vitals, Lighthouse scores, or any performance metric.** None were
  measured, so none are reported.

Automated conformance is a floor, not a certification. The site passes the rule
sets named above at the date given; that is the whole of the claim.

---

## Build-cache caveat for anyone re-running this

CSS edits to `app/globals.css` compile but are **not reliably served** by the
running dev server — custom-property changes in particular. During this audit a
token change appeared correct in source while the browser still served the old
value, which produced a misleading verification result twice.

Before trusting any CSS-related measurement, stop the server, `rm -rf .next`,
and restart. Note that `pkill -f "next dev"` will match its own shell and kill
it mid-command; kill by PID instead.
