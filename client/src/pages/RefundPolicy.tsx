import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <RefreshCcw className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
            Refund Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <h2>1. Overview</h2>
          <p>
            At China2India Logistics, we strive to provide excellent service. This Refund Policy outlines the circumstances under which refunds may be issued and the process for requesting them.
          </p>

          <h2>2. Eligibility for Refunds</h2>

          <h3>2.1 Eligible Situations</h3>
          <p>You may be eligible for a refund in the following situations:</p>
          <ul>
            <li>Service not rendered due to our error or failure</li>
            <li>Duplicate charges or billing errors</li>
            <li>Shipment cancellation before package departure from China</li>
            <li>Lost packages where we are determined to be at fault</li>
            <li>Significant damage to items caused by our handling (with insurance)</li>
          </ul>

          <h3>2.2 Non-Refundable Situations</h3>
          <p>Refunds will NOT be issued in the following cases:</p>
          <ul>
            <li>Packages already shipped from our China warehouse</li>
            <li>Customs duties, taxes, or fees imposed by government authorities</li>
            <li>Delays caused by customs inspections or natural disasters</li>
            <li>Damage due to improper packaging by the original seller</li>
            <li>Items confiscated by customs due to prohibited content</li>
            <li>Incorrect address provided by the customer</li>
            <li>Customer refusal to accept delivery</li>
            <li>Services already rendered (warehouse storage, inspection, etc.)</li>
          </ul>

          <h2>3. Cancellation Policy</h2>

          <h3>3.1 Before Shipment</h3>
          <p>
            If you wish to cancel your shipment before it departs from our Guangzhou warehouse, please contact us immediately. Cancellation requests will be reviewed on a case-by-case basis:
          </p>
          <ul>
            <li>Full refund: If no processing has begun</li>
            <li>Partial refund: If warehouse services (inspection, storage) have been used</li>
            <li>No refund: If the package has already been dispatched</li>
          </ul>

          <h3>3.2 After Shipment</h3>
          <p>
            Once a shipment has left our warehouse and is in transit, cancellation is not possible. You will be responsible for all shipping charges.
          </p>

          <h2>4. Refund Process</h2>

          <h3>4.1 How to Request a Refund</h3>
          <p>To request a refund, please follow these steps:</p>
          <ol>
            <li>Contact our customer support at support@china2india.com or +91 98765 43210</li>
            <li>Provide your order number, tracking number, and reason for the refund request</li>
            <li>Include any supporting documentation (photos, receipts, etc.)</li>
            <li>Wait for our team to review your request</li>
          </ol>

          <h3>4.2 Review Timeline</h3>
          <p>
            We will review refund requests within 5-7 business days. You will receive an email notification with the decision and, if approved, the refund amount and timeline.
          </p>

          <h3>4.3 Refund Processing</h3>
          <p>
            Approved refunds will be processed within 10-15 business days:
          </p>
          <ul>
            <li>Credit card refunds: 7-10 business days</li>
            <li>Bank transfer refunds: 10-15 business days</li>
            <li>Digital wallet refunds: 5-7 business days</li>
          </ul>

          <h2>5. Partial Refunds</h2>
          <p>
            In certain situations, we may issue a partial refund:
          </p>
          <ul>
            <li>Minor damage to packaging (not contents)</li>
            <li>Partial service completion</li>
            <li>Weight discrepancies in your favor</li>
            <li>Service downgrades or delivery method changes</li>
          </ul>

          <h2>6. Damaged or Lost Packages</h2>

          <h3>6.1 Insurance Coverage</h3>
          <p>
            If you purchased insurance for your shipment, claims for lost or damaged items will be processed according to the insurance terms. Maximum coverage is subject to the declared value and insurance plan selected.
          </p>

          <h3>6.2 Without Insurance</h3>
          <p>
            For shipments without insurance, our liability is limited to $100 USD per shipment or the actual shipping cost paid (whichever is lower), unless damage or loss is proven to be directly caused by our gross negligence.
          </p>

          <h3>6.3 Damage Claims</h3>
          <p>
            To file a damage claim:
          </p>
          <ul>
            <li>Report damage within 48 hours of delivery</li>
            <li>Provide clear photos of damaged items and packaging</li>
            <li>Do not discard damaged packaging until claim is resolved</li>
            <li>Complete our damage claim form</li>
          </ul>

          <h2>7. Customs and Duties</h2>
          <p>
            Customs duties, import taxes, and government fees are non-refundable as they are paid directly to customs authorities and are beyond our control. These fees are the responsibility of the recipient.
          </p>

          <h2>8. Refund Method</h2>
          <p>
            Refunds will be issued using the same payment method as the original transaction. If this is not possible, we will arrange an alternative refund method (bank transfer or digital wallet).
          </p>

          <h2>9. Disputed Transactions</h2>
          <p>
            If you dispute a transaction with your bank or credit card company, please contact us first. Chargebacks may result in:
          </p>
          <ul>
            <li>Suspension of services until the matter is resolved</li>
            <li>Additional fees for chargeback processing</li>
            <li>Permanent account termination if fraud is suspected</li>
          </ul>

          <h2>10. Exceptions and Special Cases</h2>
          <p>
            We reserve the right to make exceptions to this policy at our sole discretion, particularly in cases of:
          </p>
          <ul>
            <li>Service failures or errors on our part</li>
            <li>Exceptional circumstances beyond customer control</li>
            <li>Long-term customer relationships and goodwill</li>
          </ul>

          <h2>11. Contact for Refund Requests</h2>
          <p>
            For all refund-related inquiries, please contact:
          </p>
          <p>
            Email: refunds@china2india.com<br />
            Customer Support: support@china2india.com<br />
            Phone: +91 98765 43210<br />
            Business Hours: Monday-Saturday, 9:00 AM - 6:00 PM IST
          </p>

          <h2>12. Changes to This Policy</h2>
          <p>
            China2India Logistics reserves the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting on our website. Customers will be notified of significant changes via email.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
