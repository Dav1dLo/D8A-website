import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy \u2014 D8A.pro",
  description: "Privacy Policy for D8A.pro by Plainsight BV",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-28">
      <h1 className="mb-2 text-[2.25rem] font-semibold tracking-[-0.02em] text-brand-black">
        Privacy Policy
      </h1>
      <p className="mb-10 text-sm text-brand-muted">
        Last updated: April 7, 2026
      </p>

      <div className="prose-brand space-y-8 text-[1.0625rem] leading-relaxed text-brand-medium">
        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            1. Data Controller
          </h2>
          <p>
            Plainsight BV, a company registered in Belgium, is the data
            controller responsible for your personal data collected through
            d8a.pro (the &ldquo;Website&rdquo;).
          </p>
          <p className="mt-2">
            Contact:{" "}
            <a
              href="mailto:hello@d8a.pro"
              className="text-brand-black underline"
            >
              hello@d8a.pro
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            2. Data We Collect
          </h2>
          <p>When you join our waitlist, we collect:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Email address (work email)</li>
            <li>Timestamp of submission</li>
            <li>
              Referral source (UTM parameters from the URL, if present)
            </li>
            <li>
              Approximate geographic location (derived from IP address for
              analytics purposes; we do not store your IP address)
            </li>
            <li>
              Optional: role and team size (if you complete the
              post-signup survey)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            3. Purpose of Collection
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Waitlist management:</strong> To register your interest
              and contact you when early access becomes available
            </li>
            <li>
              <strong>Communication:</strong> To send you updates about D8A.pro
              availability and product news
            </li>
            <li>
              <strong>Analytics:</strong> To understand website usage and
              improve the user experience
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            4. Legal Basis
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Consent:</strong> By submitting your email to join the
              waitlist, you consent to the processing of your data for the
              purposes described above
            </li>
            <li>
              <strong>Legitimate interest:</strong> We use anonymized
              analytics data to improve the Website
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            5. Data Sharing
          </h2>
          <p>
            We do not sell or rent your personal data. We may share data
            with the following categories of third-party processors, solely
            for the purposes described in this policy:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Hosting provider (Azure / Microsoft)</li>
            <li>Database provider (Supabase)</li>
            <li>Email delivery service (for transactional emails)</li>
            <li>Privacy-friendly analytics provider</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            6. Data Retention
          </h2>
          <p>
            We retain your waitlist data for as long as necessary to
            fulfil the purposes described above, or until you request
            deletion. If D8A.pro is discontinued, all waitlist data will
            be securely deleted within 90 days.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            7. Cookies
          </h2>
          <p>
            Please refer to our{" "}
            <a
              href="/cookies/"
              className="text-brand-black underline"
            >
              Cookie Policy
            </a>{" "}
            for details on cookies and tracking technologies used on this
            Website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            8. Your Rights (GDPR)
          </h2>
          <p>
            Under the General Data Protection Regulation (GDPR), you have
            the right to:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>Access:</strong> Request a copy of the personal data
              we hold about you
            </li>
            <li>
              <strong>Rectification:</strong> Request correction of
              inaccurate data
            </li>
            <li>
              <strong>Erasure:</strong> Request deletion of your personal
              data
            </li>
            <li>
              <strong>Portability:</strong> Request a machine-readable copy
              of your data
            </li>
            <li>
              <strong>Objection:</strong> Object to the processing of your
              personal data
            </li>
            <li>
              <strong>Withdraw consent:</strong> Withdraw your consent at
              any time
            </li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, contact us at{" "}
            <a
              href="mailto:hello@d8a.pro"
              className="text-brand-black underline"
            >
              hello@d8a.pro
            </a>
            . We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            9. Updates to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Material
            changes will be communicated via email to waitlist subscribers.
            The &ldquo;Last updated&rdquo; date at the top reflects the
            most recent revision.
          </p>
        </section>
      </div>
    </div>
  );
}
