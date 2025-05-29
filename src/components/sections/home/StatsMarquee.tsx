import { Marquee } from "@/components/ui/marquee";

interface StatsMarqueeProps {
  statsData: Array<{
    number: string;
    text: string;
  }>;
}

export function StatsMarquee({ statsData }: StatsMarqueeProps) {
  return (
    <section className="w-full overflow-hidden shadow-marquee">
      <div className="w-full overflow-hidden z-10">
        <Marquee items={statsData} className="py-6 bg-primary" speed={1.5} />
      </div>
    </section>
  );
}
