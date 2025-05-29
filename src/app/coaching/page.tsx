"use client";

import { InteractiveButton } from "@/components/ui/buttons/interactive-button";
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

  return (
    <>
      <section className="bg-primary border-b-4 border-b-secondary h-full lg:min-h-[calc(100vh-6rem)] w-screen bg-[url('/wave-icon.svg')] bg-no-repeat bg-[position:135%_15%] relative">
        <div className="lg:px-[2vw] md:px-[2.5vw] px-[3.5vw]">
          <div className="w-full min-h-full lg:flex lg:flex-row flex flex-col justify-between items-center pt-10 pb-10 relative">
            <div className="flex flex-col md:w-[55%] w-full min-h-full bg-transparent items-start lg:justify-between gap-8">
              <h1 className="h1 font-fraunces font-bold text-foreground">
                1:1 Coaching for When You're Ready to Rebuild from the Inside
                Out
              </h1>

              <div className="flex flex-col items-start gap-6">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-start justify-start gap-3 w-full md:w-[90%]">
                    <p className="lg:text-xl md:text-lg text-[16px] font-nunito">
                      This is a space for honest conversations, healing, and
                      real change. Whether you're feeling stuck, burned out, or
                      just know there's more to life — this coaching helps you
                      reconnect, reframe, and move forward with clarity and
                      confidence.
                    </p>
                  </div>
                </div>
              </div>

              <InteractiveButton
                variant="filled"
                text="Book a free discovery call"
                className="md:w-[50%] w-full py-4 bg-accent-1 text-primary hover:text-secondary transition-all ease-in duration-100 border-accent-2 border-1 hover:border-1"
                ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
              />
            </div>

            {/* Right image section - aligned with buttons */}
            <div className="relative lg:w-[35%] md:w-[70%] w-full flex justify-center lg:mt-0 mt-8 md:mr-[21px]">
              {/* Main portrait image - using aspect-square to ensure perfect circle */}
              <div className="aspect-square w-full relative lg:shadow-right md:shadow-left shadow-right rounded-full z-20 border border-primary-light overflow-hidden">
                <Image
                  src="/breathwork-hero-1.png"
                  alt="Portrait"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* What sets me apart seciton - within the same main section for scroll reveal */}
        <div className="w-full bg-transparent py-16 lg:py-20 lg:px-[2vw] md:px-[2.5vw] px-[3.5vw] mt-10 ">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-8 lg:gap-0">
              {/* Left column with heading and content */}
              <div className="w-full lg:w-[45%] flex flex-col items-start lg:items-start">
                <h2 className="h2 font-fraunces font-bold text-foreground mb-6">
                  What Sets Me Apart?
                </h2>
                <p className="lg:text-lg text-md font-nunito leading-relaxed font-semibold text-foreground">
                  My coaching approach is built on a unique foundation. I coach
                  from a place of personal experience partnered with education.
                  I&apos;ve navigated the downfalls, challenges, and dark places that
                  many struggle with. As I guide you through this healing
                  journey, know that I&apos;ve walked this road myself
                </p>
              </div>

              {/* Border separation - only visible on lg screens and up */}
              <div className="hidden lg:block w-px bg-secondary shadow-[-6px_-6px_0px_#003049]/70 self-stretch mx-8"></div>

              {/* Right column with qualifications */}
              <div className="w-full h-full flex flex-col justify-between lg:w-[50%] mt-6 lg:mt-0">
                <h2 className="h2 font-fraunces font-bold text-foreground mb-6">
                  What makes me qualified?
                </h2>
                <ul className="mt-4 h-full flex flex-col justify-between w-full list-disc pl-5 text-secondary font-nunito lg:text-lg text-md leading-relaxed font-semibold">
                  <li>Addiction Studies Level 7 Certification</li>
                  <li>300 Hour Trauma Informed Breathwork Certification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How does this impact your journey section */}
      <section className="w-screen bg-primary py-16 lg:py-24">
        <div className="px-[3.5vw] md:px-[2.5vw] lg:px-[2vw] ">
          <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between">
            {/* Left column - heading, text, and CTA */}
            <div className="w-full lg:w-[35%] flex flex-col items-start gap-8 justify-center">
              <h2 className="h2 font-fraunces font-bold text-secondary ">
                How does this impact your journey?
              </h2>
              <p className="lg:text-lg text-md font-nunito leading-relaxed text-secondary italic ">
                As you step into this space, you will have 1-1 support, working
                off a framework that will help you reset, refocus and reclaim
                your life.
              </p>

              {/* CTA directly after text */}
              <InteractiveButton
                variant="filled"
                text="Book a free discovery call"
                className="w-full py-4 bg-accent-1 text-primary hover:text-secondary transition-all ease-in duration-100 border-accent-2 border-1 hover:border-1"
                ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
              />
            </div>

            {/* Right column - 2x2 cards grid */}
            <div className="w-full lg:w-[60%]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Card 1 */}
                <div className="bg-primary-light shadow-right border border-secondary/80 rounded-3xl p-6 pt-8 pb-10 flex flex-col min-h-[320px]">
                  <p className="font-nunito text-secondary text-lg mb-6 flex-grow">
                    Discover your purpose and find a sense of direction - being
                    guided when you feel lost, through ongoing support.
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
                </div>

                {/* Card 2 */}
                <div className="bg-primary-light shadow-left border border-secondary/80 rounded-3xl p-6 pt-8 pb-10 flex flex-col min-h-[320px]">
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
                </div>

                {/* Card 3 */}
                <div className="bg-primary-light shadow-right border border-secondary/80 rounded-3xl p-6 pt-8 pb-10 flex flex-col min-h-[320px]">
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
                </div>

                {/* Card 4 */}
                <div className="bg-primary-light shadow-left border border-secondary/80 rounded-3xl p-6 pt-8 pb-10 flex flex-col min-h-[320px]">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What does your coaching journey look like section */}
      <section className="w-screen bg-primary py-16 lg:py-24">
        <div className="px-[3.5vw] md:px-[2.5vw] lg:px-[2vw]">
          <div className="w-full flex flex-col items-center">
            <h2 className="h2 font-fraunces font-bold text-secondary text-center mb-12">
              What does your coaching journey look like?
            </h2>

            <div className="w-full max-w-7xl bg-[#FFF4D6] border border-secondary/20 rounded-3xl p-8 md:p-10 shadow-lg">
              <p className="font-nunito text-secondary lg:text-lg text-md mb-8">
                Your coaching journey with me is designed around you. We'll focus
                on your unique goals, navigate your specific challenges, and
                actively work towards creating the life you genuinely desire.
                While every path is personal, all my clients benefit from:
              </p>

              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="text-secondary text-xl mr-3 leading-6">•</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-secondary mb-1">
                      Consistent Weekly Check-ins:
                    </span>
                    <span className="text-secondary">
                      We'll have a dedicated weekly touchpoint to celebrate your
                      successes, track your progress, and address any challenges,
                      ensuring you stay accountable and motivated.
                    </span>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="text-secondary text-xl mr-3 leading-6">•</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-secondary mb-1">
                      Weekday Direct Communication:
                    </span>
                    <span className="text-secondary">
                      You&apos;ll have ongoing support available during the week via
                      WhatsApp. This means quick guidance and encouragement
                      whenever you need it the most.
                    </span>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="text-secondary text-xl mr-3 leading-6">•</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-secondary mb-1">
                      Personalised Daily Wellbeing Practices:
                    </span>
                    <span className="text-secondary">
                      I&apos;ll design practical exercises that you can easily integrate
                      into your routine to build positive habits and improve your
                      daily wellbeing.
                    </span>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="text-secondary text-xl mr-3 leading-6">•</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-secondary mb-1">
                      1-1 Monthly Breathwork Sessions:
                    </span>
                    <span className="text-secondary">
                      Each month, you&apos;ll receive 1-1 breathwork sessions. Find out
                      more about breathwork and its benefits{" "}
                      <a
                        href="/breathwork"
                        className="text-accent-1 underline hover:text-accent-2"
                      >
                        here
                      </a>
                      .
                    </span>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="text-secondary text-xl mr-3 leading-6">•</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-secondary mb-1">
                      Your Individualised Wellbeing Program:
                    </span>
                    <span className="text-secondary">
                      Together, we&apos;ll build a custom roadmap designed around you,
                      ensuring you achieve your goals and grow as a person.
                    </span>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="text-secondary text-xl mr-3 leading-6">•</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-secondary mb-1">
                      Monthly Review Zoom Calls:
                    </span>
                    <span className="text-secondary">
                      Once a month, we&apos;ll connect via zoom to reassess your journey,
                      re-evaluate your goals, and fine-tune your program.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Process Flow Diagram */}
        <div className="mt-24 mb-8 md:max-w-2xl w-full mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-fraunces text-2xl font-bold text-secondary mb-4">
              Not sure if I&apos;m right for you?
            </h3>
            <p className="font-nunito text-lg text-secondary">
              Book a free discovery call to find out!
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:px-[2vw] md:px-[2.5vw] px-[3.5vw]">
            {/* Step 1 */}
            <div className="px-6 py-4 border-2 border-secondary/30 rounded-3xl bg-primary text-center w-full">
              <p className="font-nunito text-secondary text-lg">
                Book a free discovery call with me
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="flex justify-center my-2">
              <Image
                src="/icons/dotted-arrow.svg"
                alt="Down arrow"
                width={50}
                height={20}
                className="rotate-90"
              />
            </div>

            {/* Step 2 */}
            <div className="px-6 py-4 border-2 border-secondary/30 rounded-3xl bg-primary text-center w-full">
              <p className="font-nunito text-secondary text-lg">
                Find out what&apos;s the best plan for you
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="flex justify-center my-2">
              <Image
                src="/icons/dotted-arrow.svg"
                alt="Down arrow"
                width={50}
                height={20}
                className="rotate-90"
              />
            </div>

            {/* Step 3 */}
            <div className="px-6 py-4 border-2 border-secondary/30 rounded-3xl bg-primary text-center w-full">
              <p className="font-nunito text-secondary text-lg">
                We&apos;ll develop an individualised plan tailored to you
              </p>
            </div>

            {/* Arrow 3 */}
            <div className="flex justify-center my-2">
              <Image
                src="/icons/dotted-arrow.svg"
                alt="Down arrow"
                width={50}
                height={20}
                className="rotate-90 "
              />
            </div>

            {/* Step 4 */}
            <div className="px-6 py-4 border-2 border-secondary/30 rounded-3xl bg-primary text-center w-full">
              <p className="font-nunito text-secondary text-lg">
                Decide if you want to work with me
              </p>
            </div>

            {/* Arrow to CTA */}
            <div className="flex justify-center my-2">
              <Image
                src="/icons/dotted-arrow.svg"
                alt="Down arrow"
                width={50}
                height={20}
                className="rotate-90"
              />
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mt-4 mb-6">
              <InteractiveButton
                variant="filled"
                text="Book a discovery call"
                className="md:w-[60%] w-full py-4 bg-accent-1 text-primary hover:text-secondary transition-all ease-in duration-100 border-accent-2 border-1 hover:border-1"
                ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
