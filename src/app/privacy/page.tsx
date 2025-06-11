
import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PublicNavbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert">
          <h1 className="text-3xl font-bold font-headline mb-6 text-primary">Privacy Policy for Retaliate CRM</h1>
          <p className="text-muted-foreground mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <p>This Privacy Policy describes how Cyber Retaliator Solutions ("we," "us," or "our"), through the Retaliate CRM platform developed by Skunkworks, collects, uses, and discloses your information in connection with the provision of our Customer Relationship Management (CRM) services (the "Services"). This policy applies to internal operations and customer relationship management, tracking, and retention activities undertaken by Cyber Retaliator Solutions.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">1. Information We Collect</h2>
          <p>We may collect information that you provide directly to us when you use the Retaliate CRM, including but not limited to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>User Account Information:</strong> Names, email addresses, roles, and authentication credentials for CRM users.</li>
            <li><strong>Customer Data:</strong> Information about your customers that you input into the CRM, such as names, contact details (emails, phone numbers), company information, interaction history, notes, and lead status.</li>
            <li><strong>Usage Data:</strong> Information about how you and your team interact with the Retaliate CRM, such as features accessed, actions performed, IP addresses, browser types, and device information.</li>
            <li><strong>Integration Data:</strong> Information from third-party services you choose to connect with Retaliate CRM (e.g., social media accounts, cloud storage).</li>
          </ul>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect for various purposes related to the internal operations of Cyber Retaliator Solutions, including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>To provide, operate, and maintain the Retaliate CRM.</li>
            <li>To manage customer relationships, track interactions, and support customer retention efforts.</li>
            <li>To improve and personalize the Services.</li>
            <li>For internal analytics and reporting.</li>
            <li>To communicate with CRM users regarding service updates, support, and administrative messages.</li>
            <li>To ensure the security and integrity of our Services.</li>
            <li>To comply with legal and regulatory obligations.</li>
          </ul>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">3. Data Sharing and Disclosure</h2>
          <p>Retaliate CRM is intended for internal use by Cyber Retaliator Solutions. Customer data entered into the CRM is primarily for internal operational purposes.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Within Cyber Retaliator Solutions:</strong> Information may be accessible to authorized personnel within Cyber Retaliator Solutions who require access for their job functions.</li>
            <li><strong>Service Providers:</strong> We may engage third-party companies or individuals (e.g., Skunkworks for development and maintenance, hosting providers) to facilitate our Services. These third parties will have access to your information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
          </ul>
          <p>We do not sell your personal information or the customer data you input into the CRM.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">4. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect the security of your information and the data stored within Retaliate CRM. However, no electronic transmission or storage of information is ever completely secure, so we cannot guarantee absolute security.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">5. Data Retention</h2>
          <p>We retain information for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">6. Your Data Rights and Choices</h2>
          <p>As users of an internal CRM, your rights regarding data within the CRM are primarily governed by internal policies of Cyber Retaliator Solutions. If you have questions about data you have entered or that pertains to you, please contact your designated internal administrator or data protection officer.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">7. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact the designated internal administrator or legal department at Cyber Retaliator Solutions.</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
