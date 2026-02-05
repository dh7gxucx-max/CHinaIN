import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
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
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
            Privacy Policy
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
          <h2>1. Introduction</h2>
          <p>
            China2India Logistics ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our logistics and shipping services.
          </p>

          <h2>2. Information We Collect</h2>

          <h3>2.1 Personal Information</h3>
          <p>We collect personal information that you provide to us, including:</p>
          <ul>
            <li>Name and contact details (email, phone number, address)</li>
            <li>Shipping addresses (both in China and India)</li>
            <li>Payment information</li>
            <li>Government-issued ID for customs clearance</li>
            <li>Account login credentials</li>
          </ul>

          <h3>2.2 Shipment Information</h3>
          <p>We collect information about your shipments, including:</p>
          <ul>
            <li>Package details (weight, dimensions, contents)</li>
            <li>Tracking numbers and delivery status</li>
            <li>Photos of received packages at our warehouse</li>
            <li>Customs declarations and documentation</li>
          </ul>

          <h3>2.3 Automatically Collected Information</h3>
          <p>When you use our website or services, we automatically collect:</p>
          <ul>
            <li>Device information (IP address, browser type, operating system)</li>
            <li>Usage data (pages visited, time spent, click patterns)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>Processing and delivering your shipments</li>
            <li>Communicating with you about your orders and services</li>
            <li>Facilitating customs clearance and compliance</li>
            <li>Processing payments and preventing fraud</li>
            <li>Improving our services and customer experience</li>
            <li>Sending promotional materials (with your consent)</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2>4. Information Sharing and Disclosure</h2>
          <p>We may share your information with:</p>

          <h3>4.1 Service Providers</h3>
          <ul>
            <li>Shipping carriers and logistics partners</li>
            <li>Payment processors</li>
            <li>Customs brokers and clearance agents</li>
            <li>Warehouse and fulfillment partners</li>
          </ul>

          <h3>4.2 Legal Requirements</h3>
          <p>
            We may disclose your information if required by law, court order, or government request, or to protect our rights, safety, or property.
          </p>

          <h3>4.3 Business Transfers</h3>
          <p>
            In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your information, including:
          </p>
          <ul>
            <li>Encryption of sensitive data (SSL/TLS)</li>
            <li>Secure data storage and access controls</li>
            <li>Regular security audits and updates</li>
            <li>Employee training on data protection</li>
          </ul>
          <p>
            However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your information.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Shipment records are typically retained for 7 years for tax and customs compliance purposes.
          </p>

          <h2>7. Your Rights</h2>
          <p>You have the following rights regarding your personal information:</p>
          <ul>
            <li>Access: Request a copy of your personal data</li>
            <li>Correction: Update or correct inaccurate information</li>
            <li>Deletion: Request deletion of your data (subject to legal requirements)</li>
            <li>Objection: Object to certain data processing activities</li>
            <li>Portability: Request transfer of your data to another service</li>
            <li>Withdrawal of consent: Opt-out of marketing communications</li>
          </ul>
          <p>
            To exercise these rights, please contact us at support@china2india.com
          </p>

          <h2>8. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience. You can control cookie preferences through your browser settings. Essential cookies required for service functionality cannot be disabled.
          </p>

          <h2>9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites (e.g., Chinese e-commerce platforms). We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing any information.
          </p>

          <h2>10. International Data Transfers</h2>
          <p>
            As we operate between China and India, your information may be transferred and stored in different countries. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
          </p>

          <h2>11. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
          </p>

          <h2>12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through a prominent notice on our website. The "Last updated" date at the top indicates when the policy was last revised.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p>
            Email: support@china2india.com<br />
            Phone: +91 98765 43210<br />
            Address: Mumbai, India
          </p>
        </motion.div>
      </div>
    </div>
  );
}
