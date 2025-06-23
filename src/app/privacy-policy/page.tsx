"use client";

import { motion } from "motion/react";

const Page = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-primary py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-primary-light border border-secondary/30 rounded-3xl p-8 md:p-12 shadow-lg"
        >
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="h1 font-fraunces font-bold text-secondary text-center mb-8"
              variants={itemVariants}
            >
              Privacy Policy
            </motion.h1>
          </div>

          <motion.div className="prose prose-lg max-w-none space-y-8" variants={itemVariants}>
            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Introduction</h2>
              <p className="font-nunito text-secondary leading-relaxed">
                The Other Side Of Life is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website. By using our website, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Information We Collect</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-fraunces font-semibold text-secondary mb-3">Discovery Call Bookings (Individual Wellbeing Coaching or Breathwork Coaching)</h3>
                <p className="font-nunito text-secondary leading-relaxed mb-3">
                  When you book a discovery call for individual wellness coaching or breathwork coaching through our website, you are redirected to Calendly, an external scheduling platform. The following personal information may be collected by Calendly:
                </p>
                <ul className="list-disc pl-6 font-nunito text-secondary space-y-2">
                  <li><strong>Full Name:</strong> To identify you for the discovery call.</li>
                  <li><strong>Email Address:</strong> For communication and confirmation of your booking.</li>
                  <li><strong>Phone Number (optional):</strong> If provided, used for additional communication regarding your booking.</li>
                  <li><strong>Preferred Date & Time:</strong> To schedule your discovery call.</li>
                </ul>
                <p className="font-nunito text-secondary leading-relaxed mt-3">
                  Please note that Calendly&apos;s own privacy policy governs the collection and use of your information on their platform. Review Calendly&apos;s Privacy Policy{" "}
                  <a 
                    href="https://calendly.com/legal/privacy-notice" 
                    className="text-accent-1 hover:text-accent-1/80 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                  {" "}for details.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-fraunces font-semibold text-secondary mb-3">Talk Bookings (with Institutions)</h3>
                <p className="font-nunito text-secondary leading-relaxed mb-3">
                  When you book a talk for an institution through our website, we collect the following personal information via our custom booking system:
                </p>
                <ul className="list-disc pl-6 font-nunito text-secondary space-y-2">
                  <li><strong>Full Name:</strong> The name of the person booking the event.</li>
                  <li><strong>Email Address:</strong> Used for communication and confirmation purposes.</li>
                  <li><strong>Phone Number:</strong> Used for contacting you about the event booking.</li>
                  <li><strong>Institution Name:</strong> The name of the institution where you wish to hold the event.</li>
                  <li><strong>Institution Address:</strong> The address of the institution for logistical purposes.</li>
                  <li><strong>Preferred Date & Time:</strong> The date and time you wish for Conor to attend the event.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">How We Use Your Information</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-fraunces font-semibold text-secondary mb-3">Discovery Call Bookings</h3>
                <p className="font-nunito text-secondary leading-relaxed mb-3">For discovery calls booked via Calendly:</p>
                <ul className="list-disc pl-6 font-nunito text-secondary space-y-2">
                  <li>Your information is used solely to facilitate and confirm your discovery call for individual wellbeing or breathwork coaching.</li>
                  <li>We may access your booking details through Calendly to prepare for and conduct the call.</li>
                  <li>We do not store your discovery call booking information in our own systems beyond what is necessary to coordinate the call.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-fraunces font-semibold text-secondary mb-3">Talk Bookings</h3>
                <p className="font-nunito text-secondary leading-relaxed mb-3">For talk bookings processed through our booking system:</p>
                <ul className="list-disc pl-6 font-nunito text-secondary space-y-2">
                  <li>We use your email address and phone number to communicate with you regarding your booking.</li>
                  <li>The institution name and address are used to plan and coordinate the event.</li>
                  <li>We do not use your information for any other purposes. No promotional material will be sent to you.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Data Sharing</h2>
              <ul className="list-disc pl-6 font-nunito text-secondary space-y-3">
                <li><strong>Discovery Call Bookings:</strong> Your information provided through Calendly is subject to Calendly's privacy practices. We do not share, sell, or rent any information accessed from Calendly to third parties beyond what is necessary to facilitate the discovery call.</li>
                <li><strong>Talk Bookings:</strong> We do not share, sell, or rent your personal information collected through our booking system to any third parties. Your information is kept confidential and used solely for the purpose of event booking as outlined above.</li>
              </ul>
              <p className="font-nunito text-secondary leading-relaxed mt-4">
                Our external database provider MongoDB Atlas (used for talk bookings) is subject to strict data protection agreements to ensure your information remains secure and confidential. See their privacy policy{" "}
                <a 
                  href="https://www.mongodb.com/legal/privacy/privacy-policy" 
                  className="text-accent-1 hover:text-accent-1/80 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Data Security</h2>
              <p className="font-nunito text-secondary leading-relaxed">
                We take the security of your personal information seriously and use appropriate measures to protect it. For talk bookings, our custom booking system and external database employ industry-standard security protocols. For discovery calls, Calendly implements its own security measures, which are detailed in their privacy policy. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Your Rights</h2>
              <ul className="list-disc pl-6 font-nunito text-secondary space-y-2">
                <li>You have the right to access, correct, or request the deletion of your personal information at any time.</li>
                <li>For discovery call bookings, you may need to contact Calendly directly to exercise these rights, as they control the data collected through their platform.</li>
                <li>For talk bookings, please contact us at conorharris.talks@gmail.com to exercise these rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Changes to This Policy</h2>
              <p className="font-nunito text-secondary leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and your continued use of the website after such changes have been made constitutes your acceptance of the new policy.
              </p>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Disclaimer</h2>
              <p className="font-nunito text-secondary leading-relaxed">
                None of the information set out in this website is intended as professional advice. If you are struggling with any issues, we strongly encourage you to seek professional help.
              </p>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Contact Information</h2>
              <p className="font-nunito text-secondary leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:conorharris.talks@gmail.com" className="text-accent-1 hover:text-accent-1/80 underline">
                  conorharris.talks@gmail.com
                </a>
                .
              </p>
            </section>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;