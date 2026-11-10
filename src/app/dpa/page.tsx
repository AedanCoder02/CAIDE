import type { Metadata } from "next";
import Link from "next/link";
import { legalMetadata } from "@/i18n/metadata";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = legalMetadata("dpa", "Data Processing Agreement — CAIDE", "The terms on which CAIDE processes personal data on behalf of its clients.");

const EMAIL = "contact@caide.agency";
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "Scope and roles",
    body: (
      <>
        <p>
          The following Data Processing Agreement (the &ldquo;DPA&rdquo;) forms part of the{" "}
          <Link href="/msa">Master Services Agreement</Link> between <strong>CAIDE Operations</strong>
          (&ldquo;CAIDE&rdquo;, the &ldquo;Processor&rdquo;) and the client (the &ldquo;Controller&rdquo;). It applies
          wherever CAIDE processes personal data on behalf of the Controller in the course of an engagement, including
          in websites, booking systems, chat assistants, automations, and databases that CAIDE builds, hosts, or
          maintains.
        </p>
        <p>
          The DPA is drafted to meet the requirements of Article 28 of the EU and UK General Data Protection
          Regulations and of equivalent laws worldwide, including the CCPA/CPRA (under which CAIDE acts as a
          &ldquo;service provider&rdquo;), Brazil&rsquo;s LGPD, and Canada&rsquo;s PIPEDA. Where personal data is
          processed by CAIDE for its own purposes, the <Link href="/privacy">Privacy Policy</Link> applies instead.
        </p>
      </>
    ),
  },
  {
    id: "details",
    title: "Details of processing",
    body: (
      <table className="legal-table">
        <tbody>
          <tr>
            <td>Subject matter and duration</td>
            <td>The services described in the SOW, for the duration of the engagement and the return or deletion period below.</td>
          </tr>
          <tr>
            <td>Nature and purpose</td>
            <td>Hosting, storage, transmission, and processing of data necessary to build, operate, and support the deliverables.</td>
          </tr>
          <tr>
            <td>Categories of data subjects</td>
            <td>The Controller&rsquo;s customers, website visitors, prospects, and staff, as specified in the SOW.</td>
          </tr>
          <tr>
            <td>Categories of personal data</td>
            <td>Contact and identification data, booking and transaction details, communications content, and technical data, as specified in the SOW. Special categories of data are processed only where the SOW expressly provides for them.</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: "instructions",
    title: "Processing on documented instructions",
    body: (
      <p>
        CAIDE processes personal data only on the documented instructions of the Controller, as set out in the MSA, the
        SOW, and written communications, unless required to do otherwise by law, in which case CAIDE shall inform the
        Controller before processing unless the law prohibits it. CAIDE shall inform the Controller if, in its opinion,
        an instruction infringes applicable data protection law. CAIDE shall not sell personal data, use it for its own
        purposes, or combine it with data from other sources except as instructed.
      </p>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality of personnel",
    body: (
      <p>
        CAIDE ensures that every person authorized to process the personal data is bound by an obligation of
        confidentiality and has access only to the data necessary for the engagement.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security measures",
    body: (
      <>
        <p>CAIDE implements appropriate technical and organizational measures, which include as a minimum:</p>
        <ul>
          <li>encryption of data in transit (TLS 1.2 or higher) and at rest, as provided by the hosting and database providers;</li>
          <li>edge protection for production websites, including firewall rules against common attack patterns, rate limiting on form and authentication endpoints, and bot mitigation;</li>
          <li>least-privilege access control, unique accounts, and two-factor authentication on all administrative accounts;</li>
          <li>storage of credentials and secrets in encrypted secrets managers, never in source code;</li>
          <li>parameterized database queries, input validation, and security headers in all deliverables;</li>
          <li>review of every code change before deployment, including automated security review;</li>
          <li>backups and recovery procedures appropriate to the deliverable, as specified in the SOW.</li>
        </ul>
        <p>CAIDE may update these measures provided that the overall level of protection is not reduced.</p>
      </>
    ),
  },
  {
    id: "subprocessors",
    title: "Sub-processors",
    body: (
      <>
        <p>
          The Controller grants general authorization for CAIDE to engage the sub-processors listed below and those
          named in the SOW. CAIDE imposes on each sub-processor data protection obligations no less protective than this
          DPA and remains liable for their performance. CAIDE shall notify the Controller at least 14 days before
          engaging a new sub-processor; the Controller may object on reasonable data protection grounds, in which case
          the parties shall seek a resolution in good faith, failing which the Controller may terminate the affected
          services.
        </p>
        <table className="legal-table">
          <thead>
            <tr>
              <th>Sub-processor</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Cloudflare, Inc.</td><td>Website hosting, edge security, databases, and bot protection</td></tr>
            <tr><td>Vercel Inc.</td><td>Application hosting</td></tr>
            <tr><td>Railway Corporation</td><td>Backend service hosting</td></tr>
            <tr><td>Neon, Inc.</td><td>Managed PostgreSQL databases</td></tr>
            <tr><td>GitHub, Inc.</td><td>Source code hosting and deployment pipelines</td></tr>
            <tr><td>Google LLC</td><td>AI model processing (Gemini)</td></tr>
            <tr><td>Anthropic, PBC</td><td>AI model processing (Claude)</td></tr>
            <tr><td>Resend, Inc.</td><td>Transactional email delivery</td></tr>
          </tbody>
        </table>
        <p>Sub-processors specific to an engagement, such as payment, telephony, or booking providers, are named in its SOW.</p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    body: (
      <p>
        Where personal data subject to EU, UK, or Swiss law is transferred to a country without an adequacy decision,
        the transfer is made under the European Commission&rsquo;s Standard Contractual Clauses (Module 2 or 3, as
        applicable), the UK Addendum, or the provider&rsquo;s certification under the EU-U.S. Data Privacy Framework,
        which are incorporated by reference.
      </p>
    ),
  },
  {
    id: "assistance",
    title: "Assistance to the Controller",
    body: (
      <p>
        Taking into account the nature of the processing, CAIDE shall assist the Controller in responding to requests
        from data subjects exercising their rights, and in carrying out data protection impact assessments and prior
        consultations with supervisory authorities. CAIDE shall promptly forward to the Controller any request received
        directly from a data subject and shall not respond to it except on the Controller&rsquo;s instruction.
      </p>
    ),
  },
  {
    id: "breach",
    title: "Personal data breaches",
    body: (
      <p>
        CAIDE shall notify the Controller without undue delay, and in any event within 48 hours, after becoming aware of
        a personal data breach affecting the Controller&rsquo;s data. The notification shall describe, to the extent
        known, the nature of the breach, the categories and approximate number of data subjects and records concerned,
        its likely consequences, and the measures taken or proposed. CAIDE shall take reasonable steps to contain and
        remedy the breach and shall cooperate with the Controller in meeting its notification obligations.
      </p>
    ),
  },
  {
    id: "deletion",
    title: "Return and deletion",
    body: (
      <p>
        On termination of the engagement, CAIDE shall, at the Controller&rsquo;s choice, return the personal data in a
        commonly used format or delete it, within 30 days, and delete existing copies unless retention is required by
        law. Backups are deleted in accordance with the providers&rsquo; standard backup rotation.
      </p>
    ),
  },
  {
    id: "audits",
    title: "Information and audits",
    body: (
      <p>
        CAIDE shall make available to the Controller the information necessary to demonstrate compliance with this DPA
        and shall allow for and contribute to audits, including inspections, conducted by the Controller or an auditor
        it mandates, on 30 days&rsquo; written notice, no more than once a year save following a personal data breach,
        and subject to confidentiality obligations. Audits are conducted at the Controller&rsquo;s cost.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Liability and precedence",
    body: (
      <p>
        Liability under this DPA is subject to the limitations set out in the <Link href="/msa">Master Services
        Agreement</Link>, save where applicable law provides otherwise. In the event of conflict between this DPA and
        the MSA concerning the processing of personal data, this DPA prevails. Requests concerning this DPA may be
        addressed to {mail}.
      </p>
    ),
  },
];

export default function DpaPage() {
  return (
    <LegalPage
      doc="dpa"
      eyebrow="Legal · Data processing"
      title="Data Processing"
      accent="Agreement."
      intro="The following document sets out the terms on which CAIDE processes personal data on behalf of its clients, in accordance with Article 28 GDPR and equivalent laws."
      updated="10 November 2026"
      summary={[
        "CAIDE processes client personal data only on the client's documented instructions.",
        "Minimum security measures are defined, including edge protection and reviewed deployments.",
        "Sub-processors are listed, and new ones are notified 14 days in advance.",
        "Personal data breaches are notified within 48 hours.",
      ]}
      sections={sections}
    />
  );
}
