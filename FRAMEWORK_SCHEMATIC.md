# D8A Data Operating Model — Framework Schematic

> Single source of truth for the framework visual. Every decision below is locked.
> Implementation target: `framer-motion`-animated **SVG React components** (live on site + exportable to static SVG/PNG for decks).

---

## 0. The thesis

**Context is king.** Everyone has data; few have *context*. Context is the wedge and the moat
(the **context lake** + **context owners**). Two supporting acts cash it in:

- **Act 1 — Thesis:** Context is king — and we manufacture it automatically.
- **Act 2:** Context → architecture → spec. A governed, marketplace-fed system. *("Architecture drives the code.")*
- **Act 3:** Spec → code → agents → action → new data. The loop closes. *("Spec is the new code.")*

---

## 1. Deliverable shape

A **system of two linked diagrams**, not one all-in-one image:

1. **Hero** — the model as a circular loop (nested rings).
2. **Detail** — the same loop *unrolled* into a process flow with stations + role lanes.

No third diagram. The detail is the hero unrolled.

---

## 2. Color & style

- **Palette:** fully monochrome — uses existing brand grays
  (`--black #111827` → `--light-muted #9ca3af`, borders `#e5e7eb`, bg `#f9fafb`).
- **One accent, reserved for CONTEXT only.** Context is the thesis, so it earns the sole color.
  Nothing else in the diagram is colored. *(Accent hue: TBD — pick during build.)*
- Visual register: minimal, technical, lots of whitespace — matches current site demos.

---

## 3. The Hero — nested-ring loop

**Concept:** one operating-model core, three value phases spinning around it.

### Center → outward (nested rings):

| Ring | Element | Meaning |
|------|---------|---------|
| Core | **Data** | The thing in the middle of everything. |
| Ring 1 (accent) | **Context** | The first layer that touches data — turns raw → meaningful. *Thesis, made geometric.* |
| Ring 2 | **People · Process · Technology** | The operating model. One shared core (not repeated per phase). |
| Outer arc | **3 phases** | Centralize → Contextualize → Capitalize, arcing around the core. |

### The loop (outer):
- **Starts at Centralize.** Raw sources flow *in* to Centralize — **no named on-ramp**
  ("Capture" is dropped entirely; the word does not appear).
- **Centralize → Contextualize → Capitalize**, then returns.
- **Two return flows** close the circle (see §6).

### Foundation:
- A **foundation plate beneath the entire circle** = the **Architecture substrate** (see §5).
  The loop literally stands on it.

---

## 4. The Detail — loop unrolled

The hero circle cut open and laid flat as a left→right process flow.

### 4a. Six stations (the differentiators ARE the loop positions)

| # | Station | Phase position | What it is |
|---|---------|----------------|-----------|
| 1 | **Context lake** | Contextualize (heart) | Auto-generated context, governed by context owners. |
| 2 | **Analyst questioning** | Contextualize → spec | "What data do we have? What's a good use case?" Build data models / specs. |
| 3 | **Spec ↔ code, no drift** | entry to Capitalize | "Spec is the new code." Spec and code never drift apart. |
| 4 | **Automated delivery** | Capitalize | Kanban request→delivery. AI codes / reviews / merges — human-in-the-loop. |
| 5 | **Mechanical return** | Capitalize → Centralize | Actions generate new data → re-centralize (automatic). |
| 6 | **Strategic companion** | outer return | Data strategy scans the loop, spots gaps, injects new requirements. |

> Architecture (context/spec/coding instructions + marketplace) is **not** a station —
> it is the **substrate under all of them** (§5).

### 4b. Fractal zoom
One phase node can be **zoomed open** to reveal its own internal **People · Process · Technology + Data**
— proving the operating model is fractal (same shape at every level).

### 4c. Two weaving role lanes
Beneath the unrolled loop, two horizontal lanes:

```
HUMAN  ─●────────────●───────●──  (validation / planning / approval gates)
            ╲      ╱     ╲   ╱
AGENT  ──────●────────●────●─────  (generation / coding / review / action)
```

