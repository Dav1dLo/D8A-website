"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * D8A Data Operating Model — Detail (the loop, unrolled).
 *
 * The hero circle cut open and laid flat, left → right:
 *   Centralize → Context lake → Analyst→Spec → Spec↔Code → Automated delivery → Action
 * then two return flows curve back to Centralize (mechanical + strategic).
 *
 * The six differentiators are numbered stations on this flow. Beneath the spine,
 * two weaving lanes (Human / Agent) show who executes each step, with explicit
 * human-in-the-loop gates. See FRAMEWORK_SCHEMATIC.md §4.
 */

const BLACK = "#111827";
const DARK = "#374151";
const MEDIUM = "#4b5563";
const MUTED = "#6b7280";
const LIGHT_MUTED = "#9ca3af";
const BORDER = "#e5e7eb";
const LIGHT_BG = "#f3f4f6";
const LIGHTER_BG = "#f9fafb";

type FlowNode = {
  title: string;
  sub: string;
  owner: "agent" | "human";
  role: string;
  diff?: number;
  gate?: string;
};

const NODES: FlowNode[] = [
  { title: "Centralize", sub: "unified data", owner: "agent", role: "ingestion" },
  { title: "Context lake", sub: "auto-generated context", owner: "agent", diff: 1, gate: "context owners govern", role: "context owners" },
  { title: "Analyst → Spec", sub: "what data? what use case?", owner: "human", diff: 2, role: "data analyst / agentic" },
  { title: "Spec ↔ Code", sub: "no drift · spec is code", owner: "agent", diff: 3, gate: "validate", role: "data engineer / agent" },
  { title: "Automated delivery", sub: "Kanban · AI codes / reviews / merges", owner: "agent", diff: 4, gate: "approve merge", role: "product owner · agent" },
  { title: "Action", sub: "translate → act", owner: "human", role: "translator → action" },
];

const NODE_X = [110, 262, 414, 566, 718, 870];
const SPINE_Y = 150;
const CARD_W = 130;
const CARD_H = 52;
const HUMAN_Y = 322;
const AGENT_Y = 382;

const ownerY = (o: string) => (o === "human" ? HUMAN_Y : AGENT_Y);

function arcPath(x0: number, y0: number, x1: number, peakY: number) {
  // clean symmetric arc from (x1,y0) leftward to (x0,y0), bowing up to peakY
  const midX = (x0 + x1) / 2;
  const ctrlY = peakY - (y0 - peakY); // pull control past peak so the apex lands at peakY
  return `M ${x1} ${y0} Q ${midX} ${ctrlY} ${x0} ${y0}`;
}

