import { InteractiveButton } from "@/components/ui/buttons/interactive-button";
import Image from "next/image";

export function CTA() {
  return (
    <section className="bg-accent-1 text-primary rounded-3xl overflow-hidden shadow-right relative w-full mx-[7px]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 md:p-8 lg:p-16 flex flex-col gap-6 md:gap-8 z-10">
          <h2 className="h2">Ready to Begin Your Journey?</h2>
          <p className="body-text-lg font-bold">
            Whether you&apos;re interested in breathwork, looking to book
            a talk, or simply want to learn more, I&apos;m here to help
            you take the next step.
          </p>
          <div className="flex flex-wrap gap-4 mt-2 md:mt-4">
            <InteractiveButton
              variant="filled"
              text="Book a Session"
              className="md:w-56 w-full py-4 bg-primary text-accent-1 hover:text-secondary transition-all ease-in duration-100"
              ballClassName="md:left-[13%] md:top-[35%] left-[15%] top-[35%]"
            />
            <InteractiveButton
              variant="transparent"
              text="Contact Me"
              className="md:w-56 w-full py-4 text-primary border border-primary hover:bg-primary hover:text-accent-1 transition-all ease-in duration-100"
              ballClassName="md:left-[13%] md:top-[35%] left-[15%] top-[35%]"
            />
          </div>
        </div>
        <div className="relative h-[250px] sm:h-[300px] lg:h-auto">
          <Image
            src="/conor-public-speaking-1.png"
            alt="Start Your Journey"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        {/* Background decorative elements for the CTA section */}
        <div className="absolute top-0 right-0 w-24 md:w-40 h-24 md:h-40 bg-accent-2 opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-36 md:w-60 h-36 md:h-60 bg-accent-2 opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
    </section>
  );
}
