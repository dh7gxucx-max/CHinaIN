import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TermsOfService() {
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
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
            Terms of Service
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
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using China2India Logistics services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our services.
          </p>

          <h2>2. Service Description</h2>
          <p>
            China2India provides logistics and freight forwarding services, including but not limited to:
          </p>
          <ul>
            <li>Package consolidation and warehousing in China</li>
            <li>International shipping from China to India</li>
            <li>Customs clearance assistance</li>
            <li>Quality inspection services</li>
            <li>Last-mile delivery in India</li>
          </ul>

          <h2>3. User Responsibilities</h2>
          <p>
            As a user of our services, you agree to:
          </p>
          <ul>
            <li>Provide accurate and complete information about your shipments</li>
            <li>Comply with all applicable laws and regulations regarding imports/exports</li>
            <li>Not ship prohibited or restricted items</li>
            <li>Pay all fees and charges associated with your shipments</li>
            <li>Ensure proper packaging of items sent to our warehouse</li>
          </ul>

          <h2>4. Prohibited Items</h2>
          <p>
            The following items are strictly prohibited from being shipped through our services:
          </p>
          <ul>
            <li>Illegal drugs and narcotics</li>
            <li>Weapons, explosives, and ammunition</li>
            <li>Counterfeit goods and pirated products</li>
            <li>Hazardous materials and flammable substances</li>
            <li>Perishable food items</li>
            <li>Live animals and plants</li>
            <li>Items that violate intellectual property rights</li>
          </ul>

          <h2>5. Pricing and Payment</h2>
          <p>
            Our shipping rates are calculated at $15 per kilogram. Additional fees may apply for:
          </p>
          <ul>
            <li>Customs duties and taxes (as determined by Indian customs)</li>
            <li>Special handling or oversized items</li>
            <li>Insurance coverage (optional)</li>
            <li>Additional packaging materials</li>
          </ul>

          <h2>6. Liability and Insurance</h2>
          <p>
            China2India Logistics will take reasonable care in handling your shipments. However, we are not liable for:
          </p>
          <ul>
            <li>Delays caused by customs inspections or natural disasters</li>
            <li>Damage due to improper packaging by the sender or merchant</li>
            <li>Loss or confiscation of prohibited or restricted items</li>
            <li>Items not declared or incorrectly declared</li>
          </ul>
          <p>
            We strongly recommend purchasing insurance for valuable items.
          </p>

          <h2>7. Customs and Import Regulations</h2>
          <p>
            Customers are responsible for understanding and complying with Indian customs regulations. China2India will provide assistance but cannot guarantee customs clearance. Any duties, taxes, or penalties imposed by customs authorities are the responsibility of the customer.
          </p>

          <h2>8. Delivery and Tracking</h2>
          <p>
            We provide real-time tracking for all shipments. Estimated delivery times are provided in good faith but are not guaranteed. Delays may occur due to factors beyond our control, including customs inspections, weather conditions, or local delivery issues.
          </p>

          <h2>9. Returns and Cancellations</h2>
          <p>
            Please refer to our Refund Policy for information about returns, cancellations, and refunds.
          </p>

          <h2>10. Privacy and Data Protection</h2>
          <p>
            We are committed to protecting your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
          </p>

          <h2>11. Modifications to Terms</h2>
          <p>
            China2India reserves the right to modify these Terms of Service at any time. We will notify users of significant changes via email or through our website. Continued use of our services after such modifications constitutes acceptance of the updated terms.
          </p>

          <h2>12. Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity. Users may terminate their account at any time by contacting customer support.
          </p>

          <h2>13. Dispute Resolution</h2>
          <p>
            Any disputes arising from the use of our services shall be resolved through arbitration in accordance with Indian law. The jurisdiction shall be Mumbai, India.
          </p>

          <h2>14. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at:
          </p>
          <p>
            Email: support@china2india.com<br />
            Phone: +91 98765 43210
          </p>
        </motion.div>
      </div>
    </div>
  );
}
