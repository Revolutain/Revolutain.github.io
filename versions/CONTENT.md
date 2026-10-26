# RevolutAIn site copy: rules and revision rationale

The strings themselves live in `versions/_src/pages/*.html` and `versions/_src/partials/*.html`. Every design version (02 to 05) is generated from that one source by `scripts/build-versions.mjs`, so copy cannot drift between versions. Edit the source, rebuild, and commit both. This file holds the rules the copy follows and why the round-3 revisions were made. It is not listed in `versions.json`, so it is never published.

## Rules

- Brand: **RevolutAIn**, with that capitalisation in all prose. Never "Revolutain" or "revolutain". The logo lockup is the one exception: it reproduces the reference artwork, lowercase `revolut`, bold crimson `AI`, lowercase `n`, under the two rings (`_src/partials/mark.html` and `brand.html`).
- Partners: J. Scott Fargason, James Davis, John Edward Schwartzenburg, in that order. "John Edward" is never shortened to "John".
- Bios name no employers, current or former. Degrees, LSU roles, certifications, and generic descriptions of the work are allowed. No figures (revenue, headcount, deal sizes, years).
- No prices and no geography, apart from LSU where it is part of a role.
- No invented metrics, client names, testimonials, or logos. If a claim needs a number the firm does not have, cut the claim.
- No placeholder modules. Anything a partner still has to confirm is marked with an HTML comment in the source (`<!-- Drafted ... to be confirmed by ... -->`), never with visible placeholder text.
- Headshots stay the current small files (250 and 200 px) and are shown at 220 px or less in a fixed square crop.
- Navigation is Home, Services, Training, About, Contact. There is no "Book a Call" pill; Contact is the call to action.
- Spaced hyphens only. No em dashes or en dashes.
- Plain, specific sentences. Say what happens, who does it, how long it takes, and what the client receives. If a sentence could sit on any consulting site, rewrite it or cut it.

## Structure decisions (round 3)

- Home is a launcher: hero, a "How it starts" tile with the three stages, one tile per section (Services, Training, About), and a closing CTA. It does not repeat section content.
- Services and Approach were merged into one Services page organised by the three stages: Diagnose, Build and Train, Sustain. The former "Plan" stage folds into Diagnose, because its deliverables (opportunity map, tool recommendations, 90-day plan) are the diagnostic's outputs.
- Each stage carries a facts row: how long, who is involved, how it is priced.
- Training formats are static cards, not links. The codes T-01 to T-05 are gone; the formats are named in words.
- About carries a short firm story (for partner review) and three bios, then "How we work".

## Copy revisions applied and why

| Was | Now | Why |
|---|---|---|
| "Way in" | "Where to start" on Services, "How it starts" on home | "Way in" is jargon that only makes sense once you already know the model. |
| Three competing engagement models across Services, Approach, and home | One three-stage spine | Three framings of the same offer read as indecision and forced the reader to reconcile them. |
| Training codes T-01 to T-05 | Named formats | Codes imply a catalogue the firm does not have and made the cards look clickable. |
| Punchy one-line service openers followed by run-on "Typical builds" lists | One plain sentence plus short bullets | The openers sounded generated; the lists were unreadable at card width. |
| "Design principles we publish and follow" | "How we build" | The old heading promised a published document that does not exist. |
| "Full logging" | "Every automated decision is logged" | Says what is logged and for whom. |
| "A written report of 15 to 25 pages" | Report, 60-minute readout, 90-day plan, fixed-price quotes | Page counts are a proxy for value; the deliverables are the value. |
| "Swipe or use the arrows" | Removed, with the carousel | Approach content is now laid out in full; no instruction needed. |
| Training lead paragraph | Rewritten to name the two kinds of training and the format rule (live, instructor-led, on the client's tasks) | The old lead described training in the abstract. |
| Public Cohort and "not ready to buy a build" lines | Rewritten as an open session for owners who want to see the work before committing | The old lines were apologetic and sold against the firm's own builds. |
| "Three habits" | "How we work" | "Habits" undersold commitments that are contractual (partner-led, fixed fee). |
| "Documentation is a byproduct" | "You keep the documentation" | The client's benefit, not the firm's process. |
| "keeps us at the table" | "so what we built keeps working after we leave" | The old line was about the firm's revenue; the new one is about the client's outcome. |
| "Send Message" | "Send message" | Sentence case throughout the UI. |
| "Training runs alongside, not after" repeated on three pages | Once, on Services | Repetition read as filler. |
| Long CTA paragraph on every page | Home and Contact only; other pages use the short CTA card | Each page should end with one next step, not a pitch. |
| Connect column (LinkedIn, Newsletter, Speaking), Privacy and Terms links, proof section, all "Placeholder" tags | Removed | Every one of them pointed at something that does not exist yet. Add them back when they do. |

## Still to confirm with the partners

- The firm story on About (drafted from the bios; check the LSU details and the "two of us met as professor and student" line).
- Each partner's bio and credentials line (see the HTML comments in `_src/pages/about.html`).
- The contact form is browser-only: it validates and shows a confirmation but does not send anything. It needs a form backend before launch.
- Fee wording on Services ("fixed fee", "credited against any build started within 60 days", "six-month minimum", "monthly retainer").
