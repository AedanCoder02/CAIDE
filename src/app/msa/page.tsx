import type { Metadata } from "next";
import Link from "next/link";
import { legalMetadata } from "@/i18n/metadata";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = legalMetadata("msa", "Master Services Agreement — CAIDE", "The master terms governing every client engagement with CAIDE.");

const EMAIL = "contact@caide.agency";
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: "parties",
    title: "Parties and structure",
    body: (
      <>
        <p>
          The following Master Services Agreement (the &ldquo;Agreement&rdquo;) governs every engagement between{" "}
          <strong>CAIDE Operations</strong>, an independent software engineering practice within the Kryptyk / AP
          Division (&ldquo;CAIDE&rdquo;), and the client identified in a statement of work (the &ldquo;Client&rdquo;).
        </p>
        <p>
          Each engagement is defined in a statement of work (&ldquo;SOW&rdquo;) or proposal accepted in writing by
          both parties, which specifies the scope, deliverables, quantities, revision rounds, feedback windows,
          schedule, fees, and payment schedule. Each SOW incorporates this Agreement. In the event of conflict, the SOW
          prevails for that engagement only, followed by this Agreement, the{" "}
          <Link href="/dpa">Data Processing Agreement</Link>, and the <Link href="/refunds">Refund Policy</Link>.
        </p>
        <p>
          This Agreement takes effect for an engagement on the later of the signature of its SOW and the clearing of
          its deposit.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "Services",
    body: (
      <>
        <p>
          CAIDE shall perform the services described in each SOW with reasonable skill and care, in accordance with
          generally accepted industry practice, and in compliance with applicable law. CAIDE determines the means and
          methods of performance, including the use of subcontractors and AI-assisted tooling, and remains responsible
          for all work performed on its behalf.
        </p>
        <p>
          Any work outside the scope of a SOW, including additional quantities, features, revision rounds, or
          complexity beyond the ceiling stated in the SOW, is performed only under a written change order specifying its
          price and effect on the schedule.
        </p>
      </>
    ),
  },
  {
    id: "client",
    title: "Client obligations",
    body: (
      <>
        <p>The Client shall:</p>
        <ul>
          <li>supply content, credentials, access, approvals, and feedback within the periods stated in the SOW;</li>
          <li>ensure that it holds all rights, licences, and consents required for the materials and data it supplies;</li>
          <li>designate a single point of contact with authority to give approvals;</li>
          <li>use the deliverables lawfully and in accordance with the acceptable use provisions of the <Link href="/terms">Terms of Service</Link>.</li>
        </ul>
        <p>
          Delays caused by the Client extend the schedule accordingly. Where the Client fails to respond within a
          feedback window, the corresponding deliverable is deemed accepted. Where an engagement is paused at the
          Client&rsquo;s request or through the Client&rsquo;s inaction for more than 30 days, CAIDE may reschedule the
          remaining work according to its availability.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees and payment",
    body: (
      <ul>
        <li>Fees, currency, and the payment schedule are specified in each SOW. Work on each stage commences only after the payment for that stage has cleared.</li>
        <li>Invoices are payable within 7 days of issue unless the SOW states otherwise.</li>
        <li>Where a payment is overdue, CAIDE may suspend work until it is received, and the schedule is extended by the period of suspension.</li>
        <li>Fees exclude taxes, which are payable by the Client where applicable, and third-party costs, which are passed through at cost unless the SOW states otherwise.</li>
        <li>Refunds are governed exclusively by the <Link href="/refunds">Refund Policy</Link>.</li>
      </ul>
    ),
  },
  {
    id: "acceptance",
    title: "Delivery and acceptance",
    body: (
      <p>
        Each deliverable is submitted for review within the feedback window stated in the SOW. The Client shall either
        accept the deliverable or provide a written list of material non-conformities with the SOW. CAIDE shall correct
        such non-conformities within the revision rounds included in the SOW. Requests that do not concern a
        non-conformity with the SOW constitute changes and are subject to a change order.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <>
        <p>
          Upon payment in full of all fees due under a SOW, all rights in the deliverables created specifically for the
          Client under that SOW are assigned to the Client. Until such payment, the Client is granted a non-exclusive
          licence to use the deliverables for review purposes only.
        </p>
        <p>
          CAIDE retains all rights in its pre-existing materials, tools, libraries, templates, know-how, and generic
          components, and in any improvements to them that are not specific to the Client (&ldquo;CAIDE
          Materials&rdquo;). To the extent CAIDE Materials are incorporated in a deliverable, the Client is granted a
          perpetual, worldwide, non-exclusive, royalty-free licence to use them as part of that deliverable.
          Third-party and open-source components remain subject to their own licences.
        </p>
        <p>
          Unless the SOW or a separate confidentiality agreement provides otherwise, CAIDE may display the completed
          work, the Client&rsquo;s name, and its logo in its portfolio.
        </p>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    body: (
      <p>
        Each party shall keep confidential all non-public information disclosed by the other party in connection with
        an engagement, shall use it solely for the purposes of that engagement, and shall disclose it only to personnel
        and subcontractors bound by equivalent obligations. These obligations do not apply to information that is
        public through no fault of the receiving party, independently developed, lawfully received from a third party,
        or required to be disclosed by law. They survive for 3 years after the end of the engagement, and indefinitely
        for credentials and trade secrets.
      </p>
    ),
  },
  {
    id: "data",
    title: "Data protection and security",
    body: (
      <p>
        Where CAIDE processes personal data on behalf of the Client, the <Link href="/dpa">Data Processing
        Agreement</Link> applies and forms part of this Agreement. Credentials supplied by the Client are stored in an
        encrypted secrets manager, used on a least-privilege basis, and never committed to source code. The Client is
        responsible for rotating credentials on completion of an engagement where CAIDE retains no ongoing role.
      </p>
    ),
  },
  {
    id: "warranties",
    title: "Warranties",
    body: (
      <>
        <p>
          CAIDE warrants that, for 30 days following acceptance of a deliverable, the deliverable will perform
          materially in accordance with the SOW. The Client&rsquo;s sole remedy for breach of this warranty is the
          correction of the non-conformity at no additional charge. The warranty does not apply to defects caused by
          modifications made by anyone other than CAIDE, by third-party services or platforms, or by use contrary to
          the documentation.
        </p>
        <p>
          Save as expressly stated in this Agreement, all other warranties, express or implied, are excluded to the
          fullest extent permitted by law. CAIDE does not warrant any particular business result, search ranking,
          conversion rate, or revenue.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>
          Neither party shall be liable for any indirect, incidental, special, or consequential damages, or for any loss
          of profits, revenue, data, or goodwill. The total liability of CAIDE under or in connection with this Agreement
          and all SOWs is limited to the fees paid by the Client to CAIDE in the 12 months preceding the event giving rise
          to the claim.
        </p>
        <p>
          These limitations do not apply to liability for fraud, wilful misconduct, the Client&rsquo;s payment
          obligations, a party&rsquo;s indemnification obligations, or any liability that cannot be limited by law.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnification",
    body: (
      <p>
        The Client shall indemnify CAIDE against all claims, losses, and reasonable legal costs arising from the
        materials or data supplied by the Client, or from the Client&rsquo;s use of the deliverables in breach of law or
        of this Agreement. CAIDE shall indemnify the Client against third-party claims that a deliverable created by
        CAIDE, excluding Client materials and third-party components, infringes that third party&rsquo;s intellectual
        property rights.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Term and termination",
    body: (
      <>
        <p>
          Either party may terminate a SOW on 14 days&rsquo; written notice. Either party may terminate this Agreement or
          any SOW with immediate effect by written notice where the other party commits a material breach which is not
          remedied within 14 days of notice, or becomes insolvent. CAIDE may terminate immediately where an engagement is
          used for a purpose prohibited under the <Link href="/terms">Terms of Service</Link>.
        </p>
        <p>
          On termination, the Client shall pay for all work performed up to the termination date and all non-cancellable
          third-party costs, and any refund is calculated in accordance with the{" "}
          <Link href="/refunds">Refund Policy</Link>. Provisions concerning fees, intellectual property, confidentiality,
          data protection, liability, and indemnification survive termination.
        </p>
      </>
    ),
  },
  {
    id: "general",
    title: "General provisions",
    body: (
      <ul>
        <li><strong>Independent contractors:</strong> the parties are independent contractors; nothing in this Agreement creates a partnership, employment, or agency relationship.</li>
        <li><strong>Non-solicitation:</strong> neither party shall solicit for employment any person engaged by the other party on an engagement during the engagement and for 6 months after it.</li>
        <li><strong>Force majeure:</strong> neither party is liable for delay or failure caused by events beyond its reasonable control, excluding payment obligations.</li>
        <li><strong>Notices:</strong> notices are given in writing by email to the addresses in the SOW, and to CAIDE at {mail}.</li>
        <li><strong>Assignment:</strong> neither party may assign this Agreement without the other&rsquo;s consent, save that CAIDE may assign it as part of a reorganization or sale of its business.</li>
        <li><strong>Entire agreement:</strong> this Agreement and its SOWs constitute the entire agreement between the parties concerning their subject matter and supersede all prior proposals and communications.</li>
        <li><strong>Severability and waiver:</strong> an unenforceable provision does not affect the remainder; no failure to enforce a provision constitutes a waiver.</li>
      </ul>
    ),
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: (
      <p>
        This Agreement is governed by the laws of the jurisdiction in which CAIDE Operations is established, unless the
        SOW specifies otherwise. The parties shall first attempt to resolve any dispute through good-faith negotiation
        for 30 days following written notice of the dispute, before initiating any formal proceedings.
      </p>
    ),
  },
];

export default function MsaPage() {
  return (
    <LegalPage
      doc="msa"
      eyebrow="Legal · Client agreement"
      title="Master Services"
      accent="Agreement."
      intro="The following document sets out the master terms governing every client engagement with CAIDE. Each engagement is further defined in its own statement of work."
      updated="10 November 2026"
      summary={[
        "Each engagement is defined by a signed statement of work that incorporates this Agreement.",
        "Each stage is paid before it begins; overdue payments suspend work.",
        "Rights in the deliverables pass to the client on payment in full.",
        "Liability is capped at the fees paid in the preceding 12 months.",
      ]}
      sections={sections}
    />
  );
}
