export const WAITLIST_COUNT = 41;

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Teams", href: "#for-teams" },
  { label: "FAQ", href: "#faq" },
] as const;

export const HERO = {
  eyebrow: "Early access \u2014 limited spots available",
  headline: "The Data Operating Model Workspace.\nFull lifecycle. AI + Humans.",
  subheadlineLead: "Stop drowning in data.\nStart shipping data.",
  subheadline:
    "D8A.pro is the Data Operating model workspace. Context is the new king. Architecture drives code. Turning vague requests into precise specifications. Specifications are the new code. AI Generated, Human curated.",
  ctaLabel: "Join the Waitlist \u2192",
  socialProof: `Join ${WAITLIST_COUNT} data leaders already on the waitlist`,
  trustBadges: [
    { icon: "Lock", label: "No credit card required" },
    { icon: "Mail", label: "Work email only" },
    { icon: "Rocket", label: "First access when we launch" },
  ],
} as const;

export const PLATFORM_LOGOS = [
  "Snowflake",
  "Databricks",
  "Azure",
  "dbt",
  "Power BI",
  "Microsoft Fabric",
] as const;

export const PROBLEM_CARDS = [
  {
    icon: "RefreshCw",
    title: "Endless handoffs",
    description:
      "A single data request passes through 5+ tools and 3+ people before a line of code is written. Context is lost at every handoff.",
  },
  {
    icon: "ClipboardList",
    title: "Tribal knowledge",
    description:
      "Your best patterns live in senior engineers\u2019 heads. When they leave, the knowledge leaves with them. New hires reinvent the wheel.",
  },
  {
    icon: "Clock",
    title: "Slow time-to-delivery",
    description:
      "Business users wait weeks for data they need today. Your backlog grows faster than your team can deliver.",
  },
] as const;

export const SOLUTION_BLOCKS = [
  {
    step: "01",
    heading: "Context is the new king",
    body: "AI is only as good as the context you give it. D8A.pro captures a living specification for every table, model, and pattern in your platform — drafted by AI from your live schema and lineage, then curated by your team. With clear architecture patterns and well-defined business requirements as ground truth, this shared context aligns every step that follows.",
    bullets: [
      "AI generated: specs inferred automatically from your real tables, types, and lineage",
      "Human curated: your team reviews, corrects, and approves — context you can trust",
      "Strongest when architecture patterns and business requirements are explicit",
      "One source of truth that keeps specs, code, review, and discovery aligned",
    ],
    demoType: "context" as const,
  },
  {
    step: "02",
    heading: "Your architecture drives the code",
    body: "Define your data platform\u2019s layers, technologies, and patterns once in the Blueprint. Every piece of generated code follows your standards \u2014 because the AI reads your playbook, not a generic one.",
    bullets: [
      "Visual data flow canvas (sources \u2192 layers \u2192 semantic models)",
      "Reusable data processing patterns with code examples",
      "AI generates code matching YOUR patterns, not generic templates",
      "Marketplace of best-practice templates to get started fast",
    ],
    demoType: "blueprint" as const,
  },
  {
    step: "03",
    heading: "Turn vague requests into precise specifications",
    body: "Business users describe what they need in plain language. The AI conducts a structured interview, asks the right questions, and produces a complete technical specification \u2014 linked to your data architecture and existing patterns.",
    bullets: [
      "Natural language data requests",
      "AI-guided conversation with clarifying questions",
      "Auto-generated spec with tasks, linked to your architecture",
      "Lands on the Kanban board ready for the next step",
    ],
    demoType: "chat" as const,
  },
  {
    step: "04",
    heading: "Specs and code that never drift apart",
    body: "Edit a specification \u2014 AI proposes the code changes. Edit the code \u2014 AI updates the spec to match. Every save runs validation. No more specs that lie about what the code actually does.",
    bullets: [
      "Bidirectional spec \u2194 code validation on every save",
      "AI-powered inline editing assistant per pane",
      "Version history with full audit trail",
      "Jupyter notebook support with real compute connections",
    ],
    demoType: "editor" as const,
  },
  {
    step: "05",
    heading: "Automate every step \u2014 or just the ones you choose",
    body: "Each Kanban column has an automation toggle: let the AI agent handle it fully, have the agent work with human validation, or keep it manual. Mix and match per column, per work item.",
    bullets: [
      "AI Coding: generates code from specs + patterns, commits to branch",
      "AI Review: validates code against specs and patterns",
      "AI Merge: handles branch merging with conflict resolution",
      "Human override: step in at any point, on any work item",
    ],
    demoType: "kanban" as const,
  },
  {
    step: "06",
    heading: "Discover the use cases you’re missing",
    body: "D8A.pro reads your live data architecture and surfaces high-value use cases you haven’t built yet — ranked by business impact and feasibility, and filtered to what fits your data strategy and your role. One click turns a suggestion into a spec with tasks.",
    bullets: [
      "AI scans your real tables and patterns to find untapped opportunities",
      "Every suggestion is scored on feasibility vs. business impact",
      "Strategy-aligned: only surfaces what advances your data strategy",
      "Role-aware: tailored to what you own — view & edit strategy and role anytime",
    ],
    demoType: "discover" as const,
  },
] as const;

