import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — CAIDE",
  description: "How CAIDE collects, uses, and protects personal information.",
};

const EMAIL = "hello@caide.dev";
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          CAIDE is a software engineering studio operating within the Kryptyk / AP Division (&ldquo;CAIDE&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). We build websites, applications, automations, backends, and integrations
          for clients.
        </p>
        <p>
          This policy explains what personal information we handle when you visit this website or contact us, why we
          handle it, and the choices and rights you have. For personal information we process on behalf of clients as
          part of a project, the client is the controller and our written agreement with that client governs the
          processing.
        </p>
        <p>For any privacy question or request, contact us at {mail}.</p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <>
        <h3>When you browse this site</h3>
        <p>
          This website has no analytics, no advertising or tracking pixels, no sign-up forms, and sets no cookies. Our
          fonts and images are served from the site itself, so your browser does not contact third-party font or
          analytics services while you read it.
        </p>
        <p>
          The site is hosted on GitHub Pages. Like any web host, GitHub receives technical data needed to deliver the
          pages, such as your IP address, browser user agent, and the time of the request, and may keep it in server
          logs for security and reliability purposes. GitHub handles this data under the{" "}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
            GitHub General Privacy Statement
          </a>
          . We do not receive these logs or use them to identify visitors.
        </p>
        <h3>When you contact us</h3>
        <p>
          If you email us or reach out through a link on this site, we receive what you choose to send: typically your
          name, email address, company, and details about your project. Please do not send sensitive information (such
          as health data or passwords) unless we have agreed a secure way to do so.
        </p>
        <h3>When you become a client</h3>
        <p>
          If we work together, we also keep business contact details, project communications, contracts, invoices, and
          payment records.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use it, and why",
    body: (
      <>
        <p>We use personal information only for these purposes:</p>
        <table className="legal-table">
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Legal basis (EU / UK GDPR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Replying to your message and discussing a potential project</td>
              <td>Steps you asked us to take before entering a contract, or our legitimate interest in answering enquiries</td>
            </tr>
            <tr>
              <td>Delivering and supporting a project, invoicing, and getting paid</td>
              <td>Performance of our contract with you</td>
            </tr>
            <tr>
              <td>Keeping accounting and tax records</td>
              <td>Compliance with legal obligations</td>
            </tr>
            <tr>
              <td>Keeping the website and our systems secure</td>
              <td>Our legitimate interest in protecting our services</td>
            </tr>
          </tbody>
        </table>
        <p>
          We do not sell personal information, we do not share it for cross-context behavioral advertising, and we do
          not use it for automated decision-making that has legal or similarly significant effects on you.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>We share personal information only with service providers that help us run the studio, such as:</p>
        <ul>
          <li>our email and file-storage providers, to receive and keep correspondence;</li>
          <li>our hosting and code-hosting providers (including GitHub), to run this website and client projects;</li>
          <li>our accounting and payment providers, to invoice and get paid;</li>
          <li>professional advisers such as accountants and lawyers, when needed.</li>
        </ul>
        <p>
          These providers may only use the information to provide their service to us. We may also disclose information
          if the law requires it, to protect our rights, or as part of a business transfer such as a merger, in which
          case this policy will continue to apply to it.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    body: (
      <p>
        Some of our providers process data in the United States and other countries outside your own. Where EU or UK
        data protection law applies, we rely on recognized transfer safeguards such as adequacy decisions (including the
        EU-U.S. Data Privacy Framework where the provider is certified) or the European Commission&rsquo;s Standard
        Contractual Clauses and the UK Addendum. You can ask us for more information about these safeguards.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <ul>
        <li>
          <strong>Enquiries that do not become projects:</strong> up to 24 months after our last exchange, then deleted.
        </li>
        <li>
          <strong>Client project records:</strong> for the length of the engagement and up to 3 years after it ends, so
          we can support the work we delivered.
        </li>
        <li>
          <strong>Contracts, invoices, and payment records:</strong> for as long as tax and accounting laws require.
        </li>
      </ul>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>access the personal information we hold about you and get a copy of it;</li>
          <li>correct information that is inaccurate or incomplete;</li>
          <li>have your information deleted;</li>
          <li>restrict or object to how we process it, including processing based on legitimate interests;</li>
          <li>receive your information in a portable format;</li>
          <li>withdraw consent at any time, where we rely on consent;</li>
          <li>not be discriminated against for exercising any of these rights.</li>
        </ul>
        <p>
          <strong>California residents:</strong> under the CCPA as amended by the CPRA, you have the rights to know,
          delete, and correct personal information, and to opt out of its sale or sharing. We do not sell or share
          personal information as those terms are defined, and we honor Global Privacy Control signals.
        </p>
        <p>
          To exercise a right, email {mail}. We may need to confirm your identity before acting. We answer within one
          month (or 45 days where the CCPA applies), and tell you if we need longer. If you are in the EU or UK, you
          can also complain to your local data protection authority.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We use appropriate technical and organizational measures to protect personal information, including encrypted
        connections (HTTPS), access controls and two-factor authentication on our accounts, and least-privilege access
        to client systems. No method of transmission or storage is completely secure, so we cannot guarantee absolute
        security, but we will notify you and the relevant authorities of a breach where the law requires it.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        This website and our services are intended for businesses and adults. We do not knowingly collect personal
        information from anyone under 16. If you believe a child has sent us personal information, contact us and we
        will delete it.
      </p>
    ),
  },
  {
    id: "links",
    title: "Other websites",
    body: (
      <p>
        This site links to projects we have built and to other external websites. Those sites are run by their own
        owners and have their own privacy practices. This policy does not cover them, so please review their policies
        when you visit.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We will update this policy when our practices change, for example if we add analytics or a contact form. The
        &ldquo;Last updated&rdquo; date at the top shows the current version. If a change is significant, we will make
        it clear on this page before it takes effect.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      doc="privacy"
      eyebrow="Legal · Privacy"
      title="Your data,"
      accent="handled with care."
      intro="What we collect, why, who sees it, and the rights you have over it. Written to be read, not skimmed past."
      updated="31 October 2026"
      summary={[
        "This site uses no analytics, no tracking, and no cookies.",
        "We only receive what you send us when you get in touch.",
        "We never sell or share your data for advertising.",
        `You can access, correct, or delete your data any time by writing to ${EMAIL}.`,
      ]}
      sections={sections}
    />
  );
}
