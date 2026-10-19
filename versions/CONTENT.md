# Revolutain site copy (shared source for versions 02 to 05)

This file is the single source of every string used by the design versions in this directory. It is not listed in `versions.json`, so it is never published. When a string changes, change it here first, then in each version.

Rules: no prices, no geography, no invented metrics or client names. Anything a partner must supply is wrapped in square brackets and carries a visible "Placeholder" tag on the page. The brand is Revolutain. Partners are J. Scott Fargason, James Davis, and John Edward Schwartzenburg, in that order.

---

## Global

### Navigation

| Label | Long-scroll anchor (02) | Multi-page path (03 to 05) |
|---|---|---|
| Services | `#services` | `/services/` |
| Approach | `#approach` | `/approach/` |
| Training | `#training` | `/training/` |
| About | `#about` | `/about/` |
| Contact | `#contact` | `/contact/` |

Header CTA: **Book a Call** (to `#contact` or `/contact/`).

Version 02 also has a `#proof` block between Training and About; it is listed in the side rail as "Proof" but not in the header nav.

### Page titles

- Home: `Revolutain | <Version name>` (Editorial, Slate, Grid, Bento)
- Sub-pages: `Revolutain | <Version name> | <Page>` (Services, Approach, Training, About, Contact)
- Approach sub-pages (04 only): `Revolutain | Grid | Approach | 01 Diagnose` and so on

### Meta description

Revolutain helps owner-led businesses find where data and AI pay off, build what is worth building, and train the people who will use it. Partner-led, diagnostic-first, fixed-fee engagements.

### Footer

- Brand: Revolutain
- Tagline: Practical AI and data work for owner-led businesses.
- Column "Services": Operational Diagnostic, Builds, Training, Retainers (links to Services / Services / Training / Services)
- Column "Company": Approach, About, Contact
- Column "Connect": LinkedIn, Newsletter, Speaking (placeholder `#` links)
- Legal line: `© <live year> Revolutain. All rights reserved.` plus `Privacy` and `Terms` placeholder links

---

## Home

### Hero

- Status line: **Partner-led - Diagnostic-first - Fixed-fee engagements**
- Headline: **Practical AI and data work for owner-led businesses**
- Subhead: Revolutain works with owners and their teams to find where data and AI pay off, build what is worth building, and train the people who will use it.
- Primary CTA: **Book a discovery call** (Contact)
- Secondary CTA: **See how we work** (Approach)

### Three-stage overview (eyebrow: How engagements run)

Title: **Every engagement follows three stages**

| Stage | One line |
|---|---|
| Diagnose | A two-to-three-week Operational Diagnostic, led by a partner, that ends in a ranked opportunity map and fixed-price quotes. |
| Build and Train | Fixed-scope builds on your data and systems, and training for the people who will use them, together or on their own. |
| Sustain | A retainer, a fractional data and AI lead, or a governance review that keeps what was built working and keeps us at the table. |

Link: **See all services**

### Approach teaser (eyebrow: Our approach)

Title: **Four steps, with training running alongside**

Short list: 01 Diagnose, 02 Plan, 03 Build, 04 Sustain. Link: **Read the approach**

### Training teaser (eyebrow: Training)

Title: **Training that changes how people work**

Line: Five formats, from a two-hour leadership briefing to a six-week program where each participant automates one real task. Link: **See the formats**

### Proof placeholders (eyebrow: Results)

Each block wears a visible tag reading **Placeholder**.

Stats row (four cells): `[Metric]` / `[What it measures]`, repeated four times.

Logo strip (five tiles): `Client logo`.

Quote cards (three): `[Client quote placeholder]` attributed to `[Name]`, `[Title]`, `[Industry]`.

### About teaser (eyebrow: Who we are)

Title: **Three partners, one practice**

Line: A decision-science practitioner, a technology executive and educator, and an attorney and CPA. Link: **Meet the partners**

### Closing CTA

Title: **Start with a conversation**

Line: A 30-minute discovery call. We will ask about your business, listen for where the time and money go, and tell you honestly whether a diagnostic is worth it.

Button: **Book a discovery call**

---

## Services

Eyebrow: What we do

Title: **Services, organized the way engagements run**

