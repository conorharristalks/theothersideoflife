"use client";

import { InteractiveButton } from "@/components/ui/buttons/interactive-button";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Page = () => {
  // State to track which image to show (0, 1, or 2)
  const [activeImage, setActiveImage] = useState(0);

  // Image sources
  const images = [
    "/conor-selfie.jpeg",
    "/conor-public-speaking-1.png",
    "/conor-football.png",
  ];

  // Auto-change images on a timer
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <section className="bg-primary border-b-4 border-b-secondary h-full lg:min-h-[calc(100vh-6rem)] w-screen bg-no-repeat relative">
        <div className="lg:px-[2vw] md:px-[2.5vw] px-[3.5vw]">
          {/* About Me section */}
          <div className="w-full min-h-full lg:flex lg:flex-row flex flex-col justify-between items-center pt-12 pb-16 relative">
            <div className="flex flex-col md:w-[50%] w-full min-h-full bg-transparent items-start lg:justify-between lg:gap-12 gap-10">
              <h1 className="h1 font-fraunces font-bold text-foreground">
                About Me
              </h1>

              <div className="flex flex-col items-start gap-8">
                <div className="flex flex-col items-start gap-8">
                  {/* Quote for visual interest */}
                  <div className="flex items-start gap-3 mb-2 text-accent-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="opacity-80"
                    >
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                    <p className="text-lg font-fraunces italic text-secondary">
                      From darkness to purpose
                    </p>
                  </div>

                  <div className="flex items-start justify-start w-full lg:w-[92%]">
                    <p className="lg:text-xl md:text-lg text-[16px] font-nunito font-medium">
                      Growing up in Kildare, football was my passion, offering a
                      sense of belonging. However, at 17, I stumbled into
                      addiction, seeking a different kind of escape. This path
                      quickly spiralled, leading to dark times, debt, and
                      eventually a suicide attempt.
                    </p>
                  </div>
                  <div className="flex items-start justify-start w-full lg:w-[92%]">
                    <p className="lg:text-xl md:text-lg text-[16px] font-nunito font-medium">
                      By 19, after a 5-month rehab program, I found my way into
                      recovery. Now, 6 years sober, I&apos;ve built a new life,
                      grounded in discipline from the gym and sports, and
                      sustained by daily practices like journaling and
                      meditation. This journey has given me a new purpose: to
                      help others find their own path to peace and meaning.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right image section - aligned with buttons */}
            <div className="relative lg:w-[35%] md:w-[70%] w-full flex justify-center lg:mt-0 mt-16 md:mr-[21px]">
              {/* Main portrait image - using aspect-square to ensure perfect circle */}
              <div className="aspect-square w-full relative lg:shadow-right md:shadow-left shadow-right rounded-full z-20 border border-primary-light overflow-hidden">
                <Image
                  src="/conor-selfie.jpeg"
                  alt="Portrait"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>

              {/* Presentation image - using aspect-square to ensure perfect circle */}
              <div className="absolute aspect-square md:w-[55%] md:shadow-right lg:shadow-left md:-right-[25%] lg:-left-[30%] bottom-[5%] rounded-full overflow-hidden z-30 hidden md:block border border-primary-light">
                <Image
                  src="/conor-football.png"
                  alt="Presentation"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>

          {/* My Mission section */}
          <div className="w-full min-h-full lg:flex lg:flex-row flex flex-col justify-between items-center pt-12 pb-16 relative">
            <div className="relative lg:w-[45%] md:w-[70%] w-full flex justify-center lg:mt-0 mt-16 mb-16 lg:mb-0 md:mr-[21px]">
              {/* Main portrait image - rectangular with fixed height */}
              <div className="w-full h-[400px] lg:h-[450px] relative lg:shadow-right md:shadow-left shadow-right rounded-xl z-20 border border-primary-light overflow-hidden">
                <Image
                  src="/conor-public-speaking-1.png"
                  alt="Portrait"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="flex flex-col md:w-[50%] w-full min-h-full bg-transparent items-start lg:justify-between lg:gap-12 gap-10">
              <h1 className="h1 font-fraunces font-bold text-foreground">
                My Mission
              </h1>

              <div className="flex flex-col items-start gap-8">
                <div className="flex flex-col items-start gap-6">
                  <div className="flex items-start justify-start w-full lg:w-[92%]">
                    <p className="lg:text-xl md:text-lg text-[16px] font-nunito font-medium">
                      Here at the other side of life, my mission is to both
                      inspire and transform others, as a public speaker and
                      Integrative Wellness Coach.
                    </p>
                  </div>
                  <div className="flex items-start justify-start w-full lg:w-[92%]">
                    <p className="lg:text-xl md:text-lg text-[16px] font-nunito font-medium">
                      I share my story to thousands of students across schools
                      to inform them about the dangers of drug misuse, creating
                      a space where people feel safe enough to identify areas in
                      their life that might need change.
                    </p>
                  </div>
                  <div className="flex items-start justify-start w-full lg:w-[92%]">
                    <p className="lg:text-xl md:text-lg text-[16px] font-nunito font-medium">
                      I also help others transform their lives and reclaim their
                      purpose - just as I did - through a journey of self
                      discovery. My coaching integrates techniques like
                      breathwork, a powerful tool to guide you towards inner
                      clarity and meaningful change.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center mb-16">
            <InteractiveButton
              variant="filled"
              text="1 to 1 Coaching"
              className="w-62 py-4 bg-accent-1 text-primary hover:text-secondary transition-all ease-in duration-100 border-accent-2 border-1 hover:border-1"
              ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
            />
          </div>
        </div>
      </section>

      {/* New "Why this work matters to me" section with auto-changing images */}
      <section className="bg-primary py-12 lg:py-16 border-b-4 border-b-secondary">
        <div className="container mx-auto lg:px-[2vw] md:px-[2.5vw] px-[3.5vw]">
          <div className="flex flex-col lg:flex-row bg-primary-light p-6 rounded-2xl border border-accent-1">
            {/* Left Content - Scrollable */}
            <div className="lg:w-3/5 pr-0 lg:pr-12">
              <div className="space-y-16">
                {" "}
                {/* Increased from space-y-10 */}
                {/* Why this work matters section */}
                <div className="pt-4">
                  {" "}
                  {/* Added top padding */}
                  <h2 className="text-3xl lg:text-4xl font-fraunces font-bold mb-8">
                    Why this work matters to me
                  </h2>
                  <p className="font-nunito lg:text-lg">
                    My personal journey from breaking free of addiction and
                    reclaiming my life fuels my work today. I still vividly
                    recall my path of struggle and healing. I'm determined to
                    help others navigate this dark path and find their own
                    purpose and balance. I've seen countless others facing
                    similar struggles. This experience motivates me to guide
                    others with authentic empathy and practical wisdom, helping
                    them build a life they genuinely desire.
                  </p>
                </div>
                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-accent-1/90 to-transparent my-6"></div>{" "}
                {/* Increased margin */}
                {/* My Approach section */}
                <div>
                  <h2 className="text-3xl lg:text-4xl font-fraunces font-bold mb-8">
                    My Approach
                  </h2>
                  <p className="font-nunito lg:text-lg mb-6">
                    {" "}
                    {/* Increased margin-bottom */}
                    As a public speaker in schools across Ireland and the UK, I
                    vulnerably share my story to inform others about the dangers
                    of drug misuse and encourage them to live fulfilling
                    lifestyles. I touch on key topics like values, inner peace,
                    finance and family while encouraging a zero-judgmental space
                    concerning drug misuse.
                  </p>
                  <p className="font-nunito lg:text-lg">
                    As an Integrative Wellness Coach, I support individuals in
                    transforming their lives and reclaiming their purpose
                    through a journey of self-discovery. My coaching integrates
                    techniques like breathwork - I use to reduce stress and
                    guide you towards inner clarity and meaningful change.
                    Together, we&apos;ll explore areas where you feel stuck, fearful,
                    and disconnected. I help you let go of the past and guide
                    you on the resolution, leaving you empowered every step of
                    the way.
                  </p>
                </div>
                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-accent-1/90 to-transparent my-6"></div>{" "}
                {/* Increased margin */}
                {/* Who do I work with section */}
                <div>
                  <h2 className="text-3xl lg:text-4xl font-fraunces font-bold mb-8">
                    Who do I work with?
                  </h2>
                  <p className="font-nunito lg:text-lg">
                    My mission is for anyone ready to embrace a more balanced
                    and fulfilled life. Whether you&apos;re looking to redefine your
                    relationship with yourself, find clarity, or cultivate
                    healthier habits, I&apos;m here to support your journey.
                  </p>
                </div>
                {/* Service buttons */}
                <div className="flex flex-wrap items-center justify-start gap-6 pt-8">
                  <InteractiveButton
                    variant="transparent"
                    text="Breathwork"
                    className="md:w-56 w-full py-4 hover:text-primary transition-all ease-in duration-100"
                    ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
                  />

                  {/* Button divider */}
                  <div className="h-12 w-px bg-secondary/30 mx-4 hidden md:block"></div>

                  <InteractiveButton
                    variant="filled"
                    text="Coaching"
                    className="md:w-56 w-full px-10 py-5 bg-accent-1 text-primary hover:text-secondary transition-all ease-in duration-100 border-accent-2 border-1 hover:border-1"
                    ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
                  />
                </div>
              </div>
            </div>

            {/* Right Image - Crossfade animation with no flash */}
            <div className="lg:w-2/5 mt-10 lg:mt-0">
              <div className="rounded-2xl overflow-hidden border-2 border-primary-light h-full relative">
                <div className="w-full h-full">
                  {/* Preload all images */}
                  {images.map((src, index) => (
                    <div key={`preload-${index}`} className="hidden">
                      <Image src={src} alt="Preload" width={1} height={1} />
                    </div>
                  ))}

                  {/* Current image */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={images[activeImage]}
                      alt={`Conor portrait ${activeImage + 1}`}
                      width={500}
                      height={600}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>

                  {/* Image transitions - all images stay in DOM to prevent flashing */}
                  {images.map((src, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0 w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: activeImage === index ? 1 : 0,
                        transition: { duration: 0.8, ease: "easeInOut" },
                      }}
                    >
                      <Image
                        src={src}
                        alt={`Conor portrait ${index + 1}`}
                        width={500}
                        height={600}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Image indicator dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full cursor-pointer ${
                        activeImage === index ? "bg-secondary" : "bg-white/50"
                      }`}
                      onClick={() => setActiveImage(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
