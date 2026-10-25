import {
  Speaker,
  Lightbulb,
  Tent,
  Headphones,
  RadioTower,
  SlidersHorizontal,
  Music2,
  Heart,
  Presentation,
  Briefcase,
  MonitorPlay,
  PackageCheck,
  FileText,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

export const SITE = {
  name: "Stereo 1 Production",
  tagline: "Sound • Lights • Stage • Events",
  location: "Munyonyo, Kampala, Uganda",
  instagram: "@stereo1production",
  instagramUrl: "https://instagram.com/stereo1production",
  phones: [
    {
      label: "Call or WhatsApp",
      display: "+256 752 494 680",
      tel: "tel:+256752494680",
      whatsapp: "https://wa.me/256752494680",
      primary: true,
    },
    {
      label: "Call",
      display: "+256 772 494 680",
      tel: "tel:+256772494680",
      whatsapp: "https://wa.me/256772494680",
      primary: false,
    },
    {
      label: "Call",
      display: "+256 701 957 377",
      tel: "tel:+256701957377",
      whatsapp: "https://wa.me/256701957377",
      primary: false,
    },
  ],
};

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#events", label: "Events" },
  { href: "#why", label: "Why us" },
  { href: "#contact", label: "Get a quote" },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    icon: Speaker,
    title: "Sound systems",
    description:
      "PA systems, line array speakers, digital mixers and wireless microphones, sized to your venue and crowd.",
  },
  {
    icon: Lightbulb,
    title: "Stage lighting",
    description:
      "Moving head lights and stage lighting that set the mood from the first song to the last.",
  },
  {
    icon: Tent,
    title: "Staging",
    description:
      "Stages built to size, including 8m x 6m, ready for bands, speakers and performers.",
  },
  {
    icon: Headphones,
    title: "DJ & live band",
    description:
      "DJ sets with console and DJ, plus full backline for live bands.",
  },
  {
    icon: RadioTower,
    title: "Live stream audio",
    description:
      "Clean audio for live streams, so people watching from home hear it as well as those in the room.",
  },
  {
    icon: SlidersHorizontal,
    title: "Engineers & power",
    description:
      "Sound engineers on site and generator power available, so the show keeps running.",
  },
];

export type EventType = {
  icon: LucideIcon;
  label: string;
  blurb: string;
};

export const EVENT_TYPES: EventType[] = [
  {
    icon: Music2,
    label: "Concerts",
    blurb: "Big crowds, big sound",
  },
  {
    icon: Heart,
    label: "Weddings",
    blurb: "Your day, sounding perfect",
  },
  {
    icon: Presentation,
    label: "Conferences",
    blurb: "Every word heard clearly",
  },
  {
    icon: Briefcase,
    label: "Corporate events",
    blurb: "Polished and professional",
  },
  {
    icon: MonitorPlay,
    label: "Live streamed events",
    blurb: "Broadcast-quality audio",
  },
];

export type Reason = {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
};

export const REASONS: Reason[] = [
  {
    icon: PackageCheck,
    number: "01",
    title: "One complete package",
    description:
      "Sound, lights, stage and crew from a single company, with one quote and one point of contact.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Clear, written quotes",
    description:
      "You receive a proforma invoice listing every item, so you know exactly what you are paying for.",
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "Easy to reach",
    description:
      "Call or WhatsApp us directly and talk to the team that will run your event.",
  },
];

export const EVENT_TYPE_OPTIONS = [
  "Concert",
  "Wedding",
  "Conference",
  "Corporate event",
  "Live streamed event",
  "Other",
];

export function buildWhatsAppUrl(text: string) {
  return `${SITE.phones[0].whatsapp}?text=${encodeURIComponent(text)}`;
}

/** What is included per service, shown when a card expands. */
export const SERVICE_DETAILS: Record<string, string[]> = {
  "Sound systems": [
    "PA systems and line array speakers sized to your venue and crowd",
    "Digital mixers and wireless microphones",
    "Setup, tuning and a sound engineer through the event",
  ],
  "Stage lighting": [
    "Moving head lights and stage lighting",
    "Looks that set the mood from the first song to the last",
    "Operated live so the lighting follows the show",
  ],
  Staging: [
    "Stages built to size, including 8m x 6m",
    "Ready for bands, speakers and performers",
    "Built, dressed and struck by our crew",
  ],
  "DJ & live band": [
    "DJ sets with console and DJ",
    "Full backline for live bands",
    "Smooth handovers between DJ and band sets",
  ],
  "Live stream audio": [
    "A clean, dedicated audio mix for the stream",
    "People watching from home hear it as well as those in the room",
    "Works alongside the main PA mix",
  ],
  "Engineers & power": [
    "Sound engineers on site for the whole event",
    "Generator power available so the show keeps running",
    "One team from setup to pack away",
  ],
};

/** Recommended setup per event type, shown in the events selector. */
export type EventDetail = {
  intro: string;
  includes: string[];
};

