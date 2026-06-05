"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * D8A Data Operating Model — Hero (nested-ring loop).
 *
 * Thesis: "Context is king." The brand is monochrome, so context earns the only
 * visual emphasis available — full-strength brand black — while every other ring
 * sits in light grays. Context dominates by weight, not by hue.
 *
 * Geometry (see FRAMEWORK_SCHEMATIC.md):
 *   Data core → Context ring (accent) → People/Process/Technology ring →
 *   3 phases arcing (Centralize → Contextualize → Capitalize) →
 *   two return flows (inner mechanical + outer strategic) →
 *   Architecture foundation substrate beneath the whole circle.
 */

const CX = 300;
const CY = 285;

// Brand tokens (monochrome)
const BLACK = "#111827";
const DARK = "#374151";
const MEDIUM = "#4b5563";
const MUTED = "#6b7280";
const LIGHT_MUTED = "#9ca3af";
const BORDER = "#e5e7eb";
const LIGHT_BG = "#f3f4f6";
const LIGHTER_BG = "#f9fafb";

// round to 2dp so server- and client-rendered coordinates serialize identically
const r2 = (n: number) => Math.round(n * 100) / 100;

// angle measured in degrees, clockwise from top (12 o'clock)
function polar(r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: r2(CX + r * Math.sin(rad)), y: r2(CY - r * Math.cos(rad)) };
}

