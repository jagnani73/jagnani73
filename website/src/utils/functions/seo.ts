import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  TWITTER_URL,
} from "@/utils/constants/site";
import type { ResolvedCase } from "@/utils/types/case.types";

// Single source of truth for site identity (metadata + JSON-LD).
export const SITE_URL = "https://jagnani73.com";
export const SITE_NAME = "Yashvardhan Jagnani";
export const SITE_DESCRIPTION =
  "Blockchain-first software engineer — AI-native builder, forward-deployed engineer. Infinia · Covalent · Claude Controller. Incoming MSc, NTU Singapore.";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// Emitted once on home; everything else refs it by @id so engines fold it into
// one node.
export const personLd = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/site/android-chrome-512x512.png`,
  jobTitle: "Software Engineer",
  description: SITE_DESCRIPTION,
  email: EMAIL,
  worksFor: { "@type": "Organization", name: "Infinia Technologies" },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "SRM Institute of Science and Technology",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Nanyang Technological University, Singapore",
    },
  ],
  knowsAbout: [
    "Blockchain",
    "Smart Contracts",
    "Web3",
    "Artificial Intelligence",
    "Full-Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "Solana",
    "Zero-Knowledge Proofs",
  ],
  sameAs: [GITHUB_URL, LINKEDIN_URL, TWITTER_URL],
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
});

export const caseLd = (
  c: ResolvedCase,
  slug: string,
  description: string,
  image?: string
) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: c.docTitle,
  headline: c.title,
  description,
  url: `${SITE_URL}/record/${slug}`,
  ...(image ? { image } : {}),
  author: { "@id": PERSON_ID },
  creator: { "@id": PERSON_ID },
  isPartOf: { "@id": WEBSITE_ID },
});

export const collectionPageLd = (
  name: string,
  description: string,
  path: string
) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name,
  description,
  url: `${SITE_URL}${path}`,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": PERSON_ID },
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});
