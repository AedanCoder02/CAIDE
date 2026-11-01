import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy — CAIDE",
  description: "CAIDE's website sets no cookies and uses no tracking technologies.",
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
          This website does not set any cookies, and it does not use similar technologies such as local storage,
          tracking pixels, fingerprinting, or third-party analytics. That is why you do not see a cookie banner: there
          is nothing to consent to.
        </p>
        <p>
          This policy explains what cookies are, confirms what this site does and does not do, and tells you how we
          will handle it if that ever changes.
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
          session storage, and tracking pixels, can store or read information on your device in comparable ways. They
          are commonly grouped into:
        </p>
        <ul>
          <li>
            <strong>Strictly necessary:</strong> needed for a site to work, for example keeping you logged in or
            remembering a shopping cart.
          </li>
          <li>
            <strong>Preferences:</strong> remember choices such as language or theme.
          </li>
          <li>
            <strong>Analytics:</strong> measure how visitors use a site.
          </li>
          <li>
            <strong>Marketing:</strong> track visitors across sites to show targeted advertising.
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
              <th>Used on this site</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Strictly necessary cookies</td>
              <td>None</td>
            </tr>
            <tr>
              <td>Preference cookies</td>
              <td>None</td>
            </tr>
            <tr>
              <td>Analytics cookies or scripts</td>
              <td>None</td>
            </tr>
            <tr>
              <td>Marketing or advertising cookies</td>
              <td>None</td>
            </tr>
            <tr>
              <td>Local or session storage</td>
              <td>None</td>
            </tr>
          </tbody>
        </table>
        <p>
          Fonts, images, and scripts are served from this site&rsquo;s own domain, so loading a page does not cause your
          browser to contact third-party services that could set their own cookies.
        </p>
        <p>
          To show the site in your language, the page reads your browser&rsquo;s language and time zone settings on your
          device. They are not stored or sent anywhere. If you pick a language yourself, that choice is kept only in the
          page address (for example <code>?lang=es</code>), not in a cookie or storage.
        </p>
      </>
    ),
  },
  {
    id: "hosting",
    title: "Hosting",
    body: (
      <p>
        The site is hosted on GitHub Pages. Delivering any web page involves your browser sending technical information,
        such as your IP address, to the host. That is not a cookie, and GitHub handles it as described in our{" "}
        <Link href="/privacy">Privacy Policy</Link> and the{" "}
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
          GitHub General Privacy Statement
        </a>
        .
      </p>
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
    title: "Controlling cookies",
    body: (
      <>
        <p>
          You can view, block, and delete cookies in your browser settings at any time. These guides explain how in the
          most common browsers:
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
        <p>We also honor Global Privacy Control signals, although this site has no tracking for them to switch off.</p>
      </>
    ),
  },
  {
    id: "laws",
    title: "Laws we follow",
    body: (
      <>
        <p>
          Cookie and tracking rules differ by region. Because this site sets no cookies and uses no tracking, it
          already meets the strictest of them, including:
        </p>
        <ul>
          <li>the EU ePrivacy Directive and GDPR, and the UK PECR and UK GDPR, which require consent before
            non-essential cookies are set;</li>
          <li>Brazil&rsquo;s LGPD, Canada&rsquo;s PIPEDA and Quebec Law 25, and similar laws that require clear notice
            and consent;</li>
          <li>US state privacy laws, such as California&rsquo;s CCPA/CPRA, that give you the right to opt out of
            tracking for targeted advertising and recognize Global Privacy Control signals.</li>
        </ul>
      </>
    ),
  },
  {
    id: "changes",
    title: "If this changes",
    body: (
      <p>
        If we ever add cookies or similar technologies that are not strictly necessary, such as analytics, we will
        update this policy first and ask for your consent before setting them where the law requires it, with a clear
        way to accept, reject, or change your choice later.
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
      title="No cookies,"
      accent="no tracking."
      intro="This site sets no cookies and runs no trackers. Here is exactly what that means, and what would change if we ever added any."
      updated="1 November 2026"
      summary={[
        "This site sets zero cookies.",
        "No analytics, pixels, or local storage.",
        "No third-party scripts load while you browse.",
        "If that ever changes, we'll ask for your consent first.",
      ]}
      sections={sections}
    />
  );
}
