"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, Copy } from "lucide-react";
import { LinkedinIcon, XIcon } from "@/components/icons/SocialIcons";
import { waitlistSchema, type WaitlistFormData } from "@/lib/validation";
import { WAITLIST_COUNT } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function WaitlistForm({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async () => {
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  const copyReferralLink = async () => {
    await navigator.clipboard.writeText("https://d8a.pro?ref=early42");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDark = variant === "dark";
  const position = WAITLIST_COUNT + 1;

  if (status === "success") {
    return (
      <div
        className={cn(
          "w-full max-w-lg rounded-lg border p-6 text-left",
          isDark
            ? "border-white/20 bg-white/10"
            : "border-brand-border bg-white"
        )}
        role="status"
        aria-live="polite"
      >
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
            <Check className="h-4 w-4 text-white" />
          </div>
          <span
            className={cn(
              "font-medium",
              isDark ? "text-white" : "text-brand-black"
            )}
          >
            You&apos;re on the list!
          </span>
        </div>
        <p
          className={cn(
            "mb-4 text-sm",
            isDark ? "text-white/70" : "text-brand-muted"
          )}
        >
          You&apos;re #{position} on the waitlist. We&apos;ll reach out when
          it&apos;s your turn.
        </p>
        <p
          className={cn(
            "mb-2 text-sm font-medium",
            isDark ? "text-white/80" : "text-brand-medium"
          )}
        >
          Move up the list by sharing:
        </p>
        <div
          className={cn(
            "mb-3 flex items-center gap-2 rounded-md border px-3 py-2 text-sm",
            isDark
              ? "border-white/20 bg-white/5 text-white/60"
              : "border-brand-border bg-brand-lighter-bg text-brand-muted"
          )}
        >
          <span className="flex-1 truncate">d8a.pro?ref=early42</span>
          <button
            onClick={copyReferralLink}
            aria-label="Copy referral link"
            className={cn(
              "flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors",
              isDark
                ? "text-white hover:bg-white/10"
                : "text-brand-black hover:bg-brand-light-bg"
            )}
          >
            <Copy className="h-3 w-3" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="flex gap-2">
          <a
            href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fd8a.pro"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              isDark
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-brand-light-bg text-brand-black hover:bg-brand-border"
            )}
          >
            <LinkedinIcon className="h-3.5 w-3.5" />
            LinkedIn
          </a>
          <a
            href="https://twitter.com/intent/tweet?text=Check%20out%20D8A.pro%20%E2%80%94%20AI-powered%20DataOps%20workspace&url=https%3A%2F%2Fd8a.pro"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              isDark
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-brand-light-bg text-brand-black hover:bg-brand-border"
            )}
          >
            <XIcon className="h-3.5 w-3.5" />
            Twitter/X
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("w-full max-w-lg", className)}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="Enter your work email"
          autoComplete="email"
          disabled={status === "loading"}
          aria-label="Work email address"
          className={cn(
            "flex-1 rounded-md border px-4 py-3 text-[0.9375rem] transition-colors placeholder:text-brand-light-muted focus:border-brand-black",
            isDark
              ? "border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-white"
              : "border-brand-border bg-white text-brand-black",
            errors.email &&
              (errors.email.message?.includes("work email")
                ? "border-amber-400"
                : "border-red-500")
          )}
          {...register("email")}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "inline-flex w-full sm:w-auto items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 py-3 text-[0.9375rem] font-medium transition-all",
            isDark
              ? "bg-white text-brand-black hover:bg-white/90 hover:scale-[1.02]"
              : "bg-brand-black text-white hover:bg-brand-dark hover:scale-[1.02]",
            status === "loading" && "cursor-not-allowed opacity-70"
          )}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Joining...
            </>
          ) : (
            "Join the Waitlist \u2192"
          )}
        </button>
      </div>
      {errors.email && (
        <p
          className={cn(
            "mt-2 text-sm",
            errors.email.message?.includes("work email")
              ? "text-amber-500"
              : "text-red-500"
          )}
          role="alert"
        >
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
