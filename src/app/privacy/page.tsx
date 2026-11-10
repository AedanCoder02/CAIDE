import type { Metadata } from "next";
import Link from "next/link";
import { legalMetadata } from "@/i18n/metadata";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = legalMetadata("privacy", "Privacy Policy — CAIDE", "How CAIDE collects, uses, discloses, and protects personal information.");

const EMAIL = "contact@caide.agency";
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Identity of the controller",
    body: (
      <>
        <p>
          This website is operated by <strong>CAIDE Operations</strong>, an independent software engineering practice
          within the Kryptyk / AP Division (&ldquo;CAIDE&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), which provides
          websites, applications, automations, backends, and integrations to clients worldwide. For the purposes of
          applicable data protection law, CAIDE Operations is the controller of the personal information described in
          this Privacy Policy.
        </p>
        <p>
          The following is a detailed statement of the personal information processed when this website is visited or
          when CAIDE is contacted, the purposes and legal bases of that processing, and the rights available to data
          subjects in every jurisdiction. It is drafted to satisfy the requirements of the principal data protection
          laws worldwide, with jurisdiction-specific provisions set out under Regional rights. Where personal
          information is processed on behalf of a client as part of an engagement, the client is the controller and
          the processing is governed by the <Link href="/dpa">Data Processing Agreement</Link>.
        </p>
        <p>All privacy enquiries and requests shall be addressed to {mail}.</p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "Personal information collected",
    body: (
      <>
        <h3>Browsing the website</h3>
        <p>
          The website contains no advertising or tracking pixels and does not profile visitors. Fonts and images are
          served from the website itself. Subject to consent given in the cookie panel, Cloudflare Web Analytics is used
          to count page views and measure page performance without cookies, local storage, or fingerprinting. Where
          consent is not given, this service is not loaded. Further detail is provided in the{" "}
          <Link href="/cookies">Cookie Policy</Link>.
        </p>
        <p>
          The hosting providers of the website (Cloudflare, and GitHub Pages for earlier versions) necessarily receive
          the technical data required to deliver and protect its pages, including IP address, browser user agent, and
          time of request, and may retain such data in server logs for security and reliability purposes. This data is
          processed under the{" "}
          <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">
            Cloudflare Privacy Policy
          </a>{" "}
          and the{" "}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
            GitHub General Privacy Statement
          </a>
          . CAIDE does not use these logs to identify visitors.
        </p>
        <h3>Submission of a project brief</h3>
        <p>
          The project brief form collects: the services required; business name, location, industry, and current
          website; timeline, brand status, and budget range; a description of the project; and name, email address,
          telephone number, and preferred contact method. Current website, brand status, budget, and telephone number
          are optional. Briefs are used solely to assess the project described and to respond to the submitter.
        </p>
        <p>
          To prevent automated abuse, the final step of the form may run Cloudflare Turnstile, a security check which
          does not read the content entered in the form. Where the box to receive occasional updates is ticked, that
          consent and the date on which it was given are recorded.
        </p>
        <h3>Direct correspondence</h3>
        <p>
          Where CAIDE is contacted by email, the information voluntarily provided is received, typically name, email
          address, company, and project details. Sensitive information (such as health data or passwords) shall not be
          sent unless a secure method of transfer has been agreed in advance.
        </p>
        <h3>Client engagements</h3>
        <p>
          Upon entering into an engagement, CAIDE additionally retains business contact details, project
          communications, contracts, invoices, and payment records.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "Purposes and legal bases of processing",
    body: (
      <>
        <p>Personal information is processed solely for the following purposes:</p>
        <table className="legal-table">
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Legal basis (EU / UK GDPR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Assessment of project briefs, response, and preparation of proposals</td>
              <td>Steps taken at the data subject&rsquo;s request prior to entering into a contract</td>
            </tr>
            <tr>
              <td>Occasional updates on CAIDE&rsquo;s work, only where expressly requested</td>
              <td>Consent, revocable at any time</td>
            </tr>
            <tr>
              <td>Cookie-free measurement of page usage and performance, only where accepted</td>
              <td>Consent, revocable at any time through Cookie settings</td>
            </tr>
            <tr>
              <td>Response to correspondence and discussion of prospective engagements</td>
              <td>Pre-contractual steps at the data subject&rsquo;s request, or the legitimate interest of CAIDE in answering enquiries</td>
            </tr>
            <tr>
              <td>Delivering and supporting a project, invoicing, and getting paid</td>
              <td>Performance of a contract</td>
            </tr>
            <tr>
              <td>Keeping accounting and tax records</td>
              <td>Compliance with legal obligations</td>
            </tr>
            <tr>
              <td>Security of the website, the brief form, and CAIDE&rsquo;s systems, including abuse prevention</td>
              <td>Legitimate interest of CAIDE in protecting its services</td>
            </tr>
          </tbody>
        </table>
        <p>
          CAIDE does not sell personal information, does not share it for cross-context behavioral advertising, and does
          not subject it to automated decision-making producing legal or similarly significant effects.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Disclosure to third parties",
    body: (
      <>
        <p>Personal information is disclosed only to the following categories of service providers acting on behalf of CAIDE:</p>
        <ul>
          <li>email and file-storage providers, for the receipt and retention of correspondence;</li>
          <li>
            Cloudflare, for hosting and protecting the website, screening form submissions for abuse (Turnstile),
            storing briefs securely, and, subject to consent, cookie-free analytics;
          </li>
          <li>the code-hosting provider (GitHub), for building the website and client deliverables;</li>
          <li>accounting and payment providers, for invoicing and the collection of payments;</li>
          <li>professional advisers, such as accountants and lawyers, where required.</li>
        </ul>
        <p>
          Such providers may use the information solely to provide their services to CAIDE. Information may also be
          disclosed where required by law, for the protection of the rights of CAIDE, or in connection with a business
          transfer such as a merger, in which case this Privacy Policy shall continue to apply to it.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    body: (
      <p>
        Certain providers process data in the United States and in other countries outside the data subject&rsquo;s
        own. Where EU or UK data protection law applies, transfers rely on recognized safeguards, namely adequacy
        decisions (including the EU-U.S. Data Privacy Framework where the provider is certified) or the European
        Commission&rsquo;s Standard Contractual Clauses and the UK Addendum. Information on these safeguards is available
        on request.
      </p>
    ),
  },
  {
    id: "retention",
    title: "Retention periods",
    body: (
      <ul>
        <li>
          <strong>Briefs and enquiries not resulting in an engagement:</strong> up to 24 months after the last
          communication, followed by deletion.
        </li>
        <li>
          <strong>Client engagement records:</strong> for the duration of the engagement and up to 3 years after its
          end, for the support of delivered work.
        </li>
        <li>
          <strong>Consent to updates:</strong> until withdrawn, together with a record of the dates of consent and
          withdrawal.
        </li>
        <li>
          <strong>Analytics:</strong> aggregated, non-identifying totals only, retained in accordance with Cloudflare
          Web Analytics.
        </li>
        <li>
          <strong>Contracts, invoices, and payment records:</strong> for the period required by tax and accounting
          law.
        </li>
      </ul>
    ),
  },
  {
    id: "your-rights",
    title: "Rights of data subjects",
    body: (
      <>
        <p>Irrespective of place of residence, every data subject has the right to:</p>
        <ul>
          <li>access the personal information held about them and obtain a copy of it;</li>
          <li>correct information that is inaccurate or incomplete;</li>
          <li>obtain the deletion of that information;</li>
          <li>restrict or object to its processing, including processing based on legitimate interests;</li>
          <li>receive that information in a portable format;</li>
          <li>withdraw consent at any time, where processing is based on consent;</li>
          <li>not be discriminated against for exercising any of these rights.</li>
        </ul>
        <p>
          <strong>California residents:</strong> under the CCPA as amended by the CPRA, residents have the rights to
          know, delete, and correct personal information, and to opt out of its sale or sharing. CAIDE does not sell or
          share personal information as those terms are defined and honors Global Privacy Control signals.
        </p>
        <p>
          Requests to exercise any right shall be sent to {mail}. Verification of identity may be required before a
          request is actioned. Requests are answered within one month, or within any shorter period required by local
          law (for example, 15 days under Brazil&rsquo;s LGPD), and any extension will be notified. Every data subject
          retains the right to lodge a complaint with the competent data protection authority.
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
          The standard set out above applies to all visitors. Where local law confers additional rights, that law
          prevails. In particular:
        </p>
        <ul>
          <li>
            <strong>European Economic Area, United Kingdom, and Switzerland</strong> (GDPR, UK GDPR, and the Swiss
            FADP): data subjects hold every right listed above, including the right to object to processing based on
            legitimate interests and to lodge a complaint with the competent data protection authority.
          </li>
          <li>
            <strong>United States</strong> (California CCPA/CPRA, and the comprehensive privacy laws of Virginia,
            Colorado, Connecticut, Utah, Texas, Oregon, and other states): residents may request access, correction,
            deletion, and portability, and may appeal any refusal. CAIDE does not sell personal information, share it
            for targeted advertising, or use it for profiling, and does not collect sensitive personal information
            through the website. In the 12 months preceding the last update of this policy, CAIDE collected only
            identifiers and commercial information submitted by data subjects, plus, with consent, aggregated usage data that
            does not identify you, for the purposes listed above.
          </li>
          <li>
            <strong>Canada</strong> (PIPEDA and Quebec Law 25): data subjects may access and correct their information,
            withdraw consent, and lodge a complaint to the Office of the Privacy Commissioner of Canada or the Commission
            d&rsquo;accès à l&rsquo;information du Québec.
          </li>
          <li>
            <strong>Brazil</strong> (LGPD): data subjects may confirm processing and access, correct, anonymize, port,
            or delete their data, and may lodge a complaint with the ANPD.
          </li>
          <li>
            <strong>Mexico and the rest of Latin America</strong>: data subjects may exercise their ARCO rights (access,
            rectification, cancellation, and opposition) and the equivalent rights under local law.
          </li>
          <li>
            <strong>Australia and New Zealand</strong> (Privacy Act 1988 and Privacy Act 2020): data subjects may access
            and correct their information and lodge a complaint with the OAIC or the New Zealand Privacy Commissioner.
          </li>
          <li>
            <strong>Asia</strong> (including Japan&rsquo;s APPI, South Korea&rsquo;s PIPA, Singapore&rsquo;s PDPA,
            India&rsquo;s DPDP Act, and China&rsquo;s PIPL): data subjects may access, correct, and delete their
            information and withdraw consent, as provided by local law.
          </li>
          <li>
            <strong>South Africa and the rest of Africa</strong> (including POPIA, Nigeria&rsquo;s NDPA, and
            Kenya&rsquo;s Data Protection Act): data subjects may access, correct, and object to processing of
            their information, and lodge a complaint with the competent regulator.
          </li>
        </ul>
        <p>
          Any of these rights may be exercised by writing to {mail}, or through an authorized agent where local law
          permits. No fee is charged and no less favorable treatment results from the exercise of any right.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        CAIDE implements appropriate technical and organizational measures to protect personal information, including
        encrypted connections (HTTPS), rate limiting and abuse screening on form submissions, access controls and two-factor
        authentication on all accounts, and least-privilege access to client systems. As no method of transmission or
        storage is entirely secure, absolute security cannot be guaranteed; affected data subjects and the competent
        authorities will be notified of any breach where required by law.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        The website and the services of CAIDE are intended for businesses and adults. CAIDE does not knowingly collect
        personal information from any person under the age of 16. Any such information brought to our attention will
        be deleted.
      </p>
    ),
  },
  {
    id: "links",
    title: "Third-party websites",
    body: (
      <p>
        The website links to client projects and other external websites, which are operated by their respective
        owners under their own privacy practices. This Privacy Policy does not extend to such websites, and their
        policies should be reviewed on access.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Amendments to this policy",
    body: (
      <p>
        This Privacy Policy will be amended whenever CAIDE&rsquo;s practices change, including upon the addition of a
        new tool or provider. The &ldquo;Last updated&rdquo; date identifies the version in force. Material amendments
        will be indicated on this page before they take effect.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      doc="privacy"
      eyebrow="Legal · Privacy"
      title="Privacy"
      accent="Policy."
      intro="The following is a detailed statement of the personal information CAIDE processes, the purposes and legal bases of that processing, its recipients, and the rights of data subjects."
      updated="10 November 2026"
      summary={[
        "No advertising trackers are used; analytics are cookie-free and load only with consent.",
        "Only information submitted through the brief form or by email is received.",
        "Personal information is never sold or shared for advertising.",
        `Rights of access, correction, and deletion may be exercised at any time via ${EMAIL}.`,
      ]}
      sections={sections}
    />
  );
}
