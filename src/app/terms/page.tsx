import type { Metadata } from "next";
import Link from "next/link";
import { legalMetadata } from "@/i18n/metadata";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = legalMetadata("terms", "Terms of Service — CAIDE", "The terms governing access to and use of the CAIDE website.");

const EMAIL = "contact@caide.agency";
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Acceptance of these terms",
    body: (
      <>
        <p>
          The following Terms of Service (the &ldquo;Terms&rdquo;) govern access to and use of this website, which is
          operated by <strong>CAIDE Operations</strong>, an independent software engineering practice within the
          Kryptyk / AP Division (&ldquo;CAIDE&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). Services are offered
          worldwide, and these Terms are intended to operate alongside the consumer and commercial laws of the
          jurisdictions from which the website is accessed.
        </p>
        <p>
          By accessing or using the website, the user (&ldquo;you&rdquo;) acknowledges having read and accepted these
          Terms. Any person who does not accept these Terms must not access or use the website.
        </p>
        <p>
          The <Link href="/privacy">Privacy Policy</Link>, the <Link href="/cookies">Cookie Policy</Link> and the{" "}
          <Link href="/refunds">Refund Policy</Link> form an integral part of these Terms. Client engagements are
          additionally governed by the <Link href="/msa">Master Services Agreement</Link> and, where personal data is
          processed on a client&rsquo;s behalf, the <Link href="/dpa">Data Processing Agreement</Link>.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "Informational nature of the website",
    body: (
      <>
        <p>
          The content of the website describes our services and prior work for general informational purposes only.
          No content on the website constitutes an offer, quotation, or guarantee of availability, pricing, timelines,
          or results. Examples, figures, and system diagrams presented on the website, including those in the
          &ldquo;How it works&rdquo; section, are illustrative models and do not represent data from any specific
          client.
        </p>
        <p>
          Every engagement is governed by a separate written agreement, namely the{" "}
          <Link href="/msa">Master Services Agreement</Link> together with a proposal or statement of work. In the
          event of any conflict between such an agreement and these Terms, the agreement shall prevail.
        </p>
        <p>
          The submission of a project brief through the website does not create a contract and does not oblige either
          party to enter into an engagement. You shall submit only information that you are entitled to disclose, and
          no confidential information that you are not prepared to disclose. Briefs are handled as set out in the{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "contact-consent",
    title: "Communications following a brief",
    body: (
      <>
        <p>
          By submitting a brief and ticking the consent box, you consent to being contacted regarding that brief and
          the services to which it relates, using the contact details you provide: by email and, where a telephone
          number is provided, by WhatsApp, text message, or telephone call. Certain calls and messages may be handled
          by our AI assistant using an AI-generated voice or text, and this will be disclosed at the start of any such
          interaction.
        </p>
        <p>
          This consent may be withdrawn at any time by replying &ldquo;STOP&rdquo; to a message, by stating so during a
          call, by using the unsubscribe link in our emails, or by writing to {mail}. Upon withdrawal, contact through
          the relevant channel shall cease. Standard carrier message and data rates may apply. Consent is not a
          condition of purchasing any service.
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
          The design, text, graphics, animations, source code, and the CAIDE name and logo are the property of CAIDE or
          its licensors and are protected by intellectual property laws. You are permitted to view the website and to
          share links to it. Any copying, reproduction, republication, or creation of derivative works from its content
          or design for commercial purposes without prior written permission is prohibited.
        </p>
        <p>
          Projects displayed in the portfolio, including their names, logos, screenshots, and content, are the property
          of their respective owners and are displayed solely to evidence work to which CAIDE contributed. Their display
          grants no right of use to any third party.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>
          The website may be used only for lawful purposes and in good faith. Any use of the website, its brief form,
          or any channel through which we communicate with you in a manner infringing the following policies is
          prohibited. In particular, you shall not:
        </p>
        <ul>
          <li>violate any law or regulation, or infringe any intellectual property, privacy, or other right of any person;</li>
          <li>use the website for fraud, phishing, scams, impersonation, money laundering, or any other deceptive or criminal activity;</li>
          <li>attempt to gain unauthorized access to the website, its hosting, or related systems, or probe, scan, or test their security without prior written permission;</li>
          <li>introduce malware or interfere with the operation of the website, including by denial-of-service attacks;</li>
          <li>scrape or harvest the website at a volume that degrades its availability, or copy it to build a competing or imitative service;</li>
          <li>use the website, its brief form, or our contact details to send unsolicited, automated, or misleading messages;</li>
          <li>submit content that is unlawful, defamatory, harassing, or hateful, that sexually exploits minors, or that contains personal data of others which you have no right to disclose;</li>
          <li>misrepresent your identity or the identity of any person or organization on whose behalf you act.</li>
        </ul>
        <p>
          Where we reasonably believe that these policies have been infringed, we reserve the right to block access,
          disregard or delete briefs, cease communication, and report the activity to the competent authorities.
        </p>
      </>
    ),
  },
  {
    id: "lawful-projects",
    title: "Prohibited engagements",
    body: (
      <>
        <p>
          CAIDE undertakes work for lawful purposes only. We reserve the right to decline any brief, and to suspend or
          terminate any engagement at any stage, where we reasonably believe it is intended for an illegal, fraudulent,
          deceptive, or harmful purpose. Such purposes include, without limitation: scams or phishing; malware or tools
          designed to gain unauthorized access to systems; websites that impersonate another person or brand; the sale
          of illegal goods or services; unlicensed gambling; content that sexually exploits minors; and material that
          promotes violence or hatred.
        </p>
        <p>
          Clients remain solely responsible for the content they supply and for the lawful use of all deliverables,
          including holding any licences and permissions required by their business. CAIDE accepts no responsibility for
          the use of any deliverable by a client or third party after delivery and does not assess a client&rsquo;s
          business for legal compliance.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnification",
    body: (
      <p>
        To the extent permitted by law, you shall indemnify CAIDE against all claims, losses, fines, and reasonable
        legal costs arising from your breach of these Terms, your violation of any law in connection with the website,
        or your submission of content or data which you had no right to submit. This indemnity does not apply to losses
        caused by our own fault and does not limit any non-waivable right available to you as a consumer.
      </p>
    ),
  },
  {
    id: "ai-and-advice",
    title: "Use of AI and absence of professional advice",
    body: (
      <p>
        Parts of the website and of our communications, including replies, proposals, mock-ups, and calls, may be
        prepared or handled with the assistance of AI tools and are reviewed by our team where material. Content on the
        website and in preliminary communications constitutes general information only and does not constitute legal,
        tax, financial, or other professional advice, and shall not be relied upon as such.
      </p>
    ),
  },
  {
    id: "security-reports",
    title: "Reporting of abuse and security vulnerabilities",
    body: (
      <p>
        Any person who identifies a security vulnerability in the website, or observes its misuse, is requested to
        report it to {mail} and to refrain from further testing or exploitation. Reports made in good faith will be
        investigated.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "Third-party websites",
    body: (
      <p>
        The website contains links to external websites, including live client projects. CAIDE does not control and is
        not responsible for the content, availability, or practices of such websites. Access to them is at your own
        discretion and subject to their respective terms.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer of warranties",
    body: (
      <p>
        The website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the fullest extent
        permitted by law, CAIDE makes no warranty of any kind, express or implied, concerning the website, including any
        warranty of accuracy, fitness for a particular purpose, or uninterrupted or error-free operation.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>
          To the fullest extent permitted by law, CAIDE shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages, or for any loss of profits, data, or goodwill, arising from the use of, or
          inability to use, the website. As the website is provided free of charge, the total liability of CAIDE arising
          from the website is limited to one hundred US dollars (USD 100).
        </p>
        <p>
          Nothing in these Terms limits any liability that cannot be limited by law, including liability for fraud or,
          where applicable, for death or personal injury caused by negligence, and nothing affects any non-waivable
          right available to you as a consumer.
        </p>
      </>
    ),
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: (
      <p>
        These Terms are governed by the laws of the jurisdiction in which CAIDE Operations is established, without
        regard to its conflict-of-law rules. Where you use the website as a consumer, you retain the protection of the
        mandatory laws of your country of residence, including any right to bring proceedings before your local courts
        where such law provides it (for example, in the European Union, the United Kingdom, Australia, or Brazil).
        Before initiating any formal dispute, you agree to notify CAIDE at {mail} and to allow 30 days for an informal
        resolution.
      </p>
    ),
  },
  {
    id: "international",
    title: "International use",
    body: (
      <>
        <p>
          The website is accessible worldwide; however, CAIDE makes no representation that its content is appropriate
          or lawful in every jurisdiction. Persons accessing the website from outside the jurisdiction in which CAIDE is
          established do so on their own initiative and are responsible for compliance with local law.
        </p>
        <p>
          CAIDE complies with applicable export control and sanctions laws and does not provide services to any person
          or organization where doing so would breach such laws.
        </p>
        <p>
          These Terms are drafted in English. Where a translation is provided, the English version prevails in the event
          of any inconsistency, unless local law requires otherwise.
        </p>
      </>
    ),
  },
  {
    id: "general",
    title: "General provisions",
    body: (
      <ul>
        <li>
          <strong>Force majeure:</strong> CAIDE shall not be liable for any delay or failure caused by events beyond its
          reasonable control, including outages of hosting providers, network failures, or natural disasters.
        </li>
        <li>
          <strong>No waiver:</strong> any failure or delay in enforcing a provision of these Terms shall not constitute
          a waiver of the right to enforce it.
        </li>
        <li>
          <strong>Assignment:</strong> CAIDE may assign these Terms as part of a reorganization or sale of the business,
          provided that your rights under them are not diminished.
        </li>
        <li>
          <strong>Severability:</strong> if any provision of these Terms is held unenforceable, the remaining provisions
          shall continue in full force and effect.
        </li>
        <li>
          <strong>Entire agreement:</strong> these Terms, together with the policies incorporated by reference above,
          constitute the entire agreement between you and CAIDE concerning use of the website.
        </li>
      </ul>
    ),
  },
  {
    id: "changes",
    title: "Amendments",
    body: (
      <p>
        CAIDE may amend these Terms as the website and its services evolve. The &ldquo;Last updated&rdquo; date
        identifies the version in force. Continued use of the website following an amendment constitutes acceptance of
        the amended Terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: <p>Enquiries concerning these Terms may be addressed to {mail}.</p>,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      doc="terms"
      eyebrow="Legal · Terms"
      title="Terms of"
      accent="Service."
      intro="The following document sets out the terms governing access to and use of this website. Client engagements are governed by the Master Services Agreement."
      updated="10 November 2026"
      summary={[
        "The website is informational and does not constitute a binding offer.",
        "Every engagement is governed by the Master Services Agreement and a statement of work.",
        "Submitting a brief authorizes contact regarding that brief by email, WhatsApp, or telephone, revocable at any time.",
        "The website's design and code belong to CAIDE; portfolio projects belong to their owners.",
        "Use of the website in a manner infringing the acceptable use policy is prohibited.",
        "CAIDE may decline or terminate any engagement intended for an unlawful purpose.",
      ]}
      sections={sections}
    />
  );
}
