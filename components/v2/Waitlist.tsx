"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { waitlistSchema, type WaitlistFormData } from "@/lib/validation";
import { WAITLIST_COUNT, WEB3FORMS_ACCESS_KEY } from "@/lib/constants";

export function Waitlist({ tone = "light" }: { tone?: "light" | "dark" }) {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormData>({ resolver: zodResolver(waitlistSchema) });

  const onSubmit = async (data: WaitlistFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          email: data.email,
          subject: "New D8A.pro waitlist signup",
          from_name: "D8A.pro Waitlist",
          message: `New waitlist signup: ${data.email}`,
        }),
      });
      const result = await res.json();
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={`waitlist waitlist--${tone}`} role="status" aria-live="polite">
        <p className="waitlist-done">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          You&apos;re on the list. We&apos;ll email you when your spot opens.
        </p>
      </div>
    );
  }

  const errorId = `${id}-error`;
  return (
    <div className={`waitlist waitlist--${tone}`}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="waitlist-form">
        <label htmlFor={`${id}-email`} className="sr-only">
          Work email
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email || status === "error" ? errorId : undefined}
          {...register("email")}
        />
        <button type="submit" className="btn btn-ink" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : "Join the waitlist"}
        </button>
      </form>
      {(errors.email || status === "error") && (
        <p id={errorId} className="waitlist-error" role="alert">
          {errors.email?.message ?? "Something went wrong. Please try again."}
        </p>
      )}
      <p className="waitlist-count">
        Join {WAITLIST_COUNT} data leaders already on the waitlist.
      </p>
    </div>
  );
}