Intro: Every relationship starts with a diagnostic. From there a client may commission a build, adopt a recommended set of tools with training for the people who will use them, or do both. The Sustain stage keeps what was built running and keeps us involved as a standing advisor.

### Stage 1: Diagnose

#### Operational Diagnostic

The diagnostic opens every relationship. It is led by a partner, priced as a fixed fee, and takes two to three weeks.

What we do:

- Interview the owner, the operations and finance leads, and two to four frontline staff
- Inventory the systems in use, where the data lives, how it moves, and what breaks
- Run a time study of the most repetitive workflows, combining self-reporting with sampled observation
- Review security and data handling: access, backups, credentials, vendor exposure

What you receive:

- A ranked opportunity map: interventions with estimated hours saved, revenue effect, cost, and risk
- A recommended set of tools matched to the processes we observed, and a plan for training the team to use them
- A written report, a 60-minute readout with the owner, and a 90-day plan
- Fixed-price quotes for the top two or three interventions

The diagnostic fee is credited against any build started within 60 days.

### Stage 2: Build and Train

#### Decision Science Builds

Turn data into decisions. Typical builds: a demand forecast, a pricing and margin analysis, a KPI framework with an executive dashboard, a customer or job profitability model, capacity and scheduling optimization, forecast-driven budgeting. We work on your existing databases, build the models in Python, and deliver dashboards with automated refresh.

#### Infrastructure and Data Platform Builds

Fix the plumbing. Typical builds: consolidating spreadsheets into a governed database; integrating point-of-sale, CRM, accounting, and scheduling systems; a reporting layer over the systems you already run; migrating away from legacy Access and Excel; backups, access control, and credential hygiene; right-sizing cloud spend.

#### Workflow Automation and LLM Integration

Remove repetitive work. Typical builds: document intake and extraction (invoices, contracts, intake forms) into structured records; voice-to-record documentation; drafting assistants grounded in your own documents; email and ticket triage; report narration; pipelines that monitor data and escalate exceptions.

Design principles we publish and follow:

- Rules first, with a language model as the fallback
- A human in the loop for anything consequential
- Provider-agnostic: the model is chosen on measured cost and accuracy
- Full logging
- Data-handling terms reviewed by counsel

#### Team Enablement

Training is part of every build and is also sold on its own. See **Training** for the five formats.

### Stage 3: Sustain

#### Continuity Retainer

Keeps what we built running and improving: monitoring, model refresh, small enhancements on banked hours, a quarterly review, priority response, and continued coaching. Six-month minimum.

#### Fractional AI and Data Leadership

For clients that need direction and not only delivery: a named partner acts as part-time head of data and AI, attending leadership meetings, owning the roadmap, vetting vendors, and overseeing any in-house staff.

#### Governance and Assurance

Drawing on the partners' legal, audit, and controls experience: AI-use policies, review of vendor and data-processing terms, controls for regulated businesses, and audits of legal-operations cost.

### Standard engagement terms (compact list)

- A master services agreement with a statement of work for each project
- Acceptance criteria written into every statement of work as measurable success metrics
- You own your deliverables and data; we retain our reusable tooling and templates
- A data-handling addendum: what data we access, where it is processed, which AI providers touch it, and how long it is retained
- A written change-order process before additional work begins

CTA: **Book a discovery call**

---

## Approach

Eyebrow: Our approach

Title: **Four steps, with training running alongside**

Intro: Each engagement moves through the same four steps. Training does not wait for the end: it runs with the diagnostic, with every build, or on its own.

Each step has the same four fields: What happens, What you receive, How long, Who is involved.

### 01 Diagnose

- What happens: We interview the owner, the operations and finance leads, and frontline staff; inventory your systems and how data moves between them; run a time study of the most repetitive workflows; and review security and data handling.
- What you receive: A written report of 15 to 25 pages.
- How long: Two to three weeks.
- Who is involved: A partner, plus the owner's operations and finance leads.

### 02 Plan

- What happens: We rank every candidate intervention by hours saved, revenue effect, cost, and risk, and match tools to the processes we observed.
- What you receive: The opportunity map, a 60-minute readout, a 90-day plan, and fixed-price quotes for the top two or three interventions.
- How long: The final week of the diagnostic.
- Who is involved: The partner and the owner.

### 03 Build

