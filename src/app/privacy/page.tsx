import type { Metadata } from "next";
import Link from "next/link";
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
          This website is operated by <strong>CAIDE Operations</strong>, an independent software engineering practice
          within the Kryptyk / AP Division (&ldquo;CAIDE&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). We build
          websites, applications, automations, backends, and integrations for clients worldwide. For the purposes of
          data protection law, CAIDE Operations is the controller of the personal information described in this
          policy.
        </p>
        <p>
          This policy explains what personal information we handle when you visit this website or contact us, why we
          handle it, and the choices and rights you have, wherever you are. It is written to meet the requirements of
          the major privacy laws worldwide, with region-specific details in the section on regional rights. For personal information we process on behalf of clients as
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
          This website has no advertising or tracking pixels and does not build profiles of visitors. Our fonts and
          images are served from the site itself. If you agree in the cookie panel, we use Cloudflare Web Analytics, which
          counts page views and measures page speed without cookies, local storage, or fingerprinting. If you do not
          agree, it never loads. Details are in our <Link href="/cookies">Cookie Policy</Link>.
        </p>
        <p>
          Like any web host, our hosting providers (Cloudflare, and GitHub Pages for earlier versions of the site)
          receive technical data needed to deliver and protect the pages, such as your IP address, browser user agent,
          and the time of the request, and may keep it in server logs for security and reliability purposes. They handle
          this data under the{" "}
          <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">
            Cloudflare Privacy Policy
          </a>{" "}
          and the{" "}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
            GitHub General Privacy Statement
          </a>
          . We do not use these logs to identify visitors.
        </p>
        <h3>When you send a project brief</h3>
        <p>
          The project brief form at the bottom of the home page asks for: what you need, your business name, location,
          industry, and current website, your timeline, brand status, budget range, a description of your idea, and your
          name, email address, phone number, and preferred way to be contacted. Your current website, brand status, budget,
          and phone number are optional. We use the brief only to understand your project and reply to you.
        </p>
        <p>
          To keep automated spam out, the last step of the form may run Cloudflare Turnstile, a security check that does
          not read what you type into the form. If you also tick the box to receive occasional updates, we record that
          consent and the date you gave it.
        </p>
        <h3>When you contact us</h3>
        <p>
          If you email us directly, we receive what you choose to send: typically your
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
              <td>Reading your project brief, replying, and preparing a proposal</td>
              <td>Steps you asked us to take before entering a contract</td>
            </tr>
            <tr>
              <td>Sending occasional updates about our work, only if you ticked that box</td>
              <td>Your consent, which you can withdraw at any time</td>
            </tr>
            <tr>
              <td>Understanding which pages help visitors, through cookie-free analytics, only if you accepted</td>
              <td>Your consent, which you can withdraw at any time with Cookie settings</td>
            </tr>
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
              <td>Keeping the website, the brief form, and our systems secure, including spam protection</td>
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
          <li>
            Cloudflare, to host and protect this website, check form submissions for spam (Turnstile), deliver your
            brief to our inbox, store it securely, and, only with your consent, provide cookie-free analytics;
          </li>
          <li>our code-hosting provider (GitHub), to build this website and client projects;</li>
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
          <strong>Project briefs and enquiries that do not become projects:</strong> up to 24 months after our last
          exchange, then deleted.
        </li>
        <li>
          <strong>Client project records:</strong> for the length of the engagement and up to 3 years after it ends, so
          we can support the work we delivered.
        </li>
        <li>
          <strong>Update consent:</strong> until you unsubscribe or ask us to stop, plus a record of when you consented
          and withdrew.
        </li>
        <li>
          <strong>Analytics:</strong> only aggregated totals, which do not identify you, kept as Cloudflare Web Analytics
          retains them.
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
        <p>Wherever you live, you have the right to:</p>
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
          month, or sooner where your local law requires it (for example, 15 days under Brazil&rsquo;s LGPD), and tell
          you if we need longer. You can always complain to your local data protection authority.
        </p>
      </>
    ),
  },
  {
    id: "regional",
    title: "Regional rights",
    body: (
      <>
        <p>
          We apply the same high standard to everyone, and the rights above are available to all visitors. Where a
          local law gives you more, that law applies. In particular:
        </p>
        <ul>
          <li>
            <strong>European Economic Area, United Kingdom, and Switzerland</strong> (GDPR, UK GDPR, and the Swiss
            FADP): you have every right listed above, including the right to object to processing based on legitimate
            interests and to lodge a complaint with your data protection authority.
          </li>
          <li>
            <strong>United States</strong> (California CCPA/CPRA, and the comprehensive privacy laws of Virginia,
            Colorado, Connecticut, Utah, Texas, Oregon, and other states): you can request access, correction,
            deletion, and portability, and appeal our decision if we decline a request. We do not sell personal
            information, share it for targeted advertising, or use it for profiling, and we do not collect sensitive
            personal information through this site. In the 12 months before this policy was last updated, we collected
            only identifiers and commercial information you sent us, plus, with your consent, aggregated usage data that
            does not identify you, for the purposes listed above.
          </li>
          <li>
            <strong>Canada</strong> (PIPEDA and Quebec Law 25): you can access and correct your information and
            withdraw consent, and you can complain to the Office of the Privacy Commissioner of Canada or the Commission
            d&rsquo;accès à l&rsquo;information du Québec.
          </li>
          <li>
            <strong>Brazil</strong> (LGPD): you can confirm processing, access, correct, anonymize, port, or delete
            your data, and complain to the ANPD.
          </li>
          <li>
            <strong>Mexico and the rest of Latin America</strong>: you can exercise your ARCO rights (access,
            rectification, cancellation, and opposition) and the equivalent rights under your local law.
          </li>
          <li>
            <strong>Australia and New Zealand</strong> (Privacy Act 1988 and Privacy Act 2020): you can access and
            correct your information and complain to the OAIC or the New Zealand Privacy Commissioner.
          </li>
          <li>
            <strong>Asia</strong> (including Japan&rsquo;s APPI, South Korea&rsquo;s PIPA, Singapore&rsquo;s PDPA,
            India&rsquo;s DPDP Act, and China&rsquo;s PIPL): you can access, correct, and delete your information and
            withdraw consent, as provided by your local law.
          </li>
          <li>
            <strong>South Africa and the rest of Africa</strong> (including POPIA, Nigeria&rsquo;s NDPA, and
            Kenya&rsquo;s Data Protection Act): you can access, correct, and object to processing of your information,
            and complain to your regulator.
          </li>
        </ul>
        <p>
          You can exercise any of these rights by writing to {mail}. You may also use an authorized agent where your
          local law allows. We will never charge you or treat you differently for making a request.
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
        We will update this policy when our practices change, for example if we add a new tool or provider. The
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
      updated="1 November 2026"
      summary={[
        "No ad trackers. Analytics are cookie-free and run only if you accept.",
        "We only receive what you send us in the brief form or by email.",
        "We never sell or share your data for advertising.",
        `You can access, correct, or delete your data any time by writing to ${EMAIL}.`,
      ]}
      sections={sections}
    />
  );
}
