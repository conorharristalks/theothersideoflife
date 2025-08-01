import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

interface TestimonialsProps {
  testimonialData: Array<{
    quote: string;
    name: string;
    title: string;
    stars: number;
  }>;
}

export function Testimonials({ testimonialData }: TestimonialsProps) {
  return (
    <section className="mb-20 md:mb-32">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="h2 mb-3 md:mb-4">What People Say</h2>
        <p className="body-text-lg font-bold italic max-w-2xl mx-auto px-2">
          Hear from those who have experienced the transformative power of
          my breathwork and educational sessions.
        </p>
      </div>

      <div className="w-full flex justify-center">
        <InfiniteMovingCards
          items={testimonialData}
          direction="left"
          speed="slow"
          pauseOnHover={true}
          className="w-full max-w-7xl"
        />
      </div>
    </section>
  );
}
