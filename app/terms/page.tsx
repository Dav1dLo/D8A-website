import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service \u2014 D8A.pro",
  description: "Terms of Service for D8A.pro by Plainsight BV",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-28">
      <h1 className="mb-2 text-[2.25rem] font-semibold tracking-[-0.02em] text-brand-black">
        Terms of Service
      </h1>
      <p className="mb-10 text-sm text-brand-muted">
        Last updated: April 7, 2026
      </p>

      <div className="space-y-8 text-[1.0625rem] leading-relaxed text-brand-medium">
        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            1. Service Description
          </h2>
          <p>
            D8A.pro is an AI-powered DataOps workspace platform developed
            by Plainsight BV, a company registered in Belgium. The platform
            is currently in pre-release development. This Website
            (d8a.pro) provides information about the platform and allows
            visitors to join a waitlist for early access.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            2. Eligibility
          </h2>
          <p>
            To join the D8A.pro waitlist, you must be at least 18 years of
            age and authorized to provide the work email address you
            submit. By joining the waitlist, you represent that you meet
            these requirements.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            3. Waitlist Terms
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>Joining the waitlist is free and non-binding</li>
            <li>
              Your waitlist position does not guarantee early access or a
              specific access date
            </li>
            <li>
              We reserve the right to prioritize access invitations based
              on factors including but not limited to: team size, role,
              referral activity, and alignment with our initial target use
              cases
            </li>
            <li>
              You may unsubscribe from the waitlist at any time by
              contacting us at{" "}
              <a
                href="mailto:hello@d8a.pro"
                className="text-brand-black underline"
              >
                hello@d8a.pro
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            4. Intellectual Property
          </h2>
          <p>
            All content on this Website &mdash; including but not limited
            to text, graphics, logos, product demonstrations, animations,
            and design elements &mdash; is the property of Plainsight BV
            and is protected by applicable intellectual property laws. You
            may not reproduce, distribute, or create derivative works from
            any content on this Website without prior written consent.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            5. Limitation of Liability
          </h2>
          <p>
            This Website and waitlist are provided &ldquo;as is&rdquo;
            without warranties of any kind, either express or implied.
            Plainsight BV shall not be liable for any direct, indirect,
            incidental, special, or consequential damages arising from
            your use of or inability to use this Website or the waitlist
            service.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            6. Governing Law
          </h2>
          <p>
            These Terms of Service are governed by and construed in
            accordance with the laws of Belgium. Any disputes arising from
            or relating to these terms shall be subject to the exclusive
            jurisdiction of the courts of Belgium.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            7. Changes to Terms
          </h2>
          <p>
            We reserve the right to update these Terms of Service at any
            time. Continued use of this Website after changes are posted
            constitutes acceptance of the revised terms. Material changes
            will be communicated to waitlist subscribers via email.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-brand-black">
            8. Contact
          </h2>
          <p>
            For questions about these Terms, contact us at{" "}
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
