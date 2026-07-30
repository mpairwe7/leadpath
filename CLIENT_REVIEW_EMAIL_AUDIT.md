# Client Review, Imagery, and Email Delivery — Audit Trail

**Date:** July 30, 2026
**Scope:** Client-reported site issues, photo sourcing, a tracked-secret cleanup,
and email delivery for the contact/donation forms.
**Repositories:** `github.com/mpairwe7/leadpath` (origin) and
`github.com/ionatech2025/leadpath` (ionatech) — both kept in sync throughout.

This document exists so a future review can answer, without re-deriving it:
*what changed, why, what evidence was collected, and what is still open.*
Every claim below cites the commit, log line, or command output it rests on.

---

## 1. Client review fixes

**Commit:** [`a25c847`](https://github.com/mpairwe7/leadpath/commit/a25c847) —
`fix(site): apply client review — real Uganda photos, links, contacts`

Client feedback (WhatsApp screenshots, July 30) reported five issues:

| # | Issue | Fix |
|---|---|---|
| 1 | Light-skinned man visible in the hero background photo | Hero background and two other pages used `african-team-collaboration.png` (AI-generated). Replaced across the home, about, and get-involved pages. |
| 2 | `/career` → "Learn More" 404s | `app/programmes/page.tsx` derived hrefs from the category title (`"Career Development"` → `/career-development`, a route that does not exist). Root-caused and fixed. |
| 3 | Leadership cards → 404 | Same root cause as #2. |
| 4 | Entrepreneurship / Mentorship sub-cards all land on one page | 12 sub-feature cards shared 4 destination pages. Restructured: each category now has one "Explore …" button to its real route (`/career`, `/leadership`, `/entrepreneurship`, `/mentorship`); sub-feature cards no longer carry links, since they describe programme contents rather than being destinations themselves. |
| 5 | Remove far-right footer legal links if unused | Client confirmed (11:50 PM message) these could be removed. Dropped Privacy Policy / Terms of Service / Code of Conduct — they were `href="#"` (dead) — leaving only the copyright line. |

**Contacts** (footer + `/contact`) updated to the client-provided values:
`leadpath360@gmail.com`, `+256 757 223 581` (WhatsApp: `wa.me/256757223581`),
replacing placeholder `info@leadpath.org` / `+256 700 000 000`.

### Imagery sourcing

The AI-generated stock photos (`african-*.png`) were replaced with real,
openly-licensed photographs of Uganda, sourced from Wikimedia Commons
(Pexels/Unsplash blocked automated access):

| File | Depicts | License | Used on |
|---|---|---|---|
| `uganda-youth-training.jpg` | Youth training, Kawempe Youth Centre, Kampala | CC BY-SA 4.0 | Home hero |
| `uganda-training-focus.jpg` | Same session, portrait crop | CC BY-SA 4.0 | About — Our Story |
| `uganda-digital-skills.jpg` | Digital skills session, Kampala | CC BY-SA 4.0 | Get Involved hero |
| `uganda-student-portrait.jpg` | Trainee portrait, Kampala | CC BY-SA 4.0 | Contact hero |
| `uganda-graduation.jpg` | Aga Khan University Uganda, class of 2025 | CC BY 4.0 | About — Why Choose Us |
| `uganda-classroom.jpg` | Makerere University lecture hall | CC0 | Donate hero |

CC BY-SA / CC BY require attribution naming the photographer and license.
`app/credits/page.tsx` was added for this (photographer, license, link to
original, and a disclosure that these are documentary photos of Ugandan
training/university events, not LeadPath participants). Linked from the
footer.

**Known limitation, stated on `/credits` itself:** these are real Ugandan
photos but not LeadPath's own events, and were not shot with model releases
for marketing use. The site's own event photography would be strictly
better (accurate, no attribution burden, no implied-endorsement risk) and
should replace these when available.

**Not addressed (flagged, not fixed):**
- The homepage testimonial avatar (`african-team-member-1.png`, 48×48px) is
  still an AI-generated image next to an invented quote from "Grace A." It
  was deliberately left as-is — putting a real identifiable Ugandan's face
  next to words they never said would be worse than the AI placeholder.
  Needs a real member: photo, quote, and consent.
- `african-career-growth.png`, `african-team-collaboration.png`, and
  `african-team-member-2/3/4.png` are now unreferenced in `public/` but
  were not deleted (left for the client/owner to decide).

---

## 2. Remote history reconciliation

**Commit:** [`9579f5e`](https://github.com/mpairwe7/leadpath/commit/9579f5e) —
`chore: merge ionatech/main`

`ionatech/main` had diverged by one commit (`91dd5c5`, "use Scovia's real
photo") that was never pulled into `origin/main`'s `358976e` of the same
name. Diffed the two trees — **identical** (same change, committed twice
under a slightly different author-name spacing). Merged rather than
force-pushed, per this repo's established pattern (see `4060ef0`), so
neither remote's history was rewritten. Verified post-merge: `about/page.tsx`
carried both the Scovia photo change and the client-review changes; full
production build passed.

---

## 3. Security: stopped tracking `.env.production`

**Commit:** [`5cea830`](https://github.com/mpairwe7/leadpath/commit/5cea830) —
`chore: stop tracking .env.production`

`.env.production` was committed to the repo before `.env*` was added to
`.gitignore` — gitignore does not retroactively apply to already-tracked
files. A local edit had added a live Gmail app password
(`SMTP_USER`/`SMTP_PASS`) to the file, which was one `git add -A` away from
being pushed to both public-facing remotes.

**Exposure check performed before any push:**
```
git log --all -p -- .env.production | grep -icE "hmba|fqxf|SMTP_PASS"
→ 0 — the password was never committed to any branch on either remote.
```
The file was untracked (`git rm --cached`) rather than the password being
rotated, since it had not actually leaked — see §4 for why it stayed the
active credential rather than being revoked.

`.env.production` remains on disk locally (`.gitignore:17` now matches it)
for `vercel deploy`'s local build step; it is not and should not be
re-added with `git add -A`.

---

## 4. Email delivery: SMTP fallback + production wiring

**Commit:** [`d9feda1`](https://github.com/mpairwe7/leadpath/commit/d9feda1) —
`feat(email): add Gmail SMTP fallback and wire up production credentials`

### Root cause
`lib/email.ts` only ever called Resend's REST API. The `SMTP_HOST` /
`SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` values already present in
`.env.local` and `.env.production` were read by **no code path** —
`RESEND_API_KEY` was never set, so every form submission returned
`{ ok: false, reason: 'unconfigured' }` silently.

### Fix
`sendEmail()` in `lib/email.ts` now:
1. Uses Resend if `RESEND_API_KEY` is set (unchanged, preferred — a
   transactional provider avoids Gmail's sending limits and spam scoring).
2. Otherwise falls back to `nodemailer` over Gmail SMTP using the existing
   `SMTP_HOST`/`PORT`/`USER`/`PASS` credentials. Gmail requires `From` to
   match the authenticated account, so `CONTACT_FROM_EMAIL` is ignored on
   this path by design.
3. Recipient defaults to `leadpath360@gmail.com` if `CONTACT_TO_EMAIL` is
   unset, so a missing env var cannot silently misroute enquiries.

`nodemailer@9.0.3` + `@types/nodemailer` added as dependencies.

### Vercel environment variables set

Set via `vercel env add` across **Production, Preview, and Development**
(15 entries total — confirmed with `vercel env ls`):

| Variable | Value set | Sensitive |
|---|---|---|
| `SMTP_HOST` | `smtp.gmail.com` | No |
| `SMTP_PORT` | `587` | No |
| `SMTP_USER` | `mpairwelauben22@gmail.com` | Yes (Prod/Preview; Dev does not support marking sensitive) |
| `SMTP_PASS` | *(Gmail app password — not reproduced here)* | Yes (Prod/Preview) |
| `CONTACT_TO_EMAIL` | `leadpath360@gmail.com` | No |

`RESEND_API_KEY` remains unset — confirmed via `vercel env ls` immediately
before the production verification test in §5, so that test result is
attributable to the SMTP path with no ambiguity.

### Local verification (before touching Vercel)

Ran a production build (`pnpm build && pnpm start`) and POSTed a real
submission to `http://localhost:3113/api/contact`:
```
{"ok":true}
HTTP 200
```
Server log showed no errors. Confirmed the SMTP credentials actually work
*before* they were pushed to Vercel as the live configuration.

---

## 5. Production deployment and verification

This project has **no GitHub integration** — `.vercel/repo.json` links it
to project `leadpath-website-build` (`prj_BfjGQgPtD1mkNQxxhlpA3ffTHC4F`),
but deploys are triggered manually via the Vercel CLI, not by `git push`.
This means step 4's code fix did not go live on its own; a deploy was
required, and confirming email delivery required confirming *that specific
deployment* was running the fix.

**Pre-deploy check:** the most recent production deployment
(`dpl_2iYjXRdcWd1hYg3qKXgtKtxmrBcY`) was created `2026-07-30 06:41:21 UTC`,
**24 minutes before** commit `d9feda1` (`07:05:34 UTC`) — i.e. it predated
the fix. Checking logs on it would only have proven the old, broken
Resend-only path was failing.

**Deployed** (explicit user confirmation obtained first, since this affects
the live production site):
```
vercel --prod
```
Result:
- Deployment: `dpl_8FmHz9NXZ7YZXWM7zr7rSJYHbMvR`
- Status: `READY`, target `production`
- Aliased to: `https://leadpath-website-build.vercel.app`
- Created: `2026-07-30 10:24:07 +0300`
- Build: `next build` succeeded, all 20 routes generated, no TypeScript errors

**Post-deploy verification, against the live production URL:**

1. Smoke check — `/` and `/credits` both return `200`; homepage HTML
   contains the updated contact details (`leadpath360@gmail.com`,
   `wa.me/256757223581`).
2. Real submission —
   ```
   POST https://leadpath-website-build.vercel.app/api/contact
   → {"ok":true}  HTTP 200
   ```
3. Vercel runtime logs for that exact deployment:
   ```
   10:27:33.34  λ POST /api/contact   200   (no message)
   ```
   `vercel logs <deployment> --level error` returned **zero** entries. The
   SMTP failure path explicitly `console.error`s and returns HTTP 502 — a
   clean 200 with no error log is only reachable if the send succeeded.

Combined with §4's confirmation that `RESEND_API_KEY` is unset, this
result can only be explained by the Gmail SMTP fallback succeeding on the
live production deployment.

**Standing implication for future changes:** because there is no
GitHub-to-Vercel auto-deploy, `git push` alone will never update the live
site. Every future change needs an explicit `vercel --prod` (or the
project needs the GitHub integration connected in the Vercel dashboard,
which was not done here since it's a standing infrastructure change beyond
the scope of this fix).

---

## Outstanding items

- **Gmail app password**: in active use as the production credential
  (§4). Not revoked — confirmed never exposed to either GitHub remote
  (§3), and revoking now would break the delivery path this document
  verifies works. Rotate at will via
  `myaccount.google.com → Security → App passwords`, then update both
  `.env.local` and the five Vercel env var entries.
- **Sending limits**: Gmail SMTP caps around ~500 messages/day and is more
  likely to be spam-filtered than a transactional provider. Fine at
  current form volume; if it grows, set `RESEND_API_KEY` in Vercel and
  `sendEmail()` will prefer it automatically with no further code change.
- **Homepage testimonial avatar**: still AI-generated (§1).
- **Unreferenced AI images**: still present in `public/` (§1).
- **No GitHub auto-deploy**: documented above (§5) — deploys are manual.
