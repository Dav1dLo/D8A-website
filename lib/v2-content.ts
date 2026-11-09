// Website V2 copy. Source: docs/value-prop.md (audited with no-fluff).
// Keep every line here backed by the brand kit or the product.

export const NAV = [
  { label: "How it works", href: "#blocks" },
  { label: "Why D8A", href: "#why" },
  { label: "FAQ", href: "#faq" },
] as const;

export const HERO = {
  eyebrow: "Early access",
  headline: "The autonomous enterprise.",
  sub: "From business request to governed action, with your team signing off at each step.",
  blocks: ["Data", "Ontology", "Intelligence", "Execution"],
} as const;

export const PROBLEM = {
  eyebrow: "Today",
  headline: "A data request takes weeks.",
  body: "It passes from the business to an analyst, an architect, an engineer, a reviewer and a release manager. Context gets lost between hand-offs. The patterns that keep your platform consistent live in a few senior heads, and generic AI coding tools don't know your architecture.",
  roles: [
    "Business owner",
    "Analyst",
    "Architect",
    "Data engineer",
    "Reviewer",
    "Release manager",
  ],
  // `lost` = the hand-off (1-based role index) at which this part of the request disappears.
  request: [
    { text: "We need better insight into why customers leave,", lost: 0 },
    { text: "split by region,", lost: 3 },
    { text: "refreshed monthly,", lost: 2 },
    { text: "from CRM and billing,", lost: 4 },
    { text: "for the retention team.", lost: 1 },
  ],
  caption: "What ships is what survived the hand-offs.",
} as const;

export const PROMISE = {
  eyebrow: "With D8A",
  statement:
    "D8A turns what your business asks for into specs, specs into code on your stack, and data into decisions and actions.",
  sub: "You approve each step before anything changes.",
} as const;

export const BLOCKS = [
  {
    n: "01",
    name: "Data",
    tagline: "Specs are the new code",
    body: "A business user describes what they need in plain language. D8A writes a reviewable spec grounded in your architecture. AI agents generate code that follows your patterns, from bronze to gold, on the platform you already run.",
    human: "Business signs off the spec, an engineer reviews the pull request, and your own CI/CD releases it.",
  },
  {
    n: "02",
    name: "Ontology",
    tagline: "Your pointer for AI",
    body: "Domains, entities, owners and lineage as one queryable model of your business. AI answers with your definitions of customer, contract or asset.",
    human: "Each domain has one named owner.",
  },
  {
    n: "03",
    name: "Intelligence",
    tagline: "What to do when",
    body: "Decision logic tied to your data and processes: rules, ML models, code or agents.",
    human: "You define the logic and the thresholds.",
  },
  {
    n: "04",
    name: "Execution",
    tagline: "Governed actions",
    body: "Actions defined on the ontology (block a customer, update a record, call an API) run only through approved, logged paths.",
    human: "Actions run with permissions and leave an audit record.",
  },
] as const;

export const GOVERNANCE = {
  label: "Governance",
  line: "Human in command: you set what runs on its own and what waits for approval.",
  detail: "Each step leaves a record of who approved what, and when.",
} as const;

export const WHY = {
  eyebrow: "Why D8A",
  headline: "Built for the platform you already have.",
  items: [
    {
      title: "Built on your architecture",
      body: "Patterns, naming and layers live in a Blueprint, and generated code is checked against it.",
    },
    {
      title: "Runs on your stack",
      body: "D8A has no engine of its own. Code lands in your Git and runs on your platform.",
    },
    {
      title: "Your data stays home",
      body: "D8A works on metadata: schemas, lineage, specs and code. Row-level data stays in your environment.",
    },
  ],
} as const;

export const PLATFORMS = [
  "Snowflake",
  "Databricks",
  "Azure",
  "dbt",
  "Power BI",
  "Microsoft Fabric",
] as const;

export const FAQ = [
  {
    q: "What can I use today?",
    a: "Spec-to-code, the Data block, is in early access as a managed workspace. Ontology, Intelligence and Execution are on the roadmap. Join the waitlist and we'll show you where each one stands.",
  },
  {
    q: "Where does my data go?",
    a: "D8A works on metadata: schemas, lineage, specs and code. Row-level data stays in your environment. Specs and generated code live in your own Git.",
  },
  {
    q: "Does it replace my engineers?",
    a: "No. It takes over hand-offs and repetitive pipeline code. Engineers review pull requests instead of hand-writing that code.",
  },
  {
    q: "Is this another data platform?",
    a: "No. D8A has no engine or compute of its own and doesn't ingest data. It generates code for the platform you run.",
  },
] as const;

export const FINAL = {
  headline: "Join the waitlist.",
  sub: "Work email only. We'll email you when your spot opens.",
} as const;
