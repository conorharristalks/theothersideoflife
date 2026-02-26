// Cache durations (in seconds)
export const CACHE_DURATIONS = {
  AVAILABILITY_BROWSER: 300, // 5 minutes
  AVAILABILITY_CDN: 60, // 1 minute
  DATE_CHECK: 120, // 2 minutes
} as const;

// Validation constants
export const VALIDATION = {
  MIN_TALKS: 1,
  MAX_TALKS: 5,
  EMAIL_REGEX: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  // Simple phone validation - just check it's not empty and has reasonable length
  PHONE_REGEX: /^[0-9\s\-\+\(\)]{7,20}$/,
} as const;

// Country codes for phone number dropdown
export const COUNTRY_CODES = [
  { code: "+353", country: "Ireland", flag: "🇮🇪" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
] as const;

// Time settings
export const TIME_SETTINGS = {
  STANDARDIZED_HOUR: 12, // Noon UTC for date standardization
  START_OF_DAY: 0,
  END_OF_DAY_HOUR: 23,
  END_OF_DAY_MINUTE: 59,
  END_OF_DAY_SECOND: 59,
  END_OF_DAY_MS: 999,
} as const;

// Default values
export const DEFAULTS = {
  BASE_URL: "http://localhost:3000",
  ADMIN_BLOCKED_REASON: "Unavailable",
  COACH_EMAIL: process.env.COACH_EMAIL || process.env.EMAIL_USER,
} as const;

export const testimonialData = [
  {
    quote:
      "Conor’s talk was powerful, heartfelt, and deeply inspiring. He connected with students on a personal level, creating a safe space for open conversation and reflection. His story of resilience and recovery left a lasting impact—highly recommended for senior cycle students. Students were fully engaged, asked meaningful questions, and some even stayed back to speak with him one-on-one. Conor speaks from the heart, making his message truly unforgettable.",
    name: "Jessica Lynch",
    title: "RE Teacher - Holy Family Secondary School Newbridge", 
    stars: 5,
  },
  {
    quote:
      "Conor has delivered over 18 talks across Kilkenny GAA clubs over the past two years. He’s always punctual, respectful, and incredibly engaging. His open, relatable story resonates strongly—especially with young players—and the feedback has been overwhelmingly positive. Conor’s continued support and willingness to connect after talks make a real difference. We look forward to working with him further on this important topic.",
    name: "Carmel Kenny",
    title: "Chair Kilkenny GAA Health & Wellbeing Committee",
    stars: 5,
  },
  {
    quote:
      "Conor’s talk was powerful, heartfelt, and deeply inspiring. He connected with students on a personal level, creating a safe space for open conversation and reflection. His story of resilience and recovery left a lasting impact—highly recommended for senior cycle students. Students were fully engaged, asked meaningful questions, and some even stayed back to speak with him one-on-one. Conor speaks from the heart, making his message truly unforgettable.",
    name: "Jessica Lynch",
    title: "RE Teacher - Holy Family Secondary School Newbridge", 
    stars: 5,
  },
   {
    quote:
      "Conor has delivered over 18 talks across Kilkenny GAA clubs over the past two years. He’s always punctual, respectful, and incredibly engaging. His open, relatable story resonates strongly—especially with young players—and the feedback has been overwhelmingly positive. Conor’s continued support and willingness to connect after talks make a real difference. We look forward to working with him further on this important topic.",
    name: "Carmel Kenny",
    title: "Chair Kilkenny GAA Health & Wellbeing Committee",
    stars: 5,
  },
];

export const testimonialDataBreathwork = [
  {
    quote:
      "I feel very fortunate to have had four breathwork sessions with Conor. Although I had years of personal development experience, breathwork was completely new to me. The emotional release and relief I experienced were incredibly real, and with Conor’s guidance I was able to access trauma and feelings I had never reached before. He led me to a deeper understanding of myself and helped me release a lifetime of pent-up anger and hurt. By creating a safe, supportive space, he enabled me to go inward and come away feeling lighter, more aligned, and true to myself. I am forever grateful and would wholeheartedly recommend him to anyone seeking a powerful and transformative experience.",
    name: "Mark H",
    title: "", 
    stars: 5,
  },
  {
    quote:
      "Conor the breathwork session was honestly great - I went in with the intention of developing self love and it has helped me a lot in that regard, especially seeing as I recently went through a breakup. I think the main thing was letting go of feelings and thoughts that \"I'm not good enough\" and it's allowed me to stop needing validation from others - because I know my own worth and I can love myself. A lot of it was physical and deep rooted in my body and not just mental, and breathwork has made me let go of that. I'm very thankful for this breathwork session",
    name: "Allen Z",
    title: "",
    stars: 5,
  },
  {
    quote:
      "I just wanted to send a little message to say thanks for everything through my breathwork sessions! You made me feel so comfortable & relaxed going into every session, and so supported at the end of them! Breathwork has taught me so much about myself already, and is helping me heal and grow in ways I couldn't have imagined. Im so grateful to have this new tool to support me on my journey, and even more grateful to have been guided by such a genuine & lovely soul! Thanks so much again for everything, I hope everything works out for you, and hopefully our paths will cross again!",
    name: "Alex F",
    title: "", 
    stars: 5,
  },
];
