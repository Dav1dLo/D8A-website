import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-6 pt-16">
      <h1 className="mb-3 text-[3rem] font-semibold tracking-[-0.025em] text-brand-black">
        404
      </h1>
      <h2 className="mb-2 text-[1.5rem] font-medium text-brand-black">
        Page not found
      </h2>
      <p className="mb-8 text-[1.0625rem] text-brand-muted">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="flex gap-3">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-brand-border px-5 py-2.5 text-[0.9375rem] font-medium text-brand-black transition-colors hover:bg-brand-lighter-bg"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </a>
        <a
          href="/#hero"
          className="inline-flex items-center rounded-md bg-brand-black px-5 py-2.5 text-[0.9375rem] font-medium text-white transition-all hover:bg-brand-dark hover:scale-[1.02]"
        >
          Join the Waitlist &rarr;
        </a>
      </div>
    </div>
  );
}
