# D8A.pro — Alternative (Sintra-inspired) landing page

A second, playful concept for the D8A.pro marketing site whose **layout is based
on [sintra.ai](https://sintra.ai)** — the "hire a crew of AI employees" pattern,
adapted to D8A.pro's DataOps story.

## View it

The page is wired into the existing Next.js app as a route:

```
npm run dev      # then open http://localhost:3000/alternative
```

It reuses the real site content (`@/lib/constants`) and the existing
`WaitlistForm`, so copy stays in sync with the main site.

## The agents as "little people"

The eight D8A agents (Speca, Archie, Cody, Ravi, Margo, Scout, Quill, Sage) are
rendered as friendly little-person characters defined in
[`data/agents.ts`](data/agents.ts).

**Animation is generated with external tools:**

- **[DiceBear](https://www.dicebear.com/)** (`@dicebear/core` + `@dicebear/collection`,
  the `adventurer` style) generates each happy face from a deterministic seed —
  see [`components/AgentAvatar.tsx`](components/AgentAvatar.tsx). Same seed →
  same character every render, so the cast is stable.
- **framer-motion** then animates them: an always-on idle float (each character
  bobs slightly out of phase), a hover hop, and entrance transitions.

All animation respects `prefers-reduced-motion`.

## Structure

```
ALTERNATIVE/
  alt.css                 # scoped styles (.alt-scope) — never leak into main site
  AlternativePage.tsx     # composes all sections
  data/agents.ts          # the agent cast
  components/
    AltNavbar.tsx
    AgentAvatar.tsx        # DiceBear + framer-motion character
  sections/
    AltHero.tsx           # headline + floating characters
    AltLogoBar.tsx        # platform marquee
    AgentRoster.tsx       # "Meet the crew" grid (centerpiece)
    AltHowItWorks.tsx     # lifecycle steps, each hosted by an agent
    AltPowerUps.tsx       # feature grid
    AltForTeams.tsx       # personas, each greeted by an agent
    AltNumbers.tsx        # stats
    AltFaq.tsx            # accordion
    AltFinalCta.tsx       # whole crew + waitlist form
    AltFooter.tsx
```

The main site (`/`) is untouched apart from three small `usePathname` guards in
`components/layout/{Navbar,Footer,MobileStickyBar}.tsx` that hide the global
chrome on the `/alternative` route so this concept gets its own navbar/footer.
```
