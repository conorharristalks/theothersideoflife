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
              Terms and Conditions
            </motion.h1>
          </div>

          <motion.div className="prose prose-lg max-w-none space-y-8" variants={itemVariants}>
            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Introduction</h2>
              <p className="font-nunito text-secondary leading-relaxed">
                Welcome to The Other Side Of Life. These Terms and Conditions outline the rules and regulations for the use of our website. By accessing this website, you accept these terms and conditions in full. If you disagree with any part of these terms and conditions, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Use of the Website</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-fraunces font-semibold text-secondary mb-3">Eligibility</h3>
                <p className="font-nunito text-secondary leading-relaxed">
                  Our website is designed for users of all ages to access general content. However, you must be at least 18 years of age to book a discovery call for individual wellbeing coaching, breathwork coaching, or an institutional talk through our website.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-fraunces font-semibold text-secondary mb-3">Permitted Use</h3>
                <p className="font-nunito text-secondary leading-relaxed mb-3">
                  You are granted a non-exclusive, non-transferable, revocable licence to access and use our website strictly in accordance with these terms of use. This includes:
                </p>
                <ul className="list-disc pl-6 font-nunito text-secondary space-y-2">
                  <li>Booking discovery calls for individual wellbeing coaching or breathwork coaching via our external scheduling platform, Calendly.</li>
                  <li>Booking institutional talks through our custom booking system.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-fraunces font-semibold text-secondary mb-3">Prohibited Actions</h3>
                <p className="font-nunito text-secondary leading-relaxed">
                  You agree not to engage in any of the following prohibited activities: (a) using the website for any unlawful purpose; (b) attempting to interfere with the website's operation or security; (c) accessing the website using automated means such as bots; (d) using the website in a way that disrupts its normal functioning.
                </p>
              </div>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Booking Services</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-fraunces font-semibold text-secondary mb-3">Discovery Call Bookings (Individual Wellness Coaching or Breathwork Coaching)</h3>
                <p className="font-nunito text-secondary leading-relaxed">
                  Discovery calls for individual wellness coaching or breathwork coaching are facilitated through Calendly, an external scheduling platform. By booking a discovery call, you agree to comply with Calendly&apos;s terms of service, available at Calendly&apos;s Terms of Use. We are not responsible for the availability or functionality of Calendly&apos;s services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-fraunces font-semibold text-secondary mb-3">Talk Bookings (with Institutions)</h3>
                <p className="font-nunito text-secondary leading-relaxed">
                  Institutional talk bookings are processed through our custom booking system. By submitting a booking request, you agree to provide accurate and complete information to facilitate the booking process. We reserve the right to decline or cancel bookings at our discretion, subject to applicable laws.
                </p>
              </div>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Intellectual Property</h2>
              <p className="font-nunito text-secondary leading-relaxed">
                All original content included on this website, including but not limited to text, graphics, logos, images, and software, is the property of Conor Harris or its content suppliers and is protected by international copyright laws. However, some icons and other graphical elements used on the website may be freely available online under various licences and are not our proprietary content. Unauthorised use of any original content from this website is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Links to Professional Helplines</h2>
              <p className="font-nunito text-secondary leading-relaxed">
                Our website may contain links to phone numbers that connect directly to professional helplines for drug use. These are provided solely for the convenience of our users. We are not responsible for the content or availability of these services, and we do not endorse or have any association with the operators of these helplines. Your use of such services is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Limitation of Liability</h2>
              <p className="font-nunito text-secondary leading-relaxed">
                In no event shall Conor Harris, his affiliates, or his partners be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, profits, or goodwill, arising from your use of the website, booking services (including those facilitated through Calendly or our custom booking system), or any other services provided, even if we have been advised of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Governing Law</h2>
              <p className="font-nunito text-secondary leading-relaxed">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of The Republic of Ireland. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Kildare.
              </p>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Changes to the Terms</h2>
              <p className="font-nunito text-secondary leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Any changes will be posted on this page, and your continued use of the website following the posting of changes constitutes your acceptance of such changes.
              </p>
            </section>

            <section>
              <h2 className="h3 font-fraunces font-bold text-secondary mb-4">Contact Information</h2>
              <p className="font-nunito text-secondary leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us at{" "}
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