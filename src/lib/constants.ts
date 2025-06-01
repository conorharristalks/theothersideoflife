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
      "Conor's breathwork sessions have completely transformed how I handle stress. I've gained tools I use every day to center myself and stay calm.",
    name: "Sarah L.",
    title: "Marketing Executive",
    stars: 5,
  },
  {
    quote:
      "Having Conor speak at our school was eye-opening for our students. His personal story and honesty about addiction created a lasting impact.",
    name: "Michael T.",
    title: "School Principal",
    stars: 5,
  },
  {
    quote:
      "The group breathwork session Conor led for our team was profound. It brought us closer together and improved our overall workplace wellbeing.",
    name: "Jessica M.",
    title: "Team Lead, Tech Company",
    stars: 5,
  },
  {
    quote:
      "Working with Conor has given me practical tools to manage my anxiety. His approach is both gentle and effective.",
    name: "David R.",
    title: "Software Engineer",
    stars: 5,
  },
  {
    quote:
      "As someone who struggled with addiction, Conor's story resonated deeply with me. His guidance has been instrumental in my recovery journey.",
    name: "Emma P.",
    title: "Healthcare Professional",
    stars: 5,
  },
];
