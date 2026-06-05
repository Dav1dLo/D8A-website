// The D8A agent cast — each is rendered as a friendly "little person" character.
// Avatars are generated with DiceBear (external avatar engine, "adventurer" style)
// using the `seed` below, then animated with framer-motion.

export type Agent = {
  id: string;
  name: string;
  role: string;
  tagline: string;
  /** DiceBear seed — deterministic, so the same face is generated every render. */
  seed: string;
  /** Brand accent for this character (hex). */
  color: string;
  /** Soft background tint for cards (hex). */
  tint: string;
  emoji: string;
  skills: string[];
};

export const AGENTS: Agent[] = [
  {
    id: "spec",
    name: "Speca",
    role: "Spec Writer",
    tagline: "I turn vague requests into precise specifications.",
    seed: "Speca-d8a-spec-writer",
    color: "#6366f1",
    tint: "#eef0ff",
    emoji: "📝",
    skills: [
      "Natural-language data requests",
      "AI-guided clarifying questions",
      "Auto-generated specs with tasks",
      "Linked to your architecture",
    ],
  },
  {
    id: "archie",
    name: "Archie",
    role: "Blueprint Architect",
    tagline: "I keep every line of code true to your architecture.",
    seed: "Archie-d8a-architect-blue",
    color: "#0ea5e9",
    tint: "#e6f6fe",
    emoji: "📐",
    skills: [
      "Visual data-flow canvas",
      "Reusable processing patterns",
      "Code that matches YOUR standards",
      "Best-practice template marketplace",
    ],
  },
  {
    id: "cody",
    name: "Cody",
    role: "AI Coding Agent",
    tagline: "I write code that follows your patterns — not generic templates.",
    seed: "Cody-d8a-coding-violet",
    color: "#8b5cf6",
    tint: "#f1ecfe",
    emoji: "🧑‍💻",
    skills: [
      "Generates code from specs + patterns",
      "Commits straight to a branch",
      "Inline editing assistant",
      "Jupyter notebook support",
    ],
  },
  {
    id: "ravi",
    name: "Ravi",
    role: "AI Review Agent",
    tagline: "I check every line against your specs and patterns.",
    seed: "Ravi-d8a-review-emerald",
    color: "#10b981",
    tint: "#e7faf2",
    emoji: "🔍",
    skills: [
      "Validates code against specs",
      "Bidirectional spec ↔ code checks",
      "Catches drift early",
      "Full audit trail",
    ],
  },
  {
    id: "margo",
    name: "Margo",
    role: "AI Merge Agent",
    tagline: "I handle branch merging and conflict resolution.",
    seed: "Margo-d8a-merge-amber",
    color: "#f59e0b",
    tint: "#fef3e2",
    emoji: "🔀",
    skills: [
      "Git-native branch merging",
      "Smart conflict resolution",
      "Optional GitHub sync",
      "Human override anytime",
    ],
  },
  {
    id: "scout",
    name: "Scout",
    role: "Discovery Agent",
    tagline: "I surface the high-value use cases you're missing.",
    seed: "Scout-d8a-discover-orange",
    color: "#f97316",
    tint: "#feefe3",
    emoji: "🔭",
    skills: [
      "Scans your real tables & patterns",
      "Scores feasibility vs. impact",
      "Strategy-aligned suggestions",
      "One click turns it into a spec",
    ],
  },
  {
    id: "quill",
    name: "Quill",
    role: "Context Keeper",
    tagline: "I maintain living docs for every table, model, and pattern.",
    seed: "Quill-d8a-context-rose",
    color: "#ec4899",
    tint: "#fdebf4",
    emoji: "📚",
    skills: [
      "Living spec per table & model",
      "Drafted from your live schema",
      "Curated & approved by your team",
      "One source of truth for the AI",
    ],
  },
  {
    id: "sage",
    name: "Sage",
    role: "Governance Guard",
    tagline: "I keep access, roles, and your data safe.",
    seed: "Sage-d8a-governance-teal",
    color: "#14b8a6",
    tint: "#e4f8f5",
    emoji: "🛡️",
    skills: [
      "Org, workspace & granular roles",
      "Enterprise SSO ready",
      "100% local semantic search",
      "No training on your data",
    ],
  },
];
