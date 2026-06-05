/**
 * Architecture foundation — the substrate the operating-model loop rests on.
 *
 * Hierarchy (see FRAMEWORK_SCHEMATIC.md §5):
 *   Architecture
 *     └─ Data Platform
 *          └─ Data Layer  (×3)
 *               └─ Data Pattern  (×2 per layer)
 *                    └─ agentic Context · Spec · Coding instructions
 *
 * A centralized, unified truth that drives the code — every pattern carries the
 * same three agentic instruction types, so every action follows one consistent
 * pattern. The Marketplace stocks these patterns with best-practice templates.
 */

const LAYERS = [0, 1, 2]; // three generic Data Layers
const PATTERNS = [0, 1]; // two generic Data Patterns per layer

const INSTRUCTIONS = ["Context", "Spec", "Coding"];

function Pattern() {
  return (
    <div className="rounded-md border border-brand-border bg-white p-2">
      <p className="mb-1.5 text-[0.75rem] font-medium text-brand-dark">Data Pattern</p>
      <div className="flex gap-1">
        {INSTRUCTIONS.map((ins) => (
          <span
            key={ins}
            className="flex-1 rounded-[4px] border border-brand-border bg-brand-lighter-bg px-1 py-0.5 text-center text-[0.625rem] leading-tight text-brand-muted"
          >
            {ins}
          </span>
        ))}
      </div>
      <p className="mt-1 text-[0.5625rem] uppercase tracking-[0.06em] text-brand-light-muted">
        agentic instructions
      </p>
    </div>
  );
}

export function ArchitectureFoundation({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-brand-border bg-brand-lighter-bg p-4 md:p-5 ${className}`}
    >
      {/* header */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-brand-muted">
          Architecture <span className="font-normal normal-case tracking-normal text-brand-light-muted">— one unified truth that drives the code</span>
        </p>
        <span className="rounded-full bg-brand-black px-3 py-1 text-[0.6875rem] font-medium tracking-[0.04em] text-white">
          Marketplace
        </span>
      </div>

      {/* Data Platform band */}
      <div className="rounded-lg border border-dashed border-brand-border bg-white/60 p-3">
        <p className="mb-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-brand-light-muted">
          Data Platform
        </p>

        {/* 3 Data Layers */}
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
          {LAYERS.map((layer) => (
            <div
              key={layer}
              className="rounded-lg border border-brand-border bg-brand-light-bg p-2.5"
            >
              <div className="mb-2">
                <span className="text-[0.75rem] font-semibold text-brand-black">
                  Data Layer
                </span>
              </div>

              {/* 2 Data Patterns per layer */}
              <div className="space-y-2">
                {PATTERNS.map((p) => (
                  <Pattern key={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
