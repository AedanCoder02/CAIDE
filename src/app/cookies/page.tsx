import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy — CAIDE",
  description: "What CAIDE stores on your device, the cookie-free analytics we use only with your consent, and how to change your choice.",
};

const EMAIL = "hello@caide.dev";
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: "summary",
    title: "Our approach",
    body: (
      <>
        <p>
          We measure only what helps us improve this website, and only if you say yes. We do not use advertising
          trackers, we do not build profiles of visitors, and we never sell data.
        </p>
        <p>
          When you first visit, a small panel asks for your choice. Until you accept, nothing optional runs. You can
          change your mind at any time with the <strong>Cookie settings</strong> link at the bottom of every page.
        </p>
      </>
    ),
  },
  {
    id: "what-are-cookies",
    title: "What cookies are",
    body: (
      <>
        <p>
          Cookies are small text files a website stores in your browser. Similar technologies, such as local storage,
          session storage, and tracking pixels, can store or read information on your device in comparable ways. This
          policy covers all of them. They are commonly grouped into:
        </p>
        <ul>
          <li>
            <strong>Essential:</strong> needed for the site to work or to remember a choice you made.
          </li>
          <li>
            <strong>Analytics:</strong> measure how visitors use a site so it can be improved.
          </li>
          <li>
            <strong>Marketing:</strong> measure or target advertising.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "what-we-use",
    title: "What this site uses",
    body: (
      <>
        <table className="legal-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>What it is</th>
              <th>When it runs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Essential</td>
              <td>
                One local storage entry, <code>caide-consent</code>, that records your choice and the date you made it. It
                stays on your device and is never sent to us. It expires after 12 months, when we ask again.
              </td>
              <td>Always, once you make a choice</td>
            </tr>
            <tr>
              <td>Essential (security)</td>
              <td>
                Our host, Cloudflare, may set strictly necessary security cookies such as <code>__cf_bm</code> (bot
                protection, expires after 30 minutes of inactivity) or <code>cf_clearance</code> (proof a security check
                was passed). They are not used to track you across sites.
              </td>
              <td>Only when Cloudflare&rsquo;s protection needs them</td>
            </tr>
            <tr>
              <td>Essential (spam protection)</td>
              <td>
                Cloudflare Turnstile, a privacy-preserving check that loads only on the last step of the project brief
                form, to keep automated spam out. It does not read what you type into the form.
              </td>
              <td>Only when you reach the form&rsquo;s contact step</td>
            </tr>
            <tr>
              <td>Analytics</td>
              <td>
                Cloudflare Web Analytics. It counts page views and measures page speed. It sets no cookies, uses no
                local storage, and does not fingerprint visitors by IP address, browser, or any other data.
              </td>
              <td>Only after you select Accept or turn Analytics on</td>
            </tr>
            <tr>
              <td>Marketing</td>
              <td>None. We run no advertising, retargeting, or conversion tags.</td>
              <td>Never today</td>
            </tr>
          </tbody>
        </table>
        <p>
          To show the site in your language, the page reads your browser&rsquo;s language and time zone settings on your
          device. They are not stored or sent anywhere. If you pick a language yourself, that choice is kept only in the
          page address (for example <code>/es/</code>).
        </p>
      </>
    ),
  },
  {
    id: "why",
    title: "Why we use analytics",
    body: (
      <>
        <p>With your consent, analytics tell us things like:</p>
        <ul>
          <li>which pages and sections visitors actually read, so we can improve the ones that do not help;</li>
          <li>how fast pages load on real devices, so we can fix slow ones;</li>
          <li>which countries and languages visitors come from, so we translate and describe our work better.</li>
        </ul>
        <p>
          The reports we see are totals. They never tell us who you are, and we do not combine them with anything you
          send us through the contact form.
        </p>
      </>
    ),
  },
  {
    id: "choices",
    title: "Your choices",
    body: (
      <>
        <ul>
          <li>
            <strong>Accept:</strong> turns on Analytics. Marketing stays off.
          </li>
          <li>
            <strong>Only essential:</strong> nothing optional runs.
          </li>
          <li>
            <strong>Customize:</strong> turn each category on or off.
          </li>
        </ul>
        <p>
          Rejecting is as easy as accepting, and the site works the same either way. To change your choice later, use
          <strong> Cookie settings</strong> in the footer. If you withdraw consent, the analytics script is removed when
          the page reloads. You can also clear the <code>caide-consent</code> entry by clearing this site&rsquo;s data in
          your browser, and we will ask again.
        </p>
        <p>
          We honor Global Privacy Control signals: if your browser sends one, we treat it as a refusal of marketing,
          whatever the panel says.
        </p>
      </>
    ),
  },
  {
    id: "external",
    title: "External sites",
    body: (
      <p>
        Our portfolio links to live client projects and other external websites. When you open them, they may set
        their own cookies under their own policies. Those cookies are not controlled by us.
      </p>
    ),
  },
  {
    id: "control",
    title: "Browser controls",
    body: (
      <>
        <p>
          You can also view, block, and delete cookies and site data in your browser settings at any time. These guides
          explain how in the most common browsers:
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
    title: "Laws we follow",
    body: (
      <>
        <p>Cookie and tracking rules differ by region. We follow the strictest of them, including:</p>
        <ul>
          <li>
            the EU ePrivacy Directive and GDPR, and the UK PECR and UK GDPR: nothing non-essential runs before you
            consent, and refusing is as easy as accepting;
          </li>
          <li>
            Brazil&rsquo;s LGPD, Canada&rsquo;s PIPEDA and Quebec Law 25, and similar laws that require clear notice and
            consent;
          </li>
          <li>
            US state privacy laws, such as California&rsquo;s CCPA/CPRA: we do not sell or share personal information for
            targeted advertising, and we recognize Global Privacy Control signals.
          </li>
        </ul>
        <p>
          More detail on how we handle personal information is in our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "If this changes",
    body: (
      <p>
        If we ever add a new tool that stores or reads information on your device, we will list it here first and ask
        for your consent before it runs, where the law requires it.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: <p>Questions about this policy can be sent to {mail}.</p>,
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      doc="cookies"
      eyebrow="Legal · Cookies"
      title="Only what helps,"
      accent="only with your yes."
      intro="What this site stores on your device, the cookie-free analytics we use only if you agree, and how to change your choice at any time."
      updated="1 November 2026"
      summary={[
        "No advertising trackers, ever. No profiles, no data sales.",
        "Analytics are cookie-free and run only after you accept.",
        "One small entry on your device remembers your choice.",
        "Change your mind any time with Cookie settings in the footer.",
      ]}
      sections={sections}
    />
  );
}
