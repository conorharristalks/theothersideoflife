import Image from "next/image";
import { InteractiveButton } from "@/components/ui/buttons/interactive-button";

interface HeroProps {
  hero1: string;
  hero2: string;
  base64: string;
  base64Hero2: string;
}

export function Hero({ hero1, hero2, base64, base64Hero2 }: HeroProps) {
  return (
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
                  Integrative Wellness Coach: Transform your wellbeing
                </p>
                <div className="flex items-center justify-start gap-3">
                  <div className="flex items-center justify-center rounded-full w-6 h-6 bg-accent-1">
                    <div className="rounded-full w-2.5 h-2.5 bg-accent-2 animate-pulse"></div>
                  </div>
                  <p className="lg:text-lg md:text-[16px] text-sm font-nunito font-semibold">
                    Offering Personalised Coaching and Breathwork Sessions.
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
                text="Coaching"
                className="md:w-56 w-44 py-4 border-0 hover:border-0 bg-accent-1 text-primary hover:text-secondary transition-all ease-in duration-100 border-accent-2"
                ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
                href="/breathwork"
              />
              <InteractiveButton
                variant="transparent"
                text="Book a talk"
                className="md:w-56 w-44 py-4 hover:text-primary transition-all ease-in duration-100"
                ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
                href="/book-appointment"
              />
            </div>
          </div>

          {/* Right image section - aligned with buttons */}
          <div className="relative lg:w-[28%] md:w-[60%] w-full lg:min-h-full h-[400px] md:h-[500px] flex lg:items-start items-end lg:mt-0 mt-8 md:mr-[21px]">
            {/* Main portrait image - height controlled to align with buttons */}
            <div className="lg:shadow-right md:shadow-left shadow-right w-full h-full rounded-3xl lg:rounded-bl-none md:rounded-br-none lg:rounded-br-3xl z-20">
              <Image
                src={hero1}
                alt="Portrait"
                fill
                style={{ objectFit: "cover" }}
                priority
                placeholder="blur"
                blurDataURL={base64}
                className="rounded-3xl lg:rounded-bl-none md:rounded-br-none lg:rounded-br-3xl border border-secondary"
              />
            </div>

            {/* Presentation image - positioning adjusted to eliminate shadow gap */}
            <div className="absolute md:shadow-right lg:shadow-left md:-right-[65%] lg:-left-[75%] bottom-0 w-[80%] h-[60%] rounded-2xl md:rounded-tl-none md:rounded-bl-none lg:rounded-tl-2xl lg:rounded-bl-2xl lg:rounded-br-none lg:rounded-tr-none overflow-hidden z-10 hidden md:block">
              <Image
                src={hero2}
                alt="Presentation"
                fill
                style={{ objectFit: "cover" }}
                placeholder="blur"
                blurDataURL={base64Hero2}
                className="rounded-2xl lg:rounded-br-none lg:rounded-tr-none md:rounded-tl-none md:rounded-bl-none lg:rounded-tl-2xl lg:rounded-bl-2xl border border-secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