export function FrameworkDetail({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 980 510"
      className={className}
      role="img"
      aria-label="The operating model unrolled: Centralize, Context lake, Analyst to Spec, Spec to Code, Automated delivery, Action — with two return flows and human/agent execution lanes."
    >
      {/* ---- phase bands ---- */}
      {[
        { label: "Centralize", x: 40, w: 146 },
        { label: "Contextualize", x: 186, w: 304 },
        { label: "Capitalize", x: 490, w: 450 },
      ].map((b) => (
        <g key={b.label}>
          <rect x={b.x} y={92} width={b.w} height={132} rx={10} fill={LIGHTER_BG} stroke={BORDER} />
          <text x={b.x + 12} y={110} fontSize={11} fontWeight={700} letterSpacing="0.08em" fill={LIGHT_MUTED}>
            {b.label.toUpperCase()}
          </text>
        </g>
      ))}

      {/* ---- return flows (arc back over the top) ---- */}
      <g fill="none">
        {/* strategic (outer) */}
        <path d={arcPath(110, 90, 870, 36)} stroke={MEDIUM} strokeWidth={1.6} markerEnd="url(#d-arrow-dark)" />
        <text x={490} y={30} fontSize={11} fontWeight={600} fill={DARK} textAnchor="middle">
          Strategy companion — spots gaps → new requests
        </text>
        <DiffBadge x={150} y={50} n={6} />
        {/* mechanical (inner) */}
        <path d={arcPath(110, 90, 870, 70)} stroke={LIGHT_MUTED} strokeWidth={1.4} strokeDasharray="3 3" markerEnd="url(#d-arrow-muted)" />
        <text x={490} y={64} fontSize={9.5} fill={MUTED} textAnchor="middle">
          new data → re-centralize
        </text>
        <DiffBadge x={210} y={78} n={5} muted />
      </g>

      {/* ---- spine arrows between nodes ---- */}
      {NODE_X.slice(0, -1).map((x, i) => (
        <path
          key={i}
          d={`M ${x + CARD_W / 2} ${SPINE_Y} L ${NODE_X[i + 1] - CARD_W / 2 - 6} ${SPINE_Y}`}
          stroke={MUTED}
          strokeWidth={1.6}
          markerEnd="url(#d-arrow-dark)"
        />
      ))}

      {/* ---- traveling pulse along the spine ---- */}
      {!reduce && (
        <motion.circle
          r={4}
          fill={BLACK}
          cy={SPINE_Y}
          animate={{ cx: [NODE_X[0], NODE_X[NODE_X.length - 1]] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        />
      )}

      {/* ---- nodes ---- */}
      {NODES.map((n, i) => {
        const x = NODE_X[i];
        const isCtx = n.diff === 1;
        return (
          <g key={n.title}>
            {/* connector card → owner lane */}
            <path
              d={`M ${x} ${SPINE_Y + CARD_H / 2} L ${x} ${ownerY(n.owner)}`}
              stroke={BORDER}
              strokeWidth={1.2}
            />
            {/* card */}
            <rect
              x={x - CARD_W / 2}
              y={SPINE_Y - CARD_H / 2}
              width={CARD_W}
              height={CARD_H}
              rx={9}
              fill={isCtx ? BLACK : "#fff"}
              stroke={isCtx ? BLACK : BORDER}
              strokeWidth={1.4}
            />
            <text
              x={x}
              y={SPINE_Y - 4}
              fontSize={12.5}
              fontWeight={700}
              fill={isCtx ? "#fff" : BLACK}
              textAnchor="middle"
            >
              {n.title}
            </text>
            <text
              x={x}
              y={SPINE_Y + 12}
              fontSize={8.5}
              fill={isCtx ? LIGHT_MUTED : MUTED}
              textAnchor="middle"
            >
              {n.sub}
            </text>
            {n.diff && <DiffBadge x={x + CARD_W / 2 - 4} y={SPINE_Y - CARD_H / 2 + 2} n={n.diff} />}
          </g>
        );
      })}

      {/* ---- two execution lanes ---- */}
      {[
        { label: "Human", y: HUMAN_Y },
        { label: "Agent", y: AGENT_Y },
      ].map((lane) => (
        <g key={lane.label}>
          <rect x={40} y={lane.y - 22} width={900} height={44} rx={8} fill={LIGHT_BG} stroke={BORDER} />
          <text x={52} y={lane.y + 4} fontSize={11} fontWeight={600} fill={MUTED}>
            {lane.label}
          </text>
        </g>
      ))}

      {/* ---- weaving execution path ---- */}
      <path
        d={
          "M " +
          NODES.map((n, i) => `${NODE_X[i]} ${ownerY(n.owner)}`).join(" L ")
        }
        fill="none"
        stroke={MEDIUM}
        strokeWidth={2}
      />

      {/* ---- owner dots + human-in-the-loop gates + role labels ---- */}
      {NODES.map((n, i) => {
        const x = NODE_X[i];
        const oy = ownerY(n.owner);
        return (
          <g key={`o-${n.title}`}>
            {/* gate: agent-owned step that needs human sign-off */}
            {n.gate && (
              <g>
                <path
                  d={`M ${x} ${AGENT_Y} L ${x} ${HUMAN_Y}`}
                  stroke={BLACK}
                  strokeWidth={1.3}
                  strokeDasharray="2 2"
                />
                <circle cx={x} cy={HUMAN_Y} r={7} fill="#fff" stroke={BLACK} strokeWidth={1.4} />
                <path
                  d={`M ${x - 3} ${HUMAN_Y} l 2 2 l 4 -4`}
                  stroke={BLACK}
                  strokeWidth={1.4}
                  fill="none"
                />
                <text x={x} y={HUMAN_Y - 12} fontSize={8} fill={MEDIUM} textAnchor="middle">
                  {n.gate}
                </text>
              </g>
            )}
            <circle cx={x} cy={oy} r={6} fill={n.owner === "human" ? BLACK : MUTED} />
            {/* role label beneath lanes */}
            <text x={x} y={AGENT_Y + 40} fontSize={8.5} fill={MUTED} textAnchor="middle">
              {n.role}
            </text>
          </g>
        );
      })}

      {/* human-in-the-loop caption */}
      <text x={490} y={AGENT_Y + 62} fontSize={9} fill={LIGHT_MUTED} textAnchor="middle" fontStyle="italic">
        AI can code, review, even merge — but every gate returns to a human
      </text>

      {/* ---- arrow markers ---- */}
      <defs>
        <marker id="d-arrow-dark" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={MUTED} />
        </marker>
        <marker id="d-arrow-muted" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={LIGHT_MUTED} />
        </marker>
      </defs>
    </svg>
  );
}

function DiffBadge({ x, y, n, muted = false }: { x: number; y: number; n: number; muted?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={8.5} fill={muted ? MUTED : BLACK} />
      <text x={x} y={y + 3} fontSize={10} fontWeight={700} fill="#fff" textAnchor="middle">
        {n}
      </text>
    </g>
  );
}
