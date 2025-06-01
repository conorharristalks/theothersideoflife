"use client";

import BenefitCard from "@/components/breathwork/benefit-card";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { InteractiveButton } from "@/components/ui/buttons/interactive-button";
import { testimonialData } from "@/lib/constants";
import { motion } from "motion/react";
import Image from "next/image";

const Page = () => {
  // Define benefit cards data
  const benefitCards = [
    {
      id: 1,
      title: (
        <>
          Reduces Stress &<br />
          Anxiety
        </>
      ),
      description:
        "Conscious breathing techniques can activate the parasympathetic nervous system, which promotes relaxation and helps to calm the mind and body, effectively lowering stress and anxiety levels.",
      icon: "/icons/breathwork-benefit-1.svg",
      shadowDirection: "right" as const,
      expandedContent: {
        description:
          "The 4-7-8 breathing technique, where you inhale for 4 counts, hold for 7, and exhale for 8, is particularly effective for stress reduction. Regular practice can lower cortisol levels and decrease anxiety symptoms over time. Studies have shown that just 10 minutes of deep breathing daily can significantly improve your body's stress response.",
        listItems: [
          "Reduces cortisol levels in the body",
          "Activates the body's relaxation response",
          "Improves sleep quality and reduces insomnia",
          "Helps manage panic attacks and acute anxiety",
        ],
      },
    },
    {
      id: 2,
      title: (
        <>
          Increase Energy
          <br />
          Levels
        </>
      ),
      description:
        "Certain breathwork practices can oxygenate the body more efficiently, leading to an increase in energy, improved focus, and a reduction in feelings of fatigue.",
      icon: "/icons/breathwork-benefit-2.svg",
      shadowDirection: "left" as const,
      expandedContent: {
        description:
          "Energizing breathwork techniques like the Wim Hof Method or Breath of Fire can invigorate your body by increasing oxygen intake and circulation. These practices stimulate the sympathetic nervous system in a controlled way, leading to natural energy boosts without the crash associated with caffeine or other stimulants.",
        listItems: [
          "Increases oxygen delivery to cells and tissues",
          "Stimulates the release of endorphins and natural energy hormones",
          "Improves mental clarity and focus",
          "Can be more effective than caffeine for sustainable energy",
        ],
      },
    },
    {
      id: 3,
      title: (
        <>
          Enhances Emotional
          <br />
          WellBeing
        </>
      ),
      description:
        "Breathwork can help to release held emotions and process past experiences, leading to greater emotional clarity, resilience, and an improved overall mood.",
      icon: "/icons/breathwork-benefit-3.svg",
      shadowDirection: "right" as const,
      expandedContent: {
        description:
          "Techniques like Holotropic Breathwork and Transformational Breath can facilitate emotional release by accessing stored tension in the body. These methods create a safe space to process emotions that may have been suppressed, allowing them to be acknowledged and released. Regular practice builds emotional resilience and creates a healthier relationship with your feelings.",
        listItems: [
          "Helps process and release trapped emotions",
          "Reduces emotional reactivity and increases response flexibility",
          "Improves mood and emotional balance",
          "Creates a healthy way to process difficult emotions",
        ],
      },
    },
    {
      id: 4,
      title: (
        <>
          Self-Awareness &<br />
          Inner Connection
        </>
      ),
      description:
        "By focusing on the breath, individuals can gain a deeper understanding of their thoughts, feelings, and bodily sensations, developing a stronger connection to their inner selves and promoting personal growth.",
      icon: "/icons/breathwork-benefit-4.svg",
      shadowDirection: "left" as const,
      expandedContent: {
        description:
          "Mindful breathing practices create a pathway to deeper self-awareness. By observing your breath without judgment, you develop the ability to witness your thoughts and feelings with greater objectivity. This cultivates presence and mindfulness, allowing you to respond to life's challenges with intention rather than reactivity.",
        listItems: [
          "Cultivates present moment awareness",
          "Enhances mind-body connection",
          "Helps identify and release limiting beliefs",
          "Fosters compassion toward self and others",
        ],
      },
    },
  ];

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
    hidden: { opacity: 0.5, scale: 0.95 },
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
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: i * 0.1,
      },
    }),
  };

  const circleVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.2,
      },
    },
  };

  // Add specific arrow animation variant with longer duration
  const arrowVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: i * 0.3 + 0.2, // More delay between arrows
      },
    }),
  };

  return (
    <>
      <section className="bg-primary border-b-4 border-b-secondary h-full lg:min-h-[calc(100vh-6rem)] w-screen bg-[url('/breathwork-bg.svg')] bg-no-repeat relative">
        <div className="lg:px-[2vw] md:px-[2.5vw] px-[3.5vw]">
          <div className="w-full min-h-full lg:flex lg:flex-row flex flex-col justify-between items-center pt-10 pb-10 relative">
            <motion.div
              className="flex flex-col md:w-[50%] w-full min-h-full bg-transparent items-start lg:justify-between gap-8"
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
                  Transform your wellbeing with Breathwork
                </motion.h1>
              </div>

              <motion.div
                className="flex flex-col items-start gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-start justify-start gap-3 w-full md:w-[60%] overflow-hidden">
                    <motion.p
                      className="lg:text-xl md:text-lg text-[16px] font-nunito"
                      variants={itemVariants}
                    >
                      Unlock inner peace, reduce stress, and reconnect with
                      yourself through guided breathwork sessions.
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right image section - aligned with buttons */}
            <motion.div
              className="relative lg:w-[35%] md:w-[70%] w-full flex justify-center lg:mt-0 mt-8 md:mr-[21px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Main portrait image - using aspect-square to ensure perfect circle */}
              <motion.div
                className="aspect-square w-full relative lg:shadow-right md:shadow-left shadow-right rounded-full z-20 border border-primary-light overflow-hidden"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src="/conor-breathwork-1.jpeg"
                  alt="Portrait"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </motion.div>

              {/* Presentation image - using aspect-square to ensure perfect circle */}
              <motion.div
                className="absolute aspect-square md:w-[65%] md:shadow-right lg:shadow-left md:-right-[25%] lg:-left-[50%] bottom-[5%] rounded-full overflow-hidden z-10 hidden md:block border border-primary-light"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
              >
                <Image
                  src="/conor-meditate.jpeg"
                  alt="Presentation"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* What Is Breathwork section - within the same main section for scroll reveal */}
        <motion.div
          className="w-full bg-transparent py-16 lg:py-20 lg:px-[2vw] md:px-[2.5vw] px-[3.5vw] mt-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-8 lg:gap-0">
              {/* Left column with heading and icon */}
              <div className="w-full lg:w-[45%] flex justify-between items-start lg:items-start">
                <div className="lg:flex-1 overflow-hidden">
                  <motion.h2
                    className="h2 font-fraunces font-bold text-foreground mb-6 lg:mb-0"
                    variants={itemVariants}
                  >
                    What Is
                    <br />
                    Breathwork ?
                  </motion.h2>
                </div>

                <motion.div
                  className="flex-shrink-0 w-[100px] h-[100px] lg:w-[160px] lg:h-[160px]"
                  variants={imageVariants}
                >
                  <Image
                    src="/face-icon.svg"
                    alt="Breathwork Face Icon"
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                </motion.div>
              </div>

              {/* Border separation - only visible on lg screens and up */}
              <motion.div
                className="hidden lg:block w-px bg-secondary shadow-[-6px_-6px_0px_#003049]/70 self-stretch mx-8"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              ></motion.div>

              {/* Right column with description - aligned to top */}
              <div className="w-full lg:w-[45%] mt-6 lg:mt-0 overflow-hidden">
                <motion.p
                  className="lg:text-lg text-md font-nunito leading-relaxed font-semibold text-foreground"
                  variants={itemVariants}
                >
                  Breathwork encompasses a variety of conscious breathing
                  techniques practiced to improve mental, emotional, and
                  physical wellbeing. By changing the rhythm, depth, and pace of
                  your breath, you can tap into your body&apos;s natural healing
                  abilities, reduce stress, increase energy, and gain deeper
                  self-awareness.
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative w-full bg-transparent lg:px-[2vw] md:px-[2.5vw] px-[3.5vw] py-16 lg:py-24 overflow-hidden">
          {/* Background circular decoration */}
          <motion.div
            className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-accent-2/70 -translate-x-1/2 translate-y-1/2 z-0"
            variants={circleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          ></motion.div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Section title */}
            <div className="overflow-hidden mb-12">
              <motion.h2
                className="h2 font-fraunces font-bold text-foreground text-center"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1] }}
              >
                Benefits of breathwork
              </motion.h2>
            </div>

            {/* Cards grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {benefitCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  custom={index}
                  variants={cardVariants}
                >
                  <BenefitCard
                    id={card.id}
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                    shadowDirection={card.shadowDirection}
                    expandedContent={card.expandedContent}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-screen bg-primary-light py-16 lg:pt-24">
        <div className="mx-auto lg:px-[2vw] md:px-[2.5vw] px-[3.5vw]">
          {/* Session Types Section */}
          <motion.div
            className="max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Section Title */}
            <div className="overflow-hidden mb-12">
              <motion.h2
                className="h2 font-fraunces font-bold text-foreground text-center"
                variants={itemVariants}
              >
                Session Types
              </motion.h2>
            </div>

            {/* Session Types Container */}
            <motion.div
              className="bg-[#F9EFC7] rounded-3xl p-6 md:p-12 border border-secondary/50 shadow-left"
              variants={imageVariants}
            >
              {/* Cards Container */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Card 1: 1 to 1 in person */}
                <motion.div
                  className="bg-accent-2/90 text-secondary shadow-right p-6 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden border-2 border-accent-1"
                  variants={cardVariants}
                  custom={0}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-xl lg:text-2xl font-fraunces font-semibold text-center mb-6">
                    1 to 1 in person
                  </h3>
                  <p className="font-nunito text-secondary italic text-center">
                    Details about in person Breathwork sessions
                  </p>
                </motion.div>

                {/* Card 2: Group Session Online */}
                <motion.div
                  className="bg-accent-1 text-primary p-6 rounded-2xl shadow-right flex flex-col justify-between h-full relative overflow-hidden border-2 border-primary"
                  variants={cardVariants}
                  custom={1}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-xl lg:text-2xl font-fraunces font-semibold text-center mb-6">
                    Group Session
                    <br />
                    Online
                  </h3>
                  <p className="font-nunito italic text-center">
                    Details about online group breathwork sessions
                  </p>
                </motion.div>

                {/* Card 3: 1 to 1 online */}
                <motion.div
                  className="bg-primary-light text-secondary p-6 rounded-2xl shadow-right flex flex-col justify-between h-full relative overflow-hidden border-2 border-secondary"
                  variants={cardVariants}
                  custom={2}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-xl lg:text-2xl font-fraunces font-semibold text-center mb-6">
                    1 to 1 online
                  </h3>
                  <p className="font-nunito text-secondary italic text-center">
                    Details about online breathwork sessions
                  </p>
                </motion.div>
              </motion.div>

              {/* Book a Call Button */}
              <motion.div
                className="mt-10 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <InteractiveButton
                  variant="transparent"
                  text="Book a free discovery call"
                  className="md:w-80 w-full py-4 hover:text-primary transition-all ease-in duration-100"
                  ballClassName="md:left-[8%] md:top-[35%] left-[7%] top-[35%]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Process Flow Diagram */}
        <motion.div
          className="mt-24 mb-8 md:max-w-2xl w-full mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col gap-6 lg:px-[2vw] md:px-[2.5vw] px-[3.5vw]">
            {/* Step 1 */}
            <motion.div
              className="px-6 py-4 border-2 border-secondary/30 rounded-3xl bg-primary text-center w-full"
              variants={cardVariants}
              custom={0}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <p className="font-nunito text-secondary text-lg">
                Book a free discovery call with me
              </p>
            </motion.div>

            {/* Arrow 1 */}
            <motion.div
              className="flex justify-center my-2"
              variants={arrowVariants}
              custom={0}
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
              variants={cardVariants}
              custom={1}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <p className="font-nunito text-secondary text-lg">
                Find out what&apos;s the best plan for you
              </p>
            </motion.div>

            {/* Arrow 2 */}
            <motion.div
              className="flex justify-center my-2"
              variants={arrowVariants}
              custom={1}
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
              variants={cardVariants}
              custom={2}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <p className="font-nunito text-secondary text-lg">
                We&apos;ll develop an individualised plan tailored to you
              </p>
            </motion.div>

            {/* Arrow 3 */}
            <motion.div
              className="flex justify-center my-2"
              variants={arrowVariants}
              custom={2}
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
              variants={cardVariants}
              custom={3}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <p className="font-nunito text-secondary text-lg">
                Decide if you want to work with me
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="pt-24">
          <Testimonials testimonialData={testimonialData} />
        </div>
      </section>
    </>
  );
};

export default Page;
