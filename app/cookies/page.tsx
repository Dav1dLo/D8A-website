import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy \u2014 D8A.pro",
  description: "Cookie Policy for D8A.pro by Plainsight BV",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-28">
      <h1 className="mb-2 text-[2.25rem] font-semibold tracking-[-0.02em] text-brand-black">
        Cookie Policy
      </h1>
      <p className="mb-10 text-sm text-brand-muted">
        Last updated: April 7, 2026
      </p>

      <div className="space-y-8 text-[1.0625rem] leading-relaxed text-brand-medium">
        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            1. What Are Cookies
          </h2>
          <p>
            Cookies are small text files stored on your device when you
            visit a website. They are widely used to make websites work
            efficiently and provide information to site owners.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            2. Cookies We Use
          </h2>
          <p>
            D8A.pro is designed to be privacy-friendly. We currently
            minimize cookie usage:
          </p>
          <div className="mt-4 overflow-hidden rounded-lg border border-brand-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-border bg-brand-lighter-bg">
                  <th className="px-4 py-2 text-left font-medium text-brand-black">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-brand-black">
                    Purpose
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-brand-black">
                    Required
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-brand-border">
                  <td className="px-4 py-2">Essential</td>
                  <td className="px-4 py-2">
                    Basic website functionality (no cookies currently
                    required)
                  </td>
                  <td className="px-4 py-2">N/A</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Analytics</td>
                  <td className="px-4 py-2">
                    Privacy-friendly website analytics (cookieless when
                    possible)
                  </td>
                  <td className="px-4 py-2">Optional</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-brand-muted">
            We do not use advertising cookies, tracking cookies, or
            third-party cookies for behavioral profiling.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            3. Third-Party Cookies
          </h2>
          <p>
            If we use a privacy-friendly analytics tool such as Plausible
            Analytics, it operates without cookies entirely. In this case,
            no third-party cookies are set by our Website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            4. Managing Cookies
          </h2>
          <p>
            You can control and manage cookies through your browser
            settings. Most browsers allow you to:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>View what cookies are stored on your device</li>
            <li>Delete individual or all cookies</li>
            <li>Block cookies from specific or all websites</li>
            <li>Block third-party cookies</li>
          </ul>
          <p className="mt-2">
            Please note that blocking essential cookies may affect website
            functionality.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            5. Updates to This Policy
          </h2>
          <p>
            We may update this Cookie Policy from time to time. Changes
            will be reflected by the &ldquo;Last updated&rdquo; date at
            the top of this page.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            6. Contact
          </h2>
          <p>
            For questions about this Cookie Policy, contact us at{" "}
            <a
              href="mailto:hello@d8a.pro"
              className="text-brand-black underline"
            >
              hello@d8a.pro
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
