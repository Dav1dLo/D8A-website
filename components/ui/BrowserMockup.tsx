import { cn } from "@/lib/cn";
import { type ReactNode } from "react";

export function BrowserMockup({
  children,
  tilt = false,
  className = "",
}: {
  children: ReactNode;
  tilt?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-brand-border shadow-2xl",
        tilt && "transform perspective-[1200px] rotate-y-[-2deg] rotate-x-[2deg]",
        className
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-brand-border bg-brand-lighter-bg px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1">
          <div className="mx-auto max-w-xs rounded-md bg-white px-3 py-1 text-center text-xs text-brand-muted">
            app.d8a.pro
          </div>
        </div>
        <div className="w-[52px]" />
      </div>

      {/* Content area */}
      <div className="bg-white">{children}</div>
    </div>
  );
}
