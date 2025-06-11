
import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PublicNavbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert">
          <h1 className="text-3xl font-bold font-headline mb-6 text-primary">Terms of Service for Retaliate CRM</h1>
          <p className="text-muted-foreground mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <p>These Terms of Service ("Terms") govern your use of the Retaliate CRM platform (the "Service"), developed by Skunkworks and provided by Cyber Retaliator Solutions ("Company," "we," "us," or "our") for internal operational and Customer Relationship Management purposes.</p>
          <p>By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Service.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">1. Use of the Service</h2>
          <p><strong>1.1. Eligibility:</strong> You must be an authorized employee or contractor of Cyber Retaliator Solutions to use the Service.</p>
          <p><strong>1.2. Permitted Use:</strong> The Service is provided solely for Cyber Retaliator Solutions' internal business operations, including customer relationship management, sales tracking, data analysis, and related activities. You agree to use the Service in compliance with all applicable laws, regulations, and Company policies.</p>
          <p><strong>1.3. Prohibited Use:</strong> You may not use the Service for any unlawful purpose, or in any manner that could damage, disable, overburden, or impair the Service or interfere with any other party's use and enjoyment of the Service. You may not attempt to gain unauthorized access to any part of the Service, other accounts, computer systems, or networks connected to the Service.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">2. User Accounts and Responsibilities</h2>
          <p><strong>2.1. Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify the Company immediately of any unauthorized use of your account or any other breach of security.</p>
          <p><strong>2.2. User Conduct:</strong> You are responsible for all data, information, and content that you upload, post, or otherwise transmit via the Service ("User Content"). You agree not to transmit any User Content that is unlawful, harmful, defamatory, obscene, or otherwise objectionable.</p>
          <p><strong>2.3. Data Accuracy:</strong> You are responsible for the accuracy, quality, and legality of the User Content and the means by which you acquired it.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">3. Intellectual Property</h2>
          <p><strong>3.1. Service Ownership:</strong> The Service, including its software, design, features, and underlying technology (developed by Skunkworks), is the property of Cyber Retaliator Solutions and/or its licensors and is protected by intellectual property laws. These Terms do not grant you any right, title, or interest in the Service, other than the limited right to use the Service as permitted herein.</p>
          <p><strong>3.2. User Content Ownership:</strong> As between you and the Company, data entered into the CRM by authorized users in the course of their duties for Cyber Retaliator Solutions remains the property of Cyber Retaliator Solutions.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">4. Confidentiality</h2>
          <p>Information stored within Retaliate CRM, including customer data and internal company information, is considered confidential. You agree to handle all such information in accordance with Cyber Retaliator Solutions' confidentiality policies and not to disclose it to unauthorized third parties.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">5. Disclaimers and Limitation of Liability</h2>
          <p><strong>5.1. Disclaimer of Warranties:</strong> THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. THE COMPANY DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.</p>
          <p><strong>5.2. Limitation of Liability:</strong> TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL CYBER RETALIATOR SOLUTIONS OR SKUNKWORKS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; OR (C) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.</p>
          <p>THE COMPANY'S AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE SHALL NOT EXCEED THE AMOUNT, IF ANY, PAID BY CYBER RETALIATOR SOLUTIONS FOR THE USE OF THE SERVICE DURING THE TWELVE (12) MONTH PERIOD PRECEDING THE CLAIM.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">6. Termination</h2>
          <p>The Company may terminate or suspend your access to the Service at any time, with or without cause or notice, for conduct that violates these Terms or is otherwise harmful to the Company's interests or other users of the Service. Your access will typically terminate upon cessation of your employment or contractual relationship with Cyber Retaliator Solutions.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">7. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Cyber Retaliator Solutions is established, without regard to its conflict of law principles.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">8. Changes to These Terms</h2>
          <p>We reserve the right to modify these Terms at any time. If we make material changes to these Terms, we will provide notice through the Service or by other means. Your continued use of the Service after such notice constitutes your acceptance of the modified Terms.</p>

          <h2 className="text-2xl font-semibold font-headline mt-8 mb-4">9. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact the designated internal administrator or legal department at Cyber Retaliator Solutions.</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
