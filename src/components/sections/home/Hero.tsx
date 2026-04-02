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
    <section className="bg-primary h-full lg:min-h-[calc(100vh-6rem)] w-screen relative">
      <div className="lg:px-[2vw] md:px-[2.5vw] px-[3.5vw]">
        <div className="w-full min-h-full lg:flex lg:flex-row flex flex-col justify-between items-center pt-10 pb-10 relative">
          <div className="flex flex-col w-full min-h-full items-start lg:justify-between gap-10">
            <h1 className="h1 font-fraunces font-bold text-yellow-bg">
              Helping you become the <br></br>{" "}
              <span className="text-accent-1">best version</span> of yourself
            </h1>

            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-col items-start gap-4">
                <p className="font-fraunces lg:text-2xl md:text-xl text-[16px] font-semibold text-foreground">
                  Nervous System & Leadership Coach: Transform your life
                </p>
                <div className="flex items-center justify-start gap-3">
                  <div className="flex items-center justify-center rounded-full w-6 h-6 bg-transparent border-2 border-accent-1">
                    <div className="rounded-full w-2.5 h-2.5 bg-accent-1 animate-pulse"></div>
                  </div>
                  <p className="lg:text-lg md:text-[16px] text-sm font-nunito font-semibold text-foreground/80">
                    Offering 1 to 1 Personalised Coaching Sessions.
                  </p>
                </div>
              </div>

              <hr className="w-full bg-secondary/80" />

              <div className="flex flex-col items-start gap-4">
                <p className="font-fraunces lg:text-2xl md:text-xl text-[16px] font-semibold text-foreground">
                  Breathwork Facilitator
                </p>
                <div className="flex items-center justify-start gap-3">
                  <div className="flex items-center justify-center rounded-full w-6 h-6 bg-transparent border-2 border-accent-1">
                    <div className="rounded-full w-2.5 h-2.5 bg-accent-1 animate-pulse"></div>
                  </div>
                  <p className="lg:text-lg md:text-[16px] text-sm font-nunito font-semibold text-foreground/80">
                    Guiding you through 1-1 or group breathwork sessions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center w-full lg:gap-12 md:gap-8 gap-6">
              <InteractiveButton
                variant="filled"
                text="1-1 Coaching"
                className="md:w-56 w-44 py-3 border-accent-1/0 transition-all ease-in duration-100"
                ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
                href="/coaching"  
              />
              <InteractiveButton
                variant="transparent"
                text="Breathwork"
                className="md:w-56 w-44 py-3 transition-all ease-in duration-100"
                ballClassName="md:left-[13%] md:top-[35%] left-[9%] top-[35%]"
                textClassName="text-foreground"
                href="/book-appointment"
              />
            </div>
          </div>

          {/* Right image section - aligned with buttons */}
          <div className="relative xl:w-1/2 2xl:w-[36%] md:w-[40%] w-full lg:min-h-full h-[400px] md:h-[500px] flex lg:items-start items-end lg:mt-0 mt-8 md:mr-[21px]">
            {/* Main portrait image - height controlled to align with buttons */}
            <div className="lg:shadow-right md:shadow-left shadow-right w-full h-full rounded-3xl z-20">
              <Image
                src={hero1}
                alt="Portrait"
                fill
                style={{ objectFit: "cover" }}
                priority
                placeholder="blur"
                blurDataURL={base64}
                className="rounded-3xl lg:rounded-3xl border border-white"
              />
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}