export const FEATURES = [
  {
    icon: "MessageSquare",
    title: "Launch Data Requests",
    description:
      "Natural language interface for business users to request data assets. AI guides the conversation and creates specs.",
  },
  {
    icon: "Map",
    title: "Blueprint Canvas",
    description:
      "Visual editor for your data architecture \u2014 sources, layers, patterns, technologies. Drag, connect, define.",
  },
  {
    icon: "FileCode",
    title: "Specifications & Code",
    description:
      "Split-pane editor with bidirectional AI validation. Specs and code stay in sync. Version history built in.",
  },
  {
    icon: "Columns3",
    title: "Kanban Board",
    description:
      "Track work items from request to production. Configurable automation per column. Full audit trail.",
  },
  {
    icon: "Bot",
    title: "AI Agents",
    description:
      "Agents that code, review, and merge \u2014 following your patterns and standards. Human-in-the-loop at any step.",
  },
  {
    icon: "Store",
    title: "Best Practice Marketplace",
    description:
      "Curated data engineering templates \u2014 SCD Type 2, Star Schema, Data Vault, and more. Import in one click.",
  },
  {
    icon: "GitBranch",
    title: "Git-Native Workflows",
    description:
      "Every workspace backed by Git. Branching, PRs, diffs, merge. Optional GitHub sync.",
  },
  {
    icon: "Search",
    title: "Semantic Code Search",
    description:
      "Find anything across your workspace by meaning, not just keywords. Powered by local-first AI search.",
  },
  {
    icon: "Shield",
    title: "Role-Based Access",
    description:
      "Organizations, workspaces, and granular roles. From data requestors to full-stack POs to admins.",
  },
] as const;

export const PERSONAS = [
  {
    title: "Data Leaders",
    subtitle: "Head of Data / VP",
    heading: "See the full picture",
    bullets: [
      "Real-time Kanban visibility across all data work",
      "AI-suggested use cases surface opportunities you\u2019re missing",
      "Configurable automation levels \u2014 decide how much AI involvement",
      "Full audit trail from request to production",
    ],
    icon: "Crown",
  },
  {
    title: "Data Engineers",
    subtitle: "Full Stack PO / Admin",
    heading: "Ship faster, with higher quality",
    bullets: [
      "AI generates code from YOUR patterns \u2014 not generic templates",
      "Bidirectional spec-code validation catches drift early",
      "Blueprint ensures architectural consistency across the team",
      "Git-native: clone, branch, PR, merge \u2014 your workflow, enhanced",
    ],
    icon: "Code",
  },
  {
    title: "Business Users",
    subtitle: "Requestors",
    heading: "Get the data you need, faster",
    bullets: [
      "Describe what you need in plain language",
      "AI asks the right questions to build a complete request",
      "Track your requests on the Kanban board",
      "No more waiting weeks for a vague ticket response",
    ],
    icon: "Users",
  },
] as const;

