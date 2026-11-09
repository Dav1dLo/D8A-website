import Image from "next/image";
import specs from "@/public/v2/specs.webp";

function Chrome({ url }: { url: string }) {
  return (
    <div className="chrome">
      <span className="chrome-dots" aria-hidden="true">
        <i className="d-red" />
        <i className="d-yellow" />
        <i className="d-sky" />
      </span>
      <span className="chrome-url">{url}</span>
    </div>
  );
}

export function DataVisual() {
  return (
    <figure className="frame frame-a">
      <div className="mock">
        <Chrome url="app.d8a.pro / spec → code" />
        <Image
          src={specs}
          alt="D8A workspace: a business request in chat, the specification grounded in the architecture, and the code generated from it, side by side."
          sizes="(min-width: 900px) 560px, 100vw"
          className="mock-img"
        />
      </div>
    </figure>
  );
}

const NODES = [
  { id: "customer", label: "Customer", x: 170, y: 120, owner: "Sales" },
  { id: "contract", label: "Contract", x: 380, y: 70, owner: "Legal" },
  { id: "invoice", label: "Invoice", x: 400, y: 210, owner: "Finance" },
  { id: "asset", label: "Asset", x: 210, y: 270, owner: "Operations" },
];
const EDGES: [string, string, string][] = [
  ["customer", "contract", "signs"],
  ["contract", "invoice", "bills"],
  ["customer", "invoice", "pays"],
  ["customer", "asset", "uses"],
];

export function OntologyVisual() {
  const at = (id: string) => NODES.find((n) => n.id === id)!;
  return (
    <figure className="card visual">
      <Chrome url="app.d8a.pro / ontology" />
      <svg viewBox="0 0 560 340" className="onto" role="img" aria-label="Example ontology: Customer signs Contract, Contract bills Invoice, Customer pays Invoice, Customer uses Asset. Each entity has an owning domain.">
        {EDGES.map(([a, b, label]) => {
          const A = at(a);
          const B = at(b);
          return (
            <g key={a + b}>
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} className="onto-edge" />
              <text x={(A.x + B.x) / 2} y={(A.y + B.y) / 2 - 8} className="onto-edge-label" textAnchor="middle">
                {label}
              </text>
            </g>
          );
        })}
        {NODES.map((n) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            <rect x={-62} y={-24} width={124} height={48} rx={12} className="onto-node" />
            <text y={-2} textAnchor="middle" className="onto-label">{n.label}</text>
            <text y={14} textAnchor="middle" className="onto-owner">owner · {n.owner}</text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

export function IntelligenceVisual() {
  const kinds = ["Rules", "ML models", "Code", "Agents"];
  return (
    <figure className="card visual">
      <Chrome url="app.d8a.pro / decisions" />
      <div className="intel">
        <ul className="chips" aria-label="Decision logic types">
          {kinds.map((k) => (
            <li key={k} className="chip">{k}</li>
          ))}
        </ul>
        <div className="rule">
          <p className="rule-row"><span className="k">when</span> Customer.churnRisk <span className="op">&gt;</span> <span className="v">threshold</span></p>
          <p className="rule-row"><span className="k">and</span> Contract.renewal <span className="op">within</span> <span className="v">90 days</span></p>
          <p className="rule-row"><span className="k">then</span> propose Customer.retentionOffer</p>
          <p className="rule-meta">threshold set by · Sales domain owner</p>
        </div>
      </div>
    </figure>
  );
}

export function ExecutionVisual() {
  const actions = [
    { name: "Customer.create", state: "allowed" },
    { name: "Customer.checkBalance", state: "allowed" },
    { name: "Customer.block", state: "needs approval" },
    { name: "Invoice.update", state: "needs approval" },
    { name: "crm.api.call", state: "allowed" },
  ];
  return (
    <figure className="card visual">
      <Chrome url="app.d8a.pro / actions" />
      <ul className="actions">
        {actions.map((a) => (
          <li key={a.name}>
            <code>{a.name}</code>
            <span className={`state ${a.state === "allowed" ? "state-ok" : "state-wait"}`}>{a.state}</span>
          </li>
        ))}
      </ul>
      <p className="audit">audit · Customer.block · approved by domain owner · logged</p>
    </figure>
  );
}
