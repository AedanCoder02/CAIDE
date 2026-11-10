import type { Metadata } from "next";
import Link from "next/link";
import { legalMetadata } from "@/i18n/metadata";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = legalMetadata("refunds", "Refund Policy — CAIDE", "The conditions under which payments made to CAIDE are refundable.");

const EMAIL = "contact@caide.agency";
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "Scope",
    body: (
      <>
        <p>
          The following Refund Policy sets out the conditions under which payments made to <strong>CAIDE
          Operations</strong> (&ldquo;CAIDE&rdquo;) for services are refundable. It applies to every engagement
          governed by the <Link href="/msa">Master Services Agreement</Link> and forms part of that agreement.
        </p>
        <p>
          The payment schedule of each engagement (deposit, stage payments, or retainer) is specified in its statement
          of work. Where a statement of work expressly provides otherwise, the statement of work prevails over this
          policy.
        </p>
      </>
    ),
  },
  {
    id: "principle",
    title: "General principle",
    body: (
      <p>
        Work is performed in stages and each stage is paid before it begins. Payments therefore correspond to work
        scheduled or performed, and are not refundable once the corresponding work has commenced, save as set out
        below. No work commences before the statement of work is signed and the deposit has cleared.
      </p>
    ),
  },
  {
    id: "deposit",
    title: "Deposits",
    body: (
      <ul>
        <li>
          <strong>Cancellation before commencement:</strong> where the client cancels in writing within 7 days of
          paying the deposit and before work has commenced, the deposit is refunded in full, less any non-recoverable
          payment processing fees.
        </li>
        <li>
          <strong>Cancellation after commencement:</strong> once work has commenced, the deposit is non-refundable, as
          it secures the reserved schedule and covers discovery and planning work.
        </li>
        <li>
          <strong>Cancellation by CAIDE:</strong> where CAIDE cancels an engagement before commencement for any reason
          other than the client&rsquo;s breach, the deposit is refunded in full.
        </li>
      </ul>
    ),
  },
  {
    id: "stages",
    title: "Stage payments",
    body: (
      <ul>
        <li>
          A stage payment is non-refundable once the stage has been delivered and accepted, or deemed accepted on the
          expiry of the feedback window stated in the statement of work without a written objection.
        </li>
        <li>
          Where CAIDE fails to deliver a paid stage substantially in accordance with the statement of work and does not
          remedy the failure within 14 days of written notice, the client is entitled to a refund of the payment for
          that stage, proportionate to the undelivered work.
        </li>
        <li>
          Where an engagement is terminated before a paid stage is completed, the unperformed portion of that stage is
          refunded, calculated on the basis of work performed to the date of termination.
        </li>
      </ul>
    ),
  },
  {
    id: "retainers",
    title: "Retainers and recurring services",
    body: (
      <p>
        Retainers and recurring services (including hosting, maintenance, and support) are billed in advance for each
        period and are subject to the minimum term stated in the statement of work. They may be cancelled with effect
        from the end of the current billing period by written notice given before that period ends. Amounts paid for a
        period that has commenced are not refundable, and no refund is made for unused hours or requests within a
        period.
      </p>
    ),
  },
  {
    id: "non-refundable",
    title: "Non-refundable items",
    body: (
      <ul>
        <li>third-party costs purchased on the client&rsquo;s behalf, including domains, licences, templates, stock assets, and hosting or software subscriptions;</li>
        <li>change orders and additional revision rounds once the corresponding work has commenced;</li>
        <li>rush fees once the expedited schedule has been reserved;</li>
        <li>payment processing and currency conversion fees charged by third parties.</li>
      </ul>
    ),
  },
  {
    id: "exclusions",
    title: "Circumstances excluded from refund",
    body: (
      <p>
        No refund is due where a delay or failure results from the client&rsquo;s failure to supply content, access,
        approvals, or feedback within the agreed periods, from a change of mind after acceptance, or from an engagement
        being suspended or terminated by CAIDE because it was intended for a purpose prohibited under the{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    ),
  },
  {
    id: "consumers",
    title: "Statutory consumer rights",
    body: (
      <p>
        Nothing in this policy limits any non-waivable right available to a consumer under the law of the
        consumer&rsquo;s country of residence. Where a consumer right of withdrawal applies to a distance contract for
        services, the client will be asked to request expressly that work begin within the withdrawal period and to
        acknowledge that the right of withdrawal is lost once the services have been fully performed; where the
        contract is withdrawn from after work has begun, an amount proportionate to the services provided up to the
        withdrawal is payable.
      </p>
    ),
  },
  {
    id: "procedure",
    title: "Refund procedure",
    body: (
      <p>
        Refund requests shall be made in writing to {mail} within 30 days of the event giving rise to the request,
        stating the engagement and the grounds of the request. CAIDE will respond within 10 business days. Approved
        refunds are paid to the original payment method within 14 days of approval, in the currency of the original
        payment.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: <p>Enquiries concerning this policy may be addressed to {mail}.</p>,
  },
];

export default function RefundsPage() {
  return (
    <LegalPage
      doc="refunds"
      eyebrow="Legal · Refunds"
      title="Refund"
      accent="Policy."
      intro="The following document sets out the conditions under which payments made to CAIDE for services are refundable, and the procedure for requesting a refund."
      updated="10 November 2026"
      summary={[
        "No work commences before the statement of work is signed and the deposit has cleared.",
        "Deposits are refundable in full within 7 days of payment, provided work has not commenced.",
        "Accepted stages are non-refundable; undelivered stages are refunded proportionately.",
        "Retainers are billed in advance and may be cancelled from the end of the current period.",
      ]}
      sections={sections}
    />
  );
}