export const STATS = [
  {
    value: "5+",
    label: "tools per workflow",
    description:
      "The average data request touches Jira, Confluence, GitHub, Slack, and more before a line is written.",
  },
  {
    value: "60%",
    label: "time on process",
    description:
      "Your best engineers spend more time on process than actual engineering work.",
  },
  {
    value: "3x",
    label: "faster with D8A.pro",
    description:
      "Teams using integrated DataOps workspaces ship data assets 3x faster.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What is D8A.pro?",
    answer:
      'D8A.pro (pronounced "data pro") is a DataOps workspace platform that manages the full lifecycle of data engineering work \u2014 from business users requesting data, through AI-assisted specification writing, code generation, review, and merge. It\u2019s one workspace replacing the patchwork of Jira, Confluence, GitHub, and Slack.',
  },
  {
    question: "How does the AI work? Does it replace my engineers?",
    answer:
      "No \u2014 D8A.pro augments your team, it doesn\u2019t replace them. AI agents follow YOUR patterns and standards (defined in the Blueprint) to draft code, review it, and handle merges. At every step, you choose the level of automation: fully autonomous, AI with human validation, or fully manual. Your engineers stay in the loop.",
  },
  {
    question: "What data platforms do you support?",
    answer:
      "D8A.pro connects to Azure SQL DB, Databricks, Power BI, Microsoft Fabric Warehouse, and Microsoft Fabric Lakehouse. The Blueprint and pattern system is platform-agnostic \u2014 your architecture, your rules.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your workspace code and specifications live in a dedicated Git repository (Gitea). Semantic search runs 100% locally \u2014 no code leaves your environment. LLM calls go through OpenRouter with no training on your data. Enterprise SSO and role-based access control are built in.",
  },
  {
    question: 'What does "waitlist" mean? When will I get access?',
    answer:
      "We\u2019re currently in private development. Waitlist members will get early access invitations in batches. Early access members get: a free trial period, direct access to the founding team for feedback, and the opportunity to shape the product roadmap. Joining is free and non-binding.",
  },
  {
    question: "Is D8A.pro open source?",
    answer:
      "Not currently. D8A.pro is a commercial SaaS platform.",
  },
  {
    question: "Can I self-host D8A.pro?",
    answer:
      "Self-hosting is not available in the initial release. We\u2019re evaluating self-hosted options for enterprise customers.",
  },
  {
    question:
      "How is D8A.pro different from just using GitHub Copilot / Cursor with our existing tools?",
    answer:
      "AI coding assistants help individual developers write code faster. D8A.pro manages the entire data engineering lifecycle \u2014 from a business user\u2019s request through specification, code generation, review, and merge. The AI doesn\u2019t just write code; it follows your specific data processing patterns, validates against your architecture, and manages the workflow. It\u2019s the difference between an AI autocomplete and an AI team member that understands your data platform.",
  },
] as const;

export const FOUNDER = {
  name: "David Loos",
  title: "Founder & CEO",
  years: 18,
  quote:
    "I\u2019ve spent 18 years delivering analytics outcomes, not just building platforms. The hard part was never the technology, it was the operating model to turn strategy into insight.\n\nD8A.pro is the analytics operating model I always wished existed: it runs the loop end to end, and once an outcome lands, proposes the next one that\u2019s right for you.",
  linkedin: "https://www.linkedin.com/in/loosdavid/",
} as const;

export const WHY_NOW = {
  headline: "AI changed everything \u2014 except your data team\u2019s workflow",
  paragraphs: [
    "LLMs can write code. But your data team still uses the same process from 2018: tickets in Jira, specs in Confluence, code in GitHub, conversations in Slack. AI is a bolt-on, not a foundation.",
    "D8A.pro is built from the ground up for the AI era. Your architecture, your patterns, your standards \u2014 they\u2019re not documentation that rots in a wiki. They\u2019re the instructions your AI agents follow.",
    "We\u2019re opening early access to a small group of data teams who want to define how AI-powered DataOps actually works. If that\u2019s you, join the waitlist.",
  ],
} as const;

export const MID_CTA = {
  headline: "Ready to transform how your data team works?",
  subtext:
    "Early access members get a free trial, direct line to the founding team, and a voice in shaping the product. Don\u2019t miss your spot.",
  disclaimer:
    "Free. No credit card. We\u2019ll only email you when it\u2019s your turn.",
} as const;

export const FINAL_CTA = {
  headline: "Stop managing process. Start shipping data.",
  subtext:
    "D8A.pro brings AI-powered automation to the entire data engineering lifecycle. Join the waitlist to be among the first to try it.",
} as const;

export const FOOTER = {
  tagline: "Your AI-powered DataOps workspace",
  productLinks: [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "FAQ", href: "/#faq" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy/" },
    { label: "Terms of Service", href: "/terms/" },
    { label: "Cookie Policy", href: "/cookies/" },
  ],
} as const;
