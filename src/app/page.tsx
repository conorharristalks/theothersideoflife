import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

// Components

// Section components

import { HomeClient } from "@/components/sections/home/HomeClient";
import { testimonialData } from "@/lib/constants";

export default async function Home() {
  // Image processing - this stays in server component
  const hero1 = "/conor-selfie.jpeg";
  const hero2 = "/conor-public-speaking-1.png";

  const buffer = await fs.readFile(`./public${hero1}`);
  const { base64 } = await getPlaiceholder(buffer);
  const { base64: base64Hero2 } = await getPlaiceholder(
    await fs.readFile(`./public${hero2}`)
  );

  // Stats data for the marquee
  const statsData = [
    { number: "6+", text: "Years Sober" },
    { number: "150+", text: "Schools Visited" },
    { number: "10,000+", text: "Students Reached" },
    { number: "300+", text: "Hours Breathwork" },
  ];

  // Testimonial data for the infinite moving cards
 

  // Past events data
  const Events = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      src: "/event-3.jpg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      src: "/event-2.jpg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      src: "/event-1.jpg",
    },
  ];

  return (
    <HomeClient 
      hero1={hero1}
      hero2={hero2}
      base64={base64}
      base64Hero2={base64Hero2}
      statsData={statsData}
      testimonialData={testimonialData}
      events={Events}
    />
  );
}