- Each station has a dot in **Human**, **Agent**, or both.
- The path **weaves between lanes** — visibly crossing back to Human at merge/approval gates.
  This is the "AI can code, review, even merge — but always human-in-the-loop" proof.

**Role assignments per handoff:**

| Activity | Human role | Agent equivalent |
|----------|-----------|------------------|
| Use cases | Data analyst | Agentic data analyst |
| Agent spec (co-create) | Data analyst *(validates)* | Agent |
| Planning | Product owner | — |
| Coding | Data engineer | Agentic agent |
| Insights | Analytics engineer | Auto / assisted |
| Insight → Action (translate) | Human translator | Agent translator |
| Action | Human | Agent |

---

## 5. Architecture = the foundation substrate

Not a rail, not a station — the **bedrock the whole loop stands on**. A centralized, unified truth
that drives *every* action so patterns stay consistent. Rendered as an **HTML/Tailwind panel**
beneath the circle (the circle visually rests on it), not as SVG — the nesting is too deep for
legible SVG text.

**Hierarchy:**

```
Architecture  (one unified truth that drives the code)
└─ Data Platform
   └─ Data Layer        ×3   — Bronze·raw / Silver·refined / Gold·curated
      └─ Data Pattern   ×2 per layer
         └─ agentic instructions (in order):  Spec · Code · Output · Context
```

- 3 layers × 2 patterns = 6 patterns; every pattern carries the same **four agentic instruction
  types** (Spec / Code / Output / Context), so every action follows one consistent pattern.
- Example patterns: Batch ingest, Streaming/CDC (Bronze); Cleanse & conform, History/SCD (Silver);
  Dimensional model, Aggregates & metrics (Gold).
- **Marketplace** = supply dock (pill, top-right of the panel) that stocks patterns with
  best-practice templates you pick from.
- Component: `components/framework/ArchitectureFoundation.tsx`.

---

## 6. The two return flows (what makes it a loop)

| Flow | Path | Nature |
|------|------|--------|
| **Inner — mechanical** | Action → new data → re-Centralize | Automatic data exhaust. The loop *runs itself.* |
| **Outer — strategic** | Strategy companion watches whole circle → spots gaps → injects new use-case requests at the top | Intelligent. The loop *improves itself.* |

Drawn as: a tight inner arc + a wider outer sweep with a "strategy companion" node observing the circle.

---

## 7. Build status

- [x] **Hero** — `components/framework/FrameworkLoop.tsx` (SVG, framer-motion: context-ring pulse,
      traveling data dot).
- [x] **Architecture foundation** — `components/framework/ArchitectureFoundation.tsx` (HTML/Tailwind,
      4-level hierarchy, generic labels).
- [x] **Detail** — `components/framework/FrameworkDetail.tsx` (SVG: 6 stations, two return arcs,
      weaving Human/Agent lanes, human-in-the-loop gates, traveling pulse).
- [ ] Wire stations to existing demos: `ContextDemo` (1), `ChatDemo` (2), `SplitEditorDemo` (3),
      `KanbanDemo` (4), `DiscoverDemo` (6), `BlueprintDemo` (architecture/§5).
- [ ] Integrate into `Solution.tsx` / a dedicated section (replace temp `app/framework-preview`).
- [ ] Export path for static SVG/PNG (decks).

Preview during build: `app/framework-preview/page.tsx` (temporary; remove on integration).

---

### Decision log (all agreed)
1. Deliverable = hero + detail system, SVG React, live + exportable.
2. Loop = 3 phases, starts at Centralize. "Capture" dropped, no named on-ramp.
3. Operating model = single PPT+Data core (hero); fractal zoom (detail).
4. Thesis = "Context is king"; acts = architecture drives code, spec is new code.
5. 6 differentiators = stations on unrolled loop.
6. Roles = two weaving lanes, human-in-the-loop gates visible.
7. Architecture = foundation substrate (promoted from rail); 3 pillars + marketplace dock.
8. Context lake = accent ring on data core (hero); full lake metaphor (detail).
9. Return = two flows: inner mechanical + outer strategic companion.
10. Color = monochrome; single accent reserved for context.