- What happens: We start from one of three reference architectures (a database-and-dashboard starter, a document-intake pipeline starter, or an integration-and-reporting starter), with acceptance criteria written into the statement of work.
- What you receive: A working system, a runbook, and a training deck produced from the same source as the build.
- How long: Fixed scope, fixed fee, agreed before work begins.
- Who is involved: Partner-led delivery with your process owner.

### 04 Sustain

- What happens: Monitoring and refresh, small enhancements on banked hours, a quarterly review, and standing advisory.
- What you receive: A system that keeps working, and a named advisor.
- How long: A six-month minimum retainer.
- Who is involved: A partner, plus your team.

### Training band

**Training runs alongside, not after:** with the diagnostic, with every build, or on its own. Link: **See the training formats**

Approach sub-page navigation (04 only): prev / next labels are the step names; the rail lists 01 to 04.

---

## Training

Eyebrow: Training

Title: **Training that changes how people work**

Intro: Training at this firm changes how people work; it is not an awareness session. It comes in two shapes: structured courses on AI and how to use it well, and tailored programs designed from time spent inside your business, studying how your teams actually work. Every format is live and instructor-led, on-site or virtual, built on your tools, your data, and your real tasks.

### Formats

| Format | Length | Audience | What happens |
|---|---|---|---|
| AI Foundations Workshop | Half day | Whole team, up to 20 people | Safe-use policy, prompting that works, your approved tools, hands-on practice on the team's real tasks |
| Role Accelerator Workshop | Full day | One function: finance, operations, sales, or legal | Function-specific workflows built live on your data and documents |
| Team Enablement Program | Six weeks, one 90-minute session per week plus office hours | 6 to 15 people | Each participant automates one real task; ends with a demo day and an internal playbook |
| Leadership Briefing | Two hours | Owners and executives | What is real, what is risk, how to govern AI use, what to fund next |
| Public Cohort Session | One evening or a half day, monthly | Mixed small-business owners | An entry-level session that leads naturally to a diagnostic |

### How training fits

- With the diagnostic: the study of how your teams work ends in a proposed tool set and training for the people who will use it.
- With every build: each build ships with a training deck produced from the same source as the system.
- On its own: for firms not ready to buy a build.

CTA: **Request a syllabus** (Contact)

---

## About

Eyebrow: Who we are

Title: **Three partners, one practice**

Firm story (visible Placeholder tag): `[Firm story placeholder: who we are, why we started, how we work with owners.]`

### Partner cards (in this order)

1. **J. Scott Fargason** - Partner - photo `assets/team/scott-fargason.jpg` - `[Bio placeholder for J. Scott Fargason: background, track record, and what it brings the firm. To be supplied by Scott.]`
2. **James Davis** - Partner - photo `assets/team/james-davis.jpg` - `[Bio placeholder for James Davis: background, track record, and what it brings the firm. To be supplied by James.]`
3. **John Edward Schwartzenburg** - Partner - photo `assets/team/john-edward-schwartzenburg.jpg` - `[Bio placeholder for John Edward Schwartzenburg: background, track record, and what it brings the firm. To be supplied by John Edward.]`

Image alt text: `Portrait of <full name>`.

### How we work (three short lines)

- Partner-led: the person you meet is the person who does the work.
- Fixed fees where scope can be defined; retainers where the relationship is continuous.
- Documentation is a byproduct: every engagement ends with a runbook and a training deck.

CTA: **Book a discovery call**

---

## Contact

Eyebrow: Let's talk

Title: **Start with a conversation**

Line: Book a 30-minute discovery call. We will ask about your business, listen for where the time and money go, and tell you honestly whether a diagnostic is worth it.

- Email: hello@revolutain.com
- Response within one business day

### Form

Fields, in order:

1. Full name (text, required) - error: Please enter your name.
2. Work email (email, required) - error: Please enter a valid email.
3. Company (text)
4. I'm interested in... (select): Operational Diagnostic; Decision Science Build; Infrastructure and Data Platform Build; Workflow Automation and LLM Integration; Training; Retainer or Fractional Leadership; Governance and Assurance; Not sure yet
5. Tell us about your goals (textarea, 4 rows)

Submit: **Send Message**

Behavior: browser-only validation, then reset and show the note **Thanks! We'll be in touch within one business day.** No backend.
