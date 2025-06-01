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
        "Spoke to junior and senior cycle students across two schools in Tipperary. The schools’ link with local youth services, offering on-site social care support, was inspiring. A one-on-one chat with a student after the talk led to a powerful moment of self-awareness around “the missing piece”—a concept many facing addiction or emotional struggle can relate to. Grateful for the trust and impact. ❤️",
      name: "SCOIL RUAIN TIPPERARY",
      src: "/event-3.jpg",
    },
    {
      quote:
        "Invited to speak to the entire school for Wellbeing Day. After the talk, spent time with 6th years discussing life and mental health. One student said, “Sometimes you just need a hug or someone to understand”—a reminder that seeking support is human, and we all need it at times. ❤️",
      name: "KNOCKBEG COLLEGE",
      src: "/event-2.jpg",
    },
    {
      quote:
        "Wrapped up the week speaking to TY and 5th year students in Bray. After the talk, a student opened up about a friend struggling with grief and asked how she could help. While I avoid giving direct advice, we spoke about the power of simply showing up. Sometimes, creating a safe space is enough—people open up when they feel supported. Healing begins with connection. 🙌🏻❤️",
      name: "ST GERARDS BRAY",
      src: "/event-3.jpeg",
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
