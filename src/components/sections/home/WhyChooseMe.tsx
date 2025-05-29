"use client"
import Image from "next/image";
    import { motion, MotionValue, useTransform } from "motion/react";
    
interface MeetConorProps {
  scrollYProgress: MotionValue<number>;
}
export function WhyChooseMe({ scrollYProgress }: MeetConorProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        type: "spring",
        bounce: 0.2
      }
    }
  };
  
  const translateY = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <motion.section className="z-30 flex flex-col lg:flex-row w-full mb-20 md:mb-32 px-[7px] gap-10 lg:justify-between items-center relative" style={{translateY}}>
      <motion.div
        className="relative w-full lg:w-[30%] aspect-square shadow-left rounded-full overflow-hidden border-4 border-primary"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image
          src="/breathwork-image.jpg"
          alt="Why Choose Me"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-full"
        />
      </motion.div>

      <motion.div
        className="w-full overflow-hidden lg:w-[63%] shadow-right md:p-8 lg:p-10 px-4 py-8 flex flex-col justify-center items-start gap-6 md:gap-8 bg-primary border-secondary border rounded-3xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={textVariants} className="w-full overflow-hidden flex flex-col items-start gap-4">
          <h2 className="h2">Why Choose me?</h2>
        </motion.div>

        <div className="w-full flex flex-col items-start gap-4">
          <div className="features-list overflow-hidden">
            <ul className="flex flex-col items-start gap-4 overflow-hidden">
              <motion.li variants={textVariants} className="body-text font-semibold">
                <strong className="font-bold font-fraunces">
                  I&apos;ve Been There:
                </strong>{" "}
                I know what it&apos;s like to feel lost — but also the joy
                of reclaiming your life.
              </motion.li>
              <motion.li variants={textVariants} className="body-text font-semibold">
                <strong className="font-bold font-fraunces">
                  A Safe Space:
                </strong>{" "}
                No expectations. No judgement. Just a place for you to
                explore parts of yourself holding you back.
              </motion.li>
            </ul>
          </div>
          <motion.p variants={textVariants} className="body-text-lg italic font-semibold mt-4">
            Whatever you&apos;re facing, I&apos;m here to show you that
            you can transform your life too.
          </motion.p>
        </div>
      </motion.div>
    </motion.section>
  );
}
