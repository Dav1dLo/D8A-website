import { FrameworkLoop } from "@/components/framework/FrameworkLoop";
import { ArchitectureFoundation } from "@/components/framework/ArchitectureFoundation";
import { FrameworkDetail } from "@/components/framework/FrameworkDetail";

export default function FrameworkPreviewPage() {
  return (
    <main className="mx-auto max-w-[1040px] px-6 py-16">
      <h1 className="mb-8 text-center text-2xl font-semibold text-brand-black">
        Framework preview
      </h1>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-light-muted">
        Hero
      </h2>
      <div className="mb-12 rounded-2xl border border-brand-border bg-white p-6">
        <FrameworkLoop className="mx-auto w-full max-w-[560px]" />
        <ArchitectureFoundation className="mt-2" />
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-light-muted">
        Detail — the loop, unrolled
      </h2>
      <div className="rounded-2xl border border-brand-border bg-white p-6">
        <FrameworkDetail className="w-full" />
      </div>
    </main>
  );
}
