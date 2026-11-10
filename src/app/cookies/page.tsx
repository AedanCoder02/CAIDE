import type { Metadata } from "next";
import Link from "next/link";
import { legalMetadata } from "@/i18n/metadata";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = legalMetadata("cookies", "Cookie Policy — CAIDE", "The storage technologies used on the CAIDE website, the consent-based analytics in use, and the means of changing consent.");

const EMAIL = "contact@caide.agency";
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: "summary",
    title: "Scope and principles",
    body: (
      <>
        <p>
          The following Cookie Policy sets out the cookies and similar technologies used on this website, the purposes
          for which they are used, and the means by which consent may be given, refused, or withdrawn. Measurement is
          limited to that which serves the improvement of the website and is conducted only with consent. No
          advertising trackers are used, no visitor profiles are built, and no data is sold.
        </p>
        <p>
          On first visit, a consent panel requests the visitor&rsquo;s choice. No optional technology runs before consent
          is given. Consent may be changed at any time through the <strong>Cookie settings</strong> link at the foot of
          every page.
        </p>
      </>
    ),
  },
  {
    id: "what-are-cookies",
    title: "Definitions",
    body: (
      <>
        <p>
          Cookies are small text files stored by a website in the user&rsquo;s browser. Similar technologies, such as
          local storage, session storage, and tracking pixels, store or read information on a device in a comparable
          manner. This policy applies to all such technologies, which are classified as follows:
        </p>
        <ul>
          <li>
            <strong>Essential:</strong> strictly necessary for the operation of the website or to record a choice made by the user.
          </li>
          <li>
            <strong>Analytics:</strong> measurement of website usage for the purpose of its improvement.
          </li>
          <li>
            <strong>Marketing:</strong> measurement or targeting of advertising.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "what-we-use",
    title: "Technologies in use",
    body: (
      <>
        <table className="legal-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Conditions of use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Essential</td>
              <td>
                A single local storage entry, <code>caide-consent</code>, recording the consent choice and its date. It
                remains on the device, is never transmitted to CAIDE, and expires after 12 months, after which consent
                is requested again.
              </td>
              <td>Always, once a choice has been made</td>
            </tr>
            <tr>
              <td>Essential (security)</td>
              <td>
                The hosting provider, Cloudflare, may set strictly necessary security cookies such as{" "}
                <code>__cf_bm</code> (bot protection, expiring after 30 minutes of inactivity) or{" "}
                <code>cf_clearance</code> (evidence that a security check was passed). They are not used for
                cross-site tracking.
              </td>
              <td>Only where required by Cloudflare&rsquo;s security protections</td>
            </tr>
            <tr>
              <td>Essential (spam protection)</td>
              <td>
                Cloudflare Turnstile, a privacy-preserving check loaded only on the final step of the project brief form
                to prevent automated abuse. It does not read the content entered in the form.
              </td>
              <td>Only on reaching the contact step of the form</td>
            </tr>
            <tr>
              <td>Analytics</td>
              <td>
                Cloudflare Web Analytics, which counts page views and measures page performance. It sets no cookies,
                uses no local storage, and does not fingerprint visitors by IP address, browser, or any other data.
              </td>
              <td>Only after Accept is selected or Analytics is enabled</td>
            </tr>
            <tr>
              <td>Marketing</td>
              <td>None. No advertising, retargeting, or conversion tags are used.</td>
              <td>Not in use</td>
            </tr>
          </tbody>
        </table>
        <p>
          To display the website in the appropriate language, the browser&rsquo;s language and time zone settings are
          read on the device. These are neither stored nor transmitted. A language selected manually is retained only
          in the page address (for example <code>/es/</code>).
        </p>
      </>
    ),
  },
  {
    id: "why",
    title: "Purposes of analytics",
    body: (
      <>
        <p>Subject to consent, analytics are used to determine:</p>
        <ul>
          <li>which pages and sections are read, for the improvement of those which are not;</li>
          <li>page load performance on real devices, for the correction of slow pages;</li>
          <li>the countries and languages of visitors, for the improvement of translations and descriptions.</li>
        </ul>
        <p>
          Reports consist of aggregated totals only. They do not identify any visitor and are not combined with any
          information submitted through the brief form.
        </p>
      </>
    ),
  },
  {
    id: "choices",
    title: "Consent options",
    body: (
      <>
        <ul>
          <li>
            <strong>Accept:</strong> enables Analytics. Marketing remains disabled.
          </li>
          <li>
            <strong>Only essential:</strong> no optional technology runs.
          </li>
          <li>
            <strong>Customize:</strong> each category may be enabled or disabled individually.
          </li>
        </ul>
        <p>
          Refusal is as simple as acceptance, and the website functions identically in either case. Consent may be
          changed at any time through <strong>Cookie settings</strong> in the footer. Upon withdrawal of consent, the
          analytics script is removed on the next page load. Clearing this website&rsquo;s data in the browser removes
          the <code>caide-consent</code> entry, after which consent is requested again.
        </p>
        <p>
          Global Privacy Control signals are honored: where a browser sends such a signal, it is treated as a refusal
          of marketing, irrespective of the choice made in the panel.
        </p>
      </>
    ),
  },
  {
    id: "external",
    title: "Third-party websites",
    body: (
      <p>
        The portfolio links to live client projects and other external websites, which may set their own cookies under
        their own policies. Such cookies are not controlled by CAIDE.
      </p>
    ),
  },
  {
    id: "control",
    title: "Browser controls",
    body: (
      <>
        <p>
          Cookies and site data may also be viewed, blocked, and deleted at any time through browser settings. The
          following guides describe the procedure for the most common browsers:
        </p>
        <ul>
          <li>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
              Google Chrome
            </a>
          </li>
          <li>
            <a href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">
              Apple Safari
            </a>
          </li>
          <li>
            <a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">
              Microsoft Edge
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "laws",
    title: "Applicable law",
    body: (
      <>
        <p>Cookie and tracking rules differ by jurisdiction. CAIDE complies with the strictest of them, including:</p>
        <ul>
          <li>
            the EU ePrivacy Directive and GDPR, and the UK PECR and UK GDPR: no non-essential technology runs before
            consent, and refusal is as simple as acceptance;
          </li>
          <li>
            Brazil&rsquo;s LGPD, Canada&rsquo;s PIPEDA and Quebec Law 25, and similar laws that require clear notice and
            consent;
          </li>
          <li>
            US state privacy laws, such as California&rsquo;s CCPA/CPRA: personal information is not sold or shared for
            targeted advertising, and Global Privacy Control signals are recognized.
          </li>
        </ul>
        <p>
          The processing of personal information is set out in full in the <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Amendments",
    body: (
      <p>
        Any new technology that stores or reads information on a device will be listed in this policy before its
        introduction and, where required by law, will run only after consent has been obtained.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: <p>Enquiries concerning this policy may be addressed to {mail}.</p>,
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      doc="cookies"
      eyebrow="Legal · Cookies"
      title="Cookie"
      accent="Policy."
      intro="The following document sets out the technologies this website stores on or reads from a device, the consent-based analytics in use, and the means of changing consent at any time."
      updated="10 November 2026"
      summary={[
        "No advertising trackers, visitor profiles, or data sales.",
        "Analytics are cookie-free and run only after consent.",
        "A single local entry records the consent choice.",
        "Consent may be changed at any time through Cookie settings in the footer.",
      ]}
      sections={sections}
    />
  );
}
