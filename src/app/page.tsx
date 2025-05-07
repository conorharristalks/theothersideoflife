import { InteractiveButton } from "@/components/ui/buttons/interactive-button";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

export default async function Home() {
  const src = "/conor-selfie.jpeg";

  const buffer = await fs.readFile(`./public${src}`);

  const { base64 } = await getPlaiceholder(buffer);

  // Stats data for the marquee
  const statsData = [
    { number: "6+", text: "Years Sober" },
    { number: "150+", text: "Schools Visited" },
    { number: "10,000+", text: "Students Reached" },
    { number: "300+", text: "Hours Breathwork" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary h-full lg:min-h-[calc(100vh-6rem)] w-screen bg-[url('/wave-icon.svg')] bg-no-repeat bg-[position:0%_120%] md:bg-[length:85%_auto] md:bg-[position:250%_50%] lg:bg-[length:63%_auto] lg:bg-[position:130%_85%] relative">
        <div className="lg:px-[2vw] md:px-[2.5vw] px-[3.5vw]">
          <div className="w-full min-h-full lg:flex lg:flex-row flex flex-col justify-between items-center pt-10 pb-10 relative">
            <div className="flex flex-col w-full min-h-full items-start lg:justify-between gap-8">
              <h1 className="h1 font-fraunces font-bold text-foreground">
                Helping you become the best <br></br> version of yourself
              </h1>

              <div className="flex flex-col items-start gap-6">
                <div className="flex flex-col items-start gap-4">
                  <p className="font-fraunces lg:text-2xl md:text-xl text-[16px] font-semibold text-foreground">
                    Breathwork Coaching: Transform your wellbeing
                  </p>
                  <div className="flex items-center justify-start gap-3">
                    <div className="flex items-center justify-center rounded-full w-6 h-6 bg-accent-1">
                      <div className="rounded-full w-2.5 h-2.5 bg-accent-2 animate-pulse"></div>
                    </div>
                    <p className="lg:text-lg md:text-[16px] text-sm font-nunito font-semibold">
                      Offering Individual, Group & Online Breathwork Sessions.
                    </p>
                  </div>
                </div>

                <hr className="w-full bg-secondary/80" />

                <div className="flex flex-col items-start gap-4">
                  <p className="font-fraunces lg:text-2xl md:text-xl text-[16px] font-semibold text-foreground">
                    Sharing a Journey to the other side of addiction
                  </p>
                  <div className="flex items-center justify-start gap-3">
                    <div className="flex items-center justify-center rounded-full w-6 h-6 bg-transparent border-2 border-accent-1">
                      <div className="rounded-full w-2.5 h-2.5 bg-accent-1 animate-pulse"></div>
                    </div>
                    <p className="lg:text-lg md:text-[16px] text-sm font-nunito font-semibold">
                      Helping Students Understand the Realities of Addiction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center w-full lg:gap-12 md:gap-8 gap-6">
                <InteractiveButton
                  variant="filled"
                  text="Breathwork"
                  className="md:w-56 w-44 py-4 bg-accent-1 text-primary hover:text-secondary transition-all ease-in duration-100 border-primary"
                  ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
                />
                <InteractiveButton
                  variant="transparent"
                  text="Book a talk"
                  className="md:w-56 w-44 py-4 hover:text-primary transition-all ease-in duration-100"
                  ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
                />
              </div>
            </div>

            {/* Right image section - aligned with buttons */}
            <div className="relative lg:w-[28%] md:w-[60%] w-full lg:min-h-full h-[400px] md:h-[500px] flex lg:items-start items-end lg:mt-0 mt-8 md:mr-[21px]">
              {/* Main portrait image - height controlled to align with buttons */}
              <div className="lg:shadow-right md:shadow-left shadow-right w-full h-full rounded-3xl lg:rounded-bl-none md:rounded-br-none lg:rounded-br-3xl z-20">
                <Image
                  src={src.replace("./public", "")}
                  alt="Portrait"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  placeholder="blur"
                  blurDataURL={base64}
                  className="rounded-3xl lg:rounded-bl-none md:rounded-br-none lg:rounded-br-3xl"
                />
              </div>

              {/* Presentation image - positioning adjusted to eliminate shadow gap */}
              <div className="absolute md:shadow-right lg:shadow-left md:-right-[65%] lg:-left-[75%] bottom-0 w-[80%] h-[60%] rounded-2xl md:rounded-tl-none md:rounded-bl-none lg:rounded-tl-2xl lg:rounded-bl-2xl lg:rounded-br-none lg:rounded-tr-none overflow-hidden z-10 hidden md:block">
                <Image
                  src="/conor-public-speaking-1.png"
                  alt="Presentation"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-2xl lg:rounded-br-none lg:rounded-tr-none md:rounded-tl-none md:rounded-bl-none lg:rounded-tl-2xl lg:rounded-bl-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Marquee Section */}
      <section className="w-full overflow-hidden shadow-marquee">
        <div className="container mx-auto overflow-hidden z-10">
          <Marquee items={statsData} className="py-6 bg-primary" speed={1.5} />
        </div>
      </section>

      {/* Content Sections */}
      <div className="bg-primary-light min-h-screen w-full mt-[7px] py-20 bg-[url('/wave-icon.svg')] bg-repeat bg-cover bg-right md:bg-cover md:bg-top">
        <div className="container flex items-center flex-col lg:px-[2vw] md:px-[2.5vw] px-[3.5vw]">
          {/* Meet Conor Harris Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32 mx-[7px]">
            <div className="lg:col-span-2 shadow-left px-4 py-8 md:p-8 lg:p-10 flex flex-col gap-8 bg-primary border-secondary border rounded-3xl">
              <div className="w-full flex flex-col items-start gap-4">
                <h2 className="h2">Meet Conor Harris</h2>
                <p className="body-text-lg font-bold italic">
                  6 years ago, I broke free from addiction and rebuilt my life.
                  Now, at The Other Side of Life, I'm on a mission to help
                  others do the same.
                </p>
              </div>

              <div className="w-full flex flex-col items-start gap-4">
                <h3 className="h3">My Mission</h3>
                <div className="features-list">
                  <ul className="flex flex-col items-start gap-4">
                    <li className="body-text font-semibold">
                      Here at "The Other Side of Life" my main aim is speaking
                      in schools to help young people learn the realities of
                      drug misuse, and promoting a balanced lifestyle without
                      them.
                    </li>
                    <li className="body-text font-semibold">
                      I also guide individuals through transformative breathwork
                      sessions to explore parts of themselves they never knew
                      existed, and guide them to rediscover themselves.
                    </li>
                  </ul>
                </div>
                <p className="body-text-lg italic font-semibold mt-4">
                  I believe everyone deserves a happier, healthier life. True
                  change that starts from within - so join me on this journey of
                  transformation!
                </p>
              </div>

              <div>
                <InteractiveButton
                  variant="transparent"
                  text="More About Me"
                  className="md:w-64 w-full py-4 hover:text-primary transition-all ease-in duration-100"
                  ballClassName="md:left-[13%] md:top-[35%] left-[15%] top-[35%]"
                />
              </div>
            </div>

            <div className="lg:col-span-1 h-[400px] lg:h-auto shadow-right rounded-3xl relative">
              <Image
                src="/conor-selfie.jpeg"
                alt="Portrait"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-3xl"
              />
            </div>
          </section>

          {/* Why Choose Me Section */}
          <section className="flex flex-col lg:flex-row w-full mb-32 px-[7px] gap-10 lg:justify-between items-center">
            <div className="relative w-full lg:w-[30%] aspect-square shadow-left rounded-full overflow-hidden border-4 border-primary">
              <Image
                src="/breathwork-image.jpg"
                alt="Why Choose Me"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
            </div>

            <div className="w-full lg:w-[63%] shadow-right md:p-8 lg:p-10 px-4 py-8 flex flex-col justify-center items-start gap-8 bg-primary border-secondary border rounded-3xl">
              <div className="w-full flex flex-col items-start gap-4">
                <h2 className="h2">Why Choose me?</h2>
              </div>

              <div className="w-full flex flex-col items-start gap-4">
                <div className="features-list">
                  <ul className="flex flex-col items-start gap-4">
                    <li className="body-text font-semibold">
                      <strong className="font-bold font-fraunces">
                        I've Been There:
                      </strong>{" "}
                      I know what it's like to feel lost — but also the joy of
                      reclaiming your life.
                    </li>
                    <li className="body-text font-semibold">
                      <strong className="font-bold font-fraunces">
                        A Safe Space:
                      </strong>{" "}
                      No expectations. No judgement. Just a place for you to
                      explore parts of yourself holding you back.
                    </li>
                  </ul>
                </div>
                <p className="body-text-lg italic font-semibold mt-4">
                  Whatever you're facing, I'm here to show you that you can
                  transform your life too.
                </p>
              </div>
            </div>
          </section>

          {/* What Sets Me Apart Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32 px-[7px]">
            <div className="lg:col-span-1 order-2 lg:order-2 h-[400px] lg:h-auto shadow-right rounded-3xl relative">
              <Image
                src="/conor-selfie.jpeg"
                alt="Services"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-3xl"
              />
            </div>

            <div className="lg:col-span-2 order-1 lg:order-1 shadow-left px-4 py-8 md:p-8 lg:p-10 flex flex-col gap-8 bg-primary border-secondary border rounded-3xl">
              <div className="w-full flex flex-col items-start gap-4">
                <h2 className="h2">What sets me apart?</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary-light p-6 rounded-xl border border-secondary shadow-md">
                  <h4 className="h5 mb-3">Real Experience</h4>
                  <p className="body-text font-semibold">
                    I’ve overcome addiction and mental health issues myself. I
                    have the ability to connect with people on a deeper level.
                  </p>
                </div>

                <div className="bg-primary-light p-6 rounded-xl border border-secondary shadow-md">
                  <h4 className="h5 mb-3">Proven Impact</h4>
                  <p className="body-text font-semibold">
                    Over 150 talks, and thousands of lives touched.
                  </p>
                </div>

                <div className="bg-primary-light p-6 rounded-xl border border-secondary shadow-md">
                  <h4 className="h5 mb-3">Breathwork Expertise</h4>
                  <p className="body-text font-semibold">
                    As a certified coach with over 300 hours of training, I’m
                    here to guide you through your personal journey - whatever
                    stage you’re at - via 1:1, group, and online sessions.
                  </p>
                </div>

                <div className="bg-primary-light p-6 rounded-xl border border-secondary shadow-md">
                  <h4 className="h5 mb-3">My Mission</h4>
                  <p className="body-text font-semibold">
                    Supporting you towards greater wellbeing, whether you’re
                    seeking healing, direction, stress management, or support
                    with addiction.
                  </p>
                </div>
              </div>

              <div className="flex lg:gap-10 gap-4 flex-wrap">
                <InteractiveButton
                  variant="transparent"
                  text="View All Services"
                  className="md:w-64 w-full py-4 hover:text-primary transition-all ease-in duration-100"
                  ballClassName="md:left-[13%] md:top-[35%] left-[15%] top-[35%]"
                />
                <InteractiveButton
                  variant="filled"
                  text="Explore Breathwork"
                  className="md:w-64 w-full py-4 bg-accent-1 text-primary hover:text-secondary transition-all ease-in duration-100 border-primary"
                  ballClassName="lg:left-[7%] left-[15%] top-[35%] bg-accent-2"
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-primary-light w-full py-20">
        <div className="container flex items-center flex-col lg:px-[2vw] md:px-[2.5vw] px-[3.5vw]">
          {/* Testimonials Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="h2 mb-4">What People Say</h2>
              <p className="body-text-lg font-bold italic max-w-2xl mx-auto">
                Hear from those who have experienced the transformative power of
                my breathwork and educational sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial Card 1 */}
              <div className="bg-primary p-6 rounded-xl border border-secondary shadow-left">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-accent-1">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="body-text italic">
                    "Conor's breathwork sessions have completely transformed how
                    I handle stress. I've gained tools I use every day to center
                    myself and stay calm."
                  </p>
                  <div className="mt-4">
                    <p className="font-fraunces font-semibold">Sarah L.</p>
                    <p className="body-text-sm">Marketing Executive</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 2 */}
              <div className="bg-primary p-6 rounded-xl border border-secondary shadow-left">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-accent-1">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="body-text italic">
                    "Having Conor speak at our school was eye-opening for our
                    students. His personal story and honesty about addiction
                    created a lasting impact."
                  </p>
                  <div className="mt-4">
                    <p className="font-fraunces font-semibold">Michael T.</p>
                    <p className="body-text-sm">School Principal</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 3 */}
              <div className="bg-primary p-6 rounded-xl border border-secondary shadow-left">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-accent-1">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="body-text italic">
                    "The group breathwork session Conor led for our team was
                    profound. It brought us closer together and improved our
                    overall workplace wellbeing."
                  </p>
                  <div className="mt-4">
                    <p className="font-fraunces font-semibold">Jessica M.</p>
                    <p className="body-text-sm">Team Lead, Tech Company</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <InteractiveButton
                variant="transparent"
                text="Read More Testimonials"
                className="md:w-72 w-full py-4 hover:text-primary transition-all ease-in duration-100"
                ballClassName="lg:left-[7%] left-[15%]"
              />
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-accent-1 text-primary rounded-3xl overflow-hidden shadow-right relative w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-16 flex flex-col gap-8 z-10">
                <h2 className="h2">Ready to Begin Your Journey?</h2>
                <p className="body-text-lg font-bold">
                  Whether you're interested in breathwork, looking to book a
                  talk, or simply want to learn more, I'm here to help you take
                  the next step.
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <InteractiveButton
                    variant="filled"
                    text="Book a Session"
                    className="md:w-56 w-44 py-4 bg-primary text-accent-1 hover:text-secondary transition-all ease-in duration-100"
                    ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
                  />
                  <InteractiveButton
                    variant="transparent"
                    text="Contact Me"
                    className="md:w-56 w-44 py-4 text-primary border border-primary hover:bg-primary hover:text-accent-1 transition-all ease-in duration-100"
                    ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
                  />
                </div>
              </div>
              <div className="relative h-[300px] lg:h-auto">
                <Image
                  src="/conor-public-speaking-1.png"
                  alt="Start Your Journey"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              {/* Background decorative elements for the CTA section */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent-2 opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent-2 opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
