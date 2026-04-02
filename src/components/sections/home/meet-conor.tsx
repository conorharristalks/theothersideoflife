"use client";
import { InteractiveButton } from "@/components/ui/buttons/interactive-button";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

export function MeetConor() {
  const body = useRef(null);
  const isInView = useInView(body, { once: true });

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
    enter: (i: number) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="z-20 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 md:mb-32 mx-[7px] sticky top-0">
      <motion.div
        className="lg:col-span-2 shadow-left-orange px-4 py-8 md:p-8 lg:p-10 flex flex-col gap-6 md:gap-8 bg-box-bg text-[#353535] rounded-3xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        ref={body}
      >
        <div className="w-full flex flex-col items-start gap-4">
          {/* Title with masked animation */}
          <div className="overflow-hidden">
            <motion.h2
              className="h2 text-accent-1"
              variants={itemVariants}
              custom={0}
              initial="hidden"
              animate={isInView ? "enter" : "hidden"}
            >
              Meet Conor Harris
            </motion.h2>
          </div>

          {/* Intro paragraph with masked animation */}
          <div className="overflow-hidden">
            <motion.p
              className="body-text-lg font-bold italic text-accent-1"
              variants={itemVariants}
              custom={1}
              initial="hidden"
              animate={isInView ? "enter" : "hidden"}
            >
              7 years ago I broke the cycle, defied the odds and rebuilt my
              life. My coaching is designed to help you achieve the same,
              without the guess work.
            </motion.p>
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-4">
          {/* Mission title with masked animation */}
          <div className="overflow-hidden">
            <motion.h3
              className="h3"
              variants={itemVariants}
              custom={2}
              initial="hidden"
              animate={isInView ? "enter" : "hidden"}
            >
              My Mission
            </motion.h3>
          </div>

          <div className="features-list">
            <ul className="flex flex-col items-start gap-4">
              {/* First list item with visible bullets */}
              <li>
                <div className="overflow-y-hidden">
                  <motion.div
                    variants={itemVariants}
                    custom={3}
                    initial="hidden"
                    animate={isInView ? "enter" : "hidden"}
                    className="body-text font-semibold"
                  >
                    Inspiring young people in schools to live a balanced
                    lifestyle without using drugs.
                  </motion.div>
                </div>
              </li>

              {/* Second list item with visible bullets */}
              <li>
                <div className="overflow-y-hidden overflow-x-visible">
                  <motion.div
                    variants={itemVariants}
                    custom={4}
                    initial="hidden"
                    animate={isInView ? "enter" : "hidden"}
                    className="body-text font-semibold"
                  >
                    Supporting you to live your life with integrity so you can
                    live with leadership and purpose.
                  </motion.div>
                </div>
              </li>
              <li>
                <div className="overflow-y-hidden overflow-x-visible">
                  <motion.div
                    variants={itemVariants}
                    custom={4}
                    initial="hidden"
                    animate={isInView ? "enter" : "hidden"}
                    className="body-text font-semibold"
                  >
                    Guiding you through 1 to 1 and group breathwork sessions
                  </motion.div>
                </div>
              </li>
            </ul>
          </div>

          {/* Final paragraph with masked animation */}
          <div className="overflow-hidden mt-4">
            <motion.p
              className="body-text-lg italic font-semibold"
              variants={itemVariants}
              custom={5}
              initial="hidden"
              animate={isInView ? "enter" : "hidden"}
            >
              Is this your time to step into your power and create something
              new? If so join me on this journey of transformation
            </motion.p>
          </div>
        </div>

        <div className="overflow-hidden pb-[7px]">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            custom={6}
            animate={isInView ? "enter" : "hidden"}
          >
            {/* Wrapping the button in an anchor tag instead of using href prop */}
            <Link href="/about">
              <InteractiveButton
                variant="transparent"
                text="More About Me"
                className="md:w-64 w-full py-3 transition-all ease-in duration-100"
                ballClassName="md:left-[13%] md:top-[35%] left-[15%] top-[35%]"
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="lg:col-span-1 h-[300px] sm:h-[400px] lg:h-auto shadow-right rounded-3xl relative"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image
          src="/conor-selfie.jpeg"
          alt="Portrait"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-3xl"
        />
      </motion.div>
    </section>
  );
}