// Annular segment path between two radii / two angles (clockwise)
function annulus(rInner: number, rOuter: number, a0: number, a1: number) {
  const oStart = polar(rOuter, a0);
  const oEnd = polar(rOuter, a1);
  const iEnd = polar(rInner, a1);
  const iStart = polar(rInner, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return [
    `M ${oStart.x} ${oStart.y}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${oEnd.x} ${oEnd.y}`,
    `L ${iEnd.x} ${iEnd.y}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${iStart.x} ${iStart.y}`,
    "Z",
  ].join(" ");
}

// Open arc (stroke only) between two angles at a radius (clockwise)
function arc(r: number, a0: number, a1: number) {
  const start = polar(r, a0);
  const end = polar(r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`;
}

// Phase centers: Centralize=top, then clockwise. Return flows live on the left.
const PHASES = [
  { name: "Centralize", center: 0, a0: -56, a1: 56 },
  { name: "Contextualize", center: 120, a0: 64, a1: 176 },
  { name: "Capitalize", center: 240, a0: 184, a1: 296 },
];

// PPT ring segments, offset 60° so their gaps don't collide with phase gaps.
const PPT = [
  { name: "People", center: 60 },
  { name: "Process", center: 180 },
  { name: "Technology", center: 300 },
];

const R_CORE = 42;
const R_CTX_OUT = 80;
const R_PPT_OUT = 124;
const R_TRACK = 140; // the loop track radius
const R_LABEL = 177;

export function FrameworkLoop({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 600 460"
      className={className}
      role="img"
      aria-label="D8A data operating model: data and context at the core, surrounded by people, process and technology, spinning through three phases — Centralize, Contextualize, Capitalize — on an architecture foundation."
    >
      {/* ---- Raw sources funneling INTO Centralize (top) ---- */}
      <g>
        <text x={CX} y={34} fontSize={10} fill={LIGHT_MUTED} textAnchor="middle">
          raw sources
        </text>
        {[-48, -16, 16, 48].map((dx) => (
          <rect
            key={dx}
            x={CX + dx - 8}
            y={42}
            width={16}
            height={12}
            rx={2}
            fill="#fff"
            stroke={BORDER}
          />
        ))}
        {/* funnel */}
        <path d={`M ${CX - 40} 58 L ${CX} 92`} stroke={BORDER} strokeWidth={1.2} />
        <path d={`M ${CX + 40} 58 L ${CX} 92`} stroke={BORDER} strokeWidth={1.2} />
        <path
          d={`M ${CX} 92 L ${CX} ${CY - R_TRACK - 8}`}
          stroke={LIGHT_MUTED}
          strokeWidth={1.4}
          markerEnd="url(#arrow-muted)"
        />
      </g>

      {/* ---- Phase track + arcs (the loop) ---- */}
      <g>
        {PHASES.map((p) => (
          <path
            key={p.name}
            d={annulus(130, 150, p.a0, p.a1)}
            fill={LIGHT_BG}
            stroke={BORDER}
          />
        ))}
        {/* clockwise direction arrowheads along the track */}
        {PHASES.map((p) => {
          const tip = polar(R_TRACK, p.a1 - 2);
          const tail = polar(R_TRACK, p.a1 - 10);
          return (
            <path
              key={`a-${p.name}`}
              d={`M ${tail.x} ${tail.y} L ${tip.x} ${tip.y}`}
              stroke={MUTED}
              strokeWidth={1.6}
              markerEnd="url(#arrow-dark)"
            />
          );
        })}
        {/* phase labels (horizontal, outside the track) */}
        {PHASES.map((p) => {
          const pos = polar(R_LABEL, p.center);
          return (
            <text
              key={`l-${p.name}`}
              x={pos.x}
              y={pos.y + 4}
              fontSize={14}
              fontWeight={600}
              fill={DARK}
              textAnchor="middle"
            >
              {p.name}
            </text>
          );
        })}
      </g>

      {/* ---- Two return flows on the left (Capitalize → Centralize) ---- */}
      <g fill="none">
        {/* outer: strategic companion sweep, Capitalize → Centralize */}
        <path
          d={arc(205, 250, 356)}
          stroke={MEDIUM}
          strokeWidth={1.6}
          markerEnd="url(#arrow-dark)"
        />
        {/* inner: mechanical data exhaust (dashed) */}
        <path
          d={arc(160, 256, 350)}
          stroke={LIGHT_MUTED}
          strokeWidth={1.4}
          strokeDasharray="3 3"
          markerEnd="url(#arrow-muted)"
        />
        {(() => {
          const node = polar(205, 300);
          return (
            <g>
              {/* leader from node up to the top-left label */}
              <path d={`M ${node.x} ${node.y} L 86 142`} stroke={LIGHT_MUTED} strokeWidth={1} />
              <circle cx={node.x} cy={node.y} r={6} fill={BLACK} />
              <text x={14} y={130} fontSize={11} fontWeight={600} fill={DARK} textAnchor="start">
                Strategy companion
              </text>
              <text x={14} y={143} fontSize={9} fill={MUTED} textAnchor="start">
                spots gaps → new requests
              </text>
            </g>
          );
        })()}
        <text
          x={polar(150, 336).x}
          y={polar(150, 336).y}
          fontSize={8.5}
          fill={LIGHT_MUTED}
          textAnchor="middle"
        >
          new data
        </text>
      </g>

      {/* ---- PPT ring (operating model) ---- */}
      <g>
        {PPT.map((s) => (
          <path
            key={s.name}
            d={annulus(R_CTX_OUT + 2, R_PPT_OUT, s.center - 56, s.center + 56)}
            fill={LIGHT_BG}
            stroke={BORDER}
          />
        ))}
        {PPT.map((s) => {
          const pos = polar((R_CTX_OUT + R_PPT_OUT) / 2, s.center);
          return (
            <text
              key={`p-${s.name}`}
              x={pos.x}
              y={pos.y + 3}
              fontSize={10.5}
              fontWeight={500}
              fill={MEDIUM}
              textAnchor="middle"
            >
              {s.name}
            </text>
          );
        })}
      </g>

      {/* ---- Context ring (THE accent — solid black, the thesis) ---- */}
      <motion.g
        animate={reduce ? undefined : { opacity: [1, 0.82, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx={CX} cy={CY} r={R_CTX_OUT} fill={BLACK} />
        <circle cx={CX} cy={CY} r={R_CORE} fill="#fff" />
        {/* CONTEXT label, top of ring */}
        <text
          x={CX}
          y={CY - (R_CORE + R_CTX_OUT) / 2 + 3}
          fontSize={11}
          fontWeight={700}
          letterSpacing="0.12em"
          fill="#fff"
          textAnchor="middle"
        >
          CONTEXT
        </text>
        <text
          x={CX}
          y={CY + (R_CORE + R_CTX_OUT) / 2 + 3}
          fontSize={8.5}
          letterSpacing="0.04em"
          fill={LIGHT_MUTED}
          textAnchor="middle"
        >
          context lake
        </text>
      </motion.g>

      {/* ---- Data core ---- */}
      <g>
        <circle cx={CX} cy={CY} r={R_CORE} fill="#fff" stroke={DARK} strokeWidth={1.4} />
        <text x={CX} y={CY + 5} fontSize={15} fontWeight={700} fill={BLACK} textAnchor="middle">
          Data
        </text>
      </g>

      {/* ---- Traveling dot (data flowing clockwise) ---- */}
      {!reduce && (
        <motion.g
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <circle cx={CX} cy={CY - R_TRACK} r={4} fill={BLACK} />
        </motion.g>
      )}

      {/* ---- arrow markers ---- */}
      <defs>
        <marker id="arrow-dark" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={MUTED} />
        </marker>
        <marker id="arrow-muted" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={LIGHT_MUTED} />
        </marker>
      </defs>
    </svg>
  );
}
