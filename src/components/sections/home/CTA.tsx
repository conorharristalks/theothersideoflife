import { InteractiveButton } from "@/components/ui/buttons/interactive-button";
import Image from "next/image";

export function CTA() {
  return (
    <section className="text-primary w-full px-[7px] mb-16 md:mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 shadow-right rounded-3xl bg-accent-1 overflow-hidden relative">
        {/* Content side */}
        <div className="p-6 md:p-8 lg:p-16 flex flex-col gap-4 md:gap-6 lg:gap-8 z-10">
          <h2 className="h2">Ready to Begin Your Journey?</h2>
          <p className="body-text-lg font-bold">
            Whether you&apos;re interested in breathwork, looking to book
            a talk, or simply want to learn more, I&apos;m here to help
            you take the next step.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-2 md:mt-4">
            <InteractiveButton
              variant="filled"
              text="1 to 1 Coaching"
              className="md:w-60 w-full py-4 border-accent-2 border hover:border bg-primary text-accent-1 hover:text-secondary transition-all ease-in duration-100"
              ballClassName="md:left-[13%] md:top-[35%] left-[15%] top-[35%]"
              href="/coaching"
            />
            <InteractiveButton
              variant="transparent"
              text="Contact Me"
              className="md:w-56 w-full py-4 border hover:border border-primary hover:bg-primary transition-all ease-in duration-100"
              ballClassName="md:left-[13%] md:top-[35%] left-[15%] top-[35%] bg-primary"
              textClassName="text-primary hover:text-accent-1"
              href="/book-appointment"
            />
          </div>
        </div>

        {/* Image side */}
        <div className="relative h-[300px] sm:h-[350px] lg:h-auto order-first lg:order-last">
          <Image
            src="/conor-public-speaking-1.png"
            alt="Start Your Journey"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-3xl lg:rounded-t-none lg:rounded-tr-3xl lg:rounded-br-3xl"
          />
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-24 md:w-40 h-24 md:h-40 bg-accent-2 opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-36 md:w-60 h-36 md:h-60 bg-accent-2 opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
    </section>
  );
}
