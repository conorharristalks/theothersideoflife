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
