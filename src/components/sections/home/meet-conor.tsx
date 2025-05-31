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
        className="lg:col-span-2 shadow-left px-4 py-8 md:p-8 lg:p-10 flex flex-col gap-6 md:gap-8 bg-primary border-secondary border rounded-3xl overflow-hidden"
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
              className="h2"
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
              className="body-text-lg font-bold italic"
              variants={itemVariants}
              custom={1}
              initial="hidden"
              animate={isInView ? "enter" : "hidden"}
            >
              6 years ago, I broke free from addiction and rebuilt my life. Now,
              at The Other Side of Life, I&apos;m on a mission to help others do
              the same.
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
                    Here at &quot;The Other Side of Life&quot; my main aim is
                    speaking in schools to help young people learn the realities
                    of drug misuse, and promoting a balanced lifestyle without
                    them.
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
                    I also guide individuals through transformative breathwork
                    sessions to explore parts of themselves they never knew
                    existed, and guide them to rediscover themselves.
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
              I believe everyone deserves a happier, healthier life. True change
              that starts from within - so join me on this journey of
              transformation!
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
                className="md:w-64 w-full py-4 hover:text-primary transition-all ease-in duration-100"
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