export const EVENT_DETAILS: Record<string, EventDetail> = {
  Concerts: {
    intro:
      "Big crowds, big sound. We bring the scale: line array PA, monitoring and lighting that keeps up with the show.",
    includes: [
      "Line array PA sized to the crowd",
      "Stage monitoring for performers",
      "Moving head lighting operated live",
      "Full backline and engineers on site",
    ],
  },
  Weddings: {
    intro:
      "Your day, sounding perfect. Clear vows and speeches, warm lighting and music that fits every moment.",
    includes: [
      "Clear PA for vows, speeches and announcements",
      "Wireless microphones for toasts",
      "Warm lighting scenes for the venue",
      "DJ sets and live band backline",
    ],
  },
  Conferences: {
    intro:
      "Every word heard clearly. Speech-first sound, reliable microphones and a feed for anyone watching online.",
    includes: [
      "Podium and wireless microphones",
      "Speech-clear PA for every seat",
      "Clean audio feed for live streams",
      "Engineers managing changeovers",
    ],
  },
  "Corporate events": {
    intro:
      "Polished and professional. Presentations land in the back row and the room looks as sharp as it sounds.",
    includes: [
      "PA tuned for presentations",
      "Stage lighting to match the occasion",
      "Staging built to the venue",
      "Generator backup for peace of mind",
    ],
  },
  "Live streamed events": {
    intro:
      "Broadcast-quality audio. A dedicated stream mix, so people at home hear it as well as those in the room.",
    includes: [
      "Dedicated mix for the stream",
      "Broadcast-quality audio feed",
      "Main PA and stream run together",
      "Engineer watching levels all night",
    ],
  },
};

/** The booking journey, shown in the interactive stepper. */
export const HOW_IT_WORKS = [
  {
    icon: "messages" as const,
    title: "Tell us about your event",
    description:
      "Use the quote builder below, WhatsApp or call us. Share the date, venue and what you have in mind.",
    hint: "Reply within the day",
  },
  {
    icon: "receipt" as const,
    title: "Approve a written quote",
    description:
      "You receive a proforma invoice listing every item, so you know exactly what you are paying for.",
    hint: "Every item listed",
  },
  {
    icon: "speaker" as const,
    title: "Show day, handled",
    description:
      "One team brings the equipment, sets it up, runs it and packs it away, so you can focus on your guests.",
    hint: "One point of contact",
  },
];

/** Gallery imagery: illustrative atmosphere shots of the setups we build and run. */
export type GalleryShot = {
  src: string;
  alt: string;
  caption: string;
  /** Bento span classes for the desktop grid. */
  span: string;
};

export const GALLERY: GalleryShot[] = [
  {
    src: "/images/gallery-console-77b4.jpg",
    alt: "Digital mixing console glowing amber in a dark venue",
    caption: "The digital console, mixed live",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/images/gallery-linearray-52c9.jpg",
    alt: "Line array speakers suspended beside a concert stage",
    caption: "Line array, sized to the room",
    span: "lg:col-span-2",
  },
  {
    src: "/images/gallery-lights-a8d1.jpg",
    alt: "Moving head lights projecting warm beams through haze",
    caption: "Moving heads, run through the show",
    span: "",
  },
  {
    src: "/images/gallery-stage-f1b7.jpg",
    alt: "Empty modular stage platform with warm uplighting",
    caption: "A stage built to fit the room",
    span: "",
  },
  {
    src: "/images/gallery-wedding-64e2.jpg",
    alt: "Wedding reception room at night with a PA speaker and candles",
    caption: "Warm light, clear sound for every toast",
    span: "lg:col-span-2",
  },
  {
    src: "/images/gallery-stream-b905.jpg",
    alt: "Live-stream audio workstation with level meters glowing",
    caption: "A clean mix for the live stream",
    span: "lg:col-span-2",
  },
];

/** Grounded in the original brief: what clients most often ask. */
export const FAQS = [
  {
    question: "Do you handle everything, or just sound?",
    answer:
      "Everything. Sound, lights, stage and crew come from a single company, with one quote and one point of contact. You will not have to coordinate separate suppliers.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Fill in the quote builder on this page, or call or WhatsApp us directly. You receive a proforma invoice listing every item, so you know exactly what you are paying for.",
  },
  {
    question: "Where do you work?",
    answer:
      "We are based in Munyonyo, Kampala, and cover events across Kampala and beyond. Tell us the venue and we will confirm the logistics.",
  },
  {
    question: "What stage sizes can you build?",
    answer:
      "Stages are built to size for the venue and the show, including our 8m x 6m stage, ready for bands, speakers and performers.",
  },
  {
    question: "What happens if the power goes?",
    answer:
      "Generator power is available, and our sound engineers are on site for the whole event, so the show keeps running.",
  },
  {
    question: "Can people watching online hear the event properly?",
    answer:
      "Yes. We run a clean, dedicated audio mix for live streams, so people watching from home hear it as well as those in the room.",
  },
];
