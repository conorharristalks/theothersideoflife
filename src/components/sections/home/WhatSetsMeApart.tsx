"use client";
import { InteractiveButton } from "@/components/ui/buttons/interactive-button";
import { motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export function WhatSetsMeApart() {
  const containerRef = useRef(null);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 md:mb-32 px-[7px]"
    >
      <motion.div
        className="lg:col-span-1 order-2 lg:order-2 h-[300px] sm:h-[400px] lg:h-auto shadow-right rounded-3xl relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/conor-selfie.jpeg"
          alt="Services"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-3xl"
        />
      </motion.div>

      <motion.div
        className="lg:col-span-2 order-1 lg:order-1 shadow-left px-4 py-8 md:p-8 lg:p-10 flex flex-col gap-6 md:gap-8 bg-primary border-secondary border rounded-3xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div
          variants={itemVariants}
          className="w-full flex flex-col items-start gap-4"
        >
          <h2 className="h2">What sets me apart?</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          variants={containerVariants}
        >
          <motion.div
            variants={gridItemVariants}
            className="bg-primary-light p-6 rounded-xl border border-secondary shadow-md"
          >
            <h5 className="h5 mb-3">Real Experience</h5>
            <p className="body-text font-semibold">
              Having overcome addiction and mental health issues, I have the
              ability to connect with people on a deeper level.
            </p>
          </motion.div>

          <motion.div
            variants={gridItemVariants}
            className="bg-primary-light p-6 rounded-xl border border-secondary shadow-md"
          >
            <h5 className="h5 mb-3">Proven Impact</h5>
            <p className="body-text font-semibold">
              Over 150 talks, and thousands of lives touched.
            </p>
          </motion.div>

          <motion.div
            variants={gridItemVariants}
            className="bg-primary-light p-6 rounded-xl border border-secondary shadow-md"
          >
            <h5 className="h5 mb-3">Qualifications</h5>
            <p className="body-text font-semibold">
              Certified Breathwork Coach with over 300 hours of training,
              alongside a level 7 in addiction studies.
            </p>
          </motion.div>

          <motion.div
            variants={gridItemVariants}
            className="bg-primary-light p-6 rounded-xl border border-secondary shadow-md"
          >
            <h5 className="h5 mb-3">My Mission</h5>
            <p className="body-text font-semibold">
              Supporting you towards greater wellbeing, whether you&apos;re
              seeking stress management, healing, or direction.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex lg:gap-10 gap-4 flex-wrap"
        >
          <InteractiveButton
            variant="filled"
            text="Explore Coaching"
            className="md:w-64 w-full py-4 bg-accent-1 text-primary hover:text-secondary transition-all ease-in duration-100 hover:border-0"
            ballClassName="lg:left-[7%] left-[15%] top-[35%] bg-accent-2"
            href="/breathwork"
          />
          <InteractiveButton
            variant="transparent"
            text="Explore Breathwork"
            className="md:w-70 w-full py-4 hover:text-primary transition-all ease-in duration-100"
            ballClassName="md:left-[13%] md:top-[35%] left-[15%] top-[35%]"
            href="/coaching"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
