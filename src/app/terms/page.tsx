import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use — CAIDE",
  description: "The terms that apply when you use the CAIDE website.",
};

const EMAIL = "hello@caide.dev";
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    body: (
      <>
        <p>
          These Terms of Use govern your use of this website, operated by <strong>CAIDE Operations</strong>, an
          independent software engineering practice within the Kryptyk / AP Division (&ldquo;CAIDE&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). We serve clients worldwide, and these terms are written to work
          alongside the consumer and business laws of the countries our visitors come from. By using the site you agree
          to them. If you do not agree, please do not use the site.
        </p>
        <p>
          Our <Link href="/privacy">Privacy Policy</Link> and <Link href="/cookies">Cookie Policy</Link> explain how we
          handle information and form part of these terms.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "Information, not an offer",
    body: (
      <>
        <p>
          The site describes our services and past work for general information. Nothing on it is an offer, quote, or
          guarantee of availability, pricing, timelines, or results. Examples, figures, and system diagrams on the site
          (including the &ldquo;Live systems&rdquo; console) are illustrative models, not data from a specific client.
        </p>
        <p>
          Any project we take on is governed by a separate written agreement, such as a proposal, statement of work, or
          services contract. If that agreement conflicts with these terms, the agreement wins.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <>
        <p>
          The site&rsquo;s design, text, graphics, animations, code, and the CAIDE name and logo belong to CAIDE or its
          licensors and are protected by intellectual property laws. You may view the site and share links to it. You
          may not copy, reproduce, republish, or create derivative works from its content or design for commercial
          purposes without our written permission.
        </p>
        <p>
          Projects shown in our portfolio, including their names, logos, screenshots, and content, belong to their
          respective owners and appear here to show work we contributed to. Their appearance does not grant you any
          right to use them.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>When using the site, you agree not to:</p>
        <ul>
          <li>break any law or infringe anyone&rsquo;s rights;</li>
          <li>attempt to gain unauthorized access to the site, its hosting, or related systems;</li>
          <li>introduce malware or interfere with the site&rsquo;s operation, for example through denial-of-service attacks;</li>
          <li>scrape or harvest the site at a volume that degrades it for others;</li>
          <li>use the site or our contact details to send spam or misleading messages.</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party websites",
    body: (
      <p>
        The site links to external websites, including live client projects. We do not control those sites and are not
        responsible for their content, availability, or practices. Visiting them is at your own discretion and subject
        to their own terms.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    body: (
      <p>
        We work to keep the site accurate and available, but it is provided &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo;. To the fullest extent permitted by law, we make no warranties of any kind, express or implied,
        about the site, including warranties of accuracy, fitness for a particular purpose, or uninterrupted, error-free
        operation.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>
          To the fullest extent permitted by law, CAIDE is not liable for any indirect, incidental, special,
          consequential, or punitive damages, or for loss of profits, data, or goodwill, arising from your use of, or
          inability to use, the site. Because the site is provided free of charge, our total liability arising from the
          site is limited to one hundred US dollars (USD 100).
        </p>
        <p>
          Nothing in these terms limits liability that cannot be limited by law, such as liability for fraud or, where
          applicable, for death or personal injury caused by negligence, and nothing affects rights you have as a
          consumer that cannot be waived.
        </p>
      </>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of the place where CAIDE Operations is based, without regard to its
        conflict-of-law rules. If you use the site as a consumer, you also keep the protection of the mandatory laws
        of the country where you live, including the right to bring proceedings in your local courts where that law
        provides it (for example, in the European Union, the United Kingdom, Australia, or Brazil). Before starting
        any formal dispute, we ask that you contact us at {mail} so we can try to resolve the issue informally within
        30 days.
      </p>
    ),
  },
  {
    id: "international",
    title: "International use",
    body: (
      <>
        <p>
          The site is available worldwide, but we do not claim that its content is appropriate or lawful in every
          country. If you access it from outside the place where we are based, you do so on your own initiative and
          are responsible for complying with your local laws.
        </p>
        <p>
          We comply with applicable export control and sanctions laws, and we do not provide services to people or
          organizations where that would breach those laws.
        </p>
        <p>
          These terms are written in English. If we provide a translation, the English version applies where they
          differ, unless your local law requires otherwise.
        </p>
      </>
    ),
  },
  {
    id: "general",
    title: "General",
    body: (
      <ul>
        <li>
          <strong>Force majeure:</strong> we are not responsible for delays or failures caused by events outside our
          reasonable control, such as outages of hosting providers, network failures, or natural disasters.
        </li>
        <li>
          <strong>No waiver:</strong> if we do not enforce a provision right away, we have not given up the right to
          enforce it later.
        </li>
        <li>
          <strong>Assignment:</strong> we may transfer these terms as part of a reorganization or sale of the business;
          your rights under them will not be reduced.
        </li>
        <li>
          <strong>Entire agreement:</strong> these terms, together with our Privacy Policy and Cookie Policy, are the
          whole agreement between you and us about use of the site.
        </li>
      </ul>
    ),
  },
  {
    id: "changes",
    title: "Changes",
    body: (
      <p>
        We may update these terms as the site and our services evolve. The &ldquo;Last updated&rdquo; date shows the
        current version, and continuing to use the site after a change means you accept the updated terms. If any part
        of these terms is found unenforceable, the rest stays in effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: <p>Questions about these terms can be sent to {mail}.</p>,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      doc="terms"
      eyebrow="Legal · Terms"
      title="The ground rules,"
      accent="kept clear."
      intro="The terms that apply when you use this website. Client projects are covered by their own written agreements."
      updated="1 November 2026"
      summary={[
        "The site is information about our services, not a binding offer.",
        "Every project runs under its own written agreement.",
        "Our design and code are ours; portfolio projects belong to their owners.",
        "Use the site lawfully and don't try to break it.",
      ]}
      sections={sections}
    />
  );
}
