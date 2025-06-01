"use client";

import { InteractiveButton } from "@/components/ui/buttons/interactive-button";
import Image from "next/image";
import { motion } from "motion/react";
import { useRef } from "react";

const Page = () => {
  const containerRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i:number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: i * 0.1,
      },
    }),
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <section className="bg-primary border-b-4 border-b-secondary h-full lg:min-h-[calc(100vh-6rem)] w-screen bg-[url('/wave-icon.svg')] bg-no-repeat bg-[position:0%] lg:bg-[position:135%_15%] relative">
        <div className="lg:px-[2vw] md:px-[2.5vw] px-[3.5vw]">
          <div className="w-full min-h-full lg:flex lg:flex-row flex flex-col justify-between items-center pt-10 pb-10 relative">
            <motion.div
              className="flex flex-col md:w-[55%] w-full min-h-full bg-transparent items-start lg:justify-between gap-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="overflow-hidden">
                <motion.h1
                  className="h1 font-fraunces font-bold text-foreground"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.75,
                    ease: [0.33, 1, 0.68, 1],
                    delay: 0.1,
                  }}
                >
                  1:1 Coaching for When You&apos;re Ready to Rebuild from the
                  Inside Out
                </motion.h1>
              </div>

              <motion.div
                className="flex flex-col items-start gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-start justify-start gap-3 w-full md:w-[90%] overflow-hidden">
                    <motion.p
                      className="lg:text-xl md:text-lg text-[16px] font-nunito"
                      variants={itemVariants}
                    >
                      This is a space for honest conversations, healing, and
                      real change. Whether you&apos;re feeling stuck, burned
                      out, or just know there&apos;s more to life — this
                      coaching helps you reconnect, reframe, and move forward
                      with clarity and confidence.
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="w-full"
              >
                <InteractiveButton
                  variant="filled"
                  text="Book a free discovery call"
                  className="md:w-[50%] w-full py-4 bg-accent-1 text-primary hover:text-secondary transition-all ease-in duration-100 border-accent-2 border-1 hover:border-1"
                  ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
                />
              </motion.div>
            </motion.div>

            {/* Right image section - aligned with buttons */}
            <motion.div
              className="relative lg:w-[35%] md:w-[70%] w-full flex justify-center lg:mt-0 mt-8 md:mr-[21px]"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Main portrait image - using aspect-square to ensure perfect circle */}
              <div className="aspect-square w-full relative lg:shadow-right md:shadow-left shadow-right rounded-full z-20 border border-primary-light overflow-hidden">
                <Image
                  src="/conor-meditate-2.jpeg"
                  alt="Portrait"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* What sets me apart section - within the same main section for scroll reveal */}
        <motion.div
          className="w-full bg-transparent py-16 lg:py-20 lg:px-[2vw] md:px-[2.5vw] px-[3.5vw] mt-10"
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-8 lg:gap-0">
              {/* Left column with heading and content */}
              <div className="w-full lg:w-[45%] flex flex-col items-start lg:items-start">
                <div className="overflow-hidden mb-6">
                  <motion.h2
                    className="h2 font-fraunces font-bold text-foreground"
                    variants={itemVariants}
                  >
                    What Sets Me Apart?
                  </motion.h2>
                </div>
                <div className="overflow-hidden">
                  <motion.p
                    className="lg:text-lg text-md font-nunito leading-relaxed font-semibold text-foreground"
                    variants={itemVariants}
                  >
                    My coaching approach is built on a unique foundation. I coach
                    from a place of personal experience partnered with education.
                    I&apos;ve navigated the downfalls, challenges, and dark places
                    that many struggle with. As I guide you through this healing
                    journey, know that I&apos;ve walked this road myself
                  </motion.p>
                </div>
              </div>

              {/* Border separation - only visible on lg screens and up */}
              <motion.div
                className="hidden lg:block w-px bg-secondary shadow-[-6px_-6px_0px_#003049]/70 self-stretch mx-8"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              ></motion.div>

              {/* Right column with qualifications */}
              <div className="w-full h-full flex flex-col justify-between lg:w-[50%] mt-6 lg:mt-0">
                <div className="overflow-hidden mb-6">
                  <motion.h2
                    className="h2 font-fraunces font-bold text-foreground"
                    variants={itemVariants}
                  >
                    What makes me qualified?
                  </motion.h2>
                </div>
                <motion.ul
                  className="mt-4 h-full flex flex-col justify-between w-full list-disc pl-5 text-secondary font-nunito lg:text-lg text-md leading-relaxed font-semibold"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.li variants={fadeInVariants}>
                    Addiction Studies Level 7 Certification
                  </motion.li>
                  <motion.li variants={fadeInVariants}>
                    300 Hour Trauma Informed Breathwork Certification
                  </motion.li>
                </motion.ul>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How does this impact your journey section */}
      <section className="w-screen bg-primary py-16 lg:py-24 md:pr-[14px] pr-[7px]">
        <div className="px-[3.5vw] md:px-[2.5vw] lg:px-[2vw]">
          <motion.div
            className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Left column - heading, text, and CTA */}
            <div className="w-full lg:w-[35%] flex flex-col items-start gap-8 justify-center">
              <div className="overflow-hidden">
                <motion.h2
                  className="h2 font-fraunces font-bold text-secondary"
                  variants={itemVariants}
                >
                  How does this impact your journey?
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  className="lg:text-lg text-md font-nunito leading-relaxed text-secondary italic"
                  variants={itemVariants}
                >
                  As you step into this space, you will have 1-1 support,
                  working off a framework that will help you reset, refocus and
                  reclaim your life.
                </motion.p>
              </div>

              {/* CTA directly after text - FIXED BUTTON */}
             
                <motion.div className="w-full flex justify-center items-center" variants={fadeInVariants}>
                  <InteractiveButton
                  variant="filled"
                  text="Book a free discovery call"
                  className="w-full py-4 bg-accent-1 text-primary hover:text-secondary transition-all ease-in duration-100 border-accent-2 border-1 hover:border-1"
                  ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
                  href="/book-appointment"
                />

                </motion.div>
              
            </div>

            {/* Right column - 2x2 cards grid */}
            <div className="w-full lg:w-[60%]">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {/* Card 1 */}
                <motion.div
                  className="bg-primary-light shadow-right border border-secondary/80 rounded-3xl p-6 pt-8 pb-10 flex flex-col min-h-[320px]"
                  custom={0}
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <p className="font-nunito text-secondary text-lg mb-6 flex-grow">
                    Discover your purpose and find a sense of direction -
                    being guided when you feel lost, through ongoing support.
                  </p>
                  <div className="flex justify-center mt-auto py-4">
                    <Image
                      src="/icons/path.svg"
                      alt="Path with star icon"
                      width={140}
                      height={140}
                      className="object-contain h-28 w-auto"
                    />
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  className="bg-primary-light shadow-left border border-secondary/80 rounded-3xl p-6 pt-8 pb-10 flex flex-col min-h-[320px]"
                  custom={1}
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <p className="font-nunito text-secondary text-lg mb-6 flex-grow">
                    Align with your authentic self and make more intentional
                    decisions.
                  </p>
                  <div className="flex justify-center mt-auto py-4">
                    <Image
                      src="/icons/heart-hug.svg"
                      alt="Heart with decorative elements"
                      width={140}
                      height={140}
                      className="object-contain h-28 w-auto"
                    />
                  </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  className="bg-primary-light shadow-right border border-secondary/80 rounded-3xl p-6 pt-8 pb-10 flex flex-col min-h-[320px]"
                  custom={2}
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <p className="font-nunito text-secondary text-lg mb-6 flex-grow">
                    Learn how to build stronger, healthier relationships with
                    others, and most importantly yourself.
                  </p>
                  <div className="flex justify-center mt-auto py-4">
                    <Image
                      src="/icons/group.svg"
                      alt="Group of people icon"
                      width={140}
                      height={140}
                      className="object-contain h-28 w-auto"
                    />
                  </div>
                </motion.div>

                {/* Card 4 */}
                <motion.div
                  className="bg-primary-light shadow-left border border-secondary/80 rounded-3xl p-6 pt-8 pb-10 flex flex-col min-h-[320px]"
                  custom={3}
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <p className="font-nunito text-secondary text-lg mb-6 flex-grow">
                    Learn about yourself in deeper ways, what truly drives you
                    and where your strengths lie.
                  </p>
                  <div className="flex justify-center mt-auto py-4">
                    <Image
                      src="/icons/meditate.svg"
                      alt="Person meditating icon"
                      width={140}
                      height={140}
                      className="object-contain h-28 w-auto"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-screen bg-primary py-16 lg:py-24">
        <div className="px-[3.5vw] md:px-[2.5vw] lg:px-[2vw]">
          <div className="container mx-auto">
            <motion.div
              className="w-full flex flex-col items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="overflow-hidden mb-12">
                <motion.h2
                  className="h2 font-fraunces font-bold text-secondary text-center"
                  variants={itemVariants}
                >
                  What does your coaching journey look like?
                </motion.h2>
              </div>

              <motion.div
                className="w-full max-w-7xl bg-[#FFF4D6] border border-secondary/20 rounded-3xl p-8 md:p-10 shadow-lg"
                variants={imageVariants}
              >
                <div className="overflow-hidden mb-8">
                  <motion.p
                    className="font-nunito text-secondary lg:text-lg text-md"
                    variants={itemVariants}
                  >
                    Your coaching journey with me is designed around you.
                    We&apos;ll focus on your unique goals, navigate your specific
                    challenges, and actively work towards creating the life you
                    genuinely desire. While every path is personal, all my clients
                    benefit from:
                  </motion.p>
                </div>

                <motion.ul className="space-y-6" variants={containerVariants}>
                  <motion.li
                    className="flex items-start"
                    variants={fadeInVariants}
                  >
                    <span className="text-secondary text-xl mr-3 leading-6">
                      •
                    </span>
                    <div className="flex flex-col">
                      <span className="font-bold text-secondary mb-1">
                        Consistent Weekly Check-ins:
                      </span>
                      <span className="text-secondary">
                        We&apos;ll have a dedicated weekly touchpoint to
                        celebrate your successes, track your progress, and
                        address any challenges, ensuring you stay accountable
                        and motivated.
                      </span>
                    </div>
                  </motion.li>

                  <motion.li
                    className="flex items-start"
                    variants={fadeInVariants}
                  >
                    <span className="text-secondary text-xl mr-3 leading-6">
                      •
                    </span>
                    <div className="flex flex-col">
                      <span className="font-bold text-secondary mb-1">
                        Weekday Direct Communication:
                      </span>
                      <span className="text-secondary">
                        You&apos;ll have ongoing support available during the
                        week via WhatsApp. This means quick guidance and
                        encouragement whenever you need it the most.
                      </span>
                    </div>
                  </motion.li>

                  <motion.li
                    className="flex items-start"
                    variants={fadeInVariants}
                  >
                    <span className="text-secondary text-xl mr-3 leading-6">
                      •
                    </span>
                    <div className="flex flex-col">
                      <span className="font-bold text-secondary mb-1">
                        Personalised Daily Wellbeing Practices:
                      </span>
                      <span className="text-secondary">
                        I&apos;ll design practical exercises that you can easily
                        integrate into your routine to build positive habits and
                        improve your daily wellbeing.
                      </span>
                    </div>
                  </motion.li>

                  <motion.li
                    className="flex items-start"
                    variants={fadeInVariants}
                  >
                    <span className="text-secondary text-xl mr-3 leading-6">
                      •
                    </span>
                    <div className="flex flex-col">
                      <span className="font-bold text-secondary mb-1">
                        1-1 Monthly Breathwork Sessions:
                      </span>
                      <span className="text-secondary">
                        Each month, you&apos;ll receive 1-1 breathwork sessions.
                        Find out more about breathwork and its benefits{" "}
                        <a
                          href="/breathwork"
                          className="text-accent-1 underline hover:text-accent-2"
                        >
                          here
                        </a>
                        .
                      </span>
                    </div>
                  </motion.li>

                  <motion.li
                    className="flex items-start"
                    variants={fadeInVariants}
                  >
                    <span className="text-secondary text-xl mr-3 leading-6">
                      •
                    </span>
                    <div className="flex flex-col">
                      <span className="font-bold text-secondary mb-1">
                        Your Individualised Wellbeing Program:
                      </span>
                      <span className="text-secondary">
                        Together, we&apos;ll build a custom roadmap designed
                        around you, ensuring you achieve your goals and grow as
                        a person.
                      </span>
                    </div>
                  </motion.li>

                  <motion.li
                    className="flex items-start"
                    variants={fadeInVariants}
                  >
                    <span className="text-secondary text-xl mr-3 leading-6">
                      •
                    </span>
                    <div className="flex flex-col">
                      <span className="font-bold text-secondary mb-1">
                        Monthly Review Zoom Calls:
                      </span>
                      <span className="text-secondary">
                        Once a month, we&apos;ll connect via zoom to reassess
                        your journey, re-evaluate your goals, and fine-tune your
                        program.
                      </span>
                    </div>
                  </motion.li>
                </motion.ul>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Process Flow Diagram */}
        <motion.div
          className="mt-24 mb-8 md:max-w-2xl w-full mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center mb-12">
            <div className="overflow-hidden mb-4">
              <motion.h3
                className="font-fraunces text-2xl font-bold text-secondary"
                variants={itemVariants}
              >
                Not sure if I&apos;m right for you?
              </motion.h3>
            </div>
            <motion.p
              className="font-nunito text-lg text-secondary"
              variants={fadeInVariants}
            >
              Book a free discovery call to find out!
            </motion.p>
          </div>

          <div className="flex flex-col gap-6 lg:px-[2vw] md:px-[2.5vw] px-[3.5vw]">
            {/* Step 1 */}
            <motion.div
              className="px-6 py-4 border-2 border-secondary/30 rounded-3xl bg-primary text-center w-full"
              custom={0}
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <p className="font-nunito text-secondary text-lg">
                Book a free discovery call with me
              </p>
            </motion.div>

            {/* Arrow 1 */}
            <motion.div
              className="flex justify-center my-2"
              variants={fadeInVariants}
            >
              <Image
                src="/icons/dotted-arrow.svg"
                alt="Down arrow"
                width={50}
                height={20}
                className="rotate-90"
              />
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="px-6 py-4 border-2 border-secondary/30 rounded-3xl bg-primary text-center w-full"
              custom={1}
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <p className="font-nunito text-secondary text-lg">
                Find out what&apos;s the best plan for you
              </p>
            </motion.div>

            {/* Arrow 2 */}
            <motion.div
              className="flex justify-center my-2"
              variants={fadeInVariants}
            >
              <Image
                src="/icons/dotted-arrow.svg"
                alt="Down arrow"
                width={50}
                height={20}
                className="rotate-90"
              />
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="px-6 py-4 border-2 border-secondary/30 rounded-3xl bg-primary text-center w-full"
              custom={2}
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <p className="font-nunito text-secondary text-lg">
                We&apos;ll develop an individualised plan tailored to you
              </p>
            </motion.div>

            {/* Arrow 3 */}
            <motion.div
              className="flex justify-center my-2"
              variants={fadeInVariants}
            >
              <Image
                src="/icons/dotted-arrow.svg"
                alt="Down arrow"
                width={50}
                height={20}
                className="rotate-90 "
              />
            </motion.div>

            {/* Step 4 */}
            <motion.div
              className="px-6 py-4 border-2 border-secondary/30 rounded-3xl bg-primary text-center w-full"
              custom={3}
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <p className="font-nunito text-secondary text-lg">
                Decide if you want to work with me
              </p>
            </motion.div>

            {/* Arrow to CTA */}
            <motion.div
              className="flex justify-center my-2"
              variants={fadeInVariants}
            >
              <Image
                src="/icons/dotted-arrow.svg"
                alt="Down arrow"
                width={50}
                height={20}
                className="rotate-90"
              />
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="flex justify-center mt-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <InteractiveButton
                variant="filled"
                text="Book a discovery call"
                className="md:w-[60%] w-full py-4 bg-accent-1 text-primary hover:text-secondary transition-all ease-in duration-100 border-accent-2 border-1 hover:border-1"
                ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Page;
