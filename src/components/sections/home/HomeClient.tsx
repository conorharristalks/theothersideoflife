"use client";


// Components
import { Container } from "@/components/ui/Container";
import { ContentWrapper } from "@/components/ui/ContentWrapper";

// Section components
import { CTA } from "@/components/sections/home/CTA";
import { Hero } from "@/components/sections/home/Hero";
import { MeetConor } from "@/components/sections/home/meet-conor";
import { PastEvents } from "@/components/sections/home/PastEvents";
import { StatsMarquee } from "@/components/sections/home/StatsMarquee";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { WhatSetsMeApart } from "@/components/sections/home/WhatSetsMeApart";
import { WhyChooseMe } from "@/components/sections/home/WhyChooseMe";

interface HomeClientProps {
  hero1: string;
  hero2: string;
  base64: string;
  base64Hero2: string;
  statsData: Array<{ number: string; text: string }>;
  testimonialData: Array<{ quote: string; name: string; title: string; stars: number }>;
  events: Array<{ quote: string; name: string; src: string }>;
}

export function HomeClient({
  hero1,
  hero2,
  base64,
  base64Hero2,
  statsData,
  testimonialData,
  events
}: HomeClientProps) {
 
  return (
    <>
      {/* Hero Section */}
      <Hero
        hero1={hero1}
        hero2={hero2}
        base64={base64}
        base64Hero2={base64Hero2}
      />

      {/* Stats Marquee Section */}
      <StatsMarquee statsData={statsData} />

      {/* Content Sections */}
      <ContentWrapper
        
        className="min-h-screen relative w-full mt-[7px] py-20 bg-[url('/wave-icon.svg')] bg-repeat bg-cover bg-right md:bg-cover md:bg-top"
      >
        <Container className="relative">
          {/* Meet Conor Harris Section */}
          <MeetConor />

          {/* Why Choose Me Section */}
          <WhyChooseMe />

          {/* What Sets Me Apart Section */}
          <WhatSetsMeApart />
        </Container>
      </ContentWrapper>

      <ContentWrapper className="py-16 md:py-20">
        <Container>
          {/* Testimonials Section */}
          <Testimonials testimonialData={testimonialData} />

          {/* Past Events Section */}
          <PastEvents events={events} />

          {/* CTA Section */}
          <CTA />
        </Container>
      </ContentWrapper>
    </>
  );
}
